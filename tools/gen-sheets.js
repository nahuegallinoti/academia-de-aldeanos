// Genera src/sheets-data.json: estadísticas base de cada unidad y datos de cada tecnología
// (nombre oficial en español latino, ícono y edad), a partir de una copia de aoe2techtree.net.
// Uso: node tools/gen-sheets.js <carpeta con data.json, mx.json y trees/>
const fs=require('fs'),path=require('path');
const D=process.argv[2];if(!D){console.error('Falta la carpeta de datos');process.exit(1)}
const data=JSON.parse(fs.readFileSync(path.join(D,'data.json'),'utf8')).data;
const mx=JSON.parse(fs.readFileSync(path.join(D,'mx.json'),'utf8'));
const clean=s=>(s||'').replace(/<br>/g,' ').replace(/\s+/g,' ').trim();
const FIX={'Scale Mail Armor':'Armadura de láminas','Chain Mail Armor':'Armadura de cota de malla','Plate Mail Armor':'Armadura de placas de malla','Scale Barding Armor':'Barda de escamas','Chain Barding Armor':'Barda de malla','Plate Barding Armor':'Barda de placas','Padded Archer Armor':'Armadura acolchada de arqueros','Leather Archer Armor':'Armadura de cuero de arqueros','Ring Archer Armor':'Armadura de anillos de arqueros','Siege Engineers':'Ingenieros de asedio','Two-Man Saw':'Sierra a dos manos','Double-Bit Axe':'Hacha de doble filo','Block Printing':'Imprenta','Gold Mining':'Minería de oro','Gold Shaft Mining':'Pozo minero de oro','Stone Mining':'Explotación de canteras','Stone Shaft Mining':'Pozo de cantera','Bodkin Arrow':'Flecha punzón','Parthian Tactics':'Tácticas partas','Herbal Medicine':'Hierbas medicinales','Town Watch':'Guardia urbana','Town Patrol':'Patrulla urbana','Fortified Wall':'Muralla fortificada','Bombard Tower':'Torre de bombardeo','Heated Shot':'Bala roja','Arrowslits':'Aspilleras','Trebuchet':'Trabuquete','Trebuchet (Packed)':'Trabuquete','Two-Handed Swordsman':'Espadachín a dos manos'};
const name=(en,id)=>FIX[en]||clean(mx[id])||en;
const mode=a=>{const c={};a.forEach(x=>c[x]=(c[x]||0)+1);return +Object.entries(c).sort((p,q)=>q[1]-p[1]||p[0]-q[0])[0][0]};
const units={},techs={};
for(const f of fs.readdirSync(path.join(D,'trees')).filter(f=>f.endsWith('.json'))){
  const t=JSON.parse(fs.readFileSync(path.join(D,'trees',f),'utf8'));
  for(const u of t.units_techs){
    const bag=u.use_type==='Unit'?units:techs;
    const e=bag[u.name]=bag[u.name]||{id:u.node_id,es:name(u.name,u.name_string_id),pic:u.picture_index,ages:[]};
    e.ages.push(u.age_id);
  }
}
const out={units:{},techs:{}};
for(const [n,e] of Object.entries(units)){
  const s=data.Unit[e.id]||{};
  out.units[n]={es:e.es,pic:e.pic,age:mode(e.ages),hp:s.HP,atk:s.Attack,ma:s.MeleeArmor,pa:s.PierceArmor,rng:s.Range,spd:s.Speed,rel:s.ReloadTime,train:s.TrainTime,los:s.LineOfSight,cost:s.Cost||{}};
}
for(const [n,e] of Object.entries(techs))out.techs[n]={es:e.es,pic:e.pic,age:mode(e.ages)};
fs.writeFileSync(path.join(__dirname,'..','src','sheets-data.json'),JSON.stringify(out));
console.log(Object.keys(out.units).length,'unidades',Object.keys(out.techs).length,'tecnologías');
