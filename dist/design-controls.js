(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('#design-toggle');
  const panel = document.querySelector('#design-panel');
  if (!toggle || !panel) return;
  const archive = panel.querySelector('[data-original-snapshot]');
  const script = document.querySelector('script[src$="design-controls.js"]');
  if (archive && script) archive.href = new URL('balloon-archive.html', script.src).href;
  const radios = [...panel.querySelectorAll('input[name="design-direction"]')];
  function sync() {
    const design = root.dataset.design === 'balloon' ? 'balloon' : 'professional';
    root.dataset.design = design;
    radios.forEach(radio => { radio.checked = radio.value === design; });
    document.querySelector('.library-hero')?.setAttribute('aria-hidden', String(design !== 'professional'));
    document.querySelector('.hero-sculpture')?.setAttribute('aria-hidden', String(design !== 'balloon'));
    document.dispatchEvent(new Event('hero-art-change'));
  }
  function open(value, restoreFocus = false) {
    panel.hidden = !value;
    toggle.setAttribute('aria-expanded', String(value));
    if (value) radios.find(radio => radio.checked)?.focus();
    else if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => open(panel.hidden));
  panel.querySelector('.design-close').addEventListener('click', () => open(false, true));
  radios.forEach(radio => radio.addEventListener('change', () => {
    if (!radio.checked) return;
    root.dataset.design = radio.value;
    try { localStorage.setItem('icp-design-direction', radio.value); } catch {}
    sync();
  }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) open(false, true); });
  document.addEventListener('click', event => { if (!panel.hidden && !event.target.closest('.design-lab')) open(false); });
  window.addEventListener('storage', event => {
    if (event.key !== 'icp-design-direction') return;
    root.dataset.design = event.newValue === 'balloon' ? 'balloon' : 'professional';
    sync();
  });
  sync();
})();
