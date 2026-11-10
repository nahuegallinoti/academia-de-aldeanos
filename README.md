# Academia de Aldeanos

Guía de Age of Empires II: Definitive Edition en español e inglés: fichas de 56 civilizaciones y 103 unidades, aperturas paso a paso con reloj, counters, mapas, lecciones y entrenamiento con revisión de errores.

- Sitio: https://academia-de-aldeanos.vercel.app

## Estructura

- `src/page.html`: estructura, estilos y lógica de la página.
- `src/experience.css` y `src/experience.js`: navegación adaptable, búsqueda global, temas, planificador y mejoras de las secciones.
- `src/i18n.js` y `src/i18n-en.json`: selector de idioma y traducciones locales de la interfaz y de todo el contenido, sin conexiones a servicios de traducción durante el uso.
- `src/data-base.js`: lecciones, aperturas, unidades para counters, mapas, glosario y preguntas.
- `src/civs-*.js`: una ficha por civilización (bonos, únicas, plan por edad, aperturas, mapas, rivales, consejos).
- `build.js`: valida las fichas y la sintaxis del JavaScript ensamblado, y arma la página.

La ruta de aprendizaje tiene su sección **Aprender**. El inicio concentra accesos de consulta. La guía de planes utiliza las fichas locales y funciona en la web pública sin un servicio de IA. Los filtros de counters permiten indicar edad y disponibilidad de oro.

La búsqueda global se abre con **Ctrl/Cmd+K** o **/**. Las aperturas tienen enlaces propios (`#apertura-scouts`), y las fichas de unidades se pueden compartir (`#unidad-knight`). El tema claro, oscuro o automático se conserva en este navegador.

El selector **ES / EN** recuerda el idioma en este navegador. Los enlaces con `?lang=en` o `?lang=es` abren un idioma concreto. Cambiarlo conserva el progreso, los filtros, las fichas abiertas y el reloj. Las búsquedas aceptan ambos idiomas y los enlaces de las fichas conservan sus identificadores.

## Armar

```bash
node build.js
```

Genera `academia-de-aldeanos.html` (versión artifact) y `dist/index.html` (versión Vercel).

## Comprobar

Las pruebas de navegador necesitan Python y Playwright:

```bash
python -m pip install playwright
python -m playwright install chromium
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Con el servidor activo, desde otra terminal:

```bash
python tests/smoke.py
python tests/i18n.py
```

Comprueba navegación, búsquedas con y sin acentos, filtros, fichas, reloj, guía, quiz, guardado local y desbordamientos en 1440, 820, 390 y 320 px. Las capturas quedan en `tests/screenshots/` (ignorado por Git). `TEST_URL` y `TEST_SCREENSHOTS` permiten cambiar la web y la carpeta de capturas.

La prueba de idiomas recorre las 56 civilizaciones, las 103 unidades, todos los edificios, edades y pasos de aperturas en inglés. También comprueba el cambio de idioma con filtros y reloj activos y la conservación del progreso.

Para ampliar las traducciones, editá `src/i18n-en.json`. Las entradas dinámicas usan marcadores como `{0}` y `{1}`; el armado valida que se conserven. `tools/i18n-glossary.json` contiene los nombres del juego y `tools/i18n-overrides.json` conserva revisiones de redacción. El extractor de desarrollo `node tools/extract-i18n.js <ruta-a-acorn>` requiere Acorn y genera `tools/i18n-strings.json` (ignorado). `python tools/translate-i18n.py` permite completar el catálogo durante el desarrollo usando Google Translate y aplica las revisiones; su salida debe revisarse antes de publicar. Estas herramientas no son necesarias para armar ni usar la app.

Para la revisión automática de accesibilidad, instalá `axe-core` en una carpeta de herramientas e indicá la ruta al archivo `axe.min.js` mediante `AXE_CORE`. Luego ejecutá `python tests/a11y.py`. Esta prueba complementa la revisión visual; no sustituye una auditoría manual.

## Publicar manualmente

El proyecto utiliza la rama `master`. El despliegue se hace desde `dist`:

```bash
cd dist && npx vercel@latest deploy --prod
```
