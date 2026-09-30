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

  if (clockEl) {
    tickClock();
    window.setInterval(tickClock, 1000);
  }

  function enhanceVideo(video) {
    const showControls = () => {
      video.controls = true;
    };
    const hideControls = () => {
      video.controls = false;
    };

    video.addEventListener("pointerenter", showControls);
    video.addEventListener("pointerleave", hideControls);
    video.addEventListener("focus", showControls);
    video.addEventListener("blur", hideControls);

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    if (video.hasAttribute("autoplay")) {
      if (video.readyState >= 2) tryPlay();
      else video.addEventListener("loadeddata", tryPlay, { once: true });
    }
  }

  document
    .querySelectorAll("video#showreel, video.case-video")
    .forEach(enhanceVideo);

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
