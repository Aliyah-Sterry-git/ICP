(() => {
  const links = [...document.querySelectorAll('.module-link')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  function reset(link) {
    link.style.removeProperty('--number-sway-x');
    link.style.removeProperty('--number-sway-y');
    link.style.removeProperty('--number-sway-rotation');
  }
  function resetAll() { links.forEach(reset); }
  function sway(event) {
    if (reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
    const link = event.currentTarget;
    const bounds = link.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    link.style.setProperty('--number-sway-x', `${x * 6.5}px`);
    link.style.setProperty('--number-sway-y', `${y * 3 - 2}px`);
    link.style.setProperty('--number-sway-rotation', `${x * .65}deg`);
  }
  links.forEach(link => {
    link.addEventListener('pointerenter', sway);
    link.addEventListener('pointermove', sway);
    link.addEventListener('pointerleave', () => reset(link));
    link.addEventListener('pointercancel', () => reset(link));
  });
  window.addEventListener('blur', resetAll);
  document.addEventListener('visibilitychange', () => { if (document.hidden) resetAll(); });
  reducedMotion.addEventListener('change', resetAll);
  finePointer.addEventListener('change', resetAll);
})();
