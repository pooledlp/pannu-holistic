import test from 'node:test';import assert from 'node:assert/strict';
import {weekKey,sourceAllowed,sourcesFrom,outputText,validateDraft} from './draft-article.mjs';
test('Weekly dates and retrieved evidence are strict',()=>{assert.equal(weekKey('2026-09-13'),'2026-09-07');assert.throws(()=>weekKey('2026-02-30'));assert(!sourceAllowed('https://nidcr.nih.gov.evil.test/page'));assert(!sourceAllowed('http://nidcr.nih.gov/page'));const url='https://www.nidcr.nih.gov/health-info/gum-disease';assert.deepEqual(sourcesFrom({output:[{type:'web_search_call',status:'completed',action:{type:'open_page',url}}]}),[url]);assert.deepEqual(sourcesFrom({output:[{type:'web_search_call',status:'failed',action:{type:'open_page',url}}]}),[]);assert.throws(()=>outputText({status:'incomplete'}))});
test('Draft validation rejects unsupported sources, claims, and unsafe paths',()=>{const urls=['https://www.nidcr.nih.gov/health-info/gum-disease','https://www.nidcr.nih.gov/health-info/oral-hygiene'];const d={slug:'planning-a-care-conversation',title:'Planning a useful conversation about oral care',description:'Prepare your questions and current routine before meeting the practice so you can understand your next steps clearly.',service:'preventive-care',sections:Array.from({length:4},(_,i)=>({heading:'Preparation step '+i,body:'Bring your questions and explain your current routine. Ask which information the office would like before your visit. Confirm appointment details directly and write down what you would like to discuss.'})),checklist:Array(4).fill('Bring a written list of your questions.'),sources:urls.map(url=>({title:'NIH patient information',url}))};validateDraft(d,urls);assert.throws(()=>validateDraft({...d,slug:'../bad'},urls));assert.throws(()=>validateDraft(d,[urls[0]]));assert.throws(()=>validateDraft({...d,title:'A guaranteed cure for your gum concerns'},urls));assert.throws(()=>validateDraft(d,urls,[d.slug]))});

import {isPublished} from '../src/content/publication.mjs';
test('Publication excludes drafts, future articles, and missing clinical review',()=>{
 const g={status:'draft',publishOn:'2026-09-13',generated:true};
 assert.equal(isPublished(g,'2026-09-13'),false);
 assert.equal(isPublished({...g,status:'approved'},'2026-09-13'),false);
 const reviewed={...g,status:'approved',reviewedBy:'Test reviewer',reviewedOn:'2026-09-13'};
 assert.equal(isPublished(reviewed,'2026-09-13'),true);
 assert.equal(isPublished({...reviewed,reviewedOn:'2026-09-14'},'2026-09-13'),false);
 assert.equal(isPublished({...reviewed,publishOn:'2026-09-21'},'2026-09-20'),false);
 assert.equal(isPublished({...reviewed,publishOn:'2026-09-21'},'2026-09-21'),true);
 assert.equal(isPublished({...reviewed,publishOn:'2026-02-30'},'2026-09-13'),false);
});
