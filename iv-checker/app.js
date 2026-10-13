'use strict';
// Elke slider bevat een geheel aantal IV-punten tussen 0 en 15.
const sliders = ['attack', 'defense', 'hp'].map(id => document.getElementById(id));
function update() {
  const values = sliders.map(slider => Number(slider.value));
  sliders.forEach((slider, i) => {
    document.getElementById(`${slider.id}-value`).textContent = values[i];
    document.getElementById(`${slider.id}-blocks`).querySelectorAll('.iv-block').forEach(block => {
      block.classList.toggle('filled', Number(block.dataset.point) <= values[i]);
    });
    slider.setAttribute('aria-valuetext', `${values[i]} van 15`);
  });
  const total = values.reduce((sum, value) => sum + value, 0);
  const percentage = Math.round(total / 45 * 100);
  document.getElementById('tag').textContent = String(percentage);
  document.getElementById('percentage').textContent = `${percentage}%`;
  document.getElementById('total').textContent = `${total} / 45 punten`;
  document.getElementById('values').textContent = values.join(' · ');
}
sliders.forEach(slider => slider.addEventListener('input', update));
update();
let installPrompt;
const button = document.getElementById('install');
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); installPrompt = event; button.hidden = false;
});
button.addEventListener('click', async () => {
  if (!installPrompt) return;
  button.hidden = true;
  try { await installPrompt.prompt(); await installPrompt.userChoice; }
  finally { installPrompt = undefined; }
});
window.addEventListener('appinstalled', () => { button.hidden = true; });
if ('serviceWorker' in navigator && ['http:', 'https:'].includes(location.protocol)) {
  navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Offline ondersteuning niet beschikbaar.', error));
}
