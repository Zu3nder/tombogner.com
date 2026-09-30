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
    video.loop = true;
    video.muted = true;

    const startAt =
      video.id === "showreel" && Number.isFinite(Number(video.dataset.startAt))
        ? Number(video.dataset.startAt)
        : video.id === "showreel"
          ? 0.812
          : 0;

    const seekToStart = () => {
      if (!startAt || !Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }
      video.currentTime = video.duration * startAt;
    };

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

    video.addEventListener("ended", () => {
      seekToStart();
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    });

    // Keep native loop from jumping back to 0 for the showreel start offset
    if (startAt > 0) {
      video.loop = false;
      video.addEventListener("timeupdate", () => {
        if (
          Number.isFinite(video.duration) &&
          video.duration > 0 &&
          video.currentTime >= video.duration - 0.08
        ) {
          seekToStart();
          if (video.paused) {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.catch(() => {});
            }
          }
        }
      });
    }

    const tryPlay = () => {
      seekToStart();
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    if (video.hasAttribute("autoplay") || video.id === "showreel") {
      if (video.readyState >= 1) tryPlay();
      else video.addEventListener("loadedmetadata", tryPlay, { once: true });
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
