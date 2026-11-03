const fs=require('node:fs');const p=__dirname+'/build-modules.cjs';let s=fs.readFileSync(p,'utf8');
s=s.replace("head('Explore the principles')+'<body>'+nav('')", "head('Explore the principles').replace('</head>','<link rel=\"stylesheet\" href=\"module-title-designs.css\"><script src=\"module-title-designs.js\"></script></head>')+'<body>'+nav('')");
s=s.replace('</p></section></main>`+footer);', '</p></section></main>`+fs.readFileSync(path.join(__dirname,\'developer-title-switcher.html\'),\'utf8\')+footer);');
fs.writeFileSync(p,s);new Function(s);console.log('Added module title design assets and developer switcher to the build.');
