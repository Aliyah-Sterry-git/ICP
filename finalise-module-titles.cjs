const fs=require('node:fs');const p=__dirname+'/build-modules.cjs';let s=fs.readFileSync(p,'utf8');
const heading='<section aria-labelledby="modules-title"><div class="module-heading"><div><span class="kicker">Your learning playground</span><h1 id="modules-title">Pick a principle.</h1><p>Start at the foundation, or follow your curiosity.</p></div><span class="module-count">1 foundation + 24 principles</span></div>';
if(!s.includes(heading))throw Error('Module introduction not found');
s=s.replace(heading,'<section aria-label="Insurance Core Principle modules">');
s=s.replace('<script src="module-title-designs.js"></script>','');
s=s.replace("+fs.readFileSync(path.join(__dirname,'developer-title-switcher.html'),'utf8')+footer",'+footer');
fs.writeFileSync(p,s);new Function(s);
fs.writeFileSync(__dirname+'/dist/module-title-designs.css',`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');
.module-main{padding-top:40px}
.module-link{padding-bottom:27px;gap:3px}
.module-name{position:relative;width:fit-content;max-width:215px;min-height:0;align-items:center;padding:8px 5px;font-family:'Nunito',sans-serif;font-size:15px;font-weight:700;line-height:1.4;letter-spacing:.1px;color:#563272}
@media(max-width:650px){.module-main{padding-top:28px}.module-link{padding-bottom:22px;gap:3px}.module-name{font-size:11px;padding:8px 5px;min-height:0}}
`);
console.log('Kept the rounded font, removed the title experiment switcher and module introduction.');
