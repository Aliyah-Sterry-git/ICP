const fs=require('node:fs');const p=__dirname+'/build-modules.cjs';let s=fs.readFileSync(p,'utf8');
const start=s.indexOf('function number('),end=s.indexOf('\nconst home=',start);if(start<0||end<0)throw Error('Number renderer missing');
const renderer=`function number(n,index,prefix=""){return '<span class="bubble-number number-artwork '+(n>9?'two-digits':'one-digit')+'" aria-hidden="true">'+String(n).split('').map(d=>'<img src="'+prefix+'assets/'+(d==='0'?'number-zero-v1.png':'number-'+d+'-v1.png')+'" alt="" decoding="async" loading="lazy">').join('')+'</span>'}
`;
s=s.slice(0,start)+renderer+s.slice(end);
s=s.replace('html{scroll-behavior:smooth}body{', '.number-artwork{aspect-ratio:4/3;display:flex!important;align-items:center;justify-content:center;gap:0}.number-artwork img{display:block;width:80%;height:92%;object-fit:contain;min-width:0}.number-artwork.two-digits img{width:45%;height:92%}.number-artwork.two-digits img+img{margin-left:-10%}html{scroll-behavior:smooth}body{');
fs.writeFileSync(p,s);new Function(s);console.log('All module numbers now use generated artwork at a slightly smaller scale.');
