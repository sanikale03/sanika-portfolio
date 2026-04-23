
/* ─── Typing Effect ─────────────────────────────── */
const phrases = [
  "AI & Machine Learning Enthusiast",
  "Data Analyst & Storyteller",
  "Python & ML Engineer",
  "Turning Data into Insight"
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const current = phrases[phraseIdx];
  const speed = isDeleting ? 45 : 80;
  const display = isDeleting ? current.slice(0, charIdx--) : current.slice(0, charIdx++);
  typingEl.innerHTML = display + '<span class="cursor"></span>';

  if (!isDeleting && charIdx > current.length) {
    setTimeout(() => { isDeleting = true; type(); }, 2000);
    return;
  }
  if (isDeleting && charIdx < 0) {
    isDeleting = false; charIdx = 0;
    phraseIdx = (phraseIdx + 1) % phrases.length;
  }
  setTimeout(type, speed);
}
type();

/* ─── Navbar scroll ─────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ─── Mobile nav toggle ─────────────────────────── */
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

/* ─── Intersection Observer — Reveal ───────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Skills Data ───────────────────────────────── */
const skills = [
  { name: 'Python',           pct: 90, icon: '🐍', color: '#3b82f6' },
  { name: 'Machine Learning', pct: 82, icon: '🤖', color: '#8b5cf6' },
  { name: 'SQL',              pct: 85, icon: '🗃️', color: '#06b6d4' },
  { name: 'Power BI',         pct: 78, icon: '📊', color: '#f59e0b' },
  { name: 'Pandas',           pct: 88, icon: '🐼', color: '#10b981' },
  { name: 'NumPy',            pct: 85, icon: '🔢', color: '#ec4899' },
];

const sgrid = document.getElementById('skillsGrid');
skills.forEach((s, i) => {
  const card = document.createElement('div');
  card.className = 'skill-card reveal';
  card.style.transitionDelay = `${i * 0.08}s`;
  card.innerHTML = `
    <div class="skill-top">
      <div class="skill-info">
        <div class="skill-icon-box" style="background:${s.color}1a;border:1px solid ${s.color}33">
          <span style="font-size:1.3rem">${s.icon}</span>
        </div>
        <span class="skill-name">${s.name}</span>
      </div>
      <span class="skill-pct">${s.pct}%</span>
    </div>
    <div class="skill-bar-bg">
      <div class="skill-bar-fill" style="width:${s.pct}%;background:linear-gradient(90deg,${s.color},${s.color}cc)" data-pct="${s.pct}"></div>
    </div>`;
  sgrid.appendChild(card);
  revealObserver.observe(card);
});

/* Animate skill bars on scroll */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.querySelectorAll('.skill-bar-fill').forEach(b => b.classList.add('animated')), 300);
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

/* ─── GitHub API ────────────────────────────────── */
const GITHUB_USER = 'sanikale03';       
const FALLBACK_PROJECTS = [
  { name: 'sentiment-analysis-nlp',  description: 'NLP pipeline using BERT and transformers for multi-class sentiment classification on product reviews.', language: 'Python',    stargazers_count: 14, html_url: '#' },
  { name: 'sales-forecast-dashboard',description: 'Interactive Power BI + Python dashboard for time-series forecasting of regional sales data.',       language: 'Python',    stargazers_count: 9,  html_url: '#' },
  { name: 'customer-churn-predictor', description: 'End-to-end ML pipeline using XGBoost and SHAP explainability for telecom churn prediction.',         language: 'Python',    stargazers_count: 22, html_url: '#' },
  { name: 'data-cleaning-toolkit',    description: 'Pandas utility library for automating common data cleaning, normalization and outlier detection tasks.', language: 'Python', stargazers_count: 7,  html_url: '#' },
  { name: 'sql-analytics-queries',    description: 'Library of advanced SQL patterns: window functions, CTEs, and performance-optimized analytical queries.', language: 'SQL',   stargazers_count: 11, html_url: '#' },
  { name: 'image-classifier-cnn',     description: 'CNN-based image classifier built with TensorFlow/Keras achieving 94% accuracy on a custom dataset.',  language: 'Python',    stargazers_count: 18, html_url: '#' },
];

const langColors = {
  Python:'#3572A5', JavaScript:'#f1e05a', TypeScript:'#2b7489',
  SQL:'#e38c00', Jupyter:'#DA5B0B', R:'#198CE7',
};
const projectIcons = ['🤖','📊','🧠','🗃️','📈','🔬','💡','⚙️'];

function renderProjects(repos) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  repos.slice(0, 6).forEach((r, i) => {
    const lang  = r.language || 'Python';
    const color = langColors[lang] || '#63b3ed';
    const card  = document.createElement('div');
    card.className = 'project-card reveal';
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="project-card-top">
        <div></div>
        <a href="${r.html_url}" target="_blank" class="project-link-icon" title="View on GitHub">
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
      <div class="project-title">${r.name}</div>
      <div class="project-desc">${r.description || 'A machine learning and data science project.'}</div>
      <div class="project-meta">
        <span class="project-chip" style="background:${color}15;border-color:${color}33;color:${color}">${lang}</span>
        ${r.stargazers_count ? `<span class="project-stars"><i class="fa-solid fa-star"></i> ${r.stargazers_count}</span>` : ''}
      </div>`;
    grid.appendChild(card);
    revealObserver.observe(card);
  });
}

fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`)
  .then(r => { if (!r.ok) throw new Error(); return r.json(); })
  .then(data => renderProjects(data.length ? data : FALLBACK_PROJECTS))
  .catch(() => renderProjects(FALLBACK_PROJECTS));

/* ─── Contact form (UI only) ────────────────────── */
document.querySelector('.btn-submit').addEventListener('click', () => {
  const btn = document.querySelector('.btn-submit');
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg,#10b981,#06b6d4)';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    btn.style.background = '';
  }, 3000);
});
