const fs=require('node:fs');const p=__dirname+'/build-modules.cjs';let s=fs.readFileSync(p,'utf8');
s=s.replace('function number(n,index){', 'function number(n,index,prefix=""){if(n===0)return `<img class="bubble-number generated-number" src="${prefix}assets/number-zero-v1.png" width="240" height="180" alt="" aria-hidden="true" style="aspect-ratio:4/3;object-fit:contain">`;');
s=s.replace('${number(n,i)}</div><div><span class="kicker">','${number(n,i,"../")}</div><div><span class="kicker">');
fs.writeFileSync(p,s);new Function(s);console.log('Foundation will use generated zero; other numerals are unchanged.');
