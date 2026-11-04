(() => {
  function init() {
    const controls = [...document.querySelectorAll('[data-hero-effect]')];
    if (!controls.length) return;
    const root = document.documentElement;
    const storageKey = 'icp-hero-motion';
    const effects = { letters: false, paper: false, gradient: false };
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      for (const key of Object.keys(effects)) if (typeof saved?.[key] === 'boolean') effects[key] = saved[key];
    } catch {}
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    const groups = [...document.querySelectorAll('.hero-new-art, .hero-original')].map(art => {
      const source = art.querySelector('.hero-new, .title-letters');
      const layers = ['i', 'c', 'p'].map(letter => {
        const layer = document.createElement('img');
        layer.src = source.getAttribute('src');
        layer.width = source.width;
        layer.height = source.height;
        layer.alt = '';
        layer.setAttribute('aria-hidden', 'true');
        layer.className = `balloon-layer balloon-${letter}`;
        art.append(layer);
        return layer;
      });
      return { art, layers };
    });
    function reset() {
      groups.forEach(({ layers }) => layers.forEach(layer => {
        layer.style.removeProperty('--balloon-x');
        layer.style.removeProperty('--balloon-y');
        layer.style.removeProperty('--balloon-rotation');
      }));
    }
    function sync() {
      root.dataset.balloonLetters = String(effects.letters && !reducedMotion.matches && finePointer.matches);
      root.dataset.paperTilt = String(effects.paper && !reducedMotion.matches);
      root.dataset.gradientDrift = String(effects.gradient && !reducedMotion.matches);
      controls.forEach(control => { control.checked = effects[control.dataset.heroEffect]; });
      reset();
    }
    controls.forEach(control => control.addEventListener('change', () => {
      effects[control.dataset.heroEffect] = control.checked;
      sync();
      try { localStorage.setItem(storageKey, JSON.stringify(effects)); } catch {}
    }));
    groups.forEach(({ art, layers }) => {
      art.addEventListener('pointermove', event => {
        if (root.dataset.balloonLetters !== 'true' || event.pointerType === 'touch') return;
        const bounds = art.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
        layers.forEach((layer, index) => {
          const weight = [7, 4, 5.5][index];
          layer.style.setProperty('--balloon-x', `${x * weight}px`);
          layer.style.setProperty('--balloon-y', `${y * weight * .8}px`);
          layer.style.setProperty('--balloon-rotation', `${x * [1.2, -.65, .85][index]}deg`);
        });
      });
      art.addEventListener('pointerleave', reset);
      art.addEventListener('pointercancel', reset);
    });
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
    reducedMotion.addEventListener('change', sync);
    finePointer.addEventListener('change', sync);
    sync();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
