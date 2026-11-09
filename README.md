# Academia de Aldeanos

Guía de estudio de Age of Empires II: Definitive Edition, en español: fichas completas de las 56 civilizaciones, aperturas paso a paso con reloj, counters, mapas, preguntas de entrenamiento y un coach.

- Sitio: https://academia-de-aldeanos.vercel.app

## Estructura

- `src/page.html`: estructura, estilos y lógica de la página.
- `src/data-base.js`: lecciones, aperturas, unidades para counters, mapas, glosario y preguntas.
- `src/civs-*.js`: una ficha por civilización (bonos, únicas, plan por edad, aperturas, mapas, rivales, consejos).
- `build.js`: valida las fichas y arma la página.

## Armar y publicar

```bash
node build.js
```

Genera `academia-de-aldeanos.html` (versión artifact) y `dist/index.html` (versión Vercel).

```bash
cd dist && npx vercel@latest deploy --prod
```
