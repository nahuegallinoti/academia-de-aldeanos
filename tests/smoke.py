"""Recorridos de usuario. Ejecutar con el servidor de dist en el puerto 4173.
Requiere: pip install playwright; python -m playwright install chromium
"""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('TEST_URL', 'http://127.0.0.1:4173')
OUT = Path(os.environ.get('TEST_SCREENSHOTS', str(Path(__file__).resolve().parent / 'screenshots')))
OUT.mkdir(parents=True, exist_ok=True)
errors = []

with sync_playwright() as p:
    cache = Path.home() / 'AppData/Local/ms-playwright'
    shell = next(cache.glob('chromium_headless_shell-*/chrome-headless-shell-win64/chrome-headless-shell.exe'), None)
    browser = p.chromium.launch(executable_path=str(shell) if shell else None)
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    page.on('pageerror', lambda error: errors.append(str(error)))

    def visit(route):
        page.goto(BASE + '/#' + route)
        page.locator('#view h1, #view h2').first.wait_for()

    visit('ruta')
    page.wait_for_load_state('networkidle')
    expect(page.locator('.task-card')).to_have_count(4)
    page.screenshot(path=str(OUT / 'home-desktop.png'), full_page=True)
    expect(page.locator('.lesson')).to_have_count(0)
    expect(page.locator('#save')).to_have_count(0)
    visit('aprender')
    expect(page.locator('.lesson[open]')).to_have_count(1)
    page.locator('.lesson[open] [data-act="toggle-lesson"]').click()
    page.reload()
    expect(page.locator('.lesson.done')).to_have_count(1)

    visit('civs')
    page.locator('#civq').fill('etiopes')
    expect(page.locator('#cgrid .ccard')).to_have_count(1)
    expect(page.locator('#cgrid')).to_contain_text('Etíopes')
    page.locator('#civq').fill('noexiste')
    expect(page.locator('.empty-state')).to_be_visible()
    page.locator('.empty-state [data-act="creset"]').click()
    expect(page.locator('#cgrid .ccard')).to_have_count(56)
    page.locator('[data-act="view"][data-v="table"]').click()
    page.locator('[data-act="sortcol"][data-v="1"]').click()
    expect(page.locator('#ctable tbody tr')).to_have_count(56)
    visit('civ-franks')
    page.locator('[data-act="main"]').click()
    page.locator('#cmp').select_option('britons')
    expect(page.locator('#rate')).to_contain_text('Britanos')
    page.screenshot(path=str(OUT / 'civ-desktop.png'), full_page=True)

    page.keyboard.press('Control+k')
    expect(page.locator('#finder')).to_be_visible()
    page.locator('#globalq').fill('arquero')
    expect(page.locator('#searchresults')).to_contain_text('Arquero')
    page.locator('#globalq').fill('Exploradores 21')
    page.keyboard.press('Enter')
    expect(page).to_have_url(BASE + '/#apertura-scouts')
    expect(page.locator('#step-progress')).to_contain_text('Paso 1')
    page.locator('[data-act="next"]').click()
    expect(page.locator('#step-progress')).to_contain_text('Paso 2')
    page.locator('#clockbtn').click()
    assert page.evaluate('ST.clock.t') >= 75
    expect(page.locator('#clock-state')).to_contain_text('marcha')
    page.locator('[data-act="next"]').click()
    page.locator('[data-act="follow-clock"]').click()
    page.locator('#clockbtn').click()
    page.locator('#ftime').fill('8:99')
    page.locator('[data-act="ftime"]').click()
    expect(page.locator('#fout')).to_contain_text('Escribilo')
    assert page.evaluate("parseT('8:99')") is None
    page.locator('#ftime').fill('8:10')
    page.locator('[data-act="ftime"]').click()
    expect(page.locator('#fout')).to_contain_text('Nivel')
    page.screenshot(path=str(OUT / 'opening-desktop.png'), full_page=True)

    visit('unidades')
    expect(page.locator('#ulist .unitcard')).to_have_count(103)
    page.locator('#uq').fill('canon')
    assert page.locator('.unitcard').count() >= 2
    page.locator('.unitcard').first.click()
    expect(page.locator('#zoom')).to_be_visible()
    page.keyboard.press('Escape')
    expect(page.locator('#zoom')).not_to_be_visible()
    page.locator('#uq').fill('')
    page.locator('[data-act="ureset"]').click()
    page.locator('#uage').select_option('Feudal')
    assert page.locator('.unitcard').count() > 0

    visit('unidad-knight')
    expect(page.locator('#zoom')).to_be_visible()
    expect(page.locator('#zoombody')).to_contain_text('Caballero')
    page.keyboard.press('Escape')
    visit('ayuda')
    page.locator('#guideciv').select_option('aztecs')
    page.locator('#guidemap').select_option('closed')
    page.locator('#guideform button').click()
    expect(page.locator('#guideresult')).to_contain_text('Aztecas')
    assert 'Fast Castle: Caballeros' not in page.locator('#guideresult').inner_text()
    page.locator('#glossq').fill('boom')
    expect(page.locator('[data-gloss]:visible')).to_have_count(1)
    page.screenshot(path=str(OUT / 'guide-desktop.png'), full_page=True)

    visit('mapas')
    page.locator('[data-act="actual-map"]').nth(1).click()
    expect(page.locator('.map-filter')).to_contain_text('Arena')
    assert page.locator('#cgrid .ccard, #ctable tbody tr').count() > 0
    page.locator('[data-act="clear-map"]').click()
    expect(page.locator('#ctable tbody tr')).to_have_count(56)
    visit('counters')
    page.locator('#counterage').select_option('Feudal')
    page.locator('#countertrash').check()
    assert page.evaluate("respond().every(([id])=>ub[id].age==='Feudal'&&!ub[id].cost.includes('oro'))")
    page.locator('[data-act="enemy-clear"]').click()
    expect(page.locator('#resp')).to_contain_text('Elegí al menos')
    visit('ruta')
    page.keyboard.press('Control+k')
    page.locator('#globalq').fill('boom')
    page.locator('.searchresult[data-term="Boom"]').click()
    expect(page.locator('#glossq')).to_have_value('Boom')
    expect(page.locator('[data-gloss]:visible')).to_have_count(1)
    visit('quiz')
    for i in range(10):
        page.locator('.opt').first.click()
        expect(page.locator('.quiz-feedback')).to_be_visible()
        page.locator('[data-act="quiz-next"]').click()
    expect(page.locator('.quiz-score')).to_be_visible()
    assert page.evaluate('P.rounds') == 1
    page.locator('[data-act="quiz-new"]').click()
    page.keyboard.press('1')
    expect(page.locator('.quiz-feedback')).to_be_visible()

    for width in [1440, 820, 390, 320]:
        page.set_viewport_size({'width': width, 'height': 900})
        for route in ['ruta','civs','civ-franks','unidades','aperturas','counters','mapas','quiz','ayuda','aprender']:
            visit(route)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), f'Overflow: {route} at {width}'
            if width == 390 and route in ['ruta','civs','aperturas','counters','ayuda']:
                page.screenshot(path=str(OUT / (route + '-mobile.png')), full_page=True)
    page.locator('[data-act="menu"]').click()
    expect(page.locator('#nav')).to_be_visible()
    page.locator('#nav a[href="#unidades"]').click()
    expect(page.locator('#nav')).not_to_be_visible()
    page.locator('[data-act="theme"]').click()
    page.reload()
    assert page.evaluate('document.documentElement.dataset.theme') == 'light'
    page.locator('[data-act="theme"]').click()
    assert page.evaluate('document.documentElement.dataset.theme') == 'dark'
    page.set_viewport_size({'width': 1440, 'height': 1000})
    visit('ruta')
    page.screenshot(path=str(OUT / 'home-dark.png'), full_page=True)
    page.set_viewport_size({'width': 320, 'height': 844})
    overflow = page.evaluate('''() => {
        const failures=[]; ST.route='civ';
        for(const c of CIVS){ST.civ=c.id;render();if(document.documentElement.scrollWidth>innerWidth+1)failures.push(c.es)}
        ST.route='unidades';render();
        for(const u of ALLU){zoomOpen(u.k);const d=document.querySelector('#zoom');if(d.scrollWidth>d.clientWidth+2)failures.push(u.n);zoomClose()}
        return failures;
    }''')
    assert not overflow, overflow
    visit('view')
    expect(page.locator('.hero')).to_be_visible()
    visit('civs')
    page.locator('.skip').focus()
    page.keyboard.press('Enter')
    expect(page.locator('#view')).to_be_focused()
    assert page.url.endswith('#civs')
    visit('%E0%A4%A')  # Un fragmento malformado no debe romper la aplicación.
    assert not errors, errors
    print('OK: navegación, búsquedas, filtros, fichas, reloj, guía, quiz y 40 vistas sin desbordamiento ni errores JS.')
    browser.close()
