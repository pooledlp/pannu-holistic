import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {reserve} from './reserve-editorial.mjs';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
function fixture(fn) {
 const cwd=process.cwd(),dir=fs.mkdtempSync(path.join(os.tmpdir(),'editorial-git-'));
 try {
  git('init','--bare',path.join(dir,'remote'));git('init','-b','main',path.join(dir,'work'));process.chdir(path.join(dir,'work'));
  git('config','user.name','Test');git('config','user.email','test@example.test');fs.writeFileSync('site.txt','book showcase');git('add','.');git('commit','-m','Main');git('remote','add','origin',path.join(dir,'remote'));git('push','origin','main');fn();
 } finally {process.chdir(cwd);fs.rmSync(dir,{recursive:true,force:true});}
}
const options={date:'2026-11-09',event:'workflow_dispatch',runId:'123'};
function main() {git('checkout','main');git('branch','-D','editorial/2026-11-09');}
test('reservation survives failure; only one manual recovery; current site retained',()=>fixture(()=>{
 assert.equal(reserve(options).run,true);main();
 assert.equal(reserve({...options,event:'schedule'}).run,false);
 fs.writeFileSync('site.txt','new book showcase');git('add','.');git('commit','-m','Update site');
 assert.equal(reserve({...options,runId:'124'}).run,true);
 assert.equal(fs.readFileSync('site.txt','utf8'),'new book showcase');main();
 assert.equal(reserve({...options,runId:'125'}).run,false);
}));
test('draft or unrelated editorial edits block recovery',()=>fixture(()=>{
 reserve(options);fs.mkdirSync('src/content/articles',{recursive:true});fs.writeFileSync('src/content/articles/2026-11-09.json','{}');git('add','.');git('commit','-m','Draft');git('push');main();
 assert.equal(reserve(options).run,false);
}));
test('main weekly draft blocks even if branch absent',()=>fixture(()=>{
 fs.mkdirSync('src/content/articles',{recursive:true});fs.writeFileSync('src/content/articles/2026-11-09.json','{}');assert.equal(reserve(options).run,false);
}));
test('remote failure fails closed',()=>fixture(()=>{
 git('remote','set-url','origin','/does-not-exist');assert.throws(()=>reserve(options),/Cannot inspect/);
}));
