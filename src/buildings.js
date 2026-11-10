/* ---------- Edificios ---------- */
/* Datos: src/buildings.json (generado con tools/gen-buildings.js desde aoe2techtree.net). Íconos: Age of Empires II © Microsoft. */
const BLD=/*@BLDDATA@*/;
const BICON=/*@BLDICONS@*/;
const BCAT=[
  ['eco','Economía',[109,70,68,50,562,584,45,84]],
  ['mil','Militares',[12,87,101,49,82]],
  ['tec','Tecnología y fe',[103,209,104]],
  ['def','Defensas',[598,79,234,235,236,72,792,117,487,155]],
  ['esp','Maravilla',[276]],
  ['civ','De algunas civilizaciones',[2556,1754,1806,1808,1021,1251,1665,1734,1889]]
];
/* Nombre en la app, para qué sirve y un consejo. */
const BDESC={
  109:{n:'Centro Urbano',r:'El corazón de tu economía: entrena aldeanos, recibe todos los recursos, investiga los avances de edad y da 5 de población. Dispara flechas si guarecés aldeanos.',t:'Que nunca pare de producir aldeanos. A partir de Castillos, sumar 2 o 3 Centros Urbanos es la forma clásica de hacer boom.'},
  70:{n:'Casa',r:'Da 5 de población. Es el edificio más barato y el que más se olvida.',t:'Hacé una casa cada vez que estés a 2 o 3 de población del tope. En Feudal, usalas para cerrar huecos de tus murallas.'},
  68:{n:'Molino',r:'Depósito de comida para bayas y granjas. Investiga las mejoras de granja.',t:'Construilo pegado a las bayas en Edad Oscura y rodealo de granjas después.'},
  50:{n:'Granja',r:'Fuente de comida infinita mientras la resembrás. Se construye con madera y la trabaja un aldeano.',t:'Cuando se acaban ovejas, jabalíes y bayas, la transición a granjas define tu Feudal. Pegalas al Centro Urbano o a un molino.'},
  562:{n:'Campamento maderero',r:'Depósito de madera. Investiga las mejoras de los leñadores.',t:'Ponelo junto a un bosque grande y compacto. Movelo cuando los leñadores tengan que caminar mucho.'},
  584:{n:'Campamento minero',r:'Depósito de oro y piedra. Investiga las mejoras de minería.',t:'Uno por cada mina. Protegé a los mineros: son el objetivo favorito de las incursiones.'},
  45:{n:'Muelle',r:'Produce barcos pesqueros, de guerra, de transporte y comerciales. Investiga las mejoras de pesca y de la flota.',t:'En mapas con agua, el control del mar define quién come. Construí más de un muelle temprano.'},
  84:{n:'Mercado',r:'Compra y vende recursos, entrena carretas de comercio e investiga las mejoras de comercio y de oro.',t:'Vender en el mercado es caro: usalo para destrabar una mejora clave. En equipos, el comercio con carretas sostiene el oro de toda la partida.'},
  12:{n:'Cuartel',r:'Entrena la infantería: milicia, lanceros y sus mejoras. Es requisito para avanzar a Feudal.',t:'Construilo durante el avance a Feudal. Si hacés infantería, tené 3 o más para producir sin parar.'},
  87:{n:'Campo de arqueros',r:'Entrena arqueros, hostigadores y arqueros a caballo (y cañones de mano en Imperial).',t:'Para una apertura de arqueros, 2 campos al llegar a Feudal. Dactilera es de las mejores mejoras para arqueros.'},
  101:{n:'Establo',r:'Entrena la caballería: exploradores, caballeros, camellos y sus mejoras.',t:'Pureza de sangre (+20 de vida) es obligatoria si vas a jugar con caballería.'},
  49:{n:'Taller de asedio',r:'Construye arietes, manganas, escorpiones y cañones de bombardeo.',t:'Sin asedio no se cierran partidas: tené al menos un taller desde Castillos.'},
  82:{n:'Castillo',r:'Fortaleza que dispara flechas, da 20 de población y entrena la unidad única de tu civ, trabuquetes y petardos. Investiga las tecnologías únicas.',t:'Un castillo en tu oro o en una posición avanzada controla el mapa. Necesitás 650 de piedra: juntala desde Feudal si lo planeás.'},
  103:{n:'Herrería',r:'Investiga todas las mejoras de ataque y armadura de infantería, arqueros y caballería. Es requisito para avanzar a Castillos.',t:'Priorizá las mejoras de tu unidad principal antes de sumar más unidades.'},
  209:{n:'Universidad',r:'Investiga mejoras de edificios, de asedio, de defensas, de flota y tecnologías como Balística y Química.',t:'Balística y Química son de las primeras que conviene investigar en Castillos e Imperial.'},
  104:{n:'Monasterio',r:'Entrena monjes, que convierten unidades y curan, y es el único lugar donde se guardan reliquias para producir oro.',t:'Mandá monjes a juntar reliquias apenas llegás a Castillos: cada una da oro toda la partida.'},
  598:{n:'Puesto de avanzada',r:'Torre barata que solo da visión. No ataca.',t:'Útil para vigilar caminos de incursión o tu oro lejano.'},
  79:{n:'Torre de vigilancia',r:'Torre defensiva básica que dispara flechas. Guarece aldeanos.',t:'En Feudal, una torre en el oro o la madera del rival (torre adelantada) lo obliga a reaccionar.'},
  234:{n:'Torre de guardia',r:'Mejora de la torre de vigilancia: más vida y ataque. Se investiga en la Universidad.',t:'Investigala si defendés con torres en Castillos.'},
  235:{n:'Fortaleza',r:'Mejora máxima de la torre en Imperial.',t:'Rinde en defensa larga; contra trabuquetes no alcanza sola.'},
  236:{n:'Torre de bombardeo',r:'Torre de pólvora con mucho daño contra unidades y barcos. Requiere Química.',t:'Muy buena para proteger puntos clave en Imperial, pero cara en oro.'},
  72:{n:'Empalizada',r:'Muralla de madera barata. Frena incursiones tempranas.',t:'Cerrá los accesos a tu base en Edad Oscura o Feudal si el rival juega agresivo.'},
  792:{n:'Portón de madera',r:'Puerta para tus empalizadas: deja pasar tus unidades y frena a las rivales.',t:'Ponelo donde pasan tus aldeanos para no bloquearlos.'},
  117:{n:'Muro de piedra',r:'Muralla resistente de piedra.',t:'Doble capa de muralla en puntos de entrada hace muy lentos los ataques melee.'},
  487:{n:'Puerta',r:'Puerta para murallas de piedra.',t:'Revisá que tus unidades salgan y entren sin quedar atrapadas.'},
  155:{n:'Muralla fortificada',r:'Mejora de las murallas de piedra (más vida). Se investiga en la Universidad.',t:'Rinde en mapas cerrados como Arena.'},
  276:{n:'Maravilla',r:'Edificio enorme que da la victoria si resiste un tiempo en pie (según la configuración de la partida).',t:'Rara en ranked 1v1: casi siempre conviene más invertir en ejército.'},
  2556:{n:'Asentamiento',r:'Edificio de algunas civs sudamericanas: según la civ, aloja aldeanos, entrena lanceros u hostigadores o cura unidades.',t:'Revisá la ficha de tu civ: cada una usa el asentamiento distinto.'},
  1754:{n:'Caravasar',r:'Edificio de Imperial que acelera a las carretas de comercio cercanas.',t:'Ponelo sobre tu ruta de comercio.'},
  1806:{n:'Iglesia fortificada',r:'Monasterio defensivo de algunas civs del Cáucaso. Entrena monjes y unidades especiales.',t:'Los Armenios reciben una reliquia gratis con la primera.'},
  1808:{n:'Carro de mulas',r:'Depósito móvil de recursos: funciona como campamento que se mueve con los recolectores.',t:'Llevalo detrás de los leñadores para no construir campamentos nuevos.'},
  1021:{n:'Feitoria',r:'Edificio portugués de Imperial que genera recursos sin aldeanos.',t:'Protegelo: en partidas largas paga sola su inversión.'},
  1251:{n:'Krepost',r:'Mini castillo búlgaro: más barato, dispara flechas y entrena Konniks.',t:'Usalo para producir cerca del frente.'},
  1665:{n:'Donjon',r:'Torre siciliana que reemplaza a las torres comunes y entrena Serjeants.',t:'Sirve para avanzar una posición y producir infantería ahí mismo.'},
  1734:{n:'Folwark',r:'Molino polaco: además de depositar comida, da comida extra por las granjas cercanas.',t:'Construilo rodeado de granjas.'},
  1889:{n:'Pastizal',r:'Reemplaza a las granjas de los Kitán: produce comida a partir de ganado.',t:'Practicá la economía de pastizales contra la IA antes de jugar ranked.'}
};
const RESN={Food:['food','comida'],Wood:['wood','madera'],Gold:['gold','oro'],Stone:['stone','piedra']};
const AGE_BLD={1:'Edad Oscura',2:'Feudal',3:'Castillos',4:'Imperial'};
const BLD_LIST=BCAT.flatMap(([cat,,ids])=>ids.filter(id=>BLD[id]&&BDESC[id]).map(id=>({...BLD[id],...BDESC[id],cat,slug:slugU(BDESC[id].n)})));
const BLD_BY_ID=Object.fromEntries(BLD_LIST.map(b=>[b.id,b]));
const BLD_BY_SLUG=Object.fromEntries(BLD_LIST.map(b=>[b.slug,b]));
/* Unidades genéricas de la app que tienen ficha propia */
const GEN_EN={'Scout Cavalry':'@scout','Knight':'@knight','Crossbowman':'@archer','Skirmisher':'@skirm','Pikeman':'@spear','Man-at-Arms':'@maa','Camel Rider':'@camel','Cavalry Archer':'@ca','Monk':'@monk','Mangonel':'@mangonel','Battering Ram':'@ram','Trebuchet':'@treb','Trebuchet (Packed)':'@treb','Battle Elephant':'@eleph','Eagle Warrior':'@eagle','Hand Cannoneer':'@hc','Bombard Cannon':'@bombard'};
const costHtml=c=>Object.entries(c||{}).filter(([,v])=>v>0).map(([k,v])=>`<span class="cost"><i style="background:var(--${RESN[k][0]})"></i><b>${v}</b> ${RESN[k][1]}</span>`).join('')||'<span class="cost">Sin costo</span>';
const bIcon=(pic,cls='',alt='')=>BICON['b'+pic]?`<img class="ui${cls?' '+cls:''}" src="${BICON['b'+pic]}" alt="${esc(alt)}" width="48" height="48" loading="lazy">`:'';
const civLinks=ids=>ids.map(i=>civById[i]).filter(Boolean).map(c=>civLink(c)).join('');
function vEdificios(){
  return `<section class="head"><div class="eyebrow">${BLD_LIST.length} edificios</div><h2>Edificios</h2><p class="lede">Qué hace cada edificio, cuánto cuesta, desde qué edad está y qué produce o investiga. Tocá uno para ver su ficha completa; desde ahí podés abrir cada unidad.</p></section>
  <div class="stack"><div class="ctl" style="grid-template-columns:minmax(0,1fr) auto"><input class="input search" id="bq" type="search" placeholder="Buscar edificio, unidad o tecnología" value="${esc(ST.bq||'')}" aria-label="Buscar edificio">
  <div class="seg" role="group" aria-label="Vista">${[['cards','Tarjetas'],['table','Tabla']].map(([v,l])=>`<button data-bact="bview" data-v="${v}" aria-pressed="${(ST.bview||'cards')===v}">${l}</button>`).join('')}</div></div>
  <div class="chips" role="group" aria-label="Categoría"><button class="chip" data-bact="bcat" data-v="" aria-pressed="${!ST.bcat}">Todos</button>${BCAT.map(([k,l])=>`<button class="chip" data-bact="bcat" data-v="${k}" aria-pressed="${ST.bcat===k}">${l}</button>`).join('')}</div></div>
  <div id="blist" class="stack"></div>
  <p class="fine">Costos, vida, tiempos y qué produce cada edificio salen de los árboles tecnológicos de aoe2techtree.net, con los nombres oficiales del juego en español latino. Algunas civs tienen descuentos o no tienen todos los edificios.</p>`;
}
function bMatches(b,q){if(!q)return true;const hay=[b.n,b.game,b.en,b.r,...b.units.map(u=>u.es+' '+u.en),...b.techs.map(t=>t.es+' '+t.en)].join(' ').toLowerCase();return hay.includes(q)}
function paintBld(){
  const box=$('#blist');if(!box)return;const q=(ST.bq||'').trim().toLowerCase();
  const list=BLD_LIST.filter(b=>(!ST.bcat||b.cat===ST.bcat)&&bMatches(b,q));
  if(!list.length){box.innerHTML='<div class="panel">Ningún edificio coincide. Probá con otra búsqueda.</div>';return}
  if((ST.bview||'cards')==='table'){
    box.innerHTML=`<div class="scroll panel" style="padding:4px 8px"><table class="utable rtable" id="btable"><thead><tr><th>Edificio</th><th>Edad</th><th>Costo</th><th>Vida</th><th>Construcción</th><th>Produce</th><th>Investiga</th></tr></thead><tbody>${list.map(b=>`<tr><td><span>${bIcon(b.pic,'s',b.n)}<button class="linkbtn" data-bld="${b.id}">${b.n}</button></span></td><td>${AGE_BLD[b.age]||''}</td><td><span class="costs">${costHtml(b.cost)}</span></td><td class="mono">${b.hp||'—'}</td><td class="mono">${b.time?b.time+' s':'—'}</td><td>${b.units.filter(u=>u.all).length||'—'}</td><td>${b.techs.filter(t=>t.all).length||'—'}</td></tr>`).join('')}</tbody></table></div>`;
    if(typeof rz==='function')rz($('#btable'));return;
  }
  box.innerHTML=BCAT.filter(([k])=>!ST.bcat||ST.bcat===k).map(([k,l])=>{const items=list.filter(b=>b.cat===k);if(!items.length)return '';
    return `<section class="stack" style="gap:10px"><h3>${l}</h3><div class="bgrid2">${items.map(b=>`<button class="bcard" data-bld="${b.id}">${bIcon(b.pic,'',b.n)}<span><b>${b.n}</b><small>${AGE_BLD[b.age]||''}${b.game&&b.game.toLowerCase()!==b.n.toLowerCase()?` · En el juego: ${b.game}`:''}</small><span class="costs">${costHtml(b.cost)}</span><small class="what">${b.units.filter(u=>u.all).length?`Produce ${b.units.filter(u=>u.all).length} unidades`:''}${b.units.filter(u=>u.all).length&&b.techs.filter(t=>t.all).length?' · ':''}${b.techs.filter(t=>t.all).length?`Investiga ${b.techs.filter(t=>t.all).length} tecnologías`:''}${b.civs.length?`Solo ${b.civs.length} civs`:''}</small></span></button>`).join('')}</div></section>`}).join('');
}
function unitTile(u,bid){
  const k=ICONS[u.en]?u.en:(GEN_EN[u.en]||null);
  const src=k?(ICONS[k]||''):sIcon(u.en);
  const attrs=k?`data-act="unit" data-k="${esc(k)}"`:`data-unit-en="${esc(u.en)}" data-from="${bid}"`;
  return `<button class="ptile" ${attrs}>${src?`<img src="${src}" alt="" width="48" height="48" loading="lazy">`:'<span class="tc-ph"></span>'}<b>${u.es}</b>${ageDots(u.age)}</button>`;
}
function bOpen(id){
  const b=BLD_BY_ID[id],dlg=$('#zoom');if(!b||!dlg)return;ST.bLast=id;ST.unit=null;
  const gu=b.units.filter(u=>u.all),ou=b.units.filter(u=>!u.all);
  const gt=b.techs.filter(t=>t.all),ot=b.techs.filter(t=>!t.all);
  const techsByAge=ts=>[1,2,3,4].map(a=>{const l=ts.filter(t=>t.age===a);return l.length?`<div class="tg"><button class="tg-head link" data-age="${a}">${ageDots(a)}<b>${AGE_BLD[a]}</b><i class="go" aria-hidden="true">›</i></button><div class="tg-grid">${l.map(t=>techCard(t.en)).join('')}</div></div>`:''}).join('');
  const bars=[['Vida',b.hp,5000,b.hp],['Construcción',b.time,200,b.time?b.time+' s':''],['Guarnición',b.garrison,20,b.garrison||'']].filter(x=>x[1]);
  sheetOpen(heroHtml({img:BICON['b'+b.pic],color:'def',kicker:'Edificio · '+(BCAT.find(c=>c[0]===b.cat)||['',''])[1],title:b.n,sub:`En el juego: ${b.game} · ${b.en}`,
    tags:tag('Desde',AGE_BLD[b.age],ageDots(b.age),`data-age="${b.age}"`)+`<span class="sh-tag"><span><small>Costo</small><span class="costs">${costChips(b.cost)}</span></span></span>`})
  +`<p class="sh-lede">${b.r}</p>
  ${bars.length?`<section class="sh-block"><div class="sh-stats">${bars.map(([l,v,max,txt])=>`<div class="st"><span>${l}</span><div class="bar" aria-hidden="true"><i style="width:${Math.min(100,v/max*100)}%"></i></div><b>${txt}</b></div>`).join('')}</div></section>`:''}
  <div class="callout sh-tip"><b>Consejo</b><span>${b.t}</span></div>
  ${b.civs.length?`<section class="sh-block"><h3>Lo tienen</h3><div class="chiplist">${civLinks(b.civs)}</div></section>`:''}
  ${gu.length?`<section class="sh-block"><h3>Qué produce</h3><div class="ptiles">${gu.map(u=>unitTile(u,b.id)).join('')}</div></section>`:''}
  ${ou.length?`<details class="sh-block sh-more"><summary>Unidades de algunas civs <span>${ou.length}</span></summary><div class="ptiles">${ou.map(u=>unitTile(u,b.id)).join('')}</div></details>`:''}
  ${b.id===82?`<p class="fine">Además, cada civ entrena acá su unidad única e investiga sus dos tecnologías únicas. Miralas en la ficha de tu civ.</p>`:''}
  ${gt.length?`<section class="sh-block"><h3>Qué investiga</h3><div class="tgroups">${techsByAge(gt)}</div></section>`:''}
  ${ot.length?`<details class="sh-block sh-more"><summary>Tecnologías de algunas civs <span>${ot.length}</span></summary><div class="tgroups">${techsByAge(ot)}</div></details>`:''}`,{label:b.n,fn:()=>bOpen(id)});
  if(ST.route==='edificios'){try{history.replaceState(null,'','#edificio-'+b.slug)}catch(e){}}
}
/* La ficha de unidad y la de edificio comparten el diálogo: el botón de copiar enlace sigue a la ficha abierta. */
{const zo=zoomOpen;zoomOpen=function(k){const cb=$('#zoom [data-act="copy-bld"]');if(cb)cb.dataset.act='copy-unit';return zo(k)}}
document.addEventListener('click',e=>{
  const cpy=e.target.closest('[data-act="copy-bld"]');if(cpy){const b=BLD_BY_ID[ST.bLast];if(b){const url=new URL(location.href);url.hash='edificio-'+b.slug;if(navigator.clipboard)navigator.clipboard.writeText(url.href).then(()=>toast('Enlace del edificio copiado')).catch(()=>toast('No se pudo copiar el enlace'));else toast('Tu navegador no permite copiar el enlace')}return}
  const bl=e.target.closest('[data-bld]');if(bl){e.preventDefault();bOpen(+bl.dataset.bld);return}
  const t=e.target.closest('[data-bact]');if(!t)return;
  if(t.dataset.bact==='bcat'){ST.bcat=t.dataset.v;$$('[data-bact="bcat"]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===ST.bcat));paintBld()}
  if(t.dataset.bact==='bview'){ST.bview=t.dataset.v;$$('[data-bact="bview"]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===ST.bview));paintBld()}
});
document.addEventListener('input',e=>{if(e.target.id==='bq'){ST.bq=e.target.value;paintBld()}});
{const d=document.getElementById('zoom');if(d)d.addEventListener('close',()=>{if((location.hash||'').startsWith('#edificio-')){try{history.replaceState(null,'','#edificios')}catch(e){}}})}
