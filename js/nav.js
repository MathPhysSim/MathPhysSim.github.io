/*************************************************************************
 * SOTA Navigation, Theme & Interactive System
 * Simon Hirländer - Smart Analytics & Reinforcement Learning (SARL)
 * Zero dependencies (no jQuery), zero FOUC, fully offline/file:// compatible
 *************************************************************************/

(function () {
  "use strict";

  // 1. Immediate Theme Initialization (Prevents FOUC)
  const savedTheme = localStorage.getItem('sota-theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  // SVG Icons
  const ICONS = {
    sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    moon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    arrowUp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`
  };

  function updateThemeButton(btn, theme) {
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('sota-theme', nextTheme);
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => updateThemeButton(btn, nextTheme));
  }

  window.toggleTheme = toggleTheme;

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Modern Navbar HTML
    const navItems = [
      { href: 'index.html', label: 'Home', match: ['index.html', ''] },
      { href: 'research.html', label: 'Research', match: ['research.html'] },
      { href: 'publications.html', label: 'Publications', match: ['publications.html'] },
      { href: 'team.html', label: 'Team', match: ['team.html'] },
      { href: 'teaching.html', label: 'Teaching', match: ['teaching.html'] },
      { href: 'news.html', label: 'News', match: ['news.html'] },
      { href: 'dossier.html', label: 'Dossier', match: ['dossier.html'] },
      { href: 'https://github.com/MathPhysSim', label: 'GitHub', external: true }
    ];

    const navLinksHtml = navItems.map(item => {
      const isActive = item.match && item.match.includes(currentPath);
      const targetAttr = item.external ? 'target="_blank" rel="noopener noreferrer"' : '';
      return `<li><a href="${item.href}" class="nav-link ${isActive ? 'active' : ''}" ${targetAttr}>${item.label}</a></li>`;
    }).join('');

    const navbarTemplate = `
      <nav class="sota-navbar">
        <div class="sota-navbar-inner">
          <a href="index.html" class="brand-link">
            <img src="img/MyImage.jpg" alt="Simon Hirländer" class="brand-avatar">
            <div>
              Simon Hirländer
              <span class="brand-affiliation">PLUS University &middot; CERN</span>
            </div>
          </a>

          <ul class="nav-menu" id="sota-nav-menu">
            ${navLinksHtml}
          </ul>

          <div class="nav-actions">
            <button class="theme-toggle-btn" id="sota-theme-toggle" aria-label="Toggle theme">
              ${document.documentElement.getAttribute('data-theme') === 'dark' ? ICONS.sun : ICONS.moon}
            </button>
            <button class="mobile-toggle-btn" id="sota-mobile-toggle" aria-label="Toggle menu">
              ${ICONS.menu}
            </button>
          </div>
        </div>
      </nav>
    `;

    // Modern Footer Template
    const footerTemplate = `
      <footer class="sota-footer">
        <div class="page-container">
          <div class="footer-grid">
            <div class="footer-brand">
              <h4>Simon Hirländer</h4>
              <p style="margin-bottom: 0.75rem;">
                Vice Director, IDA Lab &middot; Team Lead, Smart Analytics & Reinforcement Learning (SARL)<br>
                Department of Artificial Intelligence and Human Interfaces<br>
                Paris Lodron University Salzburg &middot; Visiting Scientist, CERN
              </p>
              <div class="social-strip" style="margin-top: 0.75rem;">
                <a href="mailto:simon.hirlaender@plus.ac.at" class="social-chip" title="Email" aria-label="Email"><i class="fas fa-envelope"></i></a>
                <a href="https://github.com/MathPhysSim" target="_blank" rel="noopener noreferrer" class="social-chip" title="GitHub" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="https://scholar.google.com/citations?hl=en&user=sE8Q0TIAAAAJ" target="_blank" rel="noopener noreferrer" class="social-chip" title="Google Scholar" aria-label="Google Scholar"><i class="fas fa-graduation-cap"></i></a>
                <a href="https://www.linkedin.com/in/simon-hirlaender/" target="_blank" rel="noopener noreferrer" class="social-chip" title="LinkedIn" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="https://orcid.org/0000-0002-1284-3338" target="_blank" rel="noopener noreferrer" class="social-chip" title="ORCID" aria-label="ORCID"><i class="fas fa-id-badge"></i></a>
              </div>
            </div>

            <div class="footer-links-col">
              <h5>Navigation</h5>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="research.html">Research Pillars</a></li>
                <li><a href="publications.html">Publications</a></li>
                <li><a href="team.html">Supervised Theses</a></li>
                <li><a href="news.html">News & Talks</a></li>
              </ul>
            </div>

            <div class="footer-links-col">
              <h5>Affiliations</h5>
              <ul>
                <li><a href="https://idalab.at" target="_blank" rel="noopener noreferrer">IDA Lab Salzburg</a></li>
                <li><a href="https://sarl-plus.github.io" target="_blank" rel="noopener noreferrer">SARL Research Group</a></li>
                <li><a href="https://www.plus.ac.at" target="_blank" rel="noopener noreferrer">Paris Lodron University</a></li>
                <li><a href="https://home.cern" target="_blank" rel="noopener noreferrer">CERN Accelerators</a></li>
                <li><a href="https://dih-west.at" target="_blank" rel="noopener noreferrer">DIH West</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <div>&copy; 2026 Simon Hirländer. All rights reserved.</div>
            <div>Built for High-Precision Scientific AI & Control.</div>
          </div>
        </div>
      </footer>
      <button class="back-to-top-btn" id="sota-back-to-top" aria-label="Back to top" title="Back to top">
        ${ICONS.arrowUp}
      </button>
    `;

    // Inject Navbar into .menu-container if present or replace existing
    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer) {
      menuContainer.innerHTML = navbarTemplate;
    } else if (!document.querySelector('.sota-navbar')) {
      document.body.insertAdjacentHTML('afterbegin', navbarTemplate);
    }

    // Inject Footer into .footer-container if present
    const footerContainer = document.querySelector('.footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = footerTemplate;
    } else if (!document.querySelector('.sota-footer')) {
      document.body.insertAdjacentHTML('beforeend', footerTemplate);
    }

    // Bind Theme Button
    const themeBtn = document.getElementById('sota-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Bind Mobile Menu
    const mobileBtn = document.getElementById('sota-mobile-toggle');
    const navMenu = document.getElementById('sota-nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('open');
        mobileBtn.innerHTML = isOpen ? ICONS.close : ICONS.menu;
      });

      // Close menu when clicking link
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          mobileBtn.innerHTML = ICONS.menu;
        });
      });
    }

    // Back to Top functionality
    const backToTop = document.getElementById('sota-back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 350) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 4. Instant Publication Search & Filter Handler
    initPublicationFilters();
  });

  function initPublicationFilters() {
    const searchInput = document.getElementById('pub-search-input');
    const filterPills = document.querySelectorAll('.filter-pill');
    const pubItems = document.querySelectorAll('.publication-item');

    if (!searchInput && filterPills.length === 0) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function filterPublications() {
      pubItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matchesQuery = !searchQuery || text.includes(searchQuery);

        let matchesTopic = true;
        if (activeFilter === 'rl') {
          matchesTopic = text.includes('reinforcement learning') || text.includes('rl') || text.includes('policy');
        } else if (activeFilter === 'accelerators') {
          matchesTopic = text.includes('accelerator') || text.includes('cern') || text.includes('sis18') || text.includes('beam') || text.includes('ipac');
        } else if (activeFilter === 'industrial') {
          matchesTopic = text.includes('industry') || text.includes('energy') || text.includes('dih') || text.includes('danieli') || text.includes('automation');
        } else if (activeFilter === 'medical') {
          matchesTopic = text.includes('critical care') || text.includes('icu') || text.includes('insulin') || text.includes('medicine');
        }

        if (matchesQuery && matchesTopic) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value.trim().toLowerCase();
        filterPublications();
      });
    }

    filterPills.forEach(pill => {
      pill.addEventListener('click', function () {
        filterPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        activeFilter = this.getAttribute('data-filter') || 'all';
        filterPublications();
      });
    });
  }

})();
