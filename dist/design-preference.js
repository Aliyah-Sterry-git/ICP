(() => {
  let design = 'professional';
  try { const saved = localStorage.getItem('icp-design-direction'); if (saved === 'balloon') design = saved; } catch {}
  document.documentElement.dataset.design = design;
})();
