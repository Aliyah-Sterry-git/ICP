const fs=require('node:fs');const p=__dirname+'/build-modules.cjs';let s=fs.readFileSync(p,'utf8');
const before='.number-artwork.two-digits img{width:68%;flex:0 0 68%;height:92%}.number-artwork.two-digits img+img{margin-left:-19%}';
const after='.number-artwork.two-digits img{width:58%;flex:0 0 58%;height:78%}.number-artwork.two-digits img+img{margin-left:-16%}';
if(!s.includes(before))throw Error('Expected double-digit sizing missing');
s=s.replace(before,after);fs.writeFileSync(p,s);console.log('Double-digit artwork reduced by approximately 15%; single-digit sizing preserved.');
