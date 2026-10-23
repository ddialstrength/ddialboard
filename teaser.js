(() => {
  const INTRO_MS = 9_900;
  const HOLD_MS = 5 * 60_000;
  const poster = document.getElementById('poster');
  const remaining = document.getElementById('remaining');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let replayTimeout;
  let holdStarts;

  function replay() {
    clearTimeout(replayTimeout);
    poster.classList.remove('is-playing');
    void poster.offsetWidth; // Restart all CSS animations, including the final exact-artwork frame.
    poster.classList.add('is-playing');
    holdStarts = Date.now() + (reducedMotion.matches ? 0 : INTRO_MS);
    remaining.textContent = '05:00';
    replayTimeout = setTimeout(replay, (reducedMotion.matches ? 0 : INTRO_MS) + HOLD_MS);
  }

  document.getElementById('replay').addEventListener('click', replay);
  reducedMotion.addEventListener('change', replay);
  setInterval(() => {
    const seconds = Math.ceil(Math.max(0, HOLD_MS - Math.max(0, Date.now() - holdStarts)) / 1000);
    remaining.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }, 1000);
  replay();
})();
