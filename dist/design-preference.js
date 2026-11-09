(() => {
  let selected = 'professional';
  try { const saved = localStorage.getItem('icp-design-direction'); if (['balloon','navy'].includes(saved)) selected = saved; } catch {}
  document.documentElement.dataset.design = selected === 'balloon' ? 'balloon' : 'professional';
  document.documentElement.dataset.colorway = selected === 'navy' ? 'navy' : 'original';
})();
