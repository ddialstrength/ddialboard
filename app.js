(() => {
  const INTERVAL_MS = 20_000;
  const stage = document.getElementById('slideStage');
  const slideLabel = document.getElementById('slideLabel');
  const progressBar = document.getElementById('progressBar');
  const clock = document.getElementById('clock');
  const pauseBtn = document.getElementById('pauseBtn');
  const controls = document.getElementById('controls');
  const lifts = [
    { key: 'bench', title: 'BENCH PRESS' },
    { key: 'squat', title: 'SQUAT' },
    { key: 'deadlift', title: 'DEADLIFT' }
  ];
  const slides = [
    ...records.filter(item => item.sex === 'female').map(item => ({ type: 'division', item })),
    ...records.filter(item => item.sex === 'male').map(item => ({ type: 'division', item })),
    { type: 'exercise', sex: 'female' },
    { type: 'exercise', sex: 'male' }
  ];
  let current = 0;
  let timer;
  let ticker;
  let paused = false;
  let startedAt = Date.now();

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const pounds = value => `${Number(value).toLocaleString('en-US')} LB`;
  const total = athlete => Number(athlete.bench) + Number(athlete.squat) + Number(athlete.deadlift);
  const label = sex => sex === 'male' ? 'MEN' : 'WOMEN';
  const art = { 1: 'assets/podium-gold.webp', 2: 'assets/podium-silver.webp', 3: 'assets/podium-bronze.webp' };

  function portrait(athlete) {
    // An optional local portrait covers the artwork's built-in silhouette.
    const path = athlete.photo || '';
    return /^assets\/athletes\/[a-zA-Z0-9._/-]+\.(png|jpe?g|webp)$/i.test(path)
      ? `<img class="winner-photo" src="${escapeHTML(path)}" alt="Portrait of ${escapeHTML(athlete.name)}">`
      : '';
  }

  function card(athlete, rank) {
    const metal = ['gold', 'silver', 'bronze'][rank - 1];
    return `<article class="winner winner-${rank} ${metal}">
      <img class="medal-art" src="${art[rank]}" alt="${metal} rank ${rank} podium">
      ${portrait(athlete)}
      <h2>${escapeHTML(athlete.name)}</h2>
      <div class="winner-total">${pounds(total(athlete))}</div>
    </article>`;
  }

  function smallRank(athlete, rank) {
    return `<div class="rank-row"><span class="rank-number">${rank}</span><span class="rank-name">${escapeHTML(athlete.name)}</span><strong>${pounds(total(athlete))}</strong></div>`;
  }

  function renderDivision(item) {
    const sorted = [...item.athletes].sort((a, b) => total(b) - total(a) || a.name.localeCompare(b.name));
    const remainder = sorted.slice(3);
    return `<div class="scene division-scene">
      <div class="top-three" aria-label="Top three ranked by combined lift total">
        ${card(sorted[1], 2)}${card(sorted[0], 1)}${card(sorted[2], 3)}
      </div>
      <div class="fourth-rank">${smallRank(remainder[0], 4)}</div>
      <div class="rank-columns">
        <div class="rank-column">${remainder.slice(1, 4).map((athlete, index) => smallRank(athlete, index + 5)).join('')}</div>
        <div class="rank-column">${remainder.slice(4).map((athlete, index) => smallRank(athlete, index + 8)).join('')}</div>
      </div>
      <div class="scoring-note">TOTAL = BENCH + SQUAT + DEADLIFT · LB</div>
    </div>`;
  }

  function renderExercise(sex) {
    const people = records.filter(item => item.sex === sex).flatMap(item =>
      item.athletes.map(athlete => ({ ...athlete, division: item.division }))
    );
    const tables = lifts.map(lift => {
      const leaders = [...people].sort((a, b) => b[lift.key] - a[lift.key] || a.name.localeCompare(b.name)).slice(0, 10);
      return `<section class="exercise-table"><h2>${lift.title}</h2><table>
        <thead><tr><th>#</th><th>NAME</th><th>CLASS</th><th>PR</th></tr></thead>
        <tbody>${leaders.map((person, index) => `<tr><td>${index + 1}</td><td>${escapeHTML(person.name)}</td><td>${escapeHTML(person.division)}</td><td>${pounds(person[lift.key])}</td></tr>`).join('')}</tbody>
      </table></section>`;
    }).join('');
    return `<div class="scene exercise-scene"><div class="exercise-grid">${tables}</div><div class="scoring-note">TOP 10 PERSONAL RECORDS PER EXERCISE · LB</div></div>`;
  }

  function titleFor(slide) {
    return slide.type === 'division'
      ? `${label(slide.item.sex)} · ${slide.item.division.toUpperCase()}`
      : `${label(slide.sex)} · EXERCISE CLASS`;
  }

  function buildSlides() {
    stage.innerHTML = slides.map((slide, index) => `<section class="slide${index === 0 ? ' active' : ''}" aria-label="${escapeHTML(titleFor(slide))}" ${index === 0 ? '' : 'aria-hidden="true"'}>${slide.type === 'division' ? renderDivision(slide.item) : renderExercise(slide.sex)}</section>`).join('');
    updateLabels();
  }

  function updateLabels() {
    const title = titleFor(slides[current]);
    document.getElementById('slideTitle').textContent = title;
    slideLabel.textContent = `DEMO DATA · ${current + 1} / ${slides.length}`;
  }

  function schedule() {
    clearTimeout(timer);
    if (!paused) timer = setTimeout(() => goTo(current + 1), INTERVAL_MS);
  }

  function goTo(index) {
    const nodes = [...stage.querySelectorAll('.slide')];
    nodes[current].classList.remove('active');
    nodes[current].setAttribute('aria-hidden', 'true');
    current = (index + nodes.length) % nodes.length;
    nodes[current].classList.add('active');
    nodes[current].removeAttribute('aria-hidden');
    updateLabels();
    startedAt = Date.now();
    schedule();
  }

  function setPaused(next) {
    paused = next;
    pauseBtn.textContent = paused ? '▶' : 'Ⅱ';
    pauseBtn.title = paused ? 'Resume rotation' : 'Pause rotation';
    startedAt = Date.now();
    schedule();
  }

  function updateClock() {
    clock.textContent = new Date().toLocaleTimeString('en-TT', {
      timeZone: 'America/Port_of_Spain', hour: 'numeric', minute: '2-digit', hour12: true
    });
  }

  document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));
  pauseBtn.addEventListener('click', () => setPaused(!paused));
  document.getElementById('fullscreenBtn').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (_) { /* Browsers may deny fullscreen from a local file. */ }
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') goTo(current + 1);
    if (event.key === 'ArrowLeft') goTo(current - 1);
    if (event.code === 'Space') { event.preventDefault(); setPaused(!paused); }
  });
  let hideTimer;
  ['mousemove', 'touchstart', 'keydown'].forEach(type => window.addEventListener(type, () => {
    controls.style.opacity = '1';
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { controls.style.opacity = ''; }, 1800);
  }, { passive: true }));
  buildSlides();
  updateClock();
  setInterval(updateClock, 30_000);
  ticker = setInterval(() => {
    progressBar.style.transform = `scaleX(${paused ? 0 : Math.min(1, (Date.now() - startedAt) / INTERVAL_MS)})`;
  }, 100);
  schedule();
})();
