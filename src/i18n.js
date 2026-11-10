/* Local, offline translations. Game IDs, saved progress and shareable hashes stay stable.
 * Text nodes are localized at the display boundary so data attributes and option values
 * keep their original meaning. A mutation observer also covers clocks and open sheets.
 */
const I18N_EN=/*@ENGLISH@*/;
const LANGUAGE_KEY='academia-aldeanos-v1-language';
let language='es';
try{language=localStorage.getItem(LANGUAGE_KEY)==='en'?'en':'es'}catch(e){}
const requestedLanguage=new URL(location.href).searchParams.get('lang');
if(['es','en'].includes(requestedLanguage))language=requestedLanguage;
const normalizeText=s=>String(s).replace(/\s+/g,' ').trim();
const reEscape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
// Generic fragments such as "{0} de {1}" must not capture an unrelated sentence.
const translationPatterns=Object.entries(I18N_EN).filter(([s])=>/\{\d+\}/.test(s)&&s.replace(/\{\d+\}/g,'').trim().length>=6&&/[a-záéíóúñ]/i.test(s.replace(/\{\d+\}/g,''))).map(([source,target])=>{
  const slots=[];
  const pattern=source.split(/(\{\d+\})/g).map(part=>/^\{\d+\}$/.test(part)?(slots.push(part),'(.*?)'):reEscape(part)).join('');
  return {source,target,slots,re:new RegExp('^'+pattern+'$'),weight:source.replace(/\{\d+\}/g,'').length};
}).sort((a,b)=>b.weight-a.weight);
const translationWords=Object.keys(I18N_EN).filter(s=>!/[{}<>]/.test(s)&&I18N_EN[s]!==s).sort((a,b)=>b.length-a.length);
const translationRE=new RegExp('(?<![\\p{L}\\p{N}_])(?:'+translationWords.map(reEscape).join('|')+')(?![\\p{L}\\p{N}_])','gu');
const translationCache=new Map();
function english(text,depth=0){
  const source=normalizeText(text);
  if(!source)return String(text);
  let translated=translationCache.get(source);
  if(translated===undefined){
    translated=I18N_EN[source];
    if(translated===undefined&&depth<3){
      for(const pattern of translationPatterns){
        const match=source.match(pattern.re);if(!match)continue;
        const values=Object.fromEntries(pattern.slots.map((key,i)=>[key,english(match[i+1],depth+1)]));
        translated=pattern.target.replace(/\{\d+\}/g,key=>values[key]??key);break;
      }
    }
    if(translated===undefined)translated=source.replace(translationRE,match=>I18N_EN[match]);
    translationCache.set(source,translated);
  }
  return String(text).replace(/\S[\s\S]*\S|\S/,()=>translated);
}
const localized=s=>language==='en'?english(s):s;
const searchText=s=>normalizeText(String(s)+' '+english(s)).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const displayCompare=(a,b)=>localized(a).localeCompare(localized(b),language);
const textSources=new WeakMap(),attributeSources=new WeakMap();
const translatedAttributes=['aria-label','title','placeholder','alt'];
const excluded='script,style,code,pre,textarea,[data-no-translate]';
let languageObserver;
function localizeElement(element){
  if(element.matches(excluded)||element.closest(excluded))return;
  // An implicit option value is its text. Freeze it before translating the label.
  if(element.tagName==='OPTION'&&!element.hasAttribute('value'))element.setAttribute('value',element.value);
  let entries=attributeSources.get(element);if(!entries){entries={};attributeSources.set(element,entries)}
  for(const name of translatedAttributes){
    const current=element.getAttribute(name);if(current===null)continue;
    const previous=entries[name];const source=previous&&current===previous.output?previous.source:current;
    const output=localized(source);entries[name]={source,output};
    if(current!==output)element.setAttribute(name,output);
  }
}
function localizeNode(node){
  if(node.nodeType===Node.TEXT_NODE){
    if(node.parentElement?.closest(excluded))return;
    const current=node.nodeValue,previous=textSources.get(node);
    const source=previous&&current===previous.output?previous.source:current;
    const output=localized(source);textSources.set(node,{source,output});
    if(current!==output)node.nodeValue=output;
  }else if(node.nodeType===Node.ELEMENT_NODE){
    localizeElement(node);
    if(node.matches(excluded))return;
    for(const child of node.childNodes)localizeNode(child);
  }
}
function observeLanguage(){languageObserver.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:translatedAttributes})}
function refreshLanguage(){
  languageObserver?.disconnect();
  document.documentElement.lang=language;
  document.getElementById('language').value=language;
  localizeNode(document.head);localizeNode(document.body);
  const description=document.querySelector('meta[name="description"]');
  if(description)description.content=language==='en'?'Age of Empires II: Definitive Edition study guide with step-by-step build orders, all 56 civilizations, units, counters and maps.':'Guía de estudio de Age of Empires II: Definitive Edition con aperturas paso a paso, fichas completas de las 56 civilizaciones, counters y mapas.';
  observeLanguage();
}
function setLanguage(next){
  if(!['es','en'].includes(next))return;
  language=next;
  try{localStorage.setItem(LANGUAGE_KEY,next)}catch(e){}
  try{const url=new URL(location.href);url.searchParams.set('lang',next);history.replaceState(null,'',url)}catch(e){}
  refreshLanguage();
}
function initLanguage(){
  languageObserver=new MutationObserver(records=>{
    languageObserver.disconnect();
    const roots=new Set();
    for(const record of records){
      if(record.type==='childList')for(const node of record.addedNodes)roots.add(node);
      else roots.add(record.target);
    }
    for(const node of roots)if(node.isConnected)localizeNode(node);
    observeLanguage();
  });
  document.getElementById('language').addEventListener('change',e=>setLanguage(e.target.value));
  refreshLanguage();
}
