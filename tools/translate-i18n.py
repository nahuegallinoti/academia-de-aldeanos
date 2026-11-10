"""Development-only catalog bootstrap. The shipped app uses the local catalog offline.
Review game terminology in i18n-glossary.json and review translations before release.
"""
import concurrent.futures
import json
from pathlib import Path
import re
import time
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'src/i18n-en.json'
terms = json.loads((ROOT / 'tools/i18n-glossary.json').read_text(encoding='utf-8'))
terms.update({'Centro Urbano':'Town Center', 'Centros Urbanos':'Town Centers', 'CU':'TC',
    'Edad Oscura':'Dark Age', 'Edad Feudal':'Feudal Age', 'Edad de los Castillos':'Castle Age',
    'Edad Imperial':'Imperial Age', 'Castillos':'Castle Age', 'Imperial':'Imperial Age',
    'Hostigadores':'Skirmishers', 'Lanceros':'Spearmen', 'Exploradores':'Scouts',
    'Caballeros':'Knights', 'Arqueros':'Archers', 'Mangana':'Mangonel',
    'Manganas':'Mangonels', 'Telar':'Loom', 'Trabuquetes':'Trebuchets',
    'Hacha de doble filo':'Double-Bit Axe', 'Collar de caballo':'Horse Collar',
    'Carretilla':'Wheelbarrow', 'Academia de Aldeanos':'Academia de Aldeanos',
    'Caballero':'Knight','Caballeros':'Knights','muelles':'docks','muelle':'dock',
    'castillos':'castles','caballeros':'knights','arqueros':'archers','exploradores':'scouts',
    'hostigadores':'skirmishers','lanceros':'spearmen','piqueros':'pikemen'})
terms.update({'campo de arqueros':'Archery Range','campos de arqueros':'Archery Ranges',
    'centro urbano':'Town Center','centros urbanos':'Town Centers','campamento maderero':'Lumber Camp',
    'campamentos madereros':'Lumber Camps','campamento minero':'Mining Camp','taller de asedio':'Siege Workshop'})
term_pattern = re.compile(r'(?<!\w)('+'|'.join(re.escape(k) for k in sorted(terms,key=len,reverse=True))+r')(?!\w)')
imperatives = {
    'Elegí':'Elige','Repetí':'Repite','Conocé':'Conoce','Aprendé':'Aprende','Hacé':'Haz',
    'Tené':'Ten','Mandá':'Envía','Encolá':'Pon en cola','Construí':'Construye','Investigá':'Investiga',
    'Pasá':'Pasa','Llegá':'Llega','Atacá':'Ataca','Definí':'Define','Seguí':'Sigue','Mové':'Mueve',
    'Compará':'Compara','Poné':'Coloca','Tocá':'Pulsa','Guarecé':'Guarece','Anotá':'Anota',
    'Usá':'Usa','Pedí':'Pide','Llevá':'Lleva','Jugá':'Juega','Probá':'Prueba','Mirá':'Mira',
    'Buscá':'Busca','Priorizá':'Prioriza','Protegé':'Protege','Evitá':'Evita','Adaptá':'Adapta',
    'Tomá':'Toma','Dejá':'Deja','Prestá':'Presta','Juntá':'Reúne','Controlá':'Controla',
    'Guardá':'Guarda','Cerrá':'Cierra','Pegale':'Golpea','Corré':'Corre','Volvé':'Vuelve',
    'Mantené':'Mantén','Avanzá':'Avanza','Sacá':'Saca','Rompé':'Rompe','Gastá':'Gasta',
    'Sumá':'Añade','Sabé':'Conoce','Asigná':'Asigna','Apuntá':'Apunta','Empezá':'Empieza'
}
verb_pattern=re.compile(r'\b('+'|'.join(imperatives)+r')\b',re.I)
verb_map={k.lower():v for k,v in imperatives.items()}
strings = json.loads((ROOT / 'tools/i18n-strings.json').read_text(encoding='utf-8'))
catalog = json.loads(OUTPUT.read_text(encoding='utf-8')) if OUTPUT.exists() else {}
strings = [s for s in strings if not re.search(r'^[#.]|[{}];|^\[|^\(|^M\d|^m\d|^--|^\\|^data-|^aria-|^academia-',s)
           and not re.search(r'[;=<>]|\\[dswb]|^image/|^text/',s) or s in terms]
pending = [s for s in strings if s not in catalog]
batches, batch, size = [], [], 0
for s in pending:
    if size+len(s)>2400 and batch:
        batches.append(batch)
        batch,size=[],0
    batch.append(s)
    size+=len(s)+24
if batch: batches.append(batch)

def translate(batch):
    source=[]
    for s in batch:
        s=verb_pattern.sub(lambda m:verb_map[m[0].lower()],s)
        s=term_pattern.sub(lambda m:terms[m[0]],s)
        source.append(re.sub(r'\{(\d+)\}',r'ZXQ\1QXZ',s))
    q='\nZXQSEPARATORQXZ\n'.join(source)
    url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode({'client':'gtx','sl':'es','tl':'en','dt':'t','q':q})
    for attempt in range(4):
        try:
            req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
            data=json.load(urllib.request.urlopen(req,timeout=45))
            result=''.join(x[0] for x in data[0] if x[0])
            parts=re.split(r'\s*ZXQSEPARATORQXZ\s*',result,flags=re.I)
            if len(parts)!=len(batch): raise ValueError('Translation separators changed')
            out={}
            for s,t in zip(batch,parts):
                t=re.sub(r'ZXQ\s*(\d+)\s*QXZ',r'{\1}',t,flags=re.I).strip()
                if sorted(re.findall(r'\{\d+\}',s))!=sorted(re.findall(r'\{\d+\}',t)):
                    raise ValueError('Translation placeholders changed: '+s)
                t=re.sub(r'\blife\b','health',t,flags=re.I)
                t=re.sub(r'\bopenings\b','build orders',t,flags=re.I)
                t=re.sub(r'\bopening\b','build order',t,flags=re.I)
                t=re.sub(r'\bunity\b','unit',t,flags=re.I)
                out[s]=terms.get(s,t)
            return out
        except Exception:
            if attempt==3: raise
            time.sleep(2*(attempt+1))

print(f'{len(pending)} entries in {len(batches)} batches',flush=True)
failures=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    futures=[pool.submit(translate,b) for b in batches]
    for i,f in enumerate(concurrent.futures.as_completed(futures)):
        try: catalog.update(f.result())
        except Exception as e:
            failures.append(str(e))
            print('FAILED',str(e)[:180],flush=True)
        if i%10==0 or i==len(batches)-1:
            content=json.dumps(dict(sorted(catalog.items())),ensure_ascii=False,indent=2)+'\n'
            for attempt in range(5):
                try:
                    temporary=OUTPUT.with_suffix('.tmp')
                    temporary.write_text(content,encoding='utf-8')
                    temporary.replace(OUTPUT)
                    break
                except OSError:
                    if attempt==4: raise
                    time.sleep(1)
        if i%10==0: print(f'{i+1}/{len(batches)} batches, {len(catalog)} entries saved',flush=True)
overrides=json.loads((ROOT/'tools/i18n-overrides.json').read_text(encoding='utf-8'))
catalog.update(overrides)
OUTPUT.write_text(json.dumps(dict(sorted(catalog.items())),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
if failures:raise SystemExit(f'{len(failures)} batches failed; rerun to complete the catalog.')
