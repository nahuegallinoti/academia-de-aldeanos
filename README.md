# Academia de Aldeanos

Guía de Age of Empires II: Definitive Edition en español: fichas de 56 civilizaciones y 103 unidades, aperturas paso a paso con reloj, counters, mapas, lecciones y entrenamiento con revisión de errores.

- Sitio: https://academia-de-aldeanos.vercel.app

## Estructura

- `src/page.html`: estructura, estilos y lógica de la página.
- `src/experience.css` y `src/experience.js`: navegación adaptable, búsqueda global, temas, planificador y mejoras de las secciones.
- `src/data-base.js`: lecciones, aperturas, unidades para counters, mapas, glosario y preguntas.
- `src/civs-*.js`: una ficha por civilización (bonos, únicas, plan por edad, aperturas, mapas, rivales, consejos).
- `build.js`: valida las fichas y la sintaxis del JavaScript ensamblado, y arma la página.

La ruta de aprendizaje tiene su sección **Aprender**. El inicio concentra accesos de consulta. La guía de planes utiliza las fichas locales y funciona en la web pública sin un servicio de IA. Los filtros de counters permiten indicar edad y disponibilidad de oro.

La búsqueda global se abre con **Ctrl/Cmd+K** o **/**. Las aperturas tienen enlaces propios (`#apertura-scouts`), y las fichas de unidades se pueden compartir (`#unidad-knight`). El tema claro, oscuro o automático se conserva en este navegador.

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
```

Comprueba navegación, búsquedas con y sin acentos, filtros, fichas, reloj, guía, quiz, guardado local y desbordamientos en 1440, 820, 390 y 320 px. Las capturas quedan en `tests/screenshots/` (ignorado por Git). `TEST_URL` y `TEST_SCREENSHOTS` permiten cambiar la web y la carpeta de capturas.

Para la revisión automática de accesibilidad, instalá `axe-core` en una carpeta de herramientas e indicá la ruta al archivo `axe.min.js` mediante `AXE_CORE`. Luego ejecutá `python tests/a11y.py`. Esta prueba complementa la revisión visual; no sustituye una auditoría manual.

## Publicar manualmente

El proyecto utiliza la rama `master`. El despliegue se hace desde `dist`:

```bash
cd dist && npx vercel@latest deploy --prod
```
