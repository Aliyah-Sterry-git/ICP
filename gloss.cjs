const fs=require('node:fs');
const file=__dirname+'/dist/index.html';
let h=fs.readFileSync(file,'utf8');
h=h.replace('<ellipse cx="315" cy="408" rx="213" ry="19" fill="#8e8a70" opacity=".12"/>','');
h=h.replaceAll('font-weight="500" font-size="285"','font-weight="600" font-size="285"');
h=h.replace('<text x="150" y="391" fill="url(#yellow)">C</text><text x="330" y="391" fill="url(#blue)">P</text>',`<text x="150" y="391" fill="url(#yellow)" stroke="url(#yellow)" stroke-width="5" stroke-linejoin="round">C</text><text x="330" y="391" fill="url(#blue)" stroke="url(#blue)" stroke-width="5" stroke-linejoin="round">P</text>
<g fill="none" stroke-linecap="round"><path d="M276 190 C243 177 211 193 198 218" stroke="#fffef2" stroke-width="9" opacity=".85"/><path d="M193 230 L190 244" stroke="#fffef2" stroke-width="5" opacity=".5"/><path d="M230 362 Q258 377 285 359" stroke="#fff5bd" stroke-width="4" opacity=".5"/><path d="M357 209 L357 257 M390 190 Q431 189 445 215" stroke="#f3ffff" stroke-width="8" opacity=".8"/><path d="M359 300 L359 353" stroke="#e5ffff" stroke-width="3" opacity=".5"/></g>`);
h=h.replace('<stop stop-color="#fff9ca"/><stop offset=".4" stop-color="#e9dc8b"/><stop offset="1" stop-color="#b4a65e"/>','<stop stop-color="#fffbd7"/><stop offset=".24" stop-color="#fff0a3"/><stop offset=".55" stop-color="#efd36e"/><stop offset=".8" stop-color="#c8a94f"/><stop offset="1" stop-color="#f4dc86"/>');
h=h.replace('<stop stop-color="#e0f3f3"/><stop offset=".35" stop-color="#a7cfd7"/><stop offset="1" stop-color="#6298aa"/>','<stop stop-color="#e9fbff"/><stop offset=".23" stop-color="#bfe9f3"/><stop offset=".53" stop-color="#8ccbdc"/><stop offset=".8" stop-color="#579dbb"/><stop offset="1" stop-color="#9ed8e6"/>');
// Add a denser network of tiny branching creases and printed fragments.
const detail=`<g clip-path="url(#paper-clip)"><g fill="none" stroke-linejoin="round"><path d="M-39-33 L-29-25-31-13-21-5-28 8-18 18-25 30 M-29-25 L-17-29-10-21 M-31-13 L-40-9 M-21-5 L-17 7 M-28 8 L-40 15 M-18 18 L-8 21-7 39 M-4-46 L-1-34 8-29 2-16 10-7 5 5 17 20 M8-29 L20-28 22-18 M10-7 L18-10 M5 5 L-7 13-8 21 M20-40 L24-30 33-23 29-11 36-2 30 9 34 20 22 29 M33-23 L42-25 M29-11 L18-10 M36-2 L45 2 M30 9 L17 20 M22 29 L20 37" stroke="#8c795b" stroke-width="1.1" opacity=".3"/><path d="M-38-34 L-28-26-30-14 M-20-6 L-27 7-17 17 M-3-45 L0-35 9-30 M3-16 L11-8 6 4 M25-30 L34-24 30-12 M31 9 L35 19 23 28" stroke="#fffef5" stroke-width="1.5" opacity=".9"/><path d="M-40-19 l6 1 M-32 18 l8-2 M-7-39 l5 7 M12-35 l5 4 M25 4 l4-3 M-4 27 l5 4 M12 35 l4-4" stroke="#b19c77" stroke-width=".45" opacity=".7"/></g><g fill="#6d6250" opacity=".65" font-family="Georgia,serif" font-size="3"><g transform="translate(-39 5) rotate(-67)"><text>Insurance supervision</text><text y="4">standards and guidance</text><text y="8">assessment framework</text></g><g transform="translate(-16 -42) rotate(27)"><text>CORE PRINCIPLES</text><text y="4">Policyholder protection</text><text y="8">Effective oversight</text></g><g transform="translate(19 10) rotate(51)"><text>Risk and governance</text><text y="4">The supervisory system</text><text y="8">Principles in practice</text></g></g></g>`;
h=h.replace('</g><path d="M-43-26 Q-46-40', '</g>'+detail+'<path d="M-43-26 Q-46-40');
h=h.replace('</style>',`\n/* Brighter pastel palette and an open backdrop. */
:root{--cream:#fffdf8;--pink:#f2aac3;--green:#e6f2b6}
.art:before{display:none}
.below{background:#f0f4d9}
.icon{background:#f8d7e5}.feature:nth-child(2) .icon{background:#edf3c6}.feature:nth-child(3) .icon{background:#d9f0f8}
.sticker.bottom{background:#edf6c9}.sticker.top{background:#fffdfd;border-color:#f0dce4}
.brand span,h1 em{color:#ae557d}.eyebrow:before{background:#aac665}
.page-stack span:nth-child(2){background:#f8d0e1}.page-stack span:nth-child(3){background:#d7eef7}
</style>`);
fs.writeFileSync(file,h);new Function(h.split('<script>')[1].split('</script>')[0]);
console.log('Gloss, paper details and palette updated; JavaScript syntax passed.');
