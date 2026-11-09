// Arma el JavaScript de la sección Edificios con sus datos e íconos embebidos.
const fs=require('fs'),path=require('path');
module.exports=function buildBuildings(root){
  const src=p=>fs.readFileSync(path.join(root,'src',p),'utf8');
  const data=JSON.parse(src('buildings.json'));
  const icon=f=>{const p=path.join(root,'src','icons',f);return fs.existsSync(p)?'data:image/png;base64,'+fs.readFileSync(p).toString('base64'):null};
  const icons={},have=JSON.parse(src('icons.json'));
  const GEN=['Scout Cavalry','Knight','Crossbowman','Skirmisher','Pikeman','Man-at-Arms','Camel Rider','Cavalry Archer','Monk','Mangonel','Battering Ram','Trebuchet','Trebuchet (Packed)','Battle Elephant','Eagle Warrior','Hand Cannoneer','Bombard Cannon'];
  for(const b of Object.values(data)){
    const bi=icon('b'+b.pic+'.png');if(bi)icons['b'+b.pic]=bi;
    for(const u of b.units){if(have[u.en]||GEN.includes(u.en))continue;const ui=icon(u.pic+'.png');if(ui)icons['u'+u.pic]=ui}
  }
  return src('buildings.js').replace('/*@BLDDATA@*/',()=>JSON.stringify(data)).replace('/*@BLDICONS@*/',()=>JSON.stringify(icons));
};
