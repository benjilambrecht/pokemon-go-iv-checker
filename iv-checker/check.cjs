const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const nodes = new Map();
const get = id => { if (!nodes.has(id)) nodes.set(id, { id, value: '15', classList: { toggle(name, enabled) { this[name] = enabled; } }, querySelectorAll() { return []; }, style: { setProperty() {} }, setAttribute() {}, addEventListener() {} }); return nodes.get(id); };
const context = { Intl, console, document: { getElementById: get }, window: { addEventListener() {} }, navigator: {}, location: { protocol: 'file:' } };
vm.createContext(context);
vm.runInContext(fs.readFileSync(__dirname + '/app.js', 'utf8'), context);
for (let a = 0; a <= 15; a++) for (let d = 0; d <= 15; d++) for (let h = 0; h <= 15; h++) {
  for (const [id, value] of [['attack', a], ['defense', d], ['hp', h]]) get(id).value = String(value);
  vm.runInContext('update()', context);
  const total = a + d + h;
  assert.equal(get('percentage').textContent, Math.round(total / 45 * 100) + '%');
  const eligible = a <= 5 && d >= 10 && h >= 10;
  assert.equal(get('tag').textContent, eligible ? 'Great League (maximaal 1.500 CP)' : String(Math.round(total / 45 * 100)));
  assert.equal(get('pvp-note').hidden, !eligible);
  assert.equal(get('total').textContent, `${total} / 45 punten`);
  assert.equal(get('values').textContent, `${a} · ${d} · ${h}`);
  assert.equal(get('attack-blocks').classList.perfect, a === 15);
  assert.equal(get('defense-blocks').classList.perfect, d === 15);
  assert.equal(get('hp-blocks').classList.perfect, h === 15);
  assert.equal(get('attack-value').textContent, a);
  assert.equal(get('defense-value').textContent, d);
  assert.equal(get('hp-value').textContent, h);
}
console.log('PASS: alle 4096 IV-combinaties, gehele percentages, tags en weergegeven waarden.');
for (const [total, expected] of [[45,100],[44,98],[43,96],[42,93],[41,91],[40,89],[39,87],[38,84]]) {
 get('attack').value='15';get('defense').value='15';get('hp').value=String(total-30);
 vm.runInContext('update()',context);
 assert.equal(get('percentage').textContent, expected+'%');
 assert.equal(get('tag').textContent, String(expected));
}
console.log('PASS: alle acht opgegeven tabelwaarden voor percentage en tag.');
for (const [a,d,h,eligible] of [[0,15,15,true],[1,15,14,true],[2,14,15,true],[3,15,15,true],[4,13,14,true],[5,12,13,true],[5,10,10,true],[10,15,15,false],[15,15,15,false],[6,15,15,false],[0,9,15,false],[0,15,9,false]]) {
 for(const [id,v] of [['attack',a],['defense',d],['hp',h]])get(id).value=String(v);
 vm.runInContext('update()',context);
 assert.equal(get('tag').textContent,eligible?'Great League (maximaal 1.500 CP)':String(Math.round((a+d+h)/45*100)));
}
console.log('PASS: Great League-voorbeelden en inclusieve grenswaarden.');
const manifest = JSON.parse(fs.readFileSync(__dirname + '/manifest.webmanifest', 'utf8'));
for (const icon of manifest.icons) assert.ok(fs.existsSync(__dirname + '/' + icon.src));
new vm.Script(fs.readFileSync(__dirname + '/sw.js', 'utf8'));
console.log('PASS: manifestassets en serviceworker-syntaxis.');
