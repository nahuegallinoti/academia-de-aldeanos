"""Real civilization restrictions, upgrade changes and compact/expandable availability."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect

ROOT=Path(__file__).resolve().parent.parent
BASE=os.environ.get('TEST_URL','http://127.0.0.1:4173')
OUT=ROOT/'tests/screenshots'
OUT.mkdir(exist_ok=True)
data=json.loads((ROOT/'src/availability.json').read_text(encoding='utf-8'))
assert set(data['units']['Battle Elephant'])=={'bengalis','burmese','dravidians','khmer','malay','vietnamese'}
assert 'dravidians' not in data['units']['Elite Battle Elephant']
assert 'franks' in data['units']['Knight'] and 'aztecs' not in data['units']['Knight']
assert 'franks' not in data['units']['Hussar'] and 'franks' not in data['techs']['Bloodlines']
assert len(data['units']['Spearman'])==56
assert 'armenians' not in data['buildings']['562']

with sync_playwright() as p:
    shell=next((Path.home()/'AppData/Local/ms-playwright').glob('chromium_headless_shell-*/chrome-headless-shell-win64/chrome-headless-shell.exe'),None)
    browser=p.chromium.launch(executable_path=str(shell) if shell else None)
    page=browser.new_page(viewport={'width':1440,'height':1000})
    errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.goto(BASE+'/?lang=es#unidad-eleph')
    page.wait_for_load_state('networkidle')
    panel=page.locator('#unit-availability')
    expect(panel).to_contain_text('6 de 56 civilizaciones')
    expect(panel.locator('[data-availability-civ]')).to_have_count(6)
    expect(panel).to_contain_text('Drávidas')
    page.screenshot(path=str(OUT/'availability-elephant.png'),full_page=True)
    page.locator('.ln-node').nth(1).click()
    expect(panel).to_contain_text('5 de 56 civilizaciones')
    expect(panel).not_to_contain_text('Drávidas')
    # Technologies use the selected version's owners, not the entire world roster.
    bloodlines=page.locator('#shtechs [data-availability-key="Bloodlines"]')
    expected=len(set(data['units']['Elite Battle Elephant'])&set(data['techs']['Bloodlines']))
    expect(bloodlines).to_contain_text(f'{expected} de 5 civilizaciones')
    page.evaluate("setLanguage('en')")
    expect(panel).to_contain_text('5 of 56 civilizations')
    expect(panel).not_to_contain_text('Dravidians')
    page.evaluate('zoomClose()')

    page.evaluate("zoomOpen('@knight')")
    details=panel.locator('.availability-details')
    expect(details.locator('[data-availability-civ]')).to_have_count(0)
    details.locator('summary').focus()
    page.keyboard.press('Enter')
    expect(details.locator('[data-availability-civ]')).to_have_count(len(data['units']['Knight']))
    details.locator('input').fill('francos')
    expect(details.locator('[data-availability-civ]:visible')).to_have_count(1)
    details.locator('input').fill('franks')
    expect(details.locator('[data-availability-civ]:visible')).to_have_count(1)
    details.locator('input').fill('zzz')
    expect(details.locator('.availability-empty')).to_be_visible()
    details.locator('input').fill('')
    page.locator('.ln-node').nth(2).click()
    expect(panel).to_contain_text(f"{len(data['units']['Paladin'])} of 56 civilizations")
    page.screenshot(path=str(OUT/'availability-paladin.png'),full_page=True)
    page.evaluate('zoomClose()')

    page.evaluate('bOpen(562)')
    building=page.locator('[data-availability-kind="buildings"]')
    expect(building).to_contain_text('Not available to')
    expect(building.locator('.availability-exceptions')).to_contain_text('Armenians')
    expect(building.locator('.availability-exceptions')).to_contain_text('Georgians')
    page.screenshot(path=str(OUT/'availability-exceptions.png'),full_page=True)
    building.locator('summary').click()
    expect(building.locator('.availability-expanded [data-availability-civ]')).to_have_count(len(data['buildings']['562']))
    page.evaluate('zoomClose()')
    page.evaluate("zoomOpen('@spear')")
    expect(panel).to_contain_text('All civilizations')
    panel.locator('summary').click()
    expect(panel.locator('[data-availability-civ]')).to_have_count(56)
    panel.locator('[data-availability-civ="franks"]').click()
    expect(page.locator('#zoom')).not_to_be_visible()
    expect(page.locator('#view h1')).to_have_text('Franks')

    # A building's upgrade tile opens that exact version and keeps it on return.
    page.evaluate('bOpen(12)')
    page.locator('#zoombody details.sh-more').evaluate_all('(els)=>els.forEach(el=>el.open=true)')
    page.locator('[data-unit-version="Pikeman"]').click()
    expect(panel).to_contain_text(f"{len(data['units']['Pikeman'])} of 56 civilizations")
    assert page.evaluate("SHEET.nodes[SHEET.sel][0]==='Pikeman'")
    page.locator('.sh-tags [data-bld="12"]').click()
    page.locator('[data-sh-back]').click()
    assert page.evaluate("SHEET.nodes[SHEET.sel][0]==='Pikeman'")
    page.evaluate('zoomClose()')
    page.evaluate("zoomOpen('Longbowman','Elite Longbowman')")
    assert page.evaluate("SHEET.nodes[SHEET.sel][0]==='Elite Longbowman'")
    expect(panel).to_contain_text('Britons')
    page.evaluate('zoomClose()')

    page.evaluate("location.hash='unidades'")
    page.locator('#uciv').select_option('Francos')
    assert page.evaluate("unitsList().some(u=>u.k==='@knight')&&!unitsList().some(u=>u.k==='@eleph')")
    page.locator('#uciv').select_option('Bengalíes')
    assert page.evaluate("unitsList().some(u=>u.k==='@eleph')")
    page.evaluate("location.hash='edificios'")
    page.locator('#bciv').select_option('aztecs')
    expect(page.locator('#blist .bcard[data-bld="101"]')).to_have_count(0)
    page.locator('#bciv').select_option('franks')
    expect(page.locator('#blist .bcard[data-bld="101"]')).to_have_count(1)
    page.evaluate("location.hash='counters'")
    page.locator('#counterciv').select_option('aztecs')
    assert page.evaluate("respond().length>0&&respond().every(([id])=>accessIds('units',ub[id].en).includes('aztecs'))")

    for width in [1440,820,390,320]:
        page.set_viewport_size({'width':width,'height':900})
        for language in ['es','en']:
            page.evaluate('(lang)=>setLanguage(lang)',language)
            for open_sheet in ["zoomOpen('@eleph')","zoomOpen('@knight')","zoomOpen('@spear')",'bOpen(562)','bOpen(101)','bOpen(103)']:
                page.evaluate(open_sheet)
                page.locator('.availability-main summary').evaluate_all('(els)=>els.forEach(el=>el.parentElement.open=true)')
                page.wait_for_timeout(20)
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
                assert page.evaluate("document.querySelector('#zoom').scrollWidth<=document.querySelector('#zoom').clientWidth+2"),(width,language,open_sheet)
                if width==390 and language=='es' and open_sheet=="zoomOpen('@eleph')":page.screenshot(path=str(OUT/'availability-mobile.png'),full_page=True)
                page.evaluate('zoomClose()')
    assert not errors,errors
    browser.close()
print('OK: exact access, upgrades, technology intersections, exceptions, searchable lists, civ filters and mobile layouts in ES/EN.')
