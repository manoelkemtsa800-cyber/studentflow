"use strict";

/* ═══════════════════════════════════════════════
   STUDENTFLOW ELITE — script.js
═══════════════════════════════════════════════ */

/* ══════════════════════════════════════
   1. DONNÉES ÉTUDIANTS RÉELS
══════════════════════════════════════ */
const DEFAULT_STUDENTS = [
  {
    id: 1,
    name: "Kemtsa Prince Manoel",
    field: "Informatique",
    level: "Licence 2",
    category: "dev",
    bio: "Etudiant passionne en informatique, specialise en cybersecurite et developpement web.",
    skills: ["HTML", "CSS", "JavaScript", "Python", "Cybersecurite"],
    cv: "https://manoelkemtsa800-cyber.github.io/monCV/",
    projects: "#",
    github: "https://github.com",
    linkedin: "",
    avatar: "assets/images/avatars/kemtsa.JPG",
    initials: "KP"
  },
  {
    id: 2,
    name: "Foe Owona",
    field: "Informatique",
    level: "Licence 2",
    category: "dev",
    bio: "Developpeur web passionne par la creation d'applications modernes et performantes.",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    cv: "https://cvfoeowona.netlify.app",
    projects: "#",
    github: "https://github.com",
    linkedin: "",
    avatar: "assets/images/avatars/foe.jpeg",
    initials: "FO"
  },
  {
    id: 3,
    name: "Kouogang Leny",
    field: "Informatique",
    level: "Licence 2",
    category: "dev",
    bio: "Developpeuse passionnee, aimant transformer des idees en solutions numeriques elegantes.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Python"],
    cv: "https://jolly-gingersnap-bc0928.netlify.app/",
    projects: "#",
    github: "https://github.com",
    linkedin: "",
    avatar: "assets/images/avatars/kouogang.jpeg",
    initials: "KL"
  },
  {
    id: 4,
    name: "Soatse David",
    field: "Informatique",
    level: "Licence 2",
    category: "dev",
    bio: "Developpeur full-stack avec une forte inclination pour le web et les bases de donnees.",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "SQL"],
    cv: "https://davidsoatse-wq.github.io/",
    projects: "#",
    github: "https://github.com",
    linkedin: "",
    avatar: "assets/images/avatars/soatse.jpeg",
    initials: "SD"
  },
  {
    id: 5,
    name: "Koulai Nathanael",
    field: "Informatique",
    level: "Licence 2",
    category: "dev",
    bio: "Etudiant en informatique avec un interet marque pour le developpement logiciel et les nouvelles technologies.",
    skills: ["Python", "HTML", "CSS", "JavaScript", "Java"],
    cv: "#",
    projects: "#",
    github: "",
    linkedin: "",
    avatar: "assets/images/avatars/koulai.jpg",
    initials: "KN"
  },
  {
    id: 6,
    name: "Monkama Durel",
    field: "Informatique",
    level: "Licence 2",
    category: "dev",
    bio: "Passionné par le développement et l'innovation technologique, toujours prêt à relever de nouveaux défis.",
    skills: ["Python", "HTML", "CSS", "JavaScript", "Algorithmes"],
    cv: "#",
    projects: "#",
    github: "",
    linkedin: "",
    avatar: "assets/images/avatars/monkama.jpeg",
    initials: "MD"
  },
  {
    id: 7,
    name: "Nnanga Clarisse",
    field: "Informatique",
    level: "Licence 2",
    category: "design",
    bio: "Etudiante en informatique avec une passion pour le design UI/UX et la creation d'interfaces utilisateur intuitives.",
    skills: ["HTML", "CSS", "Figma", "JavaScript", "UI/UX"],
    cv: "#",
    projects: "#",
    github: "",
    linkedin: "",
    avatar: "assets/images/avatars/nnanga.jpeg",
    initials: "NC"
  }
];

/* ══════════════════════════════════════
   2. ÉTAT
══════════════════════════════════════ */
let state = {
  students: [],
  theme: 'day',
  adminUnlocked: false,
  filter: 'all'
};

/* ══════════════════════════════════════
   3. LOCALSTORAGE
══════════════════════════════════════ */
function loadData() {
  try {
    const saved = localStorage.getItem('sfe_data_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.students = parsed.students && parsed.students.length ? parsed.students : [...DEFAULT_STUDENTS];
    } else {
      state.students = [...DEFAULT_STUDENTS];
    }
  } catch(e) {
    state.students = [...DEFAULT_STUDENTS];
  }
  const savedTheme = localStorage.getItem('sfe_theme');
  if (savedTheme) state.theme = savedTheme;
}

function saveData() {
  localStorage.setItem('sfe_data_v2', JSON.stringify({ students: state.students }));
}

/* ══════════════════════════════════════
   4. LOADER
══════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startRevealObserver();
    animateStats();
    renderHeroAvatars();
  }, 1800);
});

/* ══════════════════════════════════════
   5. CURSEUR
══════════════════════════════════════ */
if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();
}

/* ══════════════════════════════════════
   6. PARTICULES
══════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.6 - 0.2;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.life = 1; this.decay = Math.random() * 0.003 + 0.001;
    }
    update() { this.x += this.speedX; this.y += this.speedY; this.life -= this.decay; if (this.life <= 0 || this.y < -10) this.reset(); }
    draw() {
      ctx.save(); ctx.globalAlpha = this.life * this.opacity;
      ctx.fillStyle = '#C9A84C'; ctx.shadowBlur = 6; ctx.shadowColor = '#C9A84C';
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
  }
  for (let i = 0; i < 80; i++) particles.push(new Particle());
  (function animate() { ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animate); })();
})();

/* ══════════════════════════════════════
   7. NAVBAR
══════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => { hamburger.classList.remove('open'); navLinks.classList.remove('open'); });
});

/* ══════════════════════════════════════
   8. THEME
══════════════════════════════════════ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('.theme-icon').textContent = theme === 'day' ? '\u263D' : '\u2600';
  const meta = document.getElementById('metaThemeColor');
  if (meta) meta.setAttribute('content', theme === 'day' ? '#080808' : '#f8f6f1');
  localStorage.setItem('sfe_theme', theme);
  setTimeout(drawRadar, 100);
}
document.getElementById('themeToggle').addEventListener('click', () => {
  state.theme = state.theme === 'day' ? 'night' : 'day';
  applyTheme(state.theme);
});

/* ══════════════════════════════════════
   9. REVEAL
══════════════════════════════════════ */
function startRevealObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = fill.dataset.pct + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const sb = document.querySelector('.skills-bars');
  if (sb) skillObserver.observe(sb);
}

/* ══════════════════════════════════════
   10. STATS COUNTER
══════════════════════════════════════ */
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const timer = setInterval(() => {
      count = Math.min(count + target / 40, target);
      el.textContent = Math.floor(count);
      if (count >= target) clearInterval(timer);
    }, 40);
  });
}

/* ══════════════════════════════════════
   11. HERO AVATARS — photos sur la page d'accueil
══════════════════════════════════════ */
function renderHeroAvatars() {
  const row = document.getElementById('heroAvatars');
  const countEl = document.getElementById('heroCount');
  if (!row) return;

  row.innerHTML = '';
  const toShow = state.students.slice(0, 6);
  const extra = state.students.length - toShow.length;

  toShow.forEach(student => {
    const div = document.createElement('div');
    div.className = 'hero-avatar-item';
    div.title = student.name;
    div.onclick = () => openCVModal(student.id);

    if (student.avatar && student.avatar !== '' && !student.avatar.startsWith('#')) {
      const img = document.createElement('img');
      img.src = student.avatar;
      img.alt = student.name;
      img.onerror = function() {
        this.parentElement.textContent = student.initials || student.name[0];
      };
      div.appendChild(img);
    } else {
      div.textContent = student.initials || student.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
    }
    row.appendChild(div);
  });

  if (extra > 0) {
    const more = document.createElement('div');
    more.className = 'hero-avatar-item hero-avatar-more';
    more.textContent = '+' + extra;
    row.appendChild(more);
  }

  if (countEl) countEl.textContent = state.students.length;
}

/* ══════════════════════════════════════
   12. CARD 3D EFFECT
══════════════════════════════════════ */
function add3DEffect(card) {
  if (window.matchMedia('(hover: none)').matches) {
    card.addEventListener('touchstart', () => { card.style.opacity = '0.88'; }, { passive: true });
    card.addEventListener('touchend', () => { card.style.opacity = '1'; }, { passive: true });
    return;
  }
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${(y-cy)/cy*-7}deg) rotateY(${(x-cx)/cx*7}deg) translateY(-8px)`;
    const glow = card.querySelector('.card-glow');
    if (glow) { glow.style.setProperty('--mx', (x/rect.width*100)+'%'); glow.style.setProperty('--my', (y/rect.height*100)+'%'); }
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
}

/* ══════════════════════════════════════
   13. RENDER STUDENTS
══════════════════════════════════════ */
function renderStudents(filter) {
  filter = filter || state.filter || 'all';
  const grid = document.getElementById('studentsGrid');
  const filtered = filter === 'all' ? state.students : state.students.filter(s => s.category === filter);
  grid.innerHTML = '';

  filtered.forEach((student, i) => {
    const card = document.createElement('div');
    card.className = 'student-card reveal';
    const initials = student.initials || student.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();

    // Avatar HTML
    let avatarHTML = '';
    if (student.avatar && student.avatar !== '' && !student.avatar.startsWith('#')) {
      avatarHTML = `<img src="${student.avatar}" alt="${student.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.parentElement.textContent='${initials}'"/>`;
    } else {
      avatarHTML = initials;
    }

    // CV button
    const cvHasLink = student.cv && student.cv !== '#' && student.cv !== '';
    const cvBtn = cvHasLink
      ? `<a class="card-btn card-btn-cv" href="${student.cv}" target="_blank" rel="noopener">&#128196; Voir CV</a>`
      : `<button class="card-btn card-btn-cv" onclick="openCVModal(${student.id})">&#128196; Profil</button>`;

    card.innerHTML = `
      <div class="card-glow"></div>
      <div class="card-badge">${student.level || 'Etudiant'}</div>
      <div class="card-avatar">${avatarHTML}</div>
      <div class="card-name">${student.name}</div>
      <div class="card-field">${student.field || ''}</div>
      <div class="card-level">${(student.category||'dev').toUpperCase()}</div>
      <div class="card-bio">${student.bio || ''}</div>
      <div class="card-skills">
        ${(student.skills||[]).slice(0,5).map(s=>`<span class="skill-badge">${s}</span>`).join('')}
      </div>
      <div class="card-actions">
        ${cvBtn}
        <button class="card-btn card-btn-proj" onclick="openCVModal(${student.id})">&#128196; Profil</button>
      </div>
      ${student.github || student.linkedin ? `
      <div class="card-socials">
        ${student.github ? `<a class="social-link" href="${student.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
        ${student.linkedin ? `<a class="social-link" href="${student.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
      </div>` : ''}
    `;

    grid.appendChild(card);
    add3DEffect(card);
    setTimeout(() => card.classList.add('visible'), i * 100 + 100);
  });
}

/* ══════════════════════════════════════
   14. FILTER BUTTONS
══════════════════════════════════════ */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.filter = btn.dataset.filter;
    renderStudents(state.filter);
  });
});

/* ══════════════════════════════════════
   15. SKILLS CLOUD
══════════════════════════════════════ */
const SKILLS_LIST = [
  {name:"HTML5",level:95},{name:"CSS3",level:90},{name:"JavaScript",level:88},
  {name:"Python",level:82},{name:"React",level:70},{name:"Flutter",level:75},
  {name:"SQL",level:85},{name:"Node.js",level:68},{name:"Figma",level:79},
  {name:"Git",level:92},{name:"Docker",level:65},{name:"Machine Learning",level:60},
  {name:"UI/UX",level:79},{name:"TypeScript",level:72},{name:"MongoDB",level:70}
];
function renderSkillsCloud() {
  const cloud = document.getElementById('skillsCloud');
  cloud.innerHTML = '';
  SKILLS_LIST.forEach(skill => {
    const badge = document.createElement('div');
    badge.className = 'cloud-badge';
    badge.style.fontSize = (0.75 + (skill.level/100)*0.4) + 'rem';
    badge.textContent = skill.name;
    cloud.appendChild(badge);
  });
}

/* ══════════════════════════════════════
   16. RADAR CHART
══════════════════════════════════════ */
function drawRadar() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, cx = W/2, cy = H/2, r = Math.min(W,H)/2 - 40;
  const isDark = document.documentElement.getAttribute('data-theme') === 'day';
  const gridColor = isDark ? 'rgba(201,168,76,0.15)' : 'rgba(154,114,40,0.15)';
  ctx.clearRect(0,0,W,H);
  const labels = ["JS","Python","UI/UX","SQL","Flutter","HTML"];
  const values = [0.88,0.82,0.79,0.85,0.75,0.95];
  const n = labels.length;
  for (let ring=1; ring<=5; ring++) {
    ctx.beginPath();
    for (let i=0; i<n; i++) { const a=(Math.PI*2*i/n)-Math.PI/2; const x=cx+(r*ring/5)*Math.cos(a),y=cy+(r*ring/5)*Math.sin(a); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
    ctx.closePath(); ctx.strokeStyle=gridColor; ctx.lineWidth=1; ctx.stroke();
  }
  for (let i=0; i<n; i++) {
    const a=(Math.PI*2*i/n)-Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    ctx.strokeStyle=gridColor; ctx.stroke();
  }
  ctx.beginPath();
  for (let i=0; i<n; i++) { const a=(Math.PI*2*i/n)-Math.PI/2; const x=cx+r*values[i]*Math.cos(a),y=cy+r*values[i]*Math.sin(a); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
  ctx.closePath(); ctx.fillStyle='rgba(201,168,76,0.2)'; ctx.fill(); ctx.strokeStyle='#C9A84C'; ctx.lineWidth=2; ctx.stroke();
  for (let i=0; i<n; i++) {
    const a=(Math.PI*2*i/n)-Math.PI/2; const x=cx+r*values[i]*Math.cos(a),y=cy+r*values[i]*Math.sin(a);
    ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fillStyle='#C9A84C'; ctx.fill();
    const lx=cx+(r+28)*Math.cos(a),ly=cy+(r+28)*Math.sin(a);
    ctx.font='600 12px "DM Sans",sans-serif'; ctx.fillStyle='#C9A84C'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(labels[i],lx,ly);
  }
}

/* ══════════════════════════════════════
   17. MODAL CV / PROFIL
══════════════════════════════════════ */
function openCVModal(id) {
  const student = state.students.find(s => s.id === id);
  if (!student) return;
  const initials = student.initials || student.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();

  let avatarHTML = '';
  if (student.avatar && student.avatar !== '' && !student.avatar.startsWith('#')) {
    avatarHTML = `<img src="${student.avatar}" alt="${student.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.parentElement.textContent='${initials}'"/>`;
  } else {
    avatarHTML = initials;
  }

  const cvHasLink = student.cv && student.cv !== '#' && student.cv !== '';

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-avatar">${avatarHTML}</div>
    <div class="modal-name">${student.name}</div>
    <div class="modal-field">${student.field || ''}</div>
    <div class="modal-level">${student.level || ''} &mdash; ${(student.category||'').toUpperCase()}</div>
    <div class="modal-bio">${student.bio || 'Aucune biographie disponible.'}</div>
    <div class="modal-section-label">Competences Techniques</div>
    <div class="modal-skills">
      ${(student.skills||[]).map(s=>`<span class="skill-badge" style="border-color:rgba(201,168,76,0.3);color:var(--text);">${s}</span>`).join('')}
    </div>
    <div class="modal-actions">
      ${cvHasLink ? `<a class="btn-gold" href="${student.cv}" target="_blank" rel="noopener"><span>&#128196; Voir mon CV</span><div class="btn-shine"></div></a>` : '<span style="color:var(--text-muted);font-size:0.82rem;">CV bientot disponible</span>'}
      ${student.projects && student.projects !== '#' ? `<a class="btn-outline" href="${student.projects}" target="_blank" rel="noopener">&#128640; Projets</a>` : ''}
    </div>
    ${student.github || student.linkedin ? `
    <div class="modal-socials">
      ${student.github ? `<a class="social-link" href="${student.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
      ${student.linkedin ? `<a class="social-link" href="${student.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
    </div>` : ''}
  `;

  document.getElementById('cvModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', closeModal);
function closeModal() {
  document.getElementById('cvModal').classList.remove('active');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════
   18. ADMIN PANEL
══════════════════════════════════════ */
const ADMIN_PASSWORD = 'elite2025';
document.getElementById('footerSecret').addEventListener('click', openAdmin);
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.shiftKey && e.key === 'A') { e.preventDefault(); openAdmin(); }
});

function openAdmin() {
  const panel = document.getElementById('adminPanel');
  panel.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (!state.adminUnlocked) {
    document.getElementById('adminLogin').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
  } else {
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    renderAdminStudentList();
  }
}

function closeAdmin() {
  document.getElementById('adminPanel').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('adminClose').addEventListener('click', closeAdmin);
document.getElementById('adminOverlay').addEventListener('click', closeAdmin);

window.checkAdminPass = function() {
  const pass = document.getElementById('adminPass').value;
  if (pass === ADMIN_PASSWORD) {
    state.adminUnlocked = true;
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    renderAdminStudentList();
    showToast('Acces accorde — Bienvenue Admin !');
  } else {
    showToast('Mot de passe incorrect');
    document.getElementById('adminPass').style.borderColor = '#e74c3c';
    setTimeout(() => { document.getElementById('adminPass').style.borderColor = ''; }, 1500);
  }
};
document.getElementById('adminPass').addEventListener('keydown', e => { if(e.key==='Enter') window.checkAdminPass(); });

/* Admin tabs */
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(c => { c.classList.remove('active'); c.classList.add('hidden'); });
    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.dataset.tab);
    if (target) { target.classList.add('active'); target.classList.remove('hidden'); }
    if (tab.dataset.tab === 'manageStudents') renderAdminStudentList();
  });
});

/* ── ADD STUDENT ── */
window.addStudent = function() {
  const name = document.getElementById('s-name').value.trim();
  const category = document.getElementById('s-category').value;
  if (!name || !category) { showToast('Nom et categorie requis'); return; }

  const student = {
    id: Date.now(),
    name,
    field: document.getElementById('s-field').value.trim(),
    level: document.getElementById('s-level').value,
    category,
    skills: document.getElementById('s-skills').value.split(',').map(s=>s.trim()).filter(Boolean),
    github: document.getElementById('s-github').value.trim(),
    linkedin: document.getElementById('s-linkedin').value.trim(),
    cv: document.getElementById('s-cv').value.trim() || '#',
    projects: document.getElementById('s-projects').value.trim() || '#',
    bio: document.getElementById('s-bio').value.trim(),
    avatar: document.getElementById('s-avatar').value.trim(),
    initials: name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
  };

  state.students.push(student);
  saveData();
  renderStudents(state.filter);
  renderHeroAvatars();
  showToast(name + ' ajoute avec succes !');
  ['s-name','s-field','s-skills','s-github','s-linkedin','s-cv','s-projects','s-bio','s-avatar'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('s-level').value = '';
  document.getElementById('s-category').value = '';
};

/* ── RENDER ADMIN LIST ── */
function renderAdminStudentList() {
  const list = document.getElementById('adminStudentList');
  list.innerHTML = '';
  if (!state.students.length) {
    list.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Aucun etudiant.</p>';
    return;
  }
  state.students.forEach(student => {
    const initials = student.initials || student.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
    const item = document.createElement('div');
    item.className = 'admin-student-item';
    item.innerHTML = `
      <div class="card-avatar" style="width:40px;height:40px;font-size:0.85rem;flex-shrink:0;">
        ${student.avatar && !student.avatar.startsWith('#') ? `<img src="${student.avatar}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.parentElement.textContent='${initials}'"/>` : initials}
      </div>
      <div class="admin-student-name">
        <strong>${student.name}</strong><br>
        <small style="color:var(--text-muted)">${student.field || ''} &mdash; ${student.level || ''}</small>
      </div>
      <button class="admin-edit-btn" onclick="openEditModal(${student.id})">&#9998; Modifier</button>
      <button class="admin-del-btn" onclick="deleteStudent(${student.id})">Supprimer</button>
    `;
    list.appendChild(item);
  });
}

/* ── EDIT STUDENT ── */
window.openEditModal = function(id) {
  const student = state.students.find(s => s.id === id);
  if (!student) return;
  document.getElementById('e-id').value = student.id;
  document.getElementById('e-name').value = student.name || '';
  document.getElementById('e-field').value = student.field || '';
  document.getElementById('e-level').value = student.level || '';
  document.getElementById('e-category').value = student.category || 'dev';
  document.getElementById('e-skills').value = (student.skills||[]).join(', ');
  document.getElementById('e-github').value = student.github || '';
  document.getElementById('e-linkedin').value = student.linkedin || '';
  document.getElementById('e-cv').value = student.cv && student.cv !== '#' ? student.cv : '';
  document.getElementById('e-projects').value = student.projects && student.projects !== '#' ? student.projects : '';
  document.getElementById('e-avatar').value = student.avatar || '';
  document.getElementById('e-bio').value = student.bio || '';

  // Ferme l'admin, ouvre edit modal
  document.getElementById('adminPanel').classList.remove('active');
  document.getElementById('editModal').classList.add('active');
};

window.saveEditStudent = function() {
  const id = parseInt(document.getElementById('e-id').value);
  const idx = state.students.findIndex(s => s.id === id);
  if (idx === -1) return;

  const name = document.getElementById('e-name').value.trim();
  if (!name) { showToast('Le nom est requis'); return; }

  state.students[idx] = {
    ...state.students[idx],
    name,
    field: document.getElementById('e-field').value.trim(),
    level: document.getElementById('e-level').value,
    category: document.getElementById('e-category').value,
    skills: document.getElementById('e-skills').value.split(',').map(s=>s.trim()).filter(Boolean),
    github: document.getElementById('e-github').value.trim(),
    linkedin: document.getElementById('e-linkedin').value.trim(),
    cv: document.getElementById('e-cv').value.trim() || '#',
    projects: document.getElementById('e-projects').value.trim() || '#',
    bio: document.getElementById('e-bio').value.trim(),
    avatar: document.getElementById('e-avatar').value.trim(),
    initials: name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
  };

  saveData();
  renderStudents(state.filter);
  renderHeroAvatars();
  closeEditModal();
  showToast(name + ' mis a jour !');
};

document.getElementById('editModalClose').addEventListener('click', closeEditModal);
document.getElementById('editModalOverlay').addEventListener('click', closeEditModal);
function closeEditModal() {
  document.getElementById('editModal').classList.remove('active');
  document.body.style.overflow = '';
}

/* ── DELETE STUDENT ── */
window.deleteStudent = function(id) {
  const student = state.students.find(s => s.id === id);
  if (!student || !confirm('Supprimer ' + student.name + ' ?')) return;
  state.students = state.students.filter(s => s.id !== id);
  saveData();
  renderStudents(state.filter);
  renderHeroAvatars();
  renderAdminStudentList();
  showToast(student.name + ' supprime');
};

/* ── EXPORT / RESET ── */
window.exportData = function() {
  const data = JSON.stringify({ students: state.students }, null, 2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], {type:'application/json'}));
  a.download = 'studentflow_data.json';
  a.click();
  showToast('Donnees exportees !');
};

window.resetData = function() {
  if (!confirm('Reinitialiser toutes les donnees ?')) return;
  localStorage.removeItem('sfe_data_v2');
  state.students = [...DEFAULT_STUDENTS];
  saveData();
  renderStudents(state.filter);
  renderHeroAvatars();
  renderAdminStudentList();
  showToast('Donnees reinitialisees');
};

/* ══════════════════════════════════════
   19. TOAST
══════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ══════════════════════════════════════
   20. MOBILE EXTRAS
══════════════════════════════════════ */
// Fix iOS height
(function() {
  function setVH() { document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px'); }
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', () => setTimeout(setVH, 300));
})();

// Swipe bas ferme modals
(function() {
  [['modalBox', closeModal], ['editModalBox', closeEditModal]].forEach(([id, fn]) => {
    const el = document.getElementById(id);
    if (!el) return;
    let startY = 0;
    el.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', e => { if (e.changedTouches[0].clientY - startY > 80) fn(); }, { passive: true });
  });
})();

// Ferme menu en cliquant dehors
document.addEventListener('touchstart', e => {
  const nav = document.getElementById('navLinks');
  const burger = document.getElementById('hamburger');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove('open'); burger.classList.remove('open');
  }
}, { passive: true });

// Konami code
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki = 0;
document.addEventListener('keydown', e => {
  if (e.key === KONAMI[ki]) { ki++; if (ki === KONAMI.length) { ki = 0; openAdmin(); showToast('KONAMI CODE !'); } }
  else ki = 0;
});

/* ══════════════════════════════════════
   21. INIT
══════════════════════════════════════ */
(function init() {
  loadData();
  applyTheme(state.theme);
  renderStudents();
  renderSkillsCloud();
  setTimeout(() => {
    drawRadar();
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { drawRadar(); ro.unobserve(e.target); } });
    }, { threshold: 0.3 });
    const rc = document.getElementById('radarChart');
    if (rc) ro.observe(rc);
  }, 500);
})();
