// Exact availability from a pinned aoe2techtree snapshot. Disabled nodes are not access.
// node tools/gen-availability.js <folder containing trees/, data.json and source.json>
const fs=require('fs'),path=require('path');
const root=process.argv[2];if(!root)throw new Error('Provide the technology-tree snapshot folder');
const source=JSON.parse(fs.readFileSync(path.join(root,'source.json'),'utf8'));
const data=JSON.parse(fs.readFileSync(path.join(root,'data.json'),'utf8'));
const out={source,civs:[],units:{},techs:{},buildings:{}};
const add=(kind,key,civ)=>{const list=out[kind][key]||(out[kind][key]=[]);if(!list.includes(civ))list.push(civ)};
for(const file of fs.readdirSync(path.join(root,'trees')).filter(f=>f.endsWith('.json')).sort()){
  const civ=file.slice(0,-5).toLowerCase().replace(/_/g,'-');
  const tree=JSON.parse(fs.readFileSync(path.join(root,'trees',file),'utf8'));
  const reference=Object.entries(data.civs).find(([name])=>name.toLowerCase()===civ)?.[1];
  if(!reference)throw new Error('Unknown civilization: '+civ);
  out.civs.push(civ);
  for(const building of tree.buildings){
    const enabled=building.node_status!=='NotAvailable';
    if(enabled!==reference.Building.includes(building.building_id))throw new Error('Building access mismatch: '+civ+' '+building.name);
    if(enabled)add('buildings',String(building.building_id),civ);
  }
  for(const node of tree.units_techs){
    const kind=node.use_type==='Unit'?'units':'techs',referenceKind=node.use_type;
    if(!['Unit','Tech','Building'].includes(referenceKind))throw new Error('Unknown node type: '+referenceKind);
    const enabled=node.node_status!=='NotAvailable';
    if(enabled!==reference[referenceKind].includes(node.node_id))throw new Error('Access mismatch: '+civ+' '+node.name);
    if(enabled){add(kind,node.name,civ);if(referenceKind==='Building')add('buildings',String(node.node_id),civ)}
  }
}
if(out.civs.length!==source.civilizations)throw new Error('Incomplete civilization snapshot');
for(const kind of ['units','techs','buildings'])out[kind]=Object.fromEntries(Object.entries(out[kind]).sort(([a],[b])=>a.localeCompare(b)).map(([key,ids])=>[key,ids.sort()]));
fs.writeFileSync(path.join(__dirname,'..','src','availability.json'),JSON.stringify(out));
console.log(out.civs.length,'civilizations;',Object.keys(out.units).length,'units;',Object.keys(out.techs).length,'technologies;',Object.keys(out.buildings).length,'buildings');
