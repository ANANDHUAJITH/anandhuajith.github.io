/* =====================================================================
   main.js — renders both pages from window.SITE (see site-data.js).
   You normally never need to edit this file.
   ===================================================================== */
(() => {
  'use strict';
  const S = window.SITE;
  if (!S) { console.error('site-data.js failed to load'); return; }

  const PAGE = document.body.dataset.page || 'home';      // "home" | "showcase"
  const $ = (sel, root = document) => root.querySelector(sel);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- tiny DOM helper ---------- */
  function el(tag, attrs = {}, kids = []) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v === true ? '' : v);
    }
    [].concat(kids).forEach(c => c != null && n.append(c.nodeType ? c : document.createTextNode(c)));
    return n;
  }
  const isWeb = (u) => /^https?:\/\//i.test(u);
  const extAttrs = (u) => (isWeb(u) ? { target: '_blank', rel: 'noopener noreferrer' } : {});

  /* ---------- icons ---------- */
  const ICON = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.7H4.98V9.2h2.95v9.5ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19.02 18.7h-2.94v-4.62c0-1.1-.02-2.52-1.54-2.52-1.55 0-1.79 1.2-1.79 2.44v4.7H9.8V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.8-1.53 2.99 0 3.55 1.97 3.55 4.53v5.2Z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    linux: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4c-5 0-7 4-7 9v7c-3 2-6 5-6 9 0 4 5 6 13 6s13-2 13-6c0-4-3-7-6-9v-7c0-5-2-9-7-9Z"/><path d="M13 17c-3 1-5 4-4 7 2 2 5 1 7-1m11-6c3 1 5 4 4 7-2 2-5 1-7-1M16 12h.1M24 12h.1M16 27c2 2 6 2 8 0"/><path d="M17 31c2 1 4 1 6 0"/></svg>',
    vscode: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.3 1.5 7.2 11.1 2.8 7.7 1 8.6v6.8l1.8.9 4.4-3.4 10.1 9.6 5.2-2.1V3.6l-5.2-2.1ZM17 6v12l-6.5-6L17 6ZM3.8 10.2l2.2 1.8-2.2 1.8v-3.6Z"/></svg>',
    arduino: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.7"><circle cx="20" cy="20" r="16"/><path d="M4 20h32M13 14v12m-4-8h8m10-4v12m-4-8h8"/></svg>',
    python: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9 2c-5 0-4.7 2.2-4.7 2.2v2.3h4.8v.7H5.3S2 6.8 2 12s2.9 5 2.9 5h1.7v-2.4s-.1-2.9 2.9-2.9h5s2.8 0 2.8-2.8V4.7S17.7 2 11.9 2Zm-2.6 2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM12.1 22c5 0 4.7-2.2 4.7-2.2v-2.3H12v-.7h6.7s3.3.4 3.3-4.8-2.9-5-2.9-5h-1.7v2.4s.1 2.9-2.9 2.9h-5s-2.8 0-2.8 2.8v4.2S6.3 22 12.1 22Zm2.6-2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z"/></svg>',
    sun: '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/></svg>',
    moon: '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  };
  const ico = (name) => ICON[name] || '';

  /* ---------- theme ---------- */
  const root = document.documentElement;
  const themeMeta = $('meta[name="theme-color"]');
  function applyTheme(t) {
    root.dataset.theme = t;
    if (themeMeta) themeMeta.content = t === 'dark' ? '#0e0e10' : '#ffffff';
    const btn = $('#themeToggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(t === 'dark'));
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.title = btn.getAttribute('aria-label');
    }
  }
  function currentTheme() { return root.dataset.theme === 'dark' ? 'dark' : 'light'; }

  /* ---------- header ---------- */
  function renderHeader() {
    document.title = PAGE === 'showcase' ? `${S.showcase.kicker} — ${S.name}` : S.pageTitle;

    // nav
    const nav = $('#nav');
    S.nav.forEach(item => {
      let href = item.href, active = false;
      if (PAGE === 'showcase' && !item.external) {
        if (href === '#projects') { href = 'projects.html#project-showcase'; active = true; }
        else if (href === '#home') href = 'index.html';
        else if (href.startsWith('#')) href = 'index.html' + href;
      } else if (PAGE === 'home' && item.href === '#home') active = true;
      const a = el('a', {
        href,
        class: [active ? 'active' : '', item.logo ? 'nav-ketchup' : ''].join(' ').trim(),
        ...(item.external ? (item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : { rel: 'noopener' }) : {}),
        ...(item.logo ? { 'aria-label': `${item.label} (opens ${item.label} website)` } : {}),
      });
      if (item.logo) a.append(el('img', { src: item.logo, alt: '', width: 19, height: 19 }));
      a.append(item.label);
      nav.append(a);
    });

    // socials + theme toggle
    const tools = $('#headerTools');
    const c = S.contact;
    [['github', 'GitHub', c.github], ['linkedin', 'LinkedIn', c.linkedin],
     ['email', 'Email', c.email && `mailto:${c.email}`],
     ['phone', 'Phone', c.phone && `tel:${c.phone.replace(/[^\d+]/g, '')}`]]
      .filter(x => x[2])
      .forEach(([icon, label, url]) =>
        tools.append(el('a', { class: 'social', href: url, 'aria-label': label, title: label, ...extAttrs(url), html: ico(icon) })));
    const toggle = el('button', { class: 'theme-toggle', id: 'themeToggle', type: 'button', html: ico('sun') + ico('moon') });
    toggle.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: fine */ }
    });
    tools.append(toggle);
    applyTheme(currentTheme());
  }

  /* ---------- projects ---------- */
  function projectCard(p) {
    const live = !!p.url;
    const card = el(live ? 'a' : 'div', {
      class: 'content-glass project-card project-link' + (live ? '' : ' is-soon'),
      ...(live ? { href: p.url, ...extAttrs(p.url), 'aria-label': `Open ${p.title} project` } : {}),
      'data-category': p.category || '',
    });
    if (live) card.append(el('span', { class: 'project-open', 'aria-hidden': 'true', text: '↗' }));
    if (p.logo) {
      card.append(el('div', { class: 'project-head' }, [el('img', { src: p.logo, alt: '' }), el('h3', { text: p.title })]));
    } else {
      card.append(el('h3', { text: p.title }));
    }
    card.append(el('p', { text: p.desc }));
    card.append(el('div', { class: 'project-tags', text: (p.tags || []).join(' · ') }));
    card.append(el('div', { class: 'project-cta' }, [live ? 'OPEN PROJECT' : 'COMING SOON', el('span', { 'aria-hidden': 'true', text: live ? '↗' : '' })]));
    return card;
  }

  function renderHomeProjects() {
    const grid = $('#projectGrid');
    S.projects.filter(p => p.featured).forEach(p => grid.append(projectCard(p)));
    const m = S.seeMore;
    grid.append(el('a', { class: 'see-more-card', href: m.href, 'aria-label': m.title }, [
      el('span', { class: 'plus', 'aria-hidden': 'true', text: '+' }),
      el('h3', { text: m.title }),
      el('p', { text: m.desc }),
    ]));
  }

  function renderShowcase() {
    const sc = S.showcase;
    $('#scKicker').textContent = sc.kicker;
    $('#scTitle').textContent = sc.title;
    $('#scCopy').textContent = sc.copy;

    // featured banner (Ketchup OS)
    const b = sc.banner;
    if (b) {
      const box = $('#featureBanner');
      box.append(
        el('div', { class: 'logo-box' }, [
          el('img', { class: 'logo-light', src: b.logoLight, alt: `${b.title} logo` }),
          el('img', { class: 'logo-dark', src: b.logoDark, alt: `${b.title} logo` }),
        ]),
        el('div', {}, [el('h2', { text: b.title }), el('p', { text: b.desc })]),
        el('a', { class: 'btn primary', href: b.url, rel: 'noopener', html: `${b.label} <span aria-hidden="true">→</span>` })
      );
    } else $('#featureBanner').remove();

    const grid = $('#projectGrid');
    S.projects.forEach(p => grid.append(projectCard(p)));
    const cards = [...grid.children];
    const count = $('#resultCount');
    const empty = $('#emptyNote');

    const cats = S.projectCategories.filter(c => S.projects.some(p => p.category === c));
    const bar = $('#filters');
    let active = 'All';
    const apply = () => {
      let shown = 0;
      cards.forEach(card => {
        const ok = active === 'All' || card.dataset.category === active;
        card.hidden = !ok;
        if (ok) shown++;
      });
      count.textContent = `Showing ${shown} of ${cards.length} projects`;
      empty.hidden = shown !== 0;
      bar.querySelectorAll('.filter').forEach(f => f.setAttribute('aria-pressed', String(f.dataset.cat === active)));
    };
    ['All', ...cats].forEach(cat => {
      const btn = el('button', { class: 'filter', type: 'button', 'data-cat': cat, 'aria-pressed': 'false', text: cat });
      btn.addEventListener('click', () => { active = cat; apply(); });
      bar.append(btn);
    });
    apply();
  }

  /* ---------- home sections ---------- */
  function renderHome() {
    const H = S.hero;

    // typing line: static, screen-reader friendly + animated word
    const tag = $('#tagline');
    tag.append(el('span', { class: 'sr-only', text: [...H.typingPrefix, ...H.typingWords].join(', ') }));
    const vis = el('span', { 'aria-hidden': 'true' });
    H.typingPrefix.forEach(w => { vis.append(w, el('span', { class: 'dot', text: '•' })); });
    const word = el('span', { class: 'typing-word', text: H.typingWords[0] });
    vis.append(word, el('span', { class: 'type-caret', text: '▍' }));
    tag.append(vis);
    startTyping(word, H.typingWords);

    $('#statement').innerHTML = H.statementHtml;
    const actions = $('#actions');
    H.buttons.forEach(b => actions.append(el('a', {
      class: `btn ${b.style}`, href: b.href, ...extAttrs(b.href),
      html: b.arrow ? `${b.label} <span aria-hidden="true">→</span>` : b.label })));
    $('#statusCard').append(el('span', { class: 'status-dot' }), el('span', { text: H.statusCard }));
    $('#signature').textContent = H.signature;
    $('#brandName').textContent = S.name;
    const tb = $('#toolbox');
    H.toolbox.forEach(t => tb.append(el('a', { href: t.url, 'aria-label': t.label, title: t.label, ...extAttrs(t.url), html: ico(t.icon) })));

    renderHomeProjects();

    // about
    const A = S.about;
    $('#aboutKicker').textContent = A.kicker;
    $('#aboutTitle').innerHTML = A.titleHtml;
    $('#aboutCopy').innerHTML = A.copyHtml;
    const L = A.leadership, lp = $('#leadership');
    lp.append(el('div', { class: 'section-kicker', text: L.kicker }), el('h3', { text: L.title }),
      ...L.paragraphs.map(t => el('p', { text: t })));

    // skills
    $('#skillsKicker').textContent = S.skills.kicker;
    $('#skillsTitle').textContent = S.skills.title;
    const sg = $('#skillGrid');
    S.skills.items.forEach(t => sg.append(el('div', { class: 'content-glass skill-item', text: t })));

    // hardware
    $('#hwKicker').textContent = S.hardware.kicker;
    $('#hwTitle').textContent = S.hardware.title;
    const hg = $('#hwGroups');
    S.hardware.groups.forEach(g => {
      const row = el('div', { class: 'chip-row' });
      g.items.forEach(i => row.append(el('span', { class: 'chip' }, [i.name, i.note ? el('small', { text: i.note }) : null])));
      hg.append(el('div', { class: 'hw-group' }, [el('h3', { text: g.name }), row]));
    });

    // contact
    const C = S.contactSection, c = S.contact;
    $('#contactKicker').textContent = C.kicker;
    $('#contactTitle').textContent = C.title;
    $('#contactCopy').textContent = C.copy;
    const links = $('#contactLinks');
    if (c.email) links.append(el('a', { class: 'btn primary', href: `mailto:${c.email}`, html: `${C.buttonLabel} <span aria-hidden="true">→</span>` }));
    const list = el('div', { class: 'contact-list' });
    [['email', c.email, c.email && `mailto:${c.email}`], ['phone', c.phone, c.phone && `tel:${(c.phone || '').replace(/[^\d+]/g, '')}`],
     ['linkedin', 'LinkedIn', c.linkedin], ['github', 'GitHub', c.github]]
      .filter(x => x[2])
      .forEach(([icon, label, url]) => list.append(el('a', { href: url, ...extAttrs(url), html: ico(icon) }, [label])));
    links.append(list);
  }

  /* ---------- typing animation (fixed: every letter now renders) ---------- */
  function startTyping(node, words) {
    if (reduceMotion || words.length < 2) return;
    let w = 0, n = words[0].length, deleting = true;
    const step = () => {
      const full = words[w];
      if (deleting) {
        n--;
        node.textContent = full.slice(0, n);
        if (n <= 0) { deleting = false; w = (w + 1) % words.length; return setTimeout(step, 320); }
        return setTimeout(step, 55);
      }
      n++;
      const next = words[w];
      node.textContent = next.slice(0, n);
      if (n >= next.length) { deleting = true; return setTimeout(step, 1500); }   // pause on the COMPLETE word
      return setTimeout(step, 95);
    };
    setTimeout(step, 1500);
  }

  /* ---------- portrait parallax + scroll-spy (home only) ---------- */
  function homeEffects() {
    const stage = $('#portraitStage'), portrait = $('#portrait');
    if (!reduceMotion && stage && portrait) {
      stage.addEventListener('pointermove', (e) => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        portrait.style.setProperty('--portrait-x', `${x * -12}px`);
        portrait.style.setProperty('--portrait-y', `${y * -10}px`);
        stage.style.setProperty('--glow-x', `${x * 18}px`);
        stage.style.setProperty('--glow-y', `${y * 14}px`);
      });
      stage.addEventListener('pointerleave', () => {
        ['--portrait-x', '--portrait-y'].forEach(k => portrait.style.setProperty(k, '0px'));
        ['--glow-x', '--glow-y'].forEach(k => stage.style.setProperty(k, '0px'));
      });
      window.addEventListener('scroll', () => {
        portrait.style.setProperty('--portrait-y', `${Math.min(window.scrollY, 400) * .06}px`);
      }, { passive: true });
    }

    const links = [...document.querySelectorAll('.nav a')].filter(a => a.getAttribute('href').startsWith('#'));
    const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-25% 0px -60% 0px' });
    targets.forEach(t => obs.observe(t));
  }

  /* ---------- boot ---------- */
  renderHeader();
  $('#footerText').textContent = S.footer;
  if (PAGE === 'home') { renderHome(); homeEffects(); }
  else { renderShowcase(); }
})();
