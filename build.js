// Junta src/ en un solo HTML: academia-de-aldeanos.html (artifact) y dist/index.html (Vercel).
const fs=require('fs'),path=require('path');
const src=p=>fs.readFileSync(path.join(__dirname,'src',p),'utf8');
const civFiles=fs.readdirSync(path.join(__dirname,'src')).filter(f=>/^civs-\d+\.js$/.test(f)).sort((a,b)=>parseInt(a.slice(5))-parseInt(b.slice(5)));
const civBody=civFiles.map(f=>src(f).replace(/^\/\*[\s\S]*?\*\/\s*/,'').replace(/^\s*CIVDATA\.push\(\s*/,'').replace(/\);\s*$/,'').trim().replace(/,\s*$/,'')).join(',\n');
const civJs='const CIVDATA=[\n'+civBody+'\n];';
const CIVDATA=new Function(civJs+';return CIVDATA')();
const need=['id','es','en','s','l','st','sum','win','r','b','t','uu','ut','pro','con','army','trash','ages','op','mg','mb','vg','vb','vs','tips'];
const bad=[];const ids=new Set();
CIVDATA.forEach(c=>{need.forEach(k=>{if(c[k]==null)bad.push(c.id+' falta '+k)});if(!/^[1-5]{6}$/.test(c.r))bad.push(c.id+' r');if(c.ages.length!==4)bad.push(c.id+' ages');if(ids.has(c.id))bad.push('dup '+c.id);ids.add(c.id)});
if(bad.length){console.error(bad.join('\n'));process.exit(1)}
console.log('civs',CIVDATA.length);
if(process.argv[2]==='check')process.exit(0);
const english=JSON.parse(src('i18n-en.json'));
const placeholders=s=>(s.match(/\{\d+\}/g)||[]).sort().join(',');
Object.entries(english).forEach(([key,value])=>{if(typeof value!=='string'||placeholders(key)!==placeholders(value))throw new Error('Invalid English translation: '+key)});
['Inicio','Civilizaciones','Unidades','Edificios','Aperturas','Mapas','Aprender','Entrenar','Guía y ayuda'].forEach(key=>{if(!english[key])throw new Error('Missing English label: '+key)});
const icons=JSON.parse(src('icons.json'));
const iconJs='const ICONS='+JSON.stringify(Object.fromEntries(Object.entries(icons).map(([k,p])=>[k,'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,'src','icons',p+'.png')).toString('base64')])))+';';
const page=src('page.html').replace('/*@I18N@*/',()=>src('i18n.js').replace('/*@ENGLISH@*/',()=>src('i18n-en.json').trim())).replace('/*@BASE@*/',()=>src('data-base.js').trim()).replace('/*@CIVDATA@*/',()=>civJs).replace('/*@ICONS@*/',()=>iconJs).replace('/*@UNITMETA@*/',()=>src('units-meta.json').trim()).replace('/*@BLDCSS@*/',()=>src('buildings.css')).replace('/*@NAVCSS@*/',()=>src('nav.css')).replace('/*@SHEETCSS@*/',()=>src('sheets.css')).replace('/*@SHEETS@*/',()=>require('./tools/build-sheets.js')(__dirname)).replace('/*@BUILDINGS@*/',()=>require('./tools/build-buildings.js')(__dirname)).replace('/*@UXCSS@*/',()=>src('experience.css')).replace('/*@UXJS@*/',()=>src('experience.js')).replace('@TOUCHICON@',()=>'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,'src','apple-touch-icon.png')).toString('base64'));
// Valida el JavaScript ensamblado antes de modificar los archivos de salida.
new (require('vm').Script)(page.match(/<script>([\s\S]*)<\/script>/)[1]);
fs.writeFileSync(path.join(__dirname,'academia-de-aldeanos.html'),page);
const dist='<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<meta name="description" content="Guía de estudio de Age of Empires II: Definitive Edition con aperturas paso a paso, fichas completas de las 56 civilizaciones, counters y mapas.">\n<style>:root{color-scheme:light;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom)}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style>\n'+page.replace(/<\/style>/,'</style>\n</head>\n<body>')+'\n</body>\n</html>\n';
fs.writeFileSync(path.join(__dirname,'dist','index.html'),dist);
console.log('ok',(page.length/1024).toFixed(0)+'KB');
