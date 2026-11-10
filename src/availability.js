/* Exact access to each version, building and technology; no "common = universal" shortcut. */
const AVAIL=/*@AVAILDATA@*/;
const AVAIL_UNIT_ALIAS={Scout:'Scout Cavalry',Ram:'Battering Ram',Trebuchet:'Trebuchet (Packed)',Longboat:'Longship'};
function accessIds(kind,key){
  const name=kind==='units'?(AVAIL_UNIT_ALIAS[key]||key):String(key);
  return AVAIL[kind]?.[name]??null;
}
const civOwners=(kind,key)=>(accessIds(kind,key)||[]).map(id=>civById[id]).filter(Boolean).sort((a,b)=>displayCompare(a.es,b.es));
function accessSummary(kind,key){
  const ids=accessIds(kind,key);
  return ids===null?'Disponibilidad no documentada':ids.length===CIVS.length?'Todas las civilizaciones':`${ids.length} de ${CIVS.length} civilizaciones`;
}
function ownerLinks(ids){
  return ids.map(id=>civById[id]).filter(Boolean).sort((a,b)=>displayCompare(a.es,b.es)).map(c=>civLink(c,' data-act="zoom-close" data-availability-civ="'+c.id+'"')).join('');
}
function accessDetails(ids,summary){
  return `<details class="availability-details" data-availability-ids="${ids.join(',')}"><summary>${summary}</summary><div class="availability-expanded"></div></details>`;
}
function availabilityHtml(kind,key,{label='',compact=false,scope=null}={}){
  const raw=accessIds(kind,key);
  const total=scope||CIVS.map(c=>c.id);
  const ids=raw===null?null:raw.filter(id=>total.includes(id));
  const count=ids?.length||0;
  const summary=ids===null?'Disponibilidad no documentada':count===CIVS.length?'Todas las civilizaciones':`${count} de ${total.length} civilizaciones`;
  const attributes=`data-availability-kind="${kind}" data-availability-key="${esc(key)}"`;
  if(compact)return `<div class="availability availability-compact" ${attributes}>${count?accessDetails(ids,summary):`<span class="availability-none">${ids===null?summary:'No disponible para esta unidad'}</span>`}</div>`;
  const excluded=ids===null?[]:total.filter(id=>!ids.includes(id));
  return `<section class="availability availability-main" ${attributes}><div class="availability-heading"><h3>Civilizaciones</h3>${label?`<span class="availability-version">${esc(label)}</span>`:''}</div><p class="availability-total">${summary}</p>${count&&count<=8?`<div class="availability-list">${ownerLinks(ids)}</div>`:''}${count>8&&excluded.length&&excluded.length<=6?`<div class="availability-exceptions"><span>No disponible en</span><div class="availability-list">${ownerLinks(excluded)}</div></div>`:''}${count>8?accessDetails(ids,`Ver las ${count} civilizaciones`):''}</section>`;
}
document.addEventListener('toggle',e=>{
  const details=e.target;if(!details.matches?.('.availability-details')||!details.open)return;
  const content=details.querySelector('.availability-expanded');if(content.childNodes.length)return;
  const ids=details.dataset.availabilityIds.split(',').filter(Boolean);
  content.innerHTML=(ids.length>12?'<input class="input availability-search" type="search" placeholder="Buscar civilización" aria-label="Buscar civilización en esta lista">':'')+`<div class="availability-list">${ownerLinks(ids)}</div><p class="fine availability-empty" hidden>No encontramos resultados</p>`;
},true);
document.addEventListener('input',e=>{
  if(!e.target.matches('.availability-search'))return;
  const content=e.target.closest('.availability-expanded'),q=fold(e.target.value.trim());let visible=0;
  content.querySelectorAll('[data-availability-civ]').forEach(link=>{
    const c=civById[link.dataset.availabilityCiv];link.hidden=!searchText(c.es+' '+c.en).includes(q);if(!link.hidden)visible++;
  });
  content.querySelector('.availability-empty').hidden=visible>0;
});
