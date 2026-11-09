// Genera src/buildings.json a partir de una copia de los datos de aoe2techtree.net
// (data/data.json, data/locales/mx/strings.json y data/trees/*.json).
// Uso: node tools/gen-buildings.js <carpeta con data.json, mx.json y trees/>
const fs=require('fs'),path=require('path');
const D=process.argv[2];if(!D){console.error('Falta la carpeta de datos');process.exit(1)}
const data=JSON.parse(fs.readFileSync(path.join(D,'data.json'),'utf8')).data;
const mx=JSON.parse(fs.readFileSync(path.join(D,'mx.json'),'utf8'));
const clean=s=>(s||'').replace(/<br>/g,' ').replace(/\s+/g,' ').trim();
// Nombres del juego que vienen abreviados o cortados en la interfaz
const FIX={'Scale Mail Armor':'Armadura de láminas','Chain Mail Armor':'Armadura de cota de malla','Plate Mail Armor':'Armadura de placas de malla','Scale Barding Armor':'Barda de escamas','Chain Barding Armor':'Barda de malla','Plate Barding Armor':'Barda de placas','Padded Archer Armor':'Armadura acolchada de arqueros','Leather Archer Armor':'Armadura de cuero de arqueros','Ring Archer Armor':'Armadura de anillos de arqueros','Siege Engineers':'Ingenieros de asedio','Two-Man Saw':'Sierra a dos manos','Double-Bit Axe':'Hacha de doble filo','Block Printing':'Imprenta','Gold Mining':'Minería de oro','Gold Shaft Mining':'Pozo minero de oro','Stone Mining':'Explotación de canteras','Stone Shaft Mining':'Pozo de cantera','Bodkin Arrow':'Flecha punzón','Parthian Tactics':'Tácticas partas','Herbal Medicine':'Hierbas medicinales','Town Watch':'Guardia urbana','Town Patrol':'Patrulla urbana','Fortified Wall':'Muralla fortificada','Bombard Tower':'Torre de bombardeo','Heated Shot':'Bala roja','Arrowslits':'Aspilleras','Gold Shaft':'Pozo minero de oro','Trebuchet':'Trabuquete','Trebuchet (Packed)':'Trabuquete','Two-Handed Swordsman':'Espadachín a dos manos'};
const name=(en,id)=>FIX[en]||clean(mx[id])||en;
const trees=fs.readdirSync(path.join(D,'trees')).filter(f=>f.endsWith('.json'));
const civName=f=>f.replace('.json','').toLowerCase().replace(/_/g,'-');
const info={};
for(const f of trees){
  const t=JSON.parse(fs.readFileSync(path.join(D,'trees',f),'utf8'));
  for(const b of t.buildings){
    const o=info[b.building_id]=info[b.building_id]||{id:b.building_id,en:b.name,game:name(b.name,b.name_string_id),ages:[],pic:b.picture_index,civs:[],units:{},techs:{}};
    if(!o.civs.includes(civName(f)))o.civs.push(civName(f));o.ages.push(b.age_id);
  }
  for(const u of t.units_techs){
    const o=info[u.building_id];if(!o)continue;
    const bag=u.use_type==='Unit'?o.units:o.techs;
    const e=bag[u.name]=bag[u.name]||{en:u.name,es:name(u.name,u.name_string_id),ages:[],pic:u.picture_index,civs:[]};
    e.ages.push(u.age_id);e.civs.push(civName(f));
  }
}
// Edad más común entre las civs (algunas, como los Armenios, adelantan mejoras)
const mode=a=>{const c={};a.forEach(x=>c[x]=(c[x]||0)+1);return +Object.entries(c).sort((p,q)=>q[1]-p[1]||p[0]-q[0])[0][0]};
const N=trees.length,out={};
for(const [id,o] of Object.entries(info)){
  const b=data.Building[id]||{};
  const list=bag=>Object.values(bag).map(x=>({...x,age:mode(x.ages)})).sort((a,c)=>a.age-c.age||c.civs.length-a.civs.length).map(x=>({en:x.en,es:x.es,age:x.age,pic:x.pic,all:x.civs.length>=N-6,civs:x.civs.length>=N-6?[]:x.civs}));
  out[id]={id:+id,en:o.en,game:o.game,age:mode(o.ages),pic:o.pic,civs:o.civs.length>=N-6?[]:o.civs,cost:b.Cost||{},hp:b.HP||null,time:b.TrainTime||null,garrison:b.GarrisonCapacity||0,units:list(o.units),techs:list(o.techs)};
}
fs.writeFileSync(path.join(__dirname,'..','src','buildings.json'),JSON.stringify(out));
console.log(Object.keys(out).length,'edificios');
