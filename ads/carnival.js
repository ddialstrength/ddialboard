(() => {
  const target = Date.UTC(2027, 1, 8);
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Port_of_Spain', year: 'numeric', month: 'numeric', day: 'numeric'
  });
  const number = document.getElementById('number');
  function update() {
    const parts = Object.fromEntries(formatter.formatToParts(new Date()).map(p => [p.type, p.value]));
    const today = Date.UTC(+parts.year, +parts.month - 1, +parts.day);
    const days = Math.max(0, Math.round((target - today) / 86400000));
    if (number.dataset.days !== String(days)) {
      number.textContent = String(days);
      number.dataset.days = String(days);
      number.dataset.digits = String(days).length;
      number.setAttribute('aria-label', `${days} days until Carnival Monday`);
    }
  }
  update();
  setInterval(update, 1000);
  document.addEventListener('visibilitychange', update);
})();
