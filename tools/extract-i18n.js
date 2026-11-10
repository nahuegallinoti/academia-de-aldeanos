// Development helper: node tools/extract-i18n.js <path-to-acorn>
// Collects visible text and accessible labels, including dynamic sentence templates.
const fs = require('fs');
const acorn = require(process.argv[2] || 'acorn');
const page = fs.readFileSync('dist/index.html', 'utf8');
const strings = new Set();
const attrs = /(?:aria-label|title|placeholder|alt)\s*=\s*(["'])([\s\S]*?)\1/g;
function add(text) {
  text = text.replace(/\s+/g, ' ').trim();
  if (!/[a-záéíóúñü]/i.test(text) || text.length < 2 || text.length > 2500 || /data:|https?:|=>|querySelector|var\(--/.test(text)) return;
  strings.add(text);
}
function visible(text) {
  function sentence(value){add(value);if(/\{\d+\}/.test(value))value.split(/\{\d+\}/g).forEach(add)}
  if (/<\/?[a-z][\s\S]*?>/i.test(text)) {
    for (const m of text.matchAll(attrs)) sentence(m[2]);
    text.split(/<[^>]*>/g).forEach(sentence);
  } else sentence(text);
}
function walk(node) {
  if (!node || typeof node !== 'object') return;
  if(node.type==='VariableDeclarator'&&node.id?.name==='I18N_EN')return;
  if (node.type === 'Literal' && typeof node.value === 'string') visible(node.value);
  if (node.type === 'TemplateLiteral') visible(node.quasis.map((q,i) => (q.value.cooked || '') + (i < node.expressions.length ? '{'+i+'}' : '')).join(''));
  for (const [key,value] of Object.entries(node)) {
    if (key === 'quasis') continue;
    if (Array.isArray(value)) value.forEach(walk); else if (value && typeof value === 'object') walk(value);
  }
}
let script=page.match(/<script>([\s\S]*)<\/script>/)[1];
const dataStart=script.indexOf('/* ---------- Datos base ---------- */');
if(dataStart>=0)script=script.slice(dataStart);
walk(acorn.parse(script, {ecmaVersion:'latest'}));
visible(page.replace(/<script>[\s\S]*<\/script>/, '').replace(/<style>[\s\S]*?<\/style>/g, ''));
fs.writeFileSync('tools/i18n-strings.json', JSON.stringify([...strings].sort(), null, 2)+'\n');
console.log(strings.size, 'text entries');
