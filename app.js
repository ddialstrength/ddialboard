(() => {
  const INTERVAL_MS = 20_000;
  const stage = document.getElementById('slideStage');
  const slideLabel = document.getElementById('slideLabel');
  const progressBar = document.getElementById('progressBar');
  const clock = document.getElementById('clock');
  const pauseBtn = document.getElementById('pauseBtn');
  const refreshBtn = document.getElementById('refreshBtn');
  const refreshStatus = document.getElementById('refreshStatus');
  const controls = document.getElementById('controls');
  const arenaVideo = document.getElementById('arenaVideo');
  const sparksVideo = document.getElementById('sparksVideo');
  const backgroundVideos = [arenaVideo, sparksVideo];
  sparksVideo.playbackRate = .75;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const lifts = [
    { key: 'bench', title: 'BENCH PRESS' },
    { key: 'squat', title: 'SQUAT' },
    { key: 'row', title: 'CHEST-SUPPORTED ROW', note: '3 CLEAN REPS' }
  ];
  const hasResult = (athlete, key) => Number.isFinite(athlete[key]) && athlete[key] > 0;
  const byLift = key => (a, b) => b[key] - a[key] || a.name.localeCompare(b.name);
  const leaders = (item, key) => item.athletes.filter(athlete => hasResult(athlete, key)).sort(byLift(key));
  let records = window.records;
  let populated = records.filter(item => lifts.some(lift => leaders(item, lift.key).length));
  const makeSlides = () => [
    { type: 'intro' },
    ...['female', 'male'].flatMap(sex => populated.filter(item => item.sex === sex).length > 1 ? [{ type: 'summary', sex }] : []),
    ...populated.map(item => ({ type: 'division', item }))
  ];
  let slides = makeSlides();
  let current = 0;
  let timer;
  let ticker;
  let paused = false;
  let startedAt = Date.now();

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const pounds = value => `${Number(value).toLocaleString('en-US')} LB`;
  const label = sex => sex === 'male' ? 'MEN' : 'WOMEN';

  function table(lift, rows, summary = false) {
    return `<section class="exercise-table${summary ? ' summary-table' : ''}">
      <div class="table-title"><h2>${lift.title}</h2>${lift.note ? `<span>${lift.note}</span>` : ''}</div>
      <table><thead><tr>${summary ? '<th>CLASS</th><th>LEADER</th><th>PR</th>' : '<th>RANK</th><th>MEMBER</th><th>PR</th>'}</tr></thead>
      <tbody>${rows.map((entry, index) => `<tr>${summary
        ? `<td>${escapeHTML(entry.division)}</td><td>${escapeHTML(entry.name)}</td>`
        : `<td><span class="rank-badge">${String(index + 1).padStart(2, '0')}</span></td><td><span class="member-name">${escapeHTML(entry.name)}</span></td>`
      }<td>${pounds(entry[lift.key])}</td></tr>`).join('')}</tbody></table>
    </section>`;
  }

  function renderDivision(item) {
    const activeLifts = lifts.filter(lift => leaders(item, lift.key).length);
    return `<div class="scene exercise-scene division-scene"><div class="exercise-grid${activeLifts.length === 1 ? ' single-table' : ''}" data-count="${activeLifts.length}">${activeLifts.map(lift =>
      table(lift, leaders(item, lift.key).slice(0, 4))
    ).join('')}</div></div>`;
  }

  function renderSummary(sex) {
    const divisions = populated.filter(item => item.sex === sex);
    const activeLifts = lifts.filter(lift => divisions.some(item => leaders(item, lift.key).length));
    return `<div class="scene exercise-scene summary-scene"><div class="exercise-grid${activeLifts.length === 1 ? ' single-table' : ''}" data-count="${activeLifts.length}">${activeLifts.map(lift =>
      table(lift, divisions.filter(item => leaders(item, lift.key).length).map(item => ({ ...leaders(item, lift.key)[0], division: item.division })), true)
    ).join('')}</div></div>`;
  }

  function renderIntro() {
    return `<div class="scene intro-scene">
      <div class="intro-copy">
        <p class="intro-eyebrow">MEMBERS · THE CHALLENGE IS ON</p>
        <h2><span>TEST YOUR</span><span>STRENGTH.</span></h2>
        <p class="intro-challenge">THE BOARD IS YOURS TO BEAT.</p>
        <p class="intro-lifts">BENCH PRESS <i aria-hidden="true">/</i> SQUAT <i aria-hidden="true">/</i> CHEST-SUPPORTED ROW</p>
        <p class="intro-action">ASK A TRAINER FOR AN OFFICIAL ATTEMPT.</p>
        <p class="intro-rights">FOR BRAGGING RIGHTS</p>
      </div>
    </div>`;
  }

  function titleFor(slide) {
    return slide.type === 'intro' ? 'STRENGTH COMPETITION' : slide.type === 'division'
      ? `${label(slide.item.sex)} · ${slide.item.division.toUpperCase()}`
      : `${label(slide.sex)} · STRENGTH BOARD`;
  }

  function buildSlides() {
    stage.innerHTML = slides.map((slide, index) => `<section class="slide${index === 0 ? ' active' : ''}" aria-label="${escapeHTML(titleFor(slide))}" ${index === 0 ? '' : 'aria-hidden="true"'}>${slide.type === 'intro' ? renderIntro() : slide.type === 'division' ? renderDivision(slide.item) : renderSummary(slide.sex)}</section>`).join('');
    document.body.classList.toggle('single-slide', slides.length === 1);
    updateLabels();
  }

  function updateLabels() {
    const title = titleFor(slides[current]);
    document.body.dataset.sex = slides[current].type === 'division' ? slides[current].item.sex : slides[current].type === 'intro' ? 'intro' : slides[current].sex;
    const heading = document.getElementById('slideTitle');
    heading.textContent = title;
    heading.classList.remove('title-enter');
    void heading.offsetWidth;
    heading.classList.add('title-enter');
    slideLabel.textContent = `${current + 1} / ${slides.length}`;
  }

  function schedule() {
    clearTimeout(timer);
    if (!paused && slides.length > 1) timer = setTimeout(() => goTo(current + 1), INTERVAL_MS);
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
    pauseBtn.title = paused ? 'Resume playback' : 'Pause playback';
    pauseBtn.setAttribute('aria-label', pauseBtn.title);
    startedAt = Date.now();
    schedule();
    syncArenaPlayback();
  }

  function syncArenaPlayback() {
    backgroundVideos.forEach(video => {
      if (paused || reducedMotion.matches || document.hidden) {
        video.pause();
        return;
      }
      video.play().catch(() => {
        // Keep the arena poster visible and hide unavailable effects.
        video.classList.remove('is-playing');
      });
    });
  }

  backgroundVideos.forEach(video => {
    video.addEventListener('playing', () => {
      if (paused || reducedMotion.matches || document.hidden) video.pause();
      else video.classList.add('is-playing');
    });
    video.addEventListener('error', () => video.classList.remove('is-playing'));
  });
  reducedMotion.addEventListener('change', syncArenaPlayback);
  document.addEventListener('visibilitychange', syncArenaPlayback);
  syncArenaPlayback();

  function updateClock() {
    clock.textContent = new Date().toLocaleTimeString('en-TT', {
      timeZone: 'America/Port_of_Spain', hour: 'numeric', minute: '2-digit', hour12: true
    });
  }

  function refreshRecords() {
    if (refreshBtn.disabled) return;
    refreshBtn.disabled = true;
    refreshStatus.textContent = 'Checking for updated results';
    const script = document.createElement('script');
    script.src = `assets/records.js?refresh=${Date.now()}`;
    script.onload = () => {
      script.remove();
      records = window.records;
      populated = records.filter(item => lifts.some(lift => leaders(item, lift.key).length));
      slides = makeSlides();
      current = 0;
      buildSlides();
      startedAt = Date.now();
      schedule();
      refreshBtn.disabled = false;
      refreshStatus.textContent = 'Board updated with latest published results';
    };
    script.onerror = () => {
      script.remove();
      refreshBtn.disabled = false;
      refreshStatus.textContent = 'Could not load updated results. Try again.';
    };
    document.head.appendChild(script);
  }

  document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));
  refreshBtn.addEventListener('click', refreshRecords);
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

