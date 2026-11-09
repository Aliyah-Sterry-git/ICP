(() => {
  const art = document.querySelector('.hero-sculpture');
  if (!art) return;
  const root = document.documentElement;
  const layers = [...art.querySelectorAll('[data-sculpture-letter] .sculpture-sway')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  function reset() {
    layers.forEach(layer => {
      layer.style.removeProperty('--balloon-x');
      layer.style.removeProperty('--balloon-y');
      layer.style.removeProperty('--balloon-rotation');
    });
  }
  function sync() {
    root.dataset.balloonLetters = String(root.dataset.design !== 'professional' && !reducedMotion.matches && finePointer.matches);
    reset();
  }
  art.addEventListener('pointermove', event => {
    if (root.dataset.balloonLetters !== 'true' || event.pointerType === 'touch') return;
    const bounds = art.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    layers.forEach((layer, index) => {
      const piece = layer.parentElement.getBoundingClientRect();
      const dx = event.clientX - (piece.left + piece.width / 2);
      const dy = event.clientY - (piece.top + piece.height / 2);
      const influence = Math.max(.15, 1 - Math.hypot(dx, dy) / (bounds.width * .65));
      const x = Math.max(-1, Math.min(1, dx / (bounds.width * .3))) * influence;
      const y = Math.max(-1, Math.min(1, dy / (bounds.height * .5))) * influence;
      const weight = [10, 6, 8][index];
      layer.style.setProperty('--balloon-x', `${x * weight}px`);
      layer.style.setProperty('--balloon-y', `${y * weight * .8}px`);
      layer.style.setProperty('--balloon-rotation', `${x * [1.7, -.95, 1.2][index]}deg`);
    });
  });
  art.addEventListener('pointerleave', reset);
  art.addEventListener('pointercancel', reset);
  window.addEventListener('blur', reset);
  document.addEventListener('hero-art-change', sync);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  reducedMotion.addEventListener('change', sync);
  finePointer.addEventListener('change', sync);
  sync();
})();
