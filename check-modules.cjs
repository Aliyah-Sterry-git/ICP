const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.join(__dirname,'dist');
const rows=JSON.parse(fs.readFileSync(path.join(__dirname,'module-data.json'),'utf8'));
const unlocked=require('./module-availability.json').unlocked===true;
const expected=Array.from({length:26},(_,i)=>i).filter(n=>n!==11);
assert.deepEqual(rows.map(r=>r[0]),expected);
const index=fs.readFileSync(path.join(root,'modules.html'),'utf8');
assert.equal((index.match(/class="module-link"/g)||[]).length,25);
assert(!index.includes('href="principles/11.html"'));
const engravings=require('./number-engraving-manifest.json');
assert.deepEqual(Object.keys(engravings).map(Number),expected);
for(const n of expected)assert(index.includes('src="assets/library-number-'+n+'-v1.webp"'),'Missing matching engraved number '+n);
if(!unlocked){
  assert.equal((index.match(/aria-disabled="true"/g)||[]).length,25);
  assert(!/<a class="module-link"/.test(index));
  assert(!/href="principles\/\d+\.html"/.test(index));
}
const files=['index.html','modules.html',...expected.map(n=>'principles/'+n+'.html')];
for(const file of files){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const link=match[1];
    if(/^(?:https?:|data:|#)/.test(link))continue;
    assert(fs.existsSync(path.resolve(root,path.dirname(file),link)),file+': broken link '+link);
  }
  for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new Function(match[1]);
  for(const match of html.matchAll(/id="([^"]+)"/g))assert.equal(html.split('id="'+match[1]+'"').length-1,1,file+': duplicate id '+match[1]);
  if(!unlocked&&file.startsWith('principles/')){
    assert(html.includes('data-module-locked="true"'),file+': direct URL is unlocked');
    assert(!/<article\b|<p class="overview"|<section class="example"|<nav class="lesson-nav"|<a class="source-link"/.test(html),file+': lesson content exposed');
    assert(html.includes('href="../modules.html"'),file+': missing route back to browsing');
  }
}
if(unlocked){
  assert(fs.readFileSync(path.join(root,'principles/10.html'),'utf8').includes('href="12.html"'));
  assert(fs.readFileSync(path.join(root,'principles/12.html'),'utf8').includes('href="10.html"'));
}
console.log(unlocked?'Passed: module numbering, links, scripts, unique IDs and lesson navigation.':'Passed: all 25 cards disabled, all direct module URLs locked without lesson content, numbering, links, scripts and unique IDs.');
