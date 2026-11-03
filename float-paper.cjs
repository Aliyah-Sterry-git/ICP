const fs=require('node:fs');
const p=__dirname+'/dist/index.html';let h=fs.readFileSync(p,'utf8');
const original='<img src="assets/icp-glossy.png" width="1931" height="814" alt="iCP: glossy pink, baby-yellow and sky-blue letters, with a crumpled document as the dot on the i" fetchpriority="high">';
if(!h.includes(original))throw Error('Original title missing');
h=h.replace(original, '<span class="title-art">'+original.replace('<img ','<img class="title-letters" ')+'<img class="paper-dot" src="assets/icp-glossy.png" width="1931" height="814" alt="" aria-hidden="true"></span>');
h=h.replace('Insurance principles.<br><span>Made simple.</span>', '<span class="principles-line">Insurance core Principles</span><br><span>Made simple.</span>');
h=h.replace('</style>', `
/* Reposition the original paper pixels; preserve the original letter artwork. */
.title-art{position:relative;display:block;transform:rotate(-3deg)}
.title .title-art img{width:100%;margin:0;transform:none}
.title-letters{clip-path:polygon(21.6% 0,100% 0,100% 100%,0 100%,0 34.2%,18.5% 34.2%,20.3% 32%,21.6% 29%)}
.title .title-art .paper-dot{position:absolute;left:0;top:0;clip-path:polygon(0 0,21.6% 0,21.6% 29%,20.3% 32%,18.5% 34.2%,0 34.2%);transform:translateY(-7%)}
.subtitle{font-size:clamp(24px,2.35vw,34px);max-width:none;line-height:1.25;letter-spacing:-.6px}
.subtitle .principles-line{white-space:nowrap;color:inherit}
@media(min-width:1500px){.title-art{width:108%;margin-left:-4%}}
@media(max-width:850px){.subtitle{font-size:clamp(23px,5.9vw,38px)}}
</style>`);
fs.writeFileSync(p,h);new Function(h.split('<script>')[1].split('</script>')[0]);console.log('Original bitmap preserved; paper repositioned; subtitle updated.');
