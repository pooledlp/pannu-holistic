import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createRequester,retryDelay} from './ai-request.mjs';
import {run} from './draft-article.mjs';
import {isPublished} from '../src/content/publication.mjs';
const response=(status,data={},headers={})=>new Response(JSON.stringify(data),{status,headers});
function mock(responses) {
 const requests=[], waits=[], logs=[];
 return {requests,waits,logs,options:{fetchImpl:async (url,init)=>{requests.push(JSON.parse(init.body));const r=responses.shift();if(r instanceof Error)throw r;assert(r,'Unexpected API request');return r;},sleep:async ms=>waits.push(ms),log:x=>logs.push(x),random:()=>0,now:()=>0}};
}
test('429 uses Retry-After and preserves request payload on recovery',async()=>{
 const m=mock([response(429,{error:{code:'rate_limit_exceeded'}},{'retry-after':'3','x-request-id':'req_test'}),response(200,{status:'completed'})]);
 const c=createRequester('secret',m.options);assert.equal((await c.request({input:'test'})).status,'completed');
 assert.deepEqual(m.waits,[3000]);assert.deepEqual(m.requests[0],m.requests[1]);assert.equal(c.calls,1);assert.equal(c.attempts,2);assert.match(m.logs[0],/req_test/);assert(!m.logs.join('').includes('secret'));
});
test('HTTP-date, malformed and excessive Retry-After',async()=>{
 assert.equal(retryDelay('Thu, 01 Jan 1970 00:00:05 GMT',1,0,()=>0),5000);
 assert.equal(retryDelay('invalid',2,0,()=>0),2000);
 const m=mock([response(429,{}, {'retry-after':'120'})]);await assert.rejects(createRequester('x',m.options).request({}),/exceeds 60/);assert.equal(m.waits.length,0);
});
for(const status of [429,500,502,503,504])test(`${status} bounded to three attempts`,async()=>{
 const m=mock(Array.from({length:3},()=>response(status)));await assert.rejects(createRequester('x',m.options).request({}),/attempt=3\/3/);assert.equal(m.requests.length,3);assert.deepEqual(m.waits,[1000,2000]);
});
for(const code of ['insufficient_quota','credit_balance_exhausted','billing_hard_limit_reached','organization_usage_limit_exceeded'])test(`${code} stops immediately`,async()=>{
 const m=mock([response(429,{error:{code,type:'insufficient_quota',message:'secret private data'}})]);await assert.rejects(createRequester('x',m.options).request({}),e=>/Account action required/.test(e.message)&&!e.message.includes('secret'));assert.equal(m.requests.length,1);
});
for(const status of [400,401,403,404,422])test(`${status} is not retried`,async()=>{
 const m=mock([response(status)]);await assert.rejects(createRequester('x',m.options).request({}),new RegExp(`HTTP ${status}`));assert.equal(m.requests.length,1);
});
test('malformed 429 can recover; transport and malformed success cannot repeat paid work',async()=>{
 let m=mock([new Response('bad',{status:429}),response(200,{ok:true})]);await createRequester('x',m.options).request({});assert.equal(m.requests.length,2);
 for(const r of [new Error('private'),new Response('bad',{status:200})]) {m=mock([r]);await assert.rejects(createRequester('x',m.options).request({}));assert.equal(m.requests.length,1);}
});
test('two logical request limit',async()=>{
 const m=mock([response(200,{}),response(200,{})]);const c=createRequester('x',m.options);await c.request({});await c.request({});await assert.rejects(c.request({}),/limit/);assert.equal(m.requests.length,2);
});
test('mocked generation writes one unpublished sourced draft; failures write none',async()=>{
 const cwd=process.cwd(), dir=fs.mkdtempSync(path.join(os.tmpdir(),'patient-guide-'));
 const urls=['https://www.nidcr.nih.gov/health-info/gum-disease','https://www.nidcr.nih.gov/health-info/oral-hygiene'];
 const draft={slug:'planning-a-care-conversation',title:'Planning a useful conversation about oral care',description:'Prepare your questions and current routine before meeting the practice so you can understand your next steps clearly.',service:'preventive-care',sections:Array.from({length:4},()=>({heading:'Prepare questions',body:'Bring your questions and explain your current routine. Ask which information the office would like before your visit. Confirm appointment details directly and write down what you would like to discuss.'})),checklist:Array(4).fill('Bring a written list of your questions.'),sources:urls.map(url=>({title:'NIH patient information',url}))};
 const message=text=>({type:'message',content:[{type:'output_text',text}]});
 const research={status:'completed',output:[{type:'web_search_call',status:'completed',action:{sources:urls.map(url=>({url}))}},message('Research notes')]};
 try {
  process.chdir(dir);fs.mkdirSync('dist');fs.writeFileSync('dist/pages.json','[]');
  const bad=mock([response(429,{error:{code:'insufficient_quota'}})]);
  await assert.rejects(run({key:'mock',date:'2026-11-09',requestOptions:bad.options}));assert(!fs.existsSync('src/content/articles/2026-11-09.json'));
  for (const broken of [
    {status:'incomplete',output:[]},
    {status:'completed',output:[{type:'message',content:[{type:'refusal',refusal:'No'}]}]},
    {status:'completed',output:[message(JSON.stringify({...draft,sources:[...draft.sources.slice(0,1),{title:'Unretrieved source',url:'https://ada.org/unknown'}]}))]},
    {status:'completed',output:[message(JSON.stringify({...draft,title:'Too short'}))]}
  ]) {
    const invalid=mock([response(200,research),response(200,broken)]);
    await assert.rejects(run({key:'mock',date:'2026-11-09',requestOptions:invalid.options}));
    assert(!fs.existsSync('src/content/articles/2026-11-09.json'));
    assert.equal(invalid.requests.length,2);
  }
  const m=mock([response(503),response(200,research),response(200,{status:'completed',output:[message(JSON.stringify(draft))]})]);
  await run({key:'mock',date:'2026-11-09',requestOptions:m.options});
  const article=JSON.parse(fs.readFileSync('src/content/articles/2026-11-09.json'));
  assert.equal(isPublished(article,'2026-11-10'),false);assert.equal(article.reviewedBy,'');assert.equal(article.generation.calls,2);assert.equal(article.generation.attempts,3);
  assert.match(fs.readFileSync('editorial/pr-body.md','utf8'),/Clinical review required/);
  await assert.rejects(run({key:'mock',date:'2026-11-09',requestOptions:m.options}),/already exists/);
 } finally {process.chdir(cwd);fs.rmSync(dir,{recursive:true,force:true});}
});
