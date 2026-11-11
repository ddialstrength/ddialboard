(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const duration = 40_000;
  const carnival = Date.parse('2027-02-08T00:00:00-04:00');
  let current = 0;
  let paused = false;
  let timer;
  const giftSlide = document.querySelector('.gift-slide');
  const voucher = giftSlide.querySelector('.voucher');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function revealGift() {
    giftSlide.classList.remove('gift-reveal');
    if (reducedMotion.matches) return;
    // Place the first frame of the voucher over the screen, then shrink to its layout slot.
    const rect = voucher.getBoundingClientRect();
    const coverScale = Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height);
    // Keep the five-second feature view about 30% smaller and inside the arena frame.
    const scale = Math.min(coverScale * .7, window.innerWidth * .88 / rect.width, window.innerHeight * .84 / rect.height);
    giftSlide.style.setProperty('--voucher-start-x', `${window.innerWidth / 2 - (rect.left + rect.width / 2)}px`);
    giftSlide.style.setProperty('--voucher-start-y', `${window.innerHeight / 2 - (rect.top + rect.height / 2)}px`);
    giftSlide.style.setProperty('--voucher-start-scale', String(scale));
    // Restart the sequence each time rotation returns to this slide.
    void giftSlide.offsetWidth;
    giftSlide.classList.add('gift-reveal');
  }

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    if (slides[current] === giftSlide) revealGift();
    else giftSlide.classList.remove('gift-reveal');
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
