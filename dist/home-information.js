(() => {
  const hint = document.querySelector('.paper-hint');
  hint?.addEventListener('click', () => {
    const selector = document.documentElement.dataset.design === 'balloon' ? '.sculpture-paper' : '.library-paper';
    document.querySelector(selector)?.click();
  });
})();
