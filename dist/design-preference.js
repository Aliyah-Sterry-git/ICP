(() => {
  let selected = 'professional';
  try { const saved = localStorage.getItem('icp-design-direction'); if (['balloon','navy'].includes(saved)) selected = saved; } catch {}
  try { const nav = localStorage.getItem('icp-navbar-style'); document.documentElement.dataset.navstyle = ['soft-white','dark-navy'].includes(nav) ? nav : 'original'; } catch {}
  document.documentElement.dataset.design = selected === 'balloon' ? 'balloon' : 'professional';
  document.documentElement.dataset.colorway = selected === 'navy' ? 'navy' : 'original';
})();
