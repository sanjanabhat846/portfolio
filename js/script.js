document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector(".loading-screen");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.querySelector(".theme-toggle");
  const reveals = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".counter");
  const progressBars = document.querySelectorAll(".progress-bar span");
  const backToTop = document.querySelector(".back-to-top");
  const particleCanvas = document.getElementById("particle-canvas");

  if (loadingScreen) {
    setTimeout(() => loadingScreen.classList.add("hidden"), 650);
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });
  }

  if (themeToggle) {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      themeToggle.textContent = isLight ? "☀️" : "🌙";
      localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach((item) => observer.observe(item));

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-target") || 0);
      const duration = 1200;
      const startTime = performance.now();

      const tick = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = target === 9 ? `${value.toFixed(1)}` : `${value}`;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target === 9 ? "9.0" : `${target}`;
        }
      };

      requestAnimationFrame(tick);
    });
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    counterObserver.observe(document.querySelector(".stats-grid") || document.body);
  }

  progressBars.forEach((bar) => {
    const width = bar.getAttribute("data-width") || "85%";
    setTimeout(() => {
      bar.style.width = width;
    }, 150);
  });

  const handleScroll = () => {
    if (window.scrollY > 400) {
      backToTop?.classList.add("show");
    } else {
      backToTop?.classList.remove("show");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  if (particleCanvas) {
    const ctx = particleCanvas.getContext("2d");
    const particles = [];
    const resize = () => {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
      const count = Math.min(70, Math.floor(window.innerWidth / 18));
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * particleCanvas.width,
          y: Math.random() * particleCanvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.7 + 0.6,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > particleCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > particleCanvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Thanks for reaching out! Your message has been prepared for Sanjana.");
      contactForm.reset();
    });
  }
});