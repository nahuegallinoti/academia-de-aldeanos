/* Mejoras de consulta y aprendizaje; sin servicios ni dependencias adicionales. */
const fold=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const glyph=(name)=>{
  const paths={home:'M3 10 12 3l9 7M5 9v12h5v-7h4v7h5V9',shield:'M12 3 3 6v6c0 5 9 9 9 9s9-4 9-9V6zM8 12l3 3 5-6',swords:'m3 3 12 12M3 3l1 6 5-5-6-1Zm18 0L9 15m12-12-1 6-5-5 6-1ZM5 15l4 4m6-4 4 4M4 20l3-3m10 0 3 3',clock:'M12 8v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18',book:'M12 6C9 3 4 4 3 5v15c3-2 6-2 9 0 3-2 6-2 9 0V5c-1-1-6-2-9 1Zm0 0v14',target:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 3v2',map:'m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15',arrow:'M5 12h14m-5-5 5 5-5 5',search:'m16 16 5 5M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14',help:'M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3v.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18'};
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(paths[name]||paths.book).split('~').map(d=>`<path d="${d}"/>`).join('')}</svg>`;
};
let toastTimer;
let pendingSearchTarget=null;
/* Un diálogo modal se dibuja por encima de todo: si hay una ficha abierta, el aviso se muestra dentro de ella. */
function toast(message){const el=$('#toast'),dlg=$('#zoom'),host=dlg&&dlg.open?dlg:document.body;if(el.parentElement!==host)host.appendChild(el);el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,3500)}
function setTheme(theme){
  if(theme==='system')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=theme;
  const dark=theme==='dark'||(theme==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);
  document.documentElement.style.colorScheme=dark?'dark':'light';
  const b=$('#themebtn'),label={system:'Automático',light:'Claro',dark:'Oscuro'}[theme];
  b.textContent={system:'◐',light:'☀',dark:'☾'}[theme];b.title=`Tema: ${label}. Cambiar tema`;b.setAttribute('aria-label',`Tema ${label}. Cambiar tema`);
}
let theme='system';try{const value=localStorage.getItem(KEY+'-theme');if(['system','light','dark'].includes(value))theme=value}catch(e){}
setTheme(theme);
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',()=>{if(theme==='system')setTheme(theme)});
NAV[NAV.length-1][1]='Guía y ayuda';
$('.search-open>span:first-child').innerHTML=glyph('search');

function afterRoute(){
  if(ST.route!=='aperturas'&&ST.clock.on){ST.clock.on=false;releaseWake()}
  const label=ST.route==='civ'?civById[ST.civ].es:ST.route==='aperturas'?curBuild().name:NAV.find(n=>n[0]===ST.route)?.[1]||'Inicio';
  document.title=(ST.route==='ruta'?'Aprendé a decidir mejor':label)+' · Academia de Aldeanos';
  $('.top').classList.remove('menu-open');$('.menubtn').setAttribute('aria-expanded','false');
  $('.mobile-nav').innerHTML=[['ruta','Inicio','home'],['civs','Civs','shield'],['counters','Counters','swords'],['aperturas','Aperturas','clock']].map(([id,l,icon])=>`<a href="#${id}"${(ST.route==='civ'?'civs':ST.route)===id?' aria-current="page"':''}>${glyph(icon)}<span>${l}</span></a>`).join('');
  const heading=$('#view h1,#view h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true})}
  if(ST.route==='aprender')$('#view').querySelectorAll('.lesson').forEach((el,i)=>el.id='lesson-'+i);
  if(pendingSearchTarget){const target=pendingSearchTarget;pendingSearchTarget=null;if(target.term&&$('#glossq')){$('#glossq').value=target.term;$('#glossq').dispatchEvent(new Event('input',{bubbles:true}));$('#glossary').scrollIntoView({block:'center'})}if(target.map){const el=$$('[data-map-name]').find(x=>x.dataset.mapName===target.map);el?.scrollIntoView({block:'center'})}}
}

/* Inicio orientado a tareas, con una única recomendación para continuar. */
function vRuta(){
  const mc=civById[P.main];
  const tasks=[['counters','¿Con qué le gano?','Elegí el ejército rival y encontrá una respuesta.','swords'],['aperturas','Quiero una apertura','Un paso a paso al lado de tu partida.','clock'],['civs','Quiero elegir mi civ','Compará estilos, bonos y dificultad.','shield'],['unidades','Busco una unidad','Dónde se entrena y cómo se mejora.','book']];
  const starters=['franks','britons','persians','teutons'].map(id=>civById[id]).filter(Boolean);
  return `<section class="hero"><div><div class="eyebrow">Tu próxima partida empieza acá · AoE II: DE</div><h1>Menos dudas.<br><em>Mejores partidas.</em></h1><p>Elegí tu civilización, aprendé una apertura y descubrí cómo responder al rival. Una guía en español para jugar con un plan.</p><div class="row"><a class="btn acc" href="#aperturas">Practicar una apertura ${glyph('arrow')}</a><button class="btn ghost" data-act="starter">Estoy empezando</button></div><div class="hero-stats"><div><b>${CIVS.length}</b><span>civilizaciones</span></div><div><b>${ALLU.length}</b><span>unidades</span></div><div><b>${BUILDS.length}</b><span>aperturas guiadas</span></div></div></div>
  <aside class="mission" aria-label="Un plan para tu próxima partida"><div class="mission-icon">${glyph('target')}</div><div><div class="eyebrow">Antes de entrar al mapa</div><h3>Una partida. Un plan.</h3><p>Elegí qué vas a practicar y llegá con las primeras decisiones resueltas.</p></div><div class="match-plan"><a href="#civs"><span>01</span><div><b>Tu civilización</b><small>Conocé tus fortalezas.</small></div>${glyph('arrow')}</a><a href="#aperturas"><span>02</span><div><b>Tu apertura</b><small>Sabé qué hacer desde el minuto cero.</small></div>${glyph('arrow')}</a><a href="#counters"><span>03</span><div><b>Tu respuesta al rival</b><small>Adaptá tu ejército a lo que veas.</small></div>${glyph('arrow')}</a></div><a class="text-link" href="#ayuda">Armar mi plan ${glyph('arrow')}</a></aside></section>
  <section class="task-grid" aria-label="¿Qué querés hacer?">${tasks.map(([id,title,desc,icon])=>`<a class="task-card" href="#${id}"><span class="task-icon">${glyph(icon)}</span><span><b>${title}</b><small>${desc}</small></span></a>`).join('')}</section>
  ${mc?`<section class="panel mine">${shield(mc)}<div><div class="eyebrow">Tu civilización principal</div><h3>${mc.es}</h3><p class="count">${mc.win}</p></div><a class="btn ghost" href="#civ-${mc.id}">Volver a mi ficha →</a></section>`:''}
  <section class="stack"><div class="section-head"><div class="head"><div class="eyebrow">Para empezar sin complicarte</div><h2>Una civilización para hacerla tuya</h2></div><a class="text-link" href="#civs">Ver las ${CIVS.length} →</a></div><p class="count">Elegí una, repetí la misma apertura y conocé sus fortalezas antes de cambiar.</p><div class="cgrid">${starters.map(cardHtml).join('')}</div></section>`;
};

/* Filtros recuperables y avisos accesibles al buscar. */
const baseCivs=vCivs;
vCivs=function(){return baseCivs().replace('<div class="stack"><div class="ctl">',`<div class="stack filter-box"><div class="filter-heading"><span class="eyebrow">Encontrá tu estilo</span><span class="filter-hint">Podés combinar especialidades</span></div>${ST.mapFilter?`<div class="map-filter">Recomendadas para ${esc(ST.mapFilter)} <button data-act="clear-map" aria-label="Quitar filtro de mapa">✕</button></div>`:''}<div class="ctl">`).replace('<div class="count" id="civcount"></div>','<div class="row" style="justify-content:space-between"><div class="count" id="civcount" role="status" aria-live="polite"></div><button class="btn ghost" data-act="creset" hidden>Limpiar filtros</button></div>')};
const baseUnits=vUnidades;
vUnidades=function(){return baseUnits().replace('<div class="stack"><div class="ctl">','<div class="stack filter-box"><div class="ctl">').replace('id="ucount"','id="ucount" role="status" aria-live="polite"')};

/* Búsqueda unificada, con enlaces que se pueden compartir. */
const SEARCH_INDEX=[
  ...NAV.map(([id,l])=>({title:l,sub:'Sección de la academia',href:'#'+id,kind:'Sección',icon:glyph('book')})),
  ...CIVS.map(c=>({title:c.es,sub:c.en+' · '+c.st,terms:c.s.map(k=>SPEC[k]).join(' ')+' '+c.uu.flat().join(' '),href:'#civ-'+c.id,kind:'Civilización',icon:shield(c)})),
  ...ALLU.map(u=>({title:u.n,sub:u.en+' · '+u.at,terms:u.civ+' '+u.cls,href:'#unidad-'+u.slug,kind:'Unidad',icon:uimg(u.k,'s')})),
  ...BLD_LIST.map(b=>({title:b.n,sub:b.r,terms:b.en+' '+b.game+' '+b.units.map(u=>u.en+' '+u.es).join(' ')+' '+b.techs.map(t=>t.en+' '+t.es).join(' '),href:'#edificio-'+b.slug,kind:'Edificio',icon:bIcon(b.pic,'s')})),
  ...BUILDS.map(b=>({title:b.name,sub:b.tag,terms:b.en+' '+b.civs,href:'#apertura-'+b.id,kind:'Apertura',icon:glyph('clock')})),
  ...GLOSS.map(([term,meaning])=>({title:term,sub:meaning,href:'#ayuda',kind:'Concepto',icon:glyph('help'),term})),
  ...MAPS.map(m=>({title:m.n,sub:m.t,href:'#mapas',kind:'Mapa',icon:glyph('map'),map:m.n}))
];
SEARCH_INDEX.forEach(x=>{x.search=searchText(x.title+' '+x.sub+' '+(x.terms||''))});
function openSearch(){const d=$('#finder');d.showModal();$('#globalq').value='';paintSearch();$('#globalq').focus()}
function paintSearch(){
  const q=fold($('#globalq').value.trim()),tokens=q.split(/\s+/),defaults=['#civs','#counters','#aperturas','#unidades','#quiz','#ayuda'];
  let results=q?SEARCH_INDEX.filter(x=>tokens.every(t=>x.search.includes(t))).sort((a,b)=>{const score=x=>{const names=[fold(x.title),fold(localized(x.title))];return names.includes(q)?0:names.some(n=>n.startsWith(q))?1:2};return score(a)-score(b)||displayCompare(a.title,b.title)}):SEARCH_INDEX.filter(x=>defaults.includes(x.href)&&x.kind==='Sección');
  $('#searchmeta').textContent=q?`${results.length} resultados · civilizaciones, unidades, aperturas y conceptos`:'Accesos para empezar';
  results=results.slice(0,24);
  $('#searchresults').innerHTML=results.length?results.map(x=>`<a class="searchresult" href="${x.href}" data-search-result${x.term?' data-term="'+esc(x.term)+'"':''}${x.map?' data-map="'+esc(x.map)+'"':''}><span class="task-icon">${x.icon}</span><span><b>${esc(x.title)}</b><small>${esc(x.sub)}</small></span><span>${x.kind}</span></a>`).join(''):'<div class="empty-state"><h3>No encontramos resultados</h3><p>Probá un nombre en español o inglés, por ejemplo: Francos, knight o Fast Castle.</p></div>';
}
$('#globalq').addEventListener('input',paintSearch);
$('#finder').addEventListener('keydown',e=>{
  const links=$$('#searchresults a');if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const i=links.indexOf(document.activeElement),next=e.key==='ArrowDown'?i+1:i-1;links[(next+links.length)%links.length]?.focus()}
  if(e.key==='Enter'&&document.activeElement===$('#globalq')){e.preventDefault();links[0]?.click()}
});

/* Aperturas: lectura manual y reloj se distinguen, sin mover el foco con cada tick. */
const baseAperturas=vAperturas;
vAperturas=function(){return baseAperturas().replace('<div class="panel now" aria-live="polite">','<div class="panel now">').replace('<div class="row"><button class="btn ghost" data-act="prev">','<div class="clock-state" id="clock-state"></div><div class="row"><span class="step-progress" id="step-progress"></span><button class="btn ghost" data-act="prev">').replace('<div class="steps" id="steps">','<div class="step-header" aria-hidden="true"><span>Tiempo</span><span>Pop.</span><span>Acción</span></div><div class="steps" id="steps">').replace('<p id="fout" class="count">','<p id="fout" class="count" role="status">').replace('id="ftime" inputmode="numeric"','id="ftime" inputmode="text" maxlength="6" aria-describedby="fout"')};
const basePaintStep=paintStep;
paintStep=function(){
  basePaintStep();const b=curBuild();if(!$('#clock-state'))return;
  $('#step-progress').textContent=`Paso ${ST.step+1} de ${b.steps.length}`;
  $('[data-act="prev"]').disabled=ST.step===0;$('[data-act="next"]').disabled=ST.step===b.steps.length-1;
  $('#clock-state').innerHTML=ST.clock.on?(ST.clock.follow?'● Reloj en marcha · Los pasos avanzan automáticamente.':'● Reloj en marcha · Estás mirando otro paso. <button data-act="follow-clock">Volver al paso del reloj</button>'):'Reloj pausado · Recorré los pasos o iniciá la práctica.';
};

/* Guía disponible en la web pública: usa las fichas, sin simular respuestas de IA. */
const GUIDE_GOALS=[['opening','Quiero un plan para mi partida'],['rush','Me atacan muy temprano'],['army','No sé con qué responder'],['float','Acumulo recursos sin usarlos'],['gold','Me quedo sin oro'],['finish','No consigo romper su base']];
let guideChoice={civ:civById[P.main]?P.main:'franks',map:'open',goal:'opening'};
let guideShown=false;
vAyuda=function(){return `<section class="head"><div class="eyebrow">Guía y ayuda</div><h2>Entrá a la partida con un plan</h2><p class="lede">Elegí tu civilización y lo que te cuesta. Te orientamos con las fichas y estrategias de la academia.</p></section><div class="bgrid"><section class="panel stack"><div class="head"><h3>¿Qué querés mejorar?</h3><p class="count">Tres elecciones, una recomendación concreta.</p></div><form class="guide-form" id="guideform"><label for="guideciv">Tu civilización<select id="guideciv" class="select">${CIVS.map(c=>`<option value="${c.id}"${guideChoice.civ===c.id?' selected':''}>${c.es}</option>`).join('')}</select></label><label for="guidemap">Tipo de mapa<select id="guidemap" class="select"><option value="open"${guideChoice.map==='open'?' selected':''}>Abierto · Arabia</option><option value="closed"${guideChoice.map==='closed'?' selected':''}>Cerrado · Arena</option><option value="water"${guideChoice.map==='water'?' selected':''}>Agua · Islas</option></select></label><label for="guidegoal">Tu objetivo<select id="guidegoal" class="select">${GUIDE_GOALS.map(([id,label])=>`<option value="${id}"${guideChoice.goal===id?' selected':''}>${label}</option>`).join('')}</select></label><button class="btn acc" type="submit">Armar mi plan ${glyph('arrow')}</button></form><p class="fine">Recomendaciones de la guía. Adaptá el plan a lo que veas en el mapa y en el ejército rival.</p></section><section class="panel guide-result" id="guideresult" aria-live="polite">${guideShown?guideHtml():`<div class="task-icon">${glyph('target')}</div><h3>Un objetivo por partida</h3><p class="count">Aprendés más al practicar una sola cosa. Elegí una apertura, mantené el Centro Urbano trabajando y mirá qué está haciendo tu rival.</p><div class="callout"><b>Si estás empezando</b><span>Probá Francos con Exploradores en Arabia. Repetí la apertura hasta poder seguirla sin mirar.</span></div><a class="text-link" href="#apertura-scouts">Ver Exploradores 21 →</a>`}</section></div><section class="stack"><div class="head"><div class="eyebrow">Problemas frecuentes</div><h2>Qué pasó y qué podés cambiar</h2></div><div class="acc">${PROBLEMS.map(([t,l])=>`<details><summary>${t}</summary><ul>${l.map(x=>`<li>${x}</li>`).join('')}</ul></details>`).join('')}</div></section><section class="stack"><div class="section-head"><h2>El idioma de la partida</h2><span class="count">${GLOSS.length} conceptos</span></div><input class="input" type="search" id="glossq" placeholder="Buscar un concepto: boom, rush, micro…" aria-label="Buscar en el glosario"><dl class="gloss" id="glossary">${GLOSS.map(([a,b])=>`<div data-gloss="${esc(fold(a+' '+b))}"><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl><p id="glossempty" class="count" hidden>No encontramos ese concepto. Probá otra palabra.</p></section><section class="src panel"><h3>Fuentes y criterio de la guía</h3><p>Las fichas reúnen bonos, unidades, planes y consejos de las fuentes indicadas. Las valoraciones son orientativas para aprender y no representan un ranking competitivo. El balance cambia con los parches: confirmá los valores exactos y la disponibilidad de tecnologías en el árbol del juego.</p><ul>${SOURCES.map(([t,u])=>`<li><a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a></li>`).join('')}</ul></section>`};
function guideHtml(){
  const c=civById[guideChoice.civ],map=guideChoice.map,goal=guideChoice.goal;
  let build=c.op.find(o=>buildById[o[0]])?.[0]||'archers';if(map==='closed')build=c.op.find(o=>['fck','boom'].includes(o[0]))?.[0]||build;
  const b=buildById[build],problem={rush:1,army:3,float:2,gold:4,finish:5}[goal];
  const intro=goal==='opening'?c.win:PROBLEMS[problem][0];
  const actions=goal==='opening'?[map==='water'?MAPS[4].plan:`Apertura sugerida: ${b.name}. ${b.when}`,c.ages[1],`Tu composición: ${c.army}`]:PROBLEMS[problem][1];
  return `<div class="row">${shield(c)}<div><div class="eyebrow">Tu plan · ${map==='open'?'Mapa abierto':map==='closed'?'Mapa cerrado':'Agua'}</div><h3>${c.es}</h3></div></div><p>${intro}</p><ol>${actions.map(x=>`<li>${x}</li>`).join('')}</ol><div class="callout"><b>A tener en cuenta</b><span>${goal==='gold'?c.trash:map==='water'?'Las aperturas guiadas de la academia son terrestres. En Islas priorizá muelles y economía de pesca.':b.risk}</span></div><div class="row"><a class="btn ghost" href="#civ-${c.id}">Ver mi civilización</a><a class="btn acc" href="${goal==='army'?'#counters':map==='water'?'#mapas':'#apertura-'+build}">${goal==='army'?'Elegir unidades rivales':map==='water'?'Consultar mapas':'Practicar apertura'}</a></div>`;
}
// Mantiene el acceso desde la ficha de civilización hacia su plan en la guía.
const baseInitCoach=initCoach;
initCoach=function(){if($('#coach'))return baseInitCoach();if(ST.pendingAsk){guideChoice.civ=ST.civ;guideShown=true;ST.pendingAsk=null;$('#guideresult').innerHTML=guideHtml()}};

/* Entrenamiento con explicación inmediata y revisión final de errores. */
const baseNewQuiz=newQuiz;
newQuiz=function(){baseNewQuiz();ST.quiz.answers=[]};
vQuiz=function(){
  if(!ST.quiz)newQuiz();const z=ST.quiz;
  if(z.i>=z.qs.length){
    if(!z.recorded){P.best=Math.max(P.best||0,z.score);P.rounds=(P.rounds||0)+1;z.recorded=true;save()}
    const missed=z.qs.map((q,i)=>({...q,chosen:z.answers[i]})).filter(q=>q.chosen!==q.a);
    return `<section class="head"><div class="eyebrow">Entrenamiento completado</div><h2>${z.score>=8?'Cada vez decidís mejor':'Ya sabés qué practicar'}</h2><p class="lede">Tu mejor resultado: ${P.best} de 10 · ${P.rounds} ${P.rounds===1?'ronda completada':'rondas completadas'}</p></section><section class="panel quiz stack"><div class="quiz-score">${z.score}<span class="count"> / ${z.qs.length}</span></div><p>${missed.length?`${missed.length} ${missed.length===1?'concepto para repasar':'conceptos para repasar'}. Revisá las respuestas y volvé a intentarlo.`:'¡Ronda perfecta! Llevá estos conceptos a tu próxima partida.'}</p><div class="row"><button class="btn acc" data-act="quiz-new">Empezar otra ronda</button><a class="btn ghost" href="#counters">Repasar counters</a></div></section>${missed.length?`<section class="quiz stack"><h3>Lo que conviene repasar</h3>${missed.map(q=>`<div class="review-item"><b>${q.q}</b><span>Elegiste: ${esc(q.chosen||'Sin respuesta')}</span><p>✓ ${q.a}</p><span>${q.x}</span></div>`).join('')}</section>`:''}`;
  }
  const q=z.qs[z.i],right=z.ans===q.a,completed=z.i+(z.ans?1:0);
  return `<section class="head"><div class="eyebrow">Entrená tus decisiones · 10 preguntas</div><h2>¿Qué harías en esta situación?</h2></section><section class="quiz stack"><div class="quiz-progress"><span class="count">Pregunta ${z.i+1} de ${z.qs.length}</span><div class="track" role="progressbar" aria-label="Preguntas completadas" aria-valuemin="0" aria-valuemax="${z.qs.length}" aria-valuenow="${completed}"><i style="width:${completed/z.qs.length*100}%"></i></div><span class="tag">${z.score} ${z.score===1?'acierto':'aciertos'}</span></div><div class="qimg">${q.img||''}<h3 class="qtext">${q.q}</h3></div><div class="opts">${q.opts.map((o,i)=>`<button class="opt ${z.ans?(o===q.a?'right':o===z.ans?'wrong':''):''}" data-act="ans" data-v="${esc(o)}"${z.ans?' disabled':''}><span class="opt-key" aria-hidden="true">${z.ans&&o===q.a?'✓':z.ans&&o===z.ans?'✕':i+1}</span>${o}</button>`).join('')}</div>${z.ans?`<div class="quiz-feedback${right?'':' wrong'}" role="status"><strong>${right?'✓ Correcto':'La respuesta correcta es: '+q.a}</strong><p class="count">${q.x}</p></div><div><button class="btn acc" data-act="quiz-next">${z.i===z.qs.length-1?'Ver mi resultado':'Siguiente pregunta →'}</button></div>`:'<p class="fine">Elegí una respuesta o usá las teclas 1–4.</p>'}</section>`;
};

/* Mapas: mostrarlos todos y filtrar por compatibilidad real, no por especialidad. */
ST.mapFilter='';
const fitsMap=(c,m)=>c.mg.some(g=>m.k.some(k=>fold(g).includes(fold(k)))||(['Arena','Selva Negra'].includes(m.n)&&fold(g).includes('mapas cerrados')));
const baseCivList=civList;
civList=function(){const list=baseCivList();const m=MAPS.find(m=>m.n===ST.mapFilter);return m?list.filter(c=>fitsMap(c,m)):list};
vMapas=function(){return `<section class="head"><div class="eyebrow">${MAPS.length} escenarios para entender el mapa</div><h2>El mapa cambia tu plan</h2><p class="lede">Dónde está la comida, cuánto tarda el rival en llegar y si hay agua deciden cómo abrir. El pool competitivo rota: consultá el actual dentro del juego.</p></section><div class="maps">${MAPS.map((m,i)=>{const cs=CIVS.filter(c=>fitsMap(c,m));const build={Arabia:'scouts',Arena:'fck','Selva Negra':'boom'}[m.n];return `<article class="map" data-map-name="${esc(m.n)}"><div class="map-index">ESCENARIO ${String(i+1).padStart(2,'0')} · ${i===4||i===5?'AGUA Y ECONOMÍA':i===1||i===2?'DESARROLLO Y POSICIÓN':'EXPLORACIÓN Y PRESIÓN'}</div><h3>${m.n}</h3><p class="count">${m.t}</p><p>${m.plan}</p><div><div class="eyebrow" style="margin:8px 0">Civilizaciones recomendadas · ${cs.length}</div><div class="chiplist">${cs.slice(0,7).map(c=>civLink(c)).join('')}</div>${cs.length>7?`<details style="margin-top:8px"><summary class="text-link">Ver ${cs.length-7} más</summary><div class="chiplist" style="margin-top:10px">${cs.slice(7).map(c=>civLink(c)).join('')}</div></details>`:''}</div><div class="row" style="margin-top:auto;padding-top:10px"><button class="btn ghost" data-act="actual-map" data-map="${esc(m.n)}">Comparar civs de este mapa</button>${build?`<a class="text-link" href="#apertura-${build}">Practicar apertura →</a>`:''}</div></article>`}).join('')}</div>`};

/* Captura solo las acciones nuevas; los controles existentes siguen en su sitio. */
document.addEventListener('click',e=>{
  if(e.target.closest('.skip')){e.preventDefault();$('#view').focus();$('#view').scrollIntoView({block:'start'});return}
  const result=e.target.closest('[data-search-result]');
  if(result){
    e.preventDefault();pendingSearchTarget={term:result.dataset.term,map:result.dataset.map};const href=result.getAttribute('href');$('#finder').close();if(location.hash===href)route();else location.hash=href;
    return;
  }
  const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;
  const handled=['search-open','search-close','menu','theme','starter','creset','clear-map','continue-lesson','follow-clock','copy-unit','actual-map','build','openbuild','enemy-clear'];
  if(a==='ans'&&ST.quiz&&!ST.quiz.ans)ST.quiz.answers[ST.quiz.i]=t.dataset.v;
  if(a==='ask-civ'){guideChoice.civ=ST.civ;guideShown=true}
  if(a==='ans')requestAnimationFrame(()=>$('[data-act="quiz-next"]')?.focus({preventScroll:true}));
  if(a==='quiz-next'||a==='quiz-new')requestAnimationFrame(()=>{const h=$('#view h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}});
  if(!handled.includes(a))return;e.preventDefault();e.stopImmediatePropagation();
  if(a==='search-open')openSearch();
  if(a==='search-close')$('#finder').close();
  if(a==='menu'){const open=$('.top').classList.toggle('menu-open');t.setAttribute('aria-expanded',open);t.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')}
  if(a==='theme'){theme=['system','light','dark'][(['system','light','dark'].indexOf(theme)+1)%3];setTheme(theme);try{localStorage.setItem(KEY+'-theme',theme)}catch(err){}toast('Tema '+{system:'automático',light:'claro',dark:'oscuro'}[theme])}
  if(a==='starter'||a==='creset'){Object.assign(ST,{q:'',lvl:a==='starter'?1:0,sort:'name',dir:1,mapFilter:''});ST.filt.clear();if(ST.route==='civs'){render();$('#civq').focus()}else location.hash='civs'}
  if(a==='clear-map'){ST.mapFilter='';render()}
  if(a==='build'||a==='openbuild'){if(ST.build!==t.dataset.id){ST.build=t.dataset.id;ST.step=0;ST.clock.on=false;ST.clock.t=0}if(location.hash==='#apertura-'+ST.build)render();else location.hash='apertura-'+ST.build}
  if(a==='enemy-clear'){ST.enemy.clear();$$('[data-act="enemy"]').forEach(x=>x.setAttribute('aria-pressed','false'));paintResp()}
  if(a==='continue-lesson'){const el=$('#lesson-'+t.dataset.i);el.open=true;el.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});el.querySelector('summary').focus({preventScroll:true})}
  if(a==='follow-clock'){ST.clock.follow=true;const b=curBuild();let i=0;b.steps.forEach((s,j)=>{if(s.t<=ST.clock.t)i=j});setStep(i)}
  if(a==='copy-unit'){const unit=UNIT_BY_K[ST.unit];if(unit){const url=new URL(location.href);url.hash='unidad-'+unit.slug;if(navigator.clipboard)navigator.clipboard.writeText(url.href).then(()=>toast('Enlace de la unidad copiado')).catch(()=>toast('No se pudo copiar el enlace'));else toast('Tu navegador no permite copiar el enlace')}}
  if(a==='actual-map'){Object.assign(ST,{mapFilter:t.dataset.map,q:'',lvl:0,sort:'name',dir:1});ST.filt.clear();location.hash='civs'}
},true);
document.addEventListener('submit',e=>{if(e.target.id==='guideform'){e.preventDefault();guideChoice={civ:$('#guideciv').value,map:$('#guidemap').value,goal:$('#guidegoal').value};guideShown=true;$('#guideresult').innerHTML=guideHtml();if(innerWidth<821)$('#guideresult').scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'})}});
document.addEventListener('input',e=>{if(e.target.id==='glossq'){const q=fold(e.target.value.trim());let shown=0;$$('[data-gloss]').forEach(el=>{el.hidden=!searchText(el.textContent).includes(q);if(!el.hidden)shown++});$('#glossempty').hidden=shown>0}});
document.addEventListener('keydown',e=>{
  const typing=/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||e.target.isContentEditable;
  if(((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k')||(!typing&&e.key==='/')){e.preventDefault();if(!$('#zoom').open)openSearch();return}
  if(typing||$$('dialog[open]').length||e.ctrlKey||e.metaKey||e.altKey)return;
  if(ST.route==='quiz'&&/^[1-4]$/.test(e.key)&&!ST.quiz.ans){e.preventDefault();$$('.opt')[+e.key-1]?.click()}
  if(ST.route==='aperturas'&&e.code==='Space'&&e.target===document.body){e.preventDefault();$('#clockbtn').click()}
});
$('#finder').addEventListener('click',e=>{if(e.target===$('#finder'))$('#finder').close()});
// No disparar los atajos de la página detrás de un diálogo abierto.
document.addEventListener('keydown',e=>{if($$('dialog[open]').length&&['ArrowLeft','ArrowRight'].includes(e.key))e.stopImmediatePropagation()},true);
function releaseWake(){if(wakeLock){wakeLock.release().catch(()=>{});wakeLock=null}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&ST.clock.on)wake()});

/* Counters adaptados a tu edad y tus recursos. */
ST.counterAge='';ST.counterTrash=false;
const baseCounters=vCounters;
vCounters=function(){return baseCounters().replace('<div class="eyebrow">El rival tiene</div>','<div class="row" style="justify-content:space-between"><div class="eyebrow">El rival tiene</div><button class="text-link" style="background:none;border:0;padding:0" data-act="enemy-clear">Quitar selección</button></div>').replace('<div class="eyebrow">Tu mejor respuesta</div>',`<div class="counter-constraints"><label for="counterage">Tu edad<select id="counterage" class="select"><option value="">Cualquier edad</option>${['Feudal','Castillos','Imperial'].map(a=>`<option${ST.counterAge===a?' selected':''}>${a}</option>`).join('')}</select></label><label><input id="countertrash" type="checkbox"${ST.counterTrash?' checked':''}>Solo unidades sin oro</label></div><div class="eyebrow">Opciones para responder</div>`).replace('<div class="resp" id="resp"></div>','<div class="resp" id="resp" aria-live="polite"></div><p class="resp-note">Son respuestas orientativas: importan los números, las mejoras y la composición completa. Confirmá que tu civilización tenga la unidad.</p>')};
respond=function(){
  const scores={};
  [...ST.enemy].forEach(id=>ub[id].loses.forEach((counter,i)=>{const x=scores[counter]||(scores[counter]={p:0,vs:[]});x.p+=Math.max(1,3-i);x.vs.push(ub[id].n)}));
  [...ST.enemy].forEach(id=>(ub[id].beats||[]).forEach(counter=>{if(scores[counter])scores[counter].p-=2}));
  return Object.entries(scores).filter(([id])=>(!ST.counterAge||AGE_ORDER[ub[id].age]<=AGE_ORDER[ST.counterAge])&&(!ST.counterTrash||!fold(ub[id].cost).includes('oro'))).sort((a,b)=>b[1].p-a[1].p).slice(0,3);
};
const basePaintResp=paintResp;
paintResp=function(){basePaintResp();if(ST.enemy.size&&!respond().length)$('#resp').innerHTML='<p class="count">No hay una respuesta directa con estas restricciones. Quitá “sin oro” o cambiá la edad; mientras tanto, protegé tu economía y evitá enfrentamientos desfavorables.</p>';else $$('#resp .rrow').forEach((el,i)=>{const id=respond()[i]?.[0];if(id){const name=el.querySelector('b');name.outerHTML=`<button class="linkbtn" data-act="unit" data-k="@${id}">${ub[id].n}</button>`}})};
document.addEventListener('change',e=>{if(e.target.id==='counterage'){ST.counterAge=e.target.value;paintResp()}if(e.target.id==='countertrash'){ST.counterTrash=e.target.checked;paintResp()}});

function vAprender(){
  const done=LESSONS.filter((_,i)=>P.done[i]).length,next=LESSONS.findIndex((_,i)=>!P.done[i]);
  return `<section class="stack" id="learning"><div class="section-head"><div class="head"><div class="eyebrow">Ruta de aprendizaje · 9 lecciones</div><h2>Un plan, una partida a la vez</h2></div><a class="text-link" href="#quiz">Entrenar conceptos →</a></div><div class="progress"><span class="count">${done} de ${LESSONS.length} lecciones completadas</span><div class="track"><i style="width:${done/LESSONS.length*100}%"></i></div></div><div class="lessons">${LESSONS.map((l,i)=>`<details class="lesson lesson-target${P.done[i]?' done':''}" id="lesson-${i}"${i===next?' open':''}><summary><span class="num">${P.done[i]?'✓':String(i+1).padStart(2,'0')}</span><h3>${l.t}</h3><span class="pill">${P.done[i]?'Completada':'Por aprender'}</span></summary><div class="lbody"><p>${l.why}</p><ul>${l.keys.map(k=>`<li>${k}</li>`).join('')}</ul><div class="drill"><b>Tu práctica</b>${l.drill}</div><div class="drill"><b>Objetivo</b>${l.done}</div><div class="row"><button class="btn" data-act="toggle-lesson" data-i="${i}">${P.done[i]?'Volver a practicar':'Marcar como completada'}</button><a class="btn ghost" href="#${l.link[0]}"${l.link[1].includes('Arqueros')?' data-build="archers"':l.link[1].includes('Fast Castle')?' data-build="fck"':''}>${l.link[1]}</a></div></div></details>`).join('')}</div></section>`;
}
