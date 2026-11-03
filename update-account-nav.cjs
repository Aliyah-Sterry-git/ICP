const fs=require('node:fs');const p=__dirname+'/build-modules.cjs';let s=fs.readFileSync(p,'utf8');
const start=s.indexOf('function nav('),end=s.indexOf('\nconst footer=',start);if(start<0||end<0)throw Error('Navigation renderer not found');
const nav=`function nav(prefix,active='principles'){return \`<header><div class="navbar"><a class="brand" href="\${prefix}index.html" aria-label="iCP home"><span class="brand-word"><span>i</span><span>C</span><span>P</span></span><small>INSURANCE CORE<br>PRINCIPLES</small></a><nav aria-label="Main navigation"><a href="\${prefix}index.html"\${active==='home'?' aria-current="page"':''}>Home</a><a href="\${prefix}modules.html"\${active==='principles'?' aria-current="page"':''}>The principles</a><button class="profile-button" type="button" aria-label="Account and sign in" aria-haspopup="dialog" data-modules-href="\${prefix}modules.html"><img src="\${prefix}assets/profile-lilac-v1.png" width="46" height="46" alt=""></button></nav></div></header>\`}
`;
s=s.slice(0,start)+nav+s.slice(end);
s=s.replace('${extra}</style></head>`;', '${extra}</style><link rel="stylesheet" href="${title.startsWith("Explore")?"":"../"}site-nav.css"><script src="${title.startsWith("Explore")?"":"../"}site-nav.js" defer></script></head>`;');
// Reuse the shared account navbar on the homepage as well.
s=s.replace("fs.writeFileSync(path.join(root,'index.html'),updatedHome);", `updatedHome=updatedHome.replace(/<header>[\\s\\S]*?<\\/header>/,nav('','home'));
if(!updatedHome.includes('href="site-nav.css"'))updatedHome=updatedHome.replace('</head>','<link rel="stylesheet" href="site-nav.css"><script src="site-nav.js" defer></script></head>');
fs.writeFileSync(path.join(root,'index.html'),updatedHome);`);
fs.writeFileSync(p,s);new Function(s);console.log('Account icon and larger nav tabs added to all pages.');
