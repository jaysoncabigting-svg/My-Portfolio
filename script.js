document.addEventListener('DOMContentLoaded', function () {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  function activateTab(tab) {
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.tabIndex = selected ? 0 : -1;
    });

    panels.forEach(p => {
      p.classList.toggle('hidden', p.id !== tab.getAttribute('aria-controls'));
    });

    const activePanel = document.getElementById(tab.getAttribute('aria-controls'));
    if (activePanel) activePanel.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') {
        tabs[(idx + 1) % tabs.length].focus();
      } else if (e.key === 'ArrowLeft') {
        tabs[(idx - 1 + tabs.length) % tabs.length].focus();
      } else if (e.key === 'Home') {
        tabs[0].focus();
      } else if (e.key === 'End') {
        tabs[tabs.length - 1].focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(tab);
      }
    });
  });

  const active = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
  activateTab(active);

  // Get in touch button functionality
  const ctaLink = document.querySelector('.cta a');
  if (ctaLink) {
    ctaLink.addEventListener('click', function (e) {
      e.preventDefault();
      const contactTab = document.getElementById('tab-contact');
      if (contactTab) {
        activateTab(contactTab);
        contactTab.focus();
      }
    });
  }
});