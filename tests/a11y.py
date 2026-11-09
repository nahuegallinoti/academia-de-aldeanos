"""Comprobación WCAG automática con axe-core en temas claro y oscuro.
AXE_CORE debe apuntar al archivo axe.min.js instalado por separado.
"""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

axe = os.environ.get('AXE_CORE')
if not axe or not Path(axe).is_file():
    raise SystemExit('Indicá AXE_CORE con la ruta a axe-core/axe.min.js.')
base = os.environ.get('TEST_URL', 'http://127.0.0.1:4173')
failures = []
with sync_playwright() as p:
    shell = next((Path.home() / 'AppData/Local/ms-playwright').glob('chromium_headless_shell-*/chrome-headless-shell-win64/chrome-headless-shell.exe'), None)
    browser = p.chromium.launch(executable_path=str(shell) if shell else None)
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    for theme in ['light', 'dark']:
        for route in ['ruta', 'civs', 'civ-franks', 'unidades', 'counters', 'aperturas', 'mapas', 'aprender', 'quiz', 'ayuda']:
            page.goto(base + '/#' + route)
            page.evaluate('(t) => setTheme(t)', theme)
            page.add_script_tag(path=axe)
            violations = page.evaluate('''async () => {
                const r = await axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa']}});
                return r.violations.map(v => ({id:v.id, impact:v.impact, nodes:v.nodes.map(n=>({target:n.target, reason:n.failureSummary}))}));
            }''')
            if violations:
                failures.append({'theme': theme, 'route': route, 'violations': violations})
    browser.close()
if failures:
    print(json.dumps(failures, ensure_ascii=True, indent=2))
    raise SystemExit(1)
print('OK: 20 vistas sin infracciones WCAG detectadas por axe-core, en temas claro y oscuro.')
