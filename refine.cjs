const fs = require('node:fs');
const file = __dirname + '/dist/index.html';
let html = fs.readFileSync(file, 'utf8');
html = html.replace('family=DM+Sans', 'family=Fredoka:wght@500;600&family=DM+Sans');
html = html.replace('Big principles.<br>Small bites.<br><em>Better understanding.</em>', 'Insurance principles.<br><em>Made clear.</em>');
html = html.replace('Make sense of the Insurance Core Principles. Clear explanations, everyday examples, and a little more colour along the way.', 'Insurance Core Principles, one clear idea at a time.');
html = html.replace('From a stack of pages to a world of understanding.', 'A fresh perspective on the principles.');
const start = html.indexOf('<g filter="url(#shadow)"');
const end = html.indexOf('<path d="M527', start);
if (start < 0 || end < 0) throw new Error('Artwork boundaries missing');
const artwork = `<g filter="url(#shadow)" font-family="Fredoka, Arial Rounded MT Bold, sans-serif" font-weight="500" font-size="285">
<g transform="translate(0 5)" stroke-width="2"><rect x="87" y="236" width="59" height="158" rx="29.5" fill="#b76d86"/><text x="153" y="396" fill="#b4a565" stroke="#b4a565">C</text><text x="333" y="396" fill="#6d98a5" stroke="#6d98a5">P</text></g>
<rect x="84" y="231" width="59" height="158" rx="29.5" fill="url(#pink)"/><text x="150" y="391" fill="url(#yellow)">C</text><text x="330" y="391" fill="url(#blue)">P</text>
<path d="M97 258 Q94 272 95 295" fill="none" stroke="#fff5f7" opacity=".66" stroke-width="5" stroke-linecap="round"/>
</g>
<defs><radialGradient id="aged-paper" cx=".35" cy=".22" r=".85"><stop stop-color="#fffcf1"/><stop offset=".6" stop-color="#eee5cd"/><stop offset="1" stop-color="#baa887"/></radialGradient><linearGradient id="fold" x2="1" y2=".7"><stop stop-color="#e6dbc3"/><stop offset=".5" stop-color="#fcf7e8"/><stop offset="1" stop-color="#c5b89b"/></linearGradient><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" seed="12"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".08"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter><clipPath id="paper-clip"><path d="M-43-26 Q-46-40-29-44 L-16-53 Q-5-57 6-49 Q25-52 31-35 Q45-31 43-15 Q55 0 43 17 Q40 34 20 37 Q7 49-7 39 Q-24 46-34 29 Q-50 22-43 4 Q-53-12-43-26Z"/></clipPath></defs>
<g transform="translate(115 164) rotate(-12)" filter="url(#paper)"><g clip-path="url(#paper-clip)"><path d="M-55-58 H55 V50 H-55Z" fill="url(#aged-paper)"/><g filter="url(#grain)"><path d="M-44-28 Q-23-34-14-49 L-10-21-29-7Z" fill="#fbf6e8"/><path d="M-14-49 L8-29 6-49 30-35 18-10-10-21Z" fill="url(#fold)"/><path d="M-43 3 L-29-7-10-21-17 7-35 29Z" fill="url(#fold)"/><path d="M18-10 L30-35 43-15 30 2 43 17 17 20Z" fill="#e3d7bd"/><path d="M-17 7 L-10-21 18-10 17 20-7 39Z" fill="#faf5e6"/><path d="M17 20 L43 17 20 37-7 39Z" fill="url(#fold)"/><path d="M-35 29 L-17 7-7 39-24 40Z" fill="#d0c2a5"/></g><g fill="none" stroke="#a69576" stroke-width=".65" opacity=".65"><path d="M-44-28 L-29-7-43 3 M-29-7 L-10-21-14-49 M-10-21 L18-10 30-35 M18-10 L30 2 43 17 M18-10 L17 20-7 39 M-17 7 L-10-21 M-35 29 L-17 7-7 39"/><path d="M-23-24 Q-22-16-24-11 M-5-17 Q5-8 13-10 M18 24 Q26 24 30 21 M-15 12 Q-11 22-8 29"/></g>
<g fill="#756a57" opacity=".72" font-family="Georgia,serif"><g transform="translate(-8 -10) rotate(16)"><text font-size="4.8" font-weight="bold">INSURANCE</text><text y="6" font-size="4">Core Principles</text><path d="M0 10h22 M0 13h18 M0 16h21 M0 19h16" stroke="#897b65" stroke-width=".65"/></g><g transform="translate(-32 -29) rotate(-28)"><text font-size="4.2">Supervision</text><path d="M0 4h18 M0 7h15 M0 10h16" stroke="#897b65" stroke-width=".6"/></g><g transform="translate(25 -22) rotate(65)"><text font-size="4">Principles</text><path d="M0 4h16 M0 7h13 M0 10h17" stroke="#897b65" stroke-width=".6"/></g><g transform="translate(8 29) rotate(-17)"><text font-size="3.7">Standards &amp; guidance</text><path d="M0 4h21 M0 7h17" stroke="#897b65" stroke-width=".6"/></g></g></g><path d="M-43-26 Q-46-40-29-44 L-16-53 Q-5-57 6-49 Q25-52 31-35 Q45-31 43-15 Q55 0 43 17 Q40 34 20 37 Q7 49-7 39 Q-24 46-34 29 Q-50 22-43 4 Q-53-12-43-26Z" fill="none" stroke="#c8bda5" stroke-width=".7"/></g>`;
html = html.slice(0, start) + artwork + html.slice(end);
html = html.replace('</style>', `
/* Refined title composition */
.hero-grid{grid-template-columns:1.1fr 1fr;gap:56px;min-height:525px}
.art{grid-column:1;grid-row:1;align-self:start;margin-top:-22px}
.art svg{width:103%;transform:rotate(-3deg);animation:none}
.copy{grid-column:2;grid-row:1;padding:38px 0 46px}
h1{font-family:'Fredoka',sans-serif;font-weight:500;font-size:clamp(38px,3.6vw,54px);letter-spacing:-1.4px;line-height:1.12}
h1 em{font-family:inherit;font-style:normal;font-weight:500;letter-spacing:-1.4px}
.intro{font-size:16px;line-height:1.65;max-width:310px;margin:21px 0 28px}
.sticker.top{font-size:10px;top:2%;right:0;transform:rotate(5deg)}
.sticker.bottom{bottom:4%;left:9%;font-size:10px;transform:rotate(-3deg)}
.caption{display:none}.art:before{width:88%;height:88%;top:3%}.star{right:0;bottom:15%}
@media(max-width:800px){.hero-grid{grid-template-columns:1fr;gap:0}.art{grid-column:1;grid-row:1;max-width:430px;margin:12px auto 0}.copy{grid-column:1;grid-row:2;padding:12px 0 30px}h1{font-size:43px}.intro{max-width:330px}.actions{gap:18px}.primary{gap:18px}.sticker.top{top:0}.hero-grid{min-height:0}}
</style>`);
fs.writeFileSync(file, html);
new Function(html.split('<script>')[1].split('</script>')[0]);
console.log('Refined artwork, layout and subtitle; JavaScript syntax passed.');
