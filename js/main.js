(() => {
  document.documentElement.classList.add("js-ready");

  const clockEl = document.getElementById("berlin-clock");
  const showreel = document.getElementById("showreel");

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

  if (showreel) {
    const showControls = () => {
      showreel.controls = true;
    };
    const hideControls = () => {
      showreel.controls = false;
    };

    showreel.addEventListener("pointerenter", showControls);
    showreel.addEventListener("pointerleave", hideControls);
    showreel.addEventListener("focus", showControls);
    showreel.addEventListener("blur", hideControls);

    // Ensure autoplay after metadata is ready (some browsers need play())
    const tryPlay = () => {
      const playPromise = showreel.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };
    if (showreel.readyState >= 2) tryPlay();
    else showreel.addEventListener("loadeddata", tryPlay, { once: true });
  }

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
