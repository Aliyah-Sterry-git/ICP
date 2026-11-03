const fs=require('node:fs');const p=__dirname+'/build-modules.cjs';let s=fs.readFileSync(p,'utf8');
const start=s.indexOf('function number('),end=s.indexOf('\nconst home=',start);if(start<0||end<0)throw Error('Number renderer missing');
const renderer=`function number(n,index,prefix=""){
const digits=String(n).split('');
const tones=[[.96,.66,.79],[.61,.83,.95],[1,.88,.53],[.80,.67,.94],[1,.71,.48],[.64,.87,.73]];
const target=tones[index%tones.length];
const sourceMid=[.73,.76,.86,.74,.77,.81,.73,.76,.86,.77];
function recolour(d,i){const base=sourceMid[+d];const channel=c=>Array.from({length:33},(_,step)=>{const t=step/32;const level=t<=base?t/base*.72:.72+(t-base)/(1-base)*.28;return (level<=.72?c*(.38+.62*level/.72):c+(1-c)*(level-.72)/.28).toFixed(4)}).join(' ');return '<filter id="tone-'+n+'-'+i+'" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="table" tableValues="'+channel(target[0])+'"/><feFuncG type="table" tableValues="'+channel(target[1])+'"/><feFuncB type="table" tableValues="'+channel(target[2])+'"/></feComponentTransfer></filter>'}
const defs=n>9?'<svg class="digit-colour-defs" width="0" height="0" aria-hidden="true"><defs>'+digits.map(recolour).join('')+'</defs></svg>':'';
return '<span class="bubble-number number-artwork '+(n>9?'two-digits':'one-digit')+'" aria-hidden="true">'+defs+digits.map((d,i)=>'<img src="'+prefix+'assets/'+(d==='0'?'number-zero-v1.png':'number-'+d+'-v1.png')+'" alt="" decoding="async" loading="lazy"'+(n>9?' style="filter:url(#tone-'+n+'-'+i+')"':'')+'>').join('')+'</span>'
}
`;
s=s.slice(0,start)+renderer+s.slice(end);
s=s.replace('.number-artwork.two-digits img{width:45%;height:92%}.number-artwork.two-digits img+img{margin-left:-10%}', '.number-artwork.two-digits img{width:68%;flex:0 0 68%;height:92%}.number-artwork.two-digits img+img{margin-left:-19%}.digit-colour-defs{position:absolute;pointer-events:none}');
fs.writeFileSync(p,s);new Function(s);console.log('Double digits share one colour and retain the same image height as single digits.');
