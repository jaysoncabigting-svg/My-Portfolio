document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  const yearEl = document.getElementById('yr2');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function activate(tab) {
    tabs.forEach(t => {
      const sel = t === tab;
      t.setAttribute('aria-selected', sel ? 'true' : 'false');
      t.tabIndex = sel ? 0 : -1;
    });
    panels.forEach(p => p.classList.toggle('hidden', p.id !== tab.getAttribute('aria-controls')));
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) panel.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') tabs[(i+1)%tabs.length].focus();
      if (e.key === 'ArrowLeft') tabs[(i-1+tabs.length)%tabs.length].focus();
      if (e.key === 'Home') tabs[0].focus();
      if (e.key === 'End') tabs[tabs.length-1].focus();
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(tab); }
    });
  });

  activate(tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0]);

  // Animate skill bars
  const fills = Array.from(document.querySelectorAll('.fill'));
  function animateFills() {
    fills.forEach(f => {
      const val = Number(f.getAttribute('data-fill')) || 0;
      f.style.width = val + '%';
    });
  }
  // animate on load and when scrolled into view
  animateFills();
});