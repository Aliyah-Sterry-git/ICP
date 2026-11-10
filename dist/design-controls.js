(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('#design-toggle');
  const panel = document.querySelector('#design-panel');
  if (!toggle || !panel) return;
  const form = panel.querySelector('.design-pin-form');
  const pin = panel.querySelector('#design-pin');
  const error = panel.querySelector('#design-pin-error');
  const options = panel.querySelector('.design-options');
  let unlocked = false;
  const archive = panel.querySelector('[data-original-snapshot]');
  const script = document.querySelector('script[src$="design-controls.js"]');
  if (archive && script) archive.href = new URL('balloon-archive.html', script.src).href;
  const radios = [...panel.querySelectorAll('input[name="design-direction"]')];
  const navbarRadios = [...panel.querySelectorAll('input[name="navbar-style"]')];
  const syncNavbar = () => navbarRadios.forEach(radio => { radio.checked = radio.value === (root.dataset.navstyle || 'original'); });
  navbarRadios.forEach(radio => radio.addEventListener('change', () => {
    if (!unlocked) { syncNavbar(); return; }
    if (!radio.checked) return;
    root.dataset.navstyle = radio.value;
    try { localStorage.setItem('icp-navbar-style', radio.value); } catch {}
    syncNavbar();
  }));
  function sync() {
    syncNavbar();
    const design = root.dataset.design === 'balloon' ? 'balloon' : 'professional';
    const selected = design === 'balloon' ? 'balloon' : root.dataset.colorway === 'navy' ? 'navy' : 'professional';
    root.dataset.design = design;
    radios.forEach(radio => { radio.checked = radio.value === selected; });
    document.querySelector('.library-hero')?.setAttribute('aria-hidden', String(design !== 'professional'));
    document.querySelector('.hero-sculpture')?.setAttribute('aria-hidden', String(design !== 'balloon'));
    document.dispatchEvent(new Event('hero-art-change'));
  }
  function lock() {
    unlocked = false;
    form.hidden = false;
    options.hidden = true;
    options.inert = true;
    form.reset();
    error.hidden = true;
    pin.removeAttribute('aria-invalid');
  }
  function open(value, restoreFocus = false) {
    panel.hidden = !value;
    toggle.setAttribute('aria-expanded', String(value));
    if (value) {
      if (unlocked) radios.find(radio => radio.checked)?.focus();
      else pin.focus();
    } else {
      lock();
      if (restoreFocus) toggle.focus();
    }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (pin.value !== '4444') {
      error.hidden = false;
      pin.setAttribute('aria-invalid','true');
      pin.focus();
      pin.select();
      return;
    }
    unlocked = true;
    pin.value = '';
    error.hidden = true;
    form.hidden = true;
    options.hidden = false;
    options.inert = false;
    radios.find(radio => radio.checked)?.focus();
  });
  pin.addEventListener('input', () => {
    pin.value = pin.value.replace(/\D/g,'').slice(0,4);
    error.hidden = true;
    pin.removeAttribute('aria-invalid');
  });
  toggle.addEventListener('click', () => open(panel.hidden));
  panel.querySelector('.design-close').addEventListener('click', () => open(false, true));
  radios.forEach(radio => radio.addEventListener('change', () => {
    if (!unlocked) { sync(); return; }
    if (!radio.checked) return;
    root.dataset.design = radio.value === 'balloon' ? 'balloon' : 'professional';
    root.dataset.colorway = radio.value === 'navy' ? 'navy' : 'original';
    try { localStorage.setItem('icp-design-direction', radio.value); } catch {}
    sync();
  }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) open(false, true); });
  document.addEventListener('click', event => { if (!panel.hidden && !event.target.closest('.design-lab')) open(false); });
  window.addEventListener('storage', event => {
    if (event.key === 'icp-navbar-style') { root.dataset.navstyle = ['soft-white','dark-navy'].includes(event.newValue) ? event.newValue : 'original'; syncNavbar(); return; }
    if (event.key !== 'icp-design-direction') return;
    root.dataset.design = event.newValue === 'balloon' ? 'balloon' : 'professional';
    root.dataset.colorway = event.newValue === 'navy' ? 'navy' : 'original';
    sync();
  });
  lock();
  sync();
})();
