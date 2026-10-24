(() => {
  const INTRO_MS = 9_600;
  const HOLD_MS = 5 * 60_000;
  const poster = document.getElementById('poster');
  const remaining = document.getElementById('remaining');
  const clock = document.getElementById('clock');
  const fullscreen = document.getElementById('fullscreen');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let replayTimeout;
  let holdStarts;

  function updateClock() {
    clock.textContent = new Date().toLocaleTimeString('en-TT', {
      timeZone: 'America/Port_of_Spain', hour: 'numeric', minute: '2-digit', hour12: true
    });
  }

  function replay() {
    clearTimeout(replayTimeout);
    poster.classList.remove('is-playing');
    void poster.offsetWidth;
    poster.classList.add('is-playing');
    holdStarts = Date.now() + (reducedMotion.matches ? 0 : INTRO_MS);
    remaining.textContent = '05:00';
    replayTimeout = setTimeout(replay, (reducedMotion.matches ? 0 : INTRO_MS) + HOLD_MS);
  }

  document.getElementById('replay').addEventListener('click', replay);
  fullscreen.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (_) { /* The browser can deny fullscreen. */ }
  });
  document.addEventListener('fullscreenchange', () => {
    const active = Boolean(document.fullscreenElement);
    fullscreen.setAttribute('aria-label', active ? 'Exit fullscreen' : 'Enter fullscreen');
    fullscreen.title = active ? 'Exit fullscreen' : 'Enter fullscreen';
  });
  reducedMotion.addEventListener('change', replay);
  setInterval(() => {
    const seconds = Math.ceil(Math.max(0, HOLD_MS - Math.max(0, Date.now() - holdStarts)) / 1000);
    remaining.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }, 1000);
  updateClock();
  setInterval(updateClock, 30_000);
  replay();
})();
