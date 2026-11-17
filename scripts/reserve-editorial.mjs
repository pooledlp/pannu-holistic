import fs from 'node:fs';
import {execFileSync, spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {weekKey} from './draft-article.mjs';
export function reserve({date = new Date().toISOString().slice(0,10), event = process.env.GITHUB_EVENT_NAME, runId = process.env.GITHUB_RUN_ID} = {}) {
  const week = weekKey(date), branch = `editorial/${week}`, marker = `editorial/runs/${week}.txt`;
  const git = (...args) => execFileSync('git', args, {encoding:'utf8'}).trim();
  const skip = reason => { console.log(reason); return {branch, week, run:false}; };
  if (fs.existsSync(`src/content/articles/${week}.json`)) return skip('Weekly draft already exists on main.');
  const remote = spawnSync('git', ['ls-remote','--exit-code','--heads','origin',branch], {encoding:'utf8'});
  if (![0,2].includes(remote.status)) throw Error('Cannot inspect weekly reservation; refusing paid work.');
  let previous = '';
  if (remote.status === 0) {
    if (event !== 'workflow_dispatch') return skip('Existing reservation: recovery requires a manual dispatch.');
    git('fetch','origin',`refs/heads/${branch}:refs/remotes/origin/${branch}`);
    const ref = `refs/remotes/origin/${branch}`;
    const base = git('merge-base','HEAD',ref);
    const files = git('diff','--name-only',base,ref).split('\n');
    // Only a pristine reservation can be resumed. Never overwrite a draft or editorial edits.
    if (files.length !== 1 || files[0] !== marker) return skip('Weekly branch contains work; preserve it for review.');
    previous = git('show',`${ref}:${marker}`);
    if (!/^Reserved one weekly drafting attempt\. Run \d+$/.test(previous)) return skip('Weekly recovery already used or reservation is unrecognized.');
    git('checkout','-b',branch);
    git('merge','--no-edit',ref);
  } else {
    git('checkout','-b',branch);
  }
  if (!/^\d+$/.test(runId || '')) throw Error('Invalid workflow run ID');
  fs.mkdirSync('editorial/runs',{recursive:true});
  fs.writeFileSync(marker, previous ? `${previous}\nRecovery attempt. Run ${runId}\n` : `Reserved one weekly drafting attempt. Run ${runId}\n`);
  git('add',marker);
  git('commit','-m',previous ? 'Reserve bounded weekly recovery' : 'Reserve weekly patient guide draft');
  // No force push: another writer wins safely before any API call.
  git('push','-u','origin',branch);
  return {branch,week,date,run:true};
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = reserve();
    fs.appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(result).map(([k,v])=>`${k}=${v}`).join('\n')+'\n');
  } catch (e) { console.error(e.message); process.exitCode=1; }
}
