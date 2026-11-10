/* ---------- Fichas de unidad y de edificio ---------- */
/* Estadísticas base y tecnologías: src/sheets-data.json (tools/gen-sheets.js, desde aoe2techtree.net). */
const SD=/*@SHEETDATA@*/;
const SICON=/*@SHEETICONS@*/;
/* Líneas de mejora de las unidades genéricas: [nombre en inglés, nombre en la app] */
const LINES={
  scout:[['Scout Cavalry','Explorador'],['Light Cavalry','Caballería ligera'],['Hussar','Húsar']],
  knight:[['Knight','Caballero'],['Cavalier','Cavalier'],['Paladin','Paladín']],
  archer:[['Archer','Arquero'],['Crossbowman','Ballestero'],['Arbalester','Arbalestero']],
  skirm:[['Skirmisher','Hostigador'],['Elite Skirmisher','Hostigador de élite']],
  spear:[['Spearman','Lancero'],['Pikeman','Piquero'],['Halberdier','Alabardero']],
  maa:[['Militia','Milicia'],['Man-at-Arms','Hombre de armas'],['Long Swordsman','Espadachín'],['Two-Handed Swordsman','Espadachín a dos manos'],['Champion','Campeón']],
  camel:[['Camel Rider','Camello'],['Heavy Camel Rider','Camello pesado']],
  ca:[['Cavalry Archer','Arquero a caballo'],['Heavy Cavalry Archer','Arquero a caballo pesado']],
  monk:[['Monk','Monje']],
  mangonel:[['Mangonel','Mangana'],['Onager','Onagro'],['Siege Onager','Onagro de asedio']],
  ram:[['Battering Ram','Ariete'],['Capped Ram','Ariete reforzado'],['Siege Ram','Ariete de asedio']],
  treb:[['Trebuchet (Packed)','Trabuquete']],
  eleph:[['Battle Elephant','Elefante de batalla'],['Elite Battle Elephant','Elefante de batalla de élite']],
  eagle:[['Eagle Scout','Explorador águila'],['Eagle Warrior','Guerrero Águila'],['Elite Eagle Warrior','Guerrero Águila de élite']],
  hc:[['Hand Cannoneer','Cañón de mano']],
  bombard:[['Bombard Cannon','Cañón de bombardeo']]
};
const LINE_START={eagle:1,maa:1};
/* Tecnologías que afectan a cada tipo de unidad, por edificio */
const B_HERR=103,B_CUA=12,B_CAS=82,B_ARQ=87,B_UNI=209,B_EST=101,B_MON=104,B_MUE=45;
const TG={
  inf:[[B_HERR,['Forging','Iron Casting','Blast Furnace','Scale Mail Armor','Chain Mail Armor','Plate Mail Armor']],[B_CUA,['Squires','Arson']],[B_CAS,['Conscription']]],
  maa:[[B_HERR,['Forging','Iron Casting','Blast Furnace','Scale Mail Armor','Chain Mail Armor','Plate Mail Armor']],[B_CUA,['Squires','Arson','Gambesons']],[B_CAS,['Conscription']]],
  arch:[[B_HERR,['Fletching','Bodkin Arrow','Bracer','Padded Archer Armor','Leather Archer Armor','Ring Archer Armor']],[B_ARQ,['Thumb Ring']],[B_UNI,['Ballistics','Chemistry']],[B_CAS,['Conscription']]],
  skirm:[[B_HERR,['Fletching','Bodkin Arrow','Bracer','Padded Archer Armor','Leather Archer Armor','Ring Archer Armor']],[B_UNI,['Ballistics','Chemistry']],[B_CAS,['Conscription']]],
  ca:[[B_HERR,['Fletching','Bodkin Arrow','Bracer','Padded Archer Armor','Leather Archer Armor','Ring Archer Armor']],[B_ARQ,['Thumb Ring','Parthian Tactics']],[B_EST,['Bloodlines','Husbandry']],[B_UNI,['Ballistics','Chemistry']],[B_CAS,['Conscription']]],
  cav:[[B_HERR,['Forging','Iron Casting','Blast Furnace','Scale Barding Armor','Chain Barding Armor','Plate Barding Armor']],[B_EST,['Bloodlines','Husbandry']],[B_CAS,['Conscription']]],
  eleph:[[B_HERR,['Forging','Iron Casting','Blast Furnace','Scale Barding Armor','Chain Barding Armor','Plate Barding Armor']],[B_EST,['Bloodlines','Husbandry']],[B_CAS,['Conscription']]],
  gun:[[B_UNI,['Chemistry']],[B_HERR,['Padded Archer Armor','Leather Archer Armor','Ring Archer Armor']],[B_CAS,['Conscription']]],
  siege:[[B_UNI,['Chemistry','Siege Engineers']]],
  ram:[[B_UNI,['Siege Engineers']]],
  naval:[[B_MUE,['Warships','Heavy Warships']],[B_UNI,['Careening','Dry Dock','Shipwright','Chemistry','Ballistics']],[B_HERR,['Fletching','Bodkin Arrow','Bracer']]],
  monk:[[B_MON,['Redemption','Atonement','Herbal Medicine','Heresy','Sanctity','Fervor','Block Printing','Illumination','Theocracy','Faith']]],
  hero:[]
};
/* Efecto resumido de cada tecnología */
const TFX={Forging:'+1 de ataque','Iron Casting':'+1 de ataque','Blast Furnace':'+2 de ataque','Scale Mail Armor':'+1 / +1 de armadura','Chain Mail Armor':'+1 / +1 de armadura','Plate Mail Armor':'+1 / +2 de armadura','Scale Barding Armor':'+1 / +1 de armadura','Chain Barding Armor':'+1 / +1 de armadura','Plate Barding Armor':'+1 / +2 de armadura',Fletching:'+1 de ataque y alcance','Bodkin Arrow':'+1 de ataque y alcance',Bracer:'+1 de ataque y alcance','Padded Archer Armor':'+1 / +1 de armadura','Leather Archer Armor':'+1 / +1 de armadura','Ring Archer Armor':'+1 / +2 de armadura','Thumb Ring':'Dispara más rápido y con precisión total','Parthian Tactics':'+armadura y daño contra lanceros',Bloodlines:'+20 de vida',Husbandry:'+10% de velocidad',Squires:'+10% de velocidad',Arson:'Más daño a edificios',Gambesons:'+1 armadura a distancia (milicia)',Ballistics:'Puntería contra unidades en movimiento',Chemistry:'+1 de ataque a distancia; habilita la pólvora','Siege Engineers':'+1 de alcance y +20% contra edificios',Conscription:'Se entrena 33% más rápido',Careening:'+1 armadura a distancia','Dry Dock':'+15% de velocidad',Shipwright:'Barcos 20% más baratos en madera',Warships:'Mejora la flota',['Heavy Warships']:'Mejora la flota',Redemption:'Convierte edificios y asedio',Atonement:'Convierte monjes','Herbal Medicine':'Cura más rápido en edificios',Heresy:'Las unidades convertidas mueren',Sanctity:'+15 de vida',Fervor:'+15% de velocidad','Block Printing':'+3 de alcance de conversión',Illumination:'Recupera la fe más rápido',Theocracy:'Solo un monje pierde fe al convertir',Faith:'Más resistencia a la conversión'};
const CLS_COLOR={inf:'inf',maa:'inf',arch:'arch',skirm:'arch',ca:'ca',cav:'cav',eleph:'eleph',gun:'gun',siege:'siege',ram:'siege',naval:'naval',monk:'monk',hero:'cav'};
const STATDEF=[['hp','Vida',300],['atk','Ataque',25],['ma','Armadura cuerpo a cuerpo',8],['pa','Armadura a distancia',8],['rng','Alcance',12],['spd','Velocidad',1.6]];
const RES_ORDER=['Food','Wood','Gold','Stone'];
const sIcon=en=>{const u=SD.units[en];if(!u)return '';return SICON['u'+u.pic]||ICONS[en]||ICONS[{Longship:'Longboat'}[en]]||''};
const tIcon=en=>{const t=SD.techs[en];return t&&SICON['t'+t.pic]||''};
const bldIcon=id=>{const b=BLD[id];return b&&BICON['b'+b.pic]||''};
const costChips=c=>{const l=RES_ORDER.filter(r=>(c||{})[r]>0);return l.length?l.map(r=>`<span class="cost"><i style="background:var(--${RESN[r][0]})"></i><b>${c[r]}</b> ${RESN[r][1]}</span>`).join(''):'<span class="cost">Sin costo</span>'};
const ageDots=a=>`<span class="agedots" title="${AGE_BLD[a]||''}">${[1,2,3,4].map(i=>`<i${i<=a?' class="on"':''}></i>`).join('')}</span>`;
function statsHtml(en){
  const u=SD.units[en];if(!u)return '<p class="fine">Sin estadísticas para esta unidad.</p>';
  const fmt=(k,v)=>k==='spd'?(+v).toFixed(2):v;
  return `<div class="sh-stats">${STATDEF.map(([k,l,max])=>{const v=u[k]||0,p=Math.min(100,v/max*100);return `<div class="st"><span>${l}</span><div class="bar" aria-hidden="true"><i style="width:${p}%"></i></div><b>${fmt(k,v)}</b></div>`}).join('')}</div>
  <div class="sh-mini"><div><span>Costo</span><div class="costs">${costChips(u.cost)}</div></div><div><span>Entrenamiento</span><b>${u.train||'—'} s</b></div><div><span>Recarga</span><b>${u.rel||'—'} s</b></div><div><span>Visión</span><b>${u.los||'—'}</b></div></div>`;
}
function lineHtml(nodes,sel){
  return `<div class="sh-line" role="tablist" aria-label="Línea de mejoras">${nodes.map(([en,es],i)=>{const u=SD.units[en]||{};return `${i?'<span class="ln-arrow" aria-hidden="true">→</span>':''}<button class="ln-node" role="tab" aria-selected="${i===sel}" data-ln="${i}">${sIcon(en)?`<img src="${sIcon(en)}" alt="" width="48" height="48">`:''}<b>${es}</b>${u.age?`<small>${AGE_BLD[u.age]}</small>`:''}</button>`}).join('')}</div>`;
}
function techGroupsHtml(groups){
  if(!groups||!groups.length)return '';
  return `<div class="tgroups">${groups.map(([bid,list])=>{const b=BLD_BY_ID[bid];const items=list.filter(t=>SD.techs[t]);if(!items.length)return '';
    return `<div class="tg"><button class="tg-head link" data-bld="${bid}">${bldIcon(bid)?`<img src="${bldIcon(bid)}" alt="" width="28" height="28">`:''}<b>${b?b.n:''}</b><i class="go" aria-hidden="true">›</i></button><div class="tg-grid">${items.map(techCard).join('')}</div></div>`}).join('')}</div>`;
}
function techCard(en){const t=SD.techs[en]||{es:en};return `<div class="tc">${tIcon(en)?`<img src="${tIcon(en)}" alt="" width="40" height="40">`:'<span class="tc-ph"></span>'}<div><b>${t.es}</b>${TFX[en]?`<small>${TFX[en]}</small>`:''}${t.age?`<button class="tc-age link" data-age="${t.age}">${AGE_BLD[t.age]}</button>`:''}</div></div>`}
function vsTiles(ids,cls){return ids.map(i=>{const u=ub[i];if(!u)return '';return `<button class="vs-tile ${cls}" data-act="unit" data-k="@${i}">${ICONS['@'+i]?`<img src="${ICONS['@'+i]}" alt="" width="40" height="40">`:''}<span>${u.n}</span></button>`}).join('')}
let SHEET={nodes:[],sel:0};
/* Historial dentro del diálogo: cada ficha que se abre desde otra se apila y se puede volver */
let SHIST=[],SBACK=false;
function sheetOpen(html,entry){
  const dlg=$('#zoom');
  if(!dlg.open)SHIST=[];
  if(SBACK)SBACK=false;else if(entry)SHIST.push(entry);
  const prev=SHIST.length>1?SHIST[SHIST.length-2]:null;
  $('#zoombody').innerHTML=(prev?`<button class="sh-backnav" data-sh-back>← Volver a ${prev.label}</button>`:'')+html;
  if(dlg.showModal){if(!dlg.open)dlg.showModal()}else dlg.setAttribute('open','');
  dlg.scrollTop=0;
}
/* Edades: costo del avance, requisitos y qué habilita cada una */
const AGEINFO={
  1:{n:'Edad Oscura',num:'I',cost:null,time:null,req:'Es la edad con la que empieza la partida.',d:'Juntás comida y madera, explorás el mapa y preparás el avance. Solo hay milicia, exploradores y defensas básicas.'},
  2:{n:'Edad Feudal',num:'II',cost:{Food:500},time:130,req:'2 edificios de la Edad Oscura, por ejemplo cuartel, molino, campamento maderero o minero.',d:'Llegan los arqueros, los establos y la herrería. Empiezan las peleas de verdad y la transición a granjas.'},
  3:{n:'Edad de los Castillos',num:'III',cost:{Food:800,Gold:200},time:160,req:'2 edificios de la Edad Feudal, por ejemplo herrería, mercado, campo de arqueros o establo.',d:'Caballeros, monjes, asedio, castillos y unidades únicas. Es el momento de elegir entre boom o presión.'},
  4:{n:'Edad Imperial',num:'IV',cost:{Food:1000,Gold:800},time:190,req:'2 edificios de la Edad de los Castillos (universidad, monasterio o taller de asedio) o un castillo.',d:'Las mejoras finales de todas las líneas, trabuquetes y pólvora. Las partidas largas se deciden acá.'}
};
function ageOpen(a){
  a=+a;const A=AGEINFO[a];if(!A)return;
  const blds=BLD_LIST.filter(b=>b.age===a&&!b.civs.length);
  const seen=new Set(),units=[];
  BLD_LIST.filter(b=>!b.civs.length).forEach(b=>b.units.filter(u=>u.all&&u.age===a).forEach(u=>{if(!seen.has(u.en)){seen.add(u.en);units.push([u,b.id])}}));
  const tgroups=BLD_LIST.filter(b=>!b.civs.length).map(b=>[b.id,b.techs.filter(t=>t.all&&t.age===a).map(t=>t.en)]).filter(g=>g[1].length);
  const nav=`<div class="age-nav">${a>1?`<button class="btn ghost" data-age="${a-1}">← ${AGEINFO[a-1].n}</button>`:'<span></span>'}${a<4?`<button class="btn ghost" data-age="${a+1}">${AGEINFO[a+1].n} →</button>`:''}</div>`;
  sheetOpen(heroHtml({glyph:A.num,color:'def',kicker:'Edad '+a+' de 4',title:A.n,
    tags:(A.cost?`<span class="sh-tag"><span><small>Costo del avance</small><span class="costs">${costChips(A.cost)}</span></span></span>`:'')+(A.time?tag('Investigación',A.time+' s'):'')+tag('Se investiga en','Centro Urbano',bldIcon(109)?`<img src="${bldIcon(109)}" alt="" width="28" height="28">`:'','data-bld="109"')})
  +`<p class="sh-lede">${A.d}</p>
  <div class="callout sh-tip"><b>Requisito</b><span>${A.req}</span></div>
  ${blds.length?`<section class="sh-block"><h3>Edificios que se habilitan <span class="sh-count">${blds.length}</span></h3><div class="ptiles">${blds.map(b=>`<button class="ptile" data-bld="${b.id}">${BICON['b'+b.pic]?`<img src="${BICON['b'+b.pic]}" alt="" width="48" height="48">`:''}<b>${b.n}</b></button>`).join('')}</div></section>`:''}
  ${units.length?`<section class="sh-block"><h3>Unidades que se habilitan <span class="sh-count">${units.length}</span></h3><div class="ptiles">${units.map(([u,bid])=>unitTile(u,bid)).join('')}</div></section>`:''}
  ${tgroups.length?`<section class="sh-block"><h3>Tecnologías que se habilitan <span class="sh-count">${tgroups.reduce((s,g)=>s+g[1].length,0)}</span></h3>${techGroupsHtml(tgroups)}</section>`:''}
  ${nav}`,{label:A.n,fn:()=>ageOpen(a)});
}

function heroHtml({img,glyph,color,kicker,title,sub,tags}){
  return `<div class="sh-hero" style="--tc:var(--t-${color||'def'})"><div class="sh-portrait">${img?`<img src="${img}" alt="" width="48" height="48">`:''}${glyph?`<span class="sh-glyph">${glyph}</span>`:''}</div><div class="sh-title"><div class="sh-kicker">${kicker}</div><h2>${title}</h2>${sub?`<small>${sub}</small>`:''}<div class="sh-tags">${tags}</div></div></div>`;
}
const tag=(label,val,icon,attrs)=>{if(!val)return '';const el=attrs?'button':'span';return `<${el} class="sh-tag${attrs?' link':''}" ${attrs||''}>${icon||''}<span><small>${label}</small><b>${val}</b></span>${attrs?'<i class="go" aria-hidden="true">›</i>':''}</${el}>`};
function zoomOpen(k){
  const dlg=$('#zoom');if(!dlg)return;ST.unit=k;
  let h;
  if(k.startsWith('@')){
    const id=k.slice(1),u=ub[id],cls=GCLS[id],nodes=LINES[id]||[[u.en,u.n]],sel=Math.min(LINE_START[id]||0,nodes.length-1);
    SHEET={nodes,sel};
    const atId={'Establo':B_EST,'Cuartel':B_CUA,'Campo de arqueros':B_ARQ,'Monasterio':B_MON,'Taller de asedio':49,'Castillo':B_CAS}[u.at];
    h=heroHtml({img:ICONS[k],color:CLS_COLOR[cls],kicker:'Unidad genérica · '+u.cls,title:u.n,sub:u.en,
      tags:tag('Se hace en',u.at,atId&&bldIcon(atId)?`<img src="${bldIcon(atId)}" alt="" width="28" height="28">`:'',atId?`data-bld="${atId}"`:'')+tag('Desde',u.age,ageDots(AGE_ORDER[u.age]+1),`data-age="${AGE_ORDER[u.age]+1}"`)+`<span class="sh-tag"><span><small>Costo</small><span class="costs">${costChips((SD.units[nodes[0][0]]||{}).cost)}</span></span></span>`})
    +`<p class="sh-lede">${u.why}</p>
    <section class="sh-block"><h3>Línea de mejoras</h3>${lineHtml(nodes,sel)}</section>
    <section class="sh-block"><h3>Estadísticas base <span class="sh-sel" id="shsel">${nodes[sel][1]}</span></h3><div id="shstats">${statsHtml(nodes[sel][0])}</div><p class="fine">Valores base, sin mejoras de herrería ni bonos de civilización.</p></section>
    <section class="sh-block sh-vs"><div><h3 class="good">Le gana a</h3><div class="vs-grid">${vsTiles(u.beats,'good')}${u.vs?`<span class="vs-tile good"><span>${u.vs}</span></span>`:''}</div></div><div><h3 class="bad">Pierde contra</h3><div class="vs-grid">${vsTiles(u.loses,'bad')}</div></div></section>
    <section class="sh-block"><h3>Tecnologías que la mejoran</h3>${techGroupsHtml(TG[cls])}</section>`;
  }else{
    const u=UUINFO[k]||{es:k,en:k,d:'',civs:[]},m=UUMETA[k]||{},cls=UCLS[k],base=k==='Longboat'?'Longship':k;
    const nodes=[[base,u.es]];if(SD.units['Elite '+base])nodes.push(['Elite '+base,u.es+' de élite']);
    SHEET={nodes,sel:0};
    const owners=u.civs.map(n=>civByEs[n]).filter(Boolean);
    const low=x=>x.toLowerCase();
    const uts=owners.flatMap(c=>c.ut.filter(t=>low(t[2]).includes(low(k))||low(t[2]).includes(low(u.es))).map(t=>[c,t]));
    const atFirst=(m.at||'').split(' o ')[0];const atId={'Castillo':B_CAS,'Cuartel':B_CUA,'Campo de arqueros':B_ARQ,'Establo':B_EST,'Muelle':B_MUE,'Monasterio':B_MON,'Taller de asedio':49,'Iglesia fortificada':1806,'Krepost':1251,'Donjon':1665}[atFirst];
    h=heroHtml({img:ICONS[k],color:CLS_COLOR[cls],kicker:'Unidad única · '+(CLSNAME[cls]||''),title:u.es,sub:u.en,
      tags:tag('Se hace en',m.at,atId&&bldIcon(atId)?`<img src="${bldIcon(atId)}" alt="" width="28" height="28">`:'',atId?`data-bld="${atId}"`:'')+tag('Desde',AGE_NAME[m.age],ageDots(m.age),m.age?`data-age="${m.age}"`:'')+`<span class="sh-tag"><span><small>${owners.length>1?'Civilizaciones':'Civilización'}</small><span class="sh-civs">${owners.map(c=>`<a href="#civ-${c.id}" data-act="zoom-close">${shield(c)}${c.es}</a>`).join('')}</span></span></span>`})
    +`<p class="sh-lede">${u.d}</p>
    ${nodes.length>1?`<section class="sh-block"><h3>Versiones</h3>${lineHtml(nodes,0)}</section>`:''}
    <section class="sh-block"><h3>Estadísticas base <span class="sh-sel" id="shsel">${nodes[0][1]}</span></h3><div id="shstats">${statsHtml(nodes[0][0])}</div><p class="fine">Valores base, sin mejoras de herrería ni bonos de civilización.</p></section>
    ${uts.length?`<section class="sh-block"><h3>Tecnologías únicas que la afectan</h3><div class="tg-grid">${uts.map(([c,t])=>`<div class="tc ut">${shield(c)}<div><b>${t[0]}</b><small>${t[2]}</small><span class="tc-age">${t[1]}</span></div></div>`).join('')}</div></section>`:''}
    <section class="sh-block"><h3>Tecnologías generales que la mejoran</h3>${techGroupsHtml(TG[cls])}<p class="fine">Son las mejoras de su tipo de unidad. Algunas civs no tienen todas: confirmalo en el árbol tecnológico del juego.</p></section>`;
  }
  sheetOpen(h,{label:k.startsWith('@')?ub[k.slice(1)].n:(UUINFO[k]||{es:k}).es,fn:()=>zoomOpen(k)});
  const x=UNIT_BY_K[k];if(x&&ST.route==='unidades'){try{history.replaceState(null,'','#unidad-'+x.slug)}catch(e){}}
}
/* Ficha de cualquier unidad por su nombre en inglés (unidades que aparecen en los edificios) */
function unitSheetEn(en,backBld){
  const u=SD.units[en];if(!u)return;
  const b=BLD_BY_ID[backBld];
  SHEET={nodes:[[en,u.es]],sel:0};
  sheetOpen(heroHtml({img:sIcon(en),color:'def',kicker:'Unidad',title:u.es,sub:en,tags:tag('Se hace en',b?b.n:'',b&&bldIcon(b.id)?`<img src="${bldIcon(b.id)}" alt="" width="28" height="28">`:'',b?`data-bld="${b.id}"`:'')+tag('Desde',AGE_BLD[u.age],ageDots(u.age),`data-age="${u.age}"`)})
    +`<section class="sh-block"><h3>Estadísticas base</h3>${statsHtml(en)}<p class="fine">Valores base, sin mejoras de herrería ni bonos de civilización.</p></section>`
    ,{label:u.es,fn:()=>unitSheetEn(en,backBld)});
}
document.addEventListener('click',e=>{
  const n=e.target.closest('.ln-node');if(n){const i=+n.dataset.ln;SHEET.sel=i;$$('.ln-node').forEach(x=>x.setAttribute('aria-selected',+x.dataset.ln===i));const s=$('#shstats');if(s)s.innerHTML=statsHtml(SHEET.nodes[i][0]);const l=$('#shsel');if(l)l.textContent=SHEET.nodes[i][1];return}
  const ue=e.target.closest('[data-unit-en]');if(ue){unitSheetEn(ue.dataset.unitEn,+ue.dataset.from);return}
  const ag=e.target.closest('[data-age]');if(ag){e.preventDefault();ageOpen(ag.dataset.age);return}
  const bk=e.target.closest('[data-sh-back]');if(bk){SHIST.pop();const p=SHIST[SHIST.length-1];if(p){SBACK=true;p.fn()}return}
});
