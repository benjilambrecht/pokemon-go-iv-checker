const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const nodes = new Map();
const get = id => { if (!nodes.has(id)) nodes.set(id, { id, value: '15', style: { setProperty() {} }, setAttribute() {}, addEventListener() {} }); return nodes.get(id); };
const context = { Intl, console, document: { getElementById: get }, window: { addEventListener() {} }, navigator: {}, location: { protocol: 'file:' } };
vm.createContext(context);
vm.runInContext(fs.readFileSync(__dirname + '/app.js', 'utf8'), context);
for (let a = 0; a <= 15; a++) for (let d = 0; d <= 15; d++) for (let h = 0; h <= 15; h++) {
  for (const [id, value] of [['attack', a], ['defense', d], ['hp', h]]) get(id).value = String(value);
  vm.runInContext('update()', context);
  const total = a + d + h;
  assert.equal(get('percentage').textContent, new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 1 }).format(total / 45 * 100) + '%');
  assert.equal(get('total').textContent, `${total} / 45 punten`);
  assert.equal(get('values').textContent, `${a} · ${d} · ${h}`);
  assert.equal(get('attack-value').textContent, a);
  assert.equal(get('defense-value').textContent, d);
  assert.equal(get('hp-value').textContent, h);
}
console.log('PASS: alle 4096 IV-combinaties, percentages en weergegeven waarden.');
const manifest = JSON.parse(fs.readFileSync(__dirname + '/manifest.webmanifest', 'utf8'));
for (const icon of manifest.icons) assert.ok(fs.existsSync(__dirname + '/' + icon.src));
new vm.Script(fs.readFileSync(__dirname + '/sw.js', 'utf8'));
console.log('PASS: manifestassets en serviceworker-syntaxis.');
