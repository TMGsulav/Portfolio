{
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

/* ===== THEME TOGGLE ===== */
{
  const toggle = document.getElementById("themeToggle");
  const moonIcon = toggle?.querySelector(".moon-icon");
  const sunIcon = toggle?.querySelector(".sun-icon");

  function setTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    if (moonIcon) moonIcon.style.display = isDark ? "none" : "block";
    if (sunIcon) sunIcon.style.display = isDark ? "block" : "none";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // Load saved preference
  const saved = localStorage.getItem("theme");
  if (saved === "dark") setTheme(true);

  if (toggle) {
    toggle.addEventListener("click", () => {
      setTheme(!document.body.classList.contains("dark"));
    });
  }
}

{
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = ["home", "about", "work", "projects", "contact"];

  function onScroll() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 30);

    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const threshold = window.innerWidth < 768 ? 80 : 120;
      if (rect.top <= threshold && rect.bottom >= threshold) {
        navLinks.forEach((l) => l.classList.toggle("active", l.dataset.target === id));
        break;
      }
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

{
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      })
    );
  }
}

const projectsData = [
  {
    title: "ScraperStack",
    image: "assets/scraper.svg",
    desc: "Scrapes beauty product data from Bluemercury, Macy's, and NARS — handling JS-rendered pages, pagination loops, and aggressive rate limits. Outputs clean CSVs with pricing, stock status, and reviews via Apify.",
    tags: ["Apify", "Python", "XPath"],
    emoji: "🕷️",
  },
  {
    title: "RideReserve",
    image: "assets/ride.svg",
    desc: "Multi-page car booking platform with form validation, a responsive gallery, and an auth flow. Uses localStorage to persist user sessions and booking data across pages.",
    tags: ["HTML", "CSS", "JavaScript"],
    emoji: "🚗",
  },
  {
    title: "OtakuVerse",
    image: "assets/otaku.svg",
    desc: "Anime community landing page with layered CSS animations, a custom scroll-triggered character gallery, and a theme-switcher that cycles through color palettes inspired by popular series.",
    tags: ["HTML", "CSS", "Animation"],
    emoji: "⛩️",
  },
  {
    title: "BlockCraft",
    image: "assets/blockcraft.svg",
    desc: "Minecraft-themed landing page with a pixel-art style guide, custom blocky UI components, and a resource pack showcase. Built as a fun crossover between game culture and responsive web design.",
    tags: ["HTML", "CSS"],
    emoji: "⛏️",
  },
  {
    title: "TriviaArena",
    image: "assets/trivia.svg",
    desc: "A timed quiz engine with three difficulty tiers, a scoring system that tracks streaks, and a results dashboard. Questions load from a local bank with shuffle and replay support.",
    tags: ["JavaScript", "Logic"],
    emoji: "🎮",
  },
  {
    title: "PyLab",
    image: "assets/pylab.svg",
    desc: "A growing collection of Python experiments — a CLI todo app, an automated file organizer, a weather fetcher using public APIs, and a terminal-based snake game. Each script is self-contained with inline docs.",
    tags: ["Python", "CLI"],
    emoji: "🐍",
  },
];

const projectsGrid = document.getElementById("projectsGrid");
if (projectsGrid) {
  projectsGrid.innerHTML = projectsData
    .map(
      (p, i) => `
    <article class="project-card obs" style="transition-delay:${i * 80}ms">
      <div class="project-visual">
        <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
        <span class="project-emoji">${p.emoji}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-meta">${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}</div>
      </div>
    </article>`
    )
    .join("");
}

{
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("vis");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".obs").forEach((el) => observer.observe(el));
}

{
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      if (btnText) btnText.textContent = "Sending...";
      submitBtn.style.pointerEvents = "none";

      fetch(form.action, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network error");
          if (btnText) btnText.textContent = "Sent! Thanks.";
        })
        .catch(() => {
          if (btnText) btnText.textContent = "Failed — try again";
          submitBtn.style.borderColor = "#e85d3a";
          submitBtn.style.color = "#e85d3a";
        });

      setTimeout(() => {
        if (btnText) btnText.textContent = "Send message";
        submitBtn.style.pointerEvents = "";
        submitBtn.style.borderColor = "";
        submitBtn.style.color = "";
        form.reset();
      }, 4000);
    });
  }
}

{
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}
