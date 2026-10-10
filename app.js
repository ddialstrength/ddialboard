(() => {
  const INTERVAL_MS = 10_000;
  const stage = document.getElementById('slideStage');
  const slideLabel = document.getElementById('slideLabel');
  const progressBar = document.getElementById('progressBar');
  const clock = document.getElementById('clock');
  const pauseBtn = document.getElementById('pauseBtn');
  const controls = document.getElementById('controls');

  const female = records.filter(r => r.sex === 'female').sort((a, b) => a.limit - b.limit);
  const male = records.filter(r => r.sex === 'male').sort((a, b) => a.limit - b.limit);
  const all = [...female, ...male];

  const slides = [];

  slides.push({ type: 'overview', sex: 'female' });

  female.forEach(r => {
    slides.push({
      type: 'record',
      sex: 'female',
      record: r
    });
  });

  slides.push({ type: 'overview', sex: 'male' });

  male.forEach(r => {
    slides.push({
      type: 'record',
      sex: 'male',
      record: r
    });
  });

  let current = 0;
  let timer = null;
  let elapsedTimer = null;
  let paused = false;
  let startedAt = Date.now();

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
  const fmt = n => Number.isInteger(n) ? n.toString() : Number(n).toFixed(1);
  const chip = sex => `<span class="sex-chip"><span class="sex-dot ${sex}"></span>${sex}</span>`;
  const holder = item => item
    ? `<div class="holder"><span class="name">${esc(item.name)}</span><span class="lift">${esc(fmt(item.weight))} kg</span></div>`
    : '<span class="empty">—</span>';

  function renderOverview(sex) {
    const data = sex === 'female' ? female : male;

    const rows = data.map(r => `
    <tr>
      <td class="division">${esc(r.division)}</td>
        <td>${holder(r.bench)}</td>
        <td>${holder(r.squat)}</td>
        <td>${holder(r.deadlift)}</td>
      </tr>`).join('');

    return `
      <div class="hero overview">
        <div class="hero-grid"></div>
        <div class="hero-inner">
          <div class="title-row">
            <div>
              <div class="kicker">D’DIAL FITNESS CLUB · OFFICIAL RECORD BOARD</div>
              <div class="huge-title"><span class="accent">RECORD</span><br>BOARD</div>
            </div>
            <div class="title-meta">
              <div class="sex-label">${sex}·${data.length} WEIGHT DIVISIONS</div>
            </div>
          </div>
          <div class="overview-head" aria-hidden="true">
            <div>Weight Division / Record Holder</div>
            <div>Bench Press</div>
            <div>Squat</div>
            <div>Deadlift</div>
          </div>
          <div class="table-wrap">
            <table class="record-table">
              <thead>
                <tr>
                  <th>Division</th><th>Bench Press</th><th>Squat</th><th>Deadlift</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
          <div class="section-caption">
            <span><strong>Auto rotation</strong> · detailed division slides every 10 seconds</span>
            <span>All records shown in kilograms</span>
          </div>
        </div>
      </div>`;
  }

  function liftCard(label, icon, item) {
    return `
      <article class="lift-card">
        <div>
          <div class="card-top"><div class="lift-label">${label}</div><div class="lift-icon">${icon}</div></div>
          <div class="record-number">${fmt(item.weight)}<span class="unit">KG</span></div>
          <div class="record-name">${esc(item.name)}</div>
          <div class="record-meta">Record set · ${esc(item.date || '—')}</div>
        </div>
        <div class="record-bar"></div>
      </article>`;
  }

  function renderRecordSlide(item, sex) {
    const sexName = sex === 'female' ? 'FEMALE' : 'MALE';
    const sexColor = sex === 'female' ? 'female' : 'male';
    return `
      <div class="hero">
        <div class="hero-grid"></div>
        <div class="hero-inner">
          <div class="title-row">
            <div>
              <div class="kicker">D’DIAL FITNESS CLUB · ${sexName} RECORDS</div>
              <div class="huge-title"><span class="accent">${sexName}</span><br>DIVISION</div>
            </div>
            <div class="title-meta">
              <div class="class-label">${esc(item.division)}</div>
              <div class="sex-label"><span class="sex-chip"><span class="sex-dot ${sexColor}"></span>${sexName}</span> bodyweight class</div>
            </div>
          </div>
          <div class="record-grid">
            ${liftCard('Bench Press', 'BP', item.bench)}
            ${liftCard('Squat', 'SQ', item.squat)}
            ${liftCard('Deadlift', 'DL', item.deadlift)}
          </div>
          <div class="section-caption">
            <span><strong>Division record</strong> · current best lift on the board</span>
            <span>Presented by D’Dial Fitness Club</span>
          </div>
        </div>
      </div>`;
  }

  function buildSlideData() {
    stage.innerHTML = '';
    slides.forEach((s, index) => {
      const node = document.createElement('section');
      node.className = `slide${index === current ? ' active' : ''}`;
      node.dataset.index = index;
      if (s.type === 'overview') {
        node.innerHTML = renderOverview(s.sex);
      } else {
        node.innerHTML = renderRecordSlide(s.record, s.sex);
      }
      stage.appendChild(node);
    });
    updateLabels();
  }

  function animateTo(index, direction = 1) {
    const nodes = [...stage.querySelectorAll('.slide')];
    if (!nodes.length) return;
    const prev = current;
    current = (index + nodes.length) % nodes.length;
    nodes.forEach((node, i) => {
      node.classList.remove('active', 'exit');
      if (i === prev && i !== current) node.classList.add('exit');
    });
    requestAnimationFrame(() => nodes[current].classList.add('active'));
    updateLabels();
    startedAt = Date.now();
    if (direction !== 0 && !paused) schedule();
  }

  function updateLabels() {
    const s = slides[current];
    if (s.type === 'overview') slideLabel.textContent = 'ALL DIVISIONS';
    else slideLabel.textContent = `${s.sex.toUpperCase()} · ${s.record.division}`;
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(() => animateTo(current + 1, 1), INTERVAL_MS);
  }

  function setPaused(next) {
    paused = next;
    pauseBtn.textContent = paused ? '▶' : 'Ⅱ';
    pauseBtn.title = paused ? 'Resume rotation' : 'Pause rotation';
    if (paused) clearTimeout(timer);
    else { startedAt = Date.now(); schedule(); }
  }

  function startProgressTicker() {
    clearInterval(elapsedTimer);
    elapsedTimer = setInterval(() => {
      const elapsed = paused ? 0 : Math.min(INTERVAL_MS, Date.now() - startedAt);
      const p = paused ? 0 : elapsed / INTERVAL_MS;
      progressBar.style.transform = `scaleX(${p})`;
    }, 80);
  }

  function updateClock() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  }

  document.getElementById('prevBtn').addEventListener('click', () => animateTo(current - 1, -1));
  document.getElementById('nextBtn').addEventListener('click', () => animateTo(current + 1, 1));
  pauseBtn.addEventListener('click', () => setPaused(!paused));
  document.getElementById('fullscreenBtn').addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) { }
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') animateTo(current + 1, 1);
    if (e.key === 'ArrowLeft') animateTo(current - 1, -1);
    if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); setPaused(!paused); }
    if (e.key.toLowerCase() === 'f') document.getElementById('fullscreenBtn').click();
  });

  // Keep controls unobtrusive on TV displays.
  let hideTimer;
  const wakeControls = () => {
    controls.style.opacity = '1';
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => controls.style.opacity = '.20', 1800);
  };
  ['mousemove', 'touchstart', 'keydown'].forEach(evt => window.addEventListener(evt, wakeControls, { passive: true }));

  buildSlideData();
  schedule();
  startProgressTicker();
  updateClock();
  setInterval(updateClock, 1000);
})();
