(() => {
  const key = 'icp-module-title-style';
  let selected = 'saucer';
  try { const saved = localStorage.getItem(key); if (['saucer', 'cursive'].includes(saved)) selected = saved; } catch {}
  document.documentElement.dataset.titleStyle = selected;
  function init() {
    const toggle = document.querySelector('#dev-toggle');
    const panel = document.querySelector('#dev-panel');
    if (!toggle || !panel) return;
    const radios = [...document.querySelectorAll('input[name="title-design"]')];
    function setOpen(open, restoreFocus = false) {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) panel.querySelector('input:checked').focus();
      else if (restoreFocus) toggle.focus();
    }
    radios.forEach(radio => {
      radio.checked = radio.value === selected;
      radio.addEventListener('change', () => {
        if (!radio.checked) return;
        selected = radio.value;
        document.documentElement.dataset.titleStyle = selected;
        try { localStorage.setItem(key, selected); } catch {}
      });
    });
    toggle.addEventListener('click', () => setOpen(panel.hidden));
    panel.querySelector('.dev-close').addEventListener('click', () => setOpen(false, true));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) setOpen(false, true); });
    document.addEventListener('click', event => { if (!event.target.closest('.design-lab') && !panel.hidden) setOpen(false); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
