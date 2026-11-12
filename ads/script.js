(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const duration = 40_000;
  const carnival = Date.parse('2027-02-08T00:00:00-04:00');
  let current = 0;
  let paused = false;
  let timer;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    document.getElementById('position').textContent = `${current + 1} / ${slides.length}`;
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    if (!paused) timer = setTimeout(() => show(current + 1), duration);
  }
  function updateCountdown() {
    const days = Math.max(0, Math.ceil((carnival - Date.now()) / 86_400_000));
    document.getElementById('days').textContent = String(days);
  }
  document.getElementById('prev').addEventListener('click', () => show(current - 1));
  document.getElementById('next').addEventListener('click', () => show(current + 1));
  document.getElementById('pause').addEventListener('click', event => {
    paused = !paused;
    event.currentTarget.textContent = paused ? '▶' : 'Ⅱ';
    event.currentTarget.setAttribute('aria-label', paused ? 'Resume rotation' : 'Pause rotation');
    schedule();
  });
  document.getElementById('fullscreen').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  updateCountdown();
  setInterval(updateCountdown, 60_000);
  show(0);
})();
