"""Bilingual user journeys, state preservation and responsive layouts."""
import json
import os
import re
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE=os.environ.get('TEST_URL','http://127.0.0.1:4173')
OUT=Path(__file__).resolve().parent/'screenshots'
OUT.mkdir(exist_ok=True)
errors=[]
with sync_playwright() as p:
    shell=next((Path.home()/'AppData/Local/ms-playwright').glob('chromium_headless_shell-*/chrome-headless-shell-win64/chrome-headless-shell.exe'),None)
    browser=p.chromium.launch(executable_path=str(shell) if shell else None)
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.goto(BASE+'/?lang=en#ruta')
    page.wait_for_load_state('networkidle')
    expect(page.locator('html')).to_have_attribute('lang','en')
    expect(page.locator('#language')).to_have_value('en')
    expect(page.locator('.mobile-nav')).to_contain_text('Home')
    page.screenshot(path=str(OUT/'english-home.png'),full_page=True)

    unknown=set()
    def inspect():
        page.wait_for_timeout(30)
        unknown.update(page.evaluate("""() => {
          const out=[];
          const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
          while(walker.nextNode()){
            const n=walker.currentNode;if(n.parentElement.closest('script,style,[data-no-translate]'))continue;
            const s=textSources.get(n);if(s&&normalizeText(s.source)===normalizeText(s.output)&&/[a-z]/i.test(s.source))out.push(normalizeText(s.source));
          }
          return out;
        }"""))
    def visit(route):
        page.evaluate('(route)=>location.hash=route',route)
        page.wait_for_timeout(60)
        inspect()

    for width in [1440,820,390,320]:
        page.set_viewport_size({'width':width,'height':1000})
        for route in ['ruta','civs','civ-franks','unidades','edificios','aperturas','counters','mapas','quiz','ayuda','aprender']:
            visit(route)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1'),f'Overflow {route} at {width}'
        if width==390:page.screenshot(path=str(OUT/'english-mobile.png'),full_page=True)
    page.set_viewport_size({'width':1440,'height':1000})

    visit('civs')
    page.locator('#civq').fill('cavalry')
    assert page.locator('#cgrid .ccard').count()>0
    page.locator('#language').select_option('es')
    expect(page.locator('#civq')).to_have_value('cavalry')
    expect(page.locator('html')).to_have_attribute('lang','es')
    page.locator('#language').select_option('en')
    expect(page.locator('html')).to_have_attribute('lang','en')

    visit('unidades')
    page.locator('#uat').select_option(label='Stable')
    assert page.evaluate("ST.uat==='Establo'")
    assert page.evaluate("unitsList().every(u=>u.at.includes('Establo'))")
    page.locator('#language').select_option('es')
    expect(page.locator('#uat')).to_have_value('Establo')
    page.locator('#language').select_option('en')
    visit('counters')
    page.locator('#counterage').select_option(label='Castle Age')
    page.locator('#countertrash').check()
    assert page.evaluate("ST.counterAge==='Castillos'&&respond().every(([id])=>!ub[id].cost.includes('oro'))")

    visit('apertura-scouts')
    page.locator('[data-act="next"]').click()
    step=page.evaluate('ST.step')
    page.locator('#clockbtn').click()
    page.locator('#language').select_option('es')
    assert page.evaluate('ST.clock.on')
    page.locator('#language').select_option('en')
    assert page.evaluate('ST.clock.on')
    expect(page.locator('#clock-state')).to_contain_text('Clock')
    page.locator('#clockbtn').click()

    for civ in page.evaluate('CIVS.map(c=>c.id)'):visit('civ-'+civ)
    for opening in page.evaluate('BUILDS.map(b=>b.id)'):
        visit('apertura-'+opening)
        for index in range(page.evaluate('curBuild().steps.length')):
            page.evaluate('(i)=>setStep(i)',index);inspect()
    for unit in page.evaluate('ALLU.map(u=>u.k)'):
        page.evaluate('(key)=>zoomOpen(key)',unit);inspect()
        page.evaluate('zoomClose()')
    for building in page.evaluate('BLD_LIST.map(b=>b.id)'):
        page.evaluate('(id)=>bOpen(id)',building);inspect()
        page.evaluate('zoomClose()')
    for age in range(1,5):
        page.evaluate('(age)=>ageOpen(age)',age);inspect()
        page.evaluate('zoomClose()')
    visit('ayuda')
    page.locator('#guideform button[type="submit"]').click();inspect()
    visit('quiz')
    for i in range(10):
        page.locator('.opt').first.click();inspect()
        page.locator('[data-act="quiz-next"]').click();inspect()
    assert page.evaluate('P.rounds')==1
    page.locator('#language').select_option('es')
    assert page.evaluate('P.rounds')==1
    page.locator('#language').select_option('en')
    page.reload();page.wait_for_load_state('networkidle')
    expect(page.locator('html')).to_have_attribute('lang','en')
    assert page.evaluate('P.rounds')==1
    page.goto(BASE+'/#ruta');page.wait_for_load_state('networkidle')
    expect(page.locator('html')).to_have_attribute('lang','en')
    page.goto(BASE+'/?lang=es#ruta');page.wait_for_load_state('networkidle')
    expect(page.locator('html')).to_have_attribute('lang','es')
    page.locator('#language').select_option('en')
    (OUT/'i18n-untranslated.json').write_text(json.dumps(sorted(unknown),ensure_ascii=False,indent=2),encoding='utf-8')
    untranslated=[s for s in unknown if s!='Academia de Aldeanos' and re.search(r'[áéíóúñ¿¡]|\b(de|la|las|los|el|una|un|con|por|para|aldeanos|mejoras|ataque|vida|buscar)\b',s,re.I)]
    assert not untranslated,untranslated
    page.keyboard.press('Control+k')
    page.locator('#globalq').fill('blacksmith')
    expect(page.locator('.searchresult').first).to_be_visible()
    page.locator('.searchresult[href="#edificio-herreria"]').click()
    expect(page.locator('#zoom')).to_be_visible()
    expect(page.locator('#zoombody')).to_contain_text('Blacksmith')
    page.evaluate('zoomClose()')
    (OUT/'i18n-untranslated.json').write_text(json.dumps(sorted(unknown),ensure_ascii=False,indent=2),encoding='utf-8')
    assert not errors,errors
    blocked=browser.new_context()
    blocked.add_init_script("Object.defineProperty(Storage.prototype,'getItem',{value(){throw new Error('Storage unavailable')}})")
    blocked_page=blocked.new_page()
    blocked_page.goto(BASE+'/?lang=en#ruta')
    expect(blocked_page.locator('html')).to_have_attribute('lang','en')
    blocked.close()
    browser.close()
print('OK: bilingual routes, every civilization, unit, building, build step, age, filters, clock and saved progress.')
