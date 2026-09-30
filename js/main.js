(() => {
  document.documentElement.classList.add("js-ready");

  const clockEl = document.getElementById("berlin-clock");

  function formatBerlinTime(date = new Date()) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Berlin",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }

  function tickClock() {
    if (!clockEl) return;
    clockEl.textContent = formatBerlinTime();
  }

  tickClock();
  window.setInterval(tickClock, 1000);

  const sections = document.querySelectorAll(".section");
  if (!sections.length) return;

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  sections.forEach((section) => observer.observe(section));
})();
