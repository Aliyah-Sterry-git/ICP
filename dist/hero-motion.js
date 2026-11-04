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
    const sculpture = document.querySelector('.hero-sculpture');
    if (sculpture) groups.push({
      art: sculpture,
      layers: [...sculpture.querySelectorAll('[data-sculpture-letter] .sculpture-sway')],
      separate: true
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
    groups.forEach(({ art, layers, separate }) => {
      art.addEventListener('pointermove', event => {
        if (root.dataset.balloonLetters !== 'true' || event.pointerType === 'touch') return;
        const bounds = art.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
        layers.forEach((layer, index) => {
          const weight = [10, 6, 8][index];
          let letterX = x, letterY = y;
          if (separate) {
            const piece = layer.parentElement.getBoundingClientRect();
            const dx = event.clientX - (piece.left + piece.width / 2);
            const dy = event.clientY - (piece.top + piece.height / 2);
            const radius = bounds.width * .65;
            const influence = Math.max(.15, 1 - Math.hypot(dx, dy) / radius);
            letterX = Math.max(-1, Math.min(1, dx / (bounds.width * .3))) * influence;
            letterY = Math.max(-1, Math.min(1, dy / (bounds.height * .5))) * influence;
          }
          layer.style.setProperty('--balloon-x', `${letterX * weight}px`);
          layer.style.setProperty('--balloon-y', `${letterY * weight * .8}px`);
          layer.style.setProperty('--balloon-rotation', `${letterX * [1.7, -.95, 1.2][index]}deg`);
        });
      });
      art.addEventListener('pointerleave', reset);
      art.addEventListener('pointercancel', reset);
    });
    window.addEventListener('blur', reset);
    document.addEventListener('hero-art-change', reset);
    document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
    reducedMotion.addEventListener('change', sync);
    finePointer.addEventListener('change', sync);
    sync();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
