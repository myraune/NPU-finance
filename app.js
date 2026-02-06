const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("primary-nav");

if (toggle && nav) {
  const closeNav = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        closeNav();
      }
    });
  });
}

const isHome = document.body.dataset.page === "home";
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");

if (reveals.length) {
  if (!prefersReduced) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("reveal-visible"));
  }
}

if (isHome) {
  const sections = document.querySelectorAll("[data-section]");
  const storyItems = document.querySelectorAll(".storyline-item");
  const storyline = document.querySelector(".storyline");
  const storyMap = new Map();

  storyItems.forEach((item) => {
    const target = item.getAttribute("href")?.replace("#", "");
    if (target) {
      storyMap.set(target, item);
    }
  });

  if (sections.length && storyItems.length) {
    let activeId = null;
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id && id !== activeId) {
              if (activeId && storyMap.get(activeId)) {
                storyMap.get(activeId).classList.remove("is-active");
              }
              const next = storyMap.get(id);
              if (next) {
                next.classList.add("is-active");
                activeId = id;
              }
            }
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  if (storyline) {
    let ticking = false;
    const updateProgress = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollMax > 0 ? (window.scrollY / scrollMax) * 100 : 0;
      storyline.style.setProperty("--progress", `${progress}%`);
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    });

    updateProgress();
  }

  const marketTabs = document.querySelectorAll(".market-tab");
  const marketLine = document.getElementById("market-line");
  const marketLineSecondary = document.getElementById("market-line-secondary");
  const marketCaption = document.getElementById("market-caption");

  const marketData = {
    equities: {
      primary: "0,150 80,120 160,130 240,90 320,110 400,70 480,85 560,50 600,60",
      secondary: "0,160 80,150 160,155 240,130 320,145 400,120 480,130 560,105 600,110",
      caption: "Momentum improved over the past four weeks as students evaluated valuation gaps.",
    },
    fixed: {
      primary: "0,130 80,125 160,135 240,120 320,115 400,105 480,110 560,95 600,100",
      secondary: "0,150 80,148 160,150 240,145 320,140 400,135 480,138 560,130 600,128",
      caption: "Yield expectations stabilized while analysts monitored duration risk and policy signals.",
    },
    macro: {
      primary: "0,140 80,110 160,120 240,100 320,130 400,90 480,115 560,80 600,90",
      secondary: "0,160 80,140 160,145 240,130 320,150 400,120 480,138 560,110 600,118",
      caption: "Macro signals softened as teams tracked inflation, labor, and consumer momentum.",
    },
    esg: {
      primary: "0,150 80,140 160,145 240,120 320,125 400,115 480,110 560,105 600,98",
      secondary: "0,165 80,160 160,155 240,148 320,145 400,138 480,130 560,125 600,120",
      caption: "Sustainability screens tightened while impact metrics remained resilient.",
    },
    fintech: {
      primary: "0,150 80,130 160,110 240,140 320,100 400,120 480,90 560,110 600,85",
      secondary: "0,165 80,150 160,135 240,155 320,130 400,145 480,120 560,135 600,115",
      caption: "Innovation signals spiked as teams mapped platform adoption and unit economics.",
    },
  };

  const updateMarket = (key) => {
    const data = marketData[key];
    if (!data || !marketLine || !marketCaption || !marketLineSecondary) return;
    marketLine.setAttribute("points", data.primary);
    marketLineSecondary.setAttribute("points", data.secondary);
    marketCaption.textContent = data.caption;
  };

  if (marketTabs.length) {
    marketTabs.forEach((tab) => {
      const sector = tab.dataset.sector;
      if (!sector) return;
      tab.addEventListener("mouseenter", () => {
        marketTabs.forEach((btn) => btn.classList.remove("is-active"));
        tab.classList.add("is-active");
        updateMarket(sector);
      });
      tab.addEventListener("focus", () => {
        marketTabs.forEach((btn) => btn.classList.remove("is-active"));
        tab.classList.add("is-active");
        updateMarket(sector);
      });
      tab.addEventListener("click", () => {
        marketTabs.forEach((btn) => btn.classList.remove("is-active"));
        tab.classList.add("is-active");
        updateMarket(sector);
      });
    });
  }
}
