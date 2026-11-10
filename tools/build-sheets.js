// Arma el JavaScript de las fichas con estadísticas, tecnologías e íconos embebidos.
const fs=require('fs'),path=require('path');
module.exports=function buildSheets(root){
  const src=p=>fs.readFileSync(path.join(root,'src',p),'utf8');
  const data=JSON.parse(src('sheets-data.json'));
  const icon=f=>{const p=path.join(root,'src','icons',f);return fs.existsSync(p)?'data:image/png;base64,'+fs.readFileSync(p).toString('base64'):null};
  const js=src('sheets.js');
  const icons={};
  // Unidades: las que aparecen en las líneas de mejora y las versiones de élite de las únicas
  const used=new Set([...js.matchAll(/\['([A-Z][^']+)','[^']+'\]/g)].map(m=>m[1]));
  Object.keys(JSON.parse(src('icons.json'))).filter(k=>!k.startsWith('@')).forEach(k=>{const b=k==='Longboat'?'Longship':k;used.add('Elite '+b)});
  // y las que producen los edificios
  Object.values(JSON.parse(src('buildings.json'))).forEach(b=>b.units.forEach(u=>used.add(u.en)));
  for(const n of used){const u=data.units[n];if(u){const i=icon(u.pic+'.png');if(i)icons['u'+u.pic]=i}}
  // Tecnologías: todas las que tienen ícono descargado
  const techs=new Set([...js.matchAll(/'([A-Z][A-Za-z' -]+)'/g)].map(m=>m[1]).filter(n=>data.techs[n]));
  Object.values(JSON.parse(src('buildings.json'))).forEach(b=>b.techs.forEach(t=>techs.add(t.en)));
  for(const n of techs){const t=data.techs[n];const i=icon('t'+t.pic+'.png');if(i)icons['t'+t.pic]=i}
  // Las unidades únicas ya están en ICONS: no se duplican
  const have=new Set(Object.keys(JSON.parse(src('icons.json'))));
  for(const n of have){const u=data.units[n==='Longboat'?'Longship':n];if(u&&!n.startsWith('@'))delete icons['u'+u.pic]}
  // Solo se embeben los datos de unidades y tecnologías que se usan
  return js.replace('/*@SHEETDATA@*/',()=>JSON.stringify(data)).replace('/*@SHEETICONS@*/',()=>JSON.stringify(icons));
};
