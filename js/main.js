/* YAZ MEDIA — shared behaviors (no dependencies; Bootstrap bundle handles nav/modal/carousel/accordion) */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Navbar: compact + darker after scrolling past the fold of the brand bar */
  const navbar = document.querySelector(".ym-navbar");
  if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Active nav link based on current page */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".ym-navbar .nav-link").forEach((a) => {
    const target = a.getAttribute("href");
    if (target === here) a.classList.add("active");
  });

  /* Reveal-on-scroll (skipped entirely under reduced motion — CSS keeps items visible) */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* Animated stat counters */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          io2.unobserve(el);
          const end = parseInt(el.dataset.count, 10) || 0;
          const suffix = el.dataset.suffix || "";
          const dur = 1400;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => io2.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = (el.dataset.count || "") + (el.dataset.suffix || "");
    });
  }

  /* Portfolio filtering */
  const filterBtns = document.querySelectorAll("[data-filter]");
  const workCards = document.querySelectorAll("[data-cat]");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      workCards.forEach((card) => {
        const show = f === "all" || card.dataset.cat === f;
        card.closest(".work-grid-item, .work-card")?.classList.toggle("d-none", !show);
      });
    });
  });

  /* Showreel modal: play local file if present, otherwise show a clear fallback */
  const reelModal = document.getElementById("reelModal");
  if (reelModal) {
    const video = reelModal.querySelector(".reel-video");
    const fallback = reelModal.querySelector(".reel-fallback");
    reelModal.addEventListener("show.bs.modal", () => {
      fallback.style.display = "none";
      video.style.display = "block";
      video.src = "assets/showreel.mp4"; // drop your reel here to replace the placeholder
      video.play().catch(() => {
        video.style.display = "none";
        fallback.style.display = "flex";
      });
    });
    reelModal.addEventListener("hidden.bs.modal", () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    });
  }

  /* Contact form: front-end validation + honest demo success message */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      form.classList.remove("was-validated");
      const done = document.getElementById("formSuccess");
      form.reset();
      if (done) {
        done.classList.remove("d-none");
        done.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
