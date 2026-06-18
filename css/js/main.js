const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const tabButtons = document.querySelectorAll(".tab-btn");
const galleryImage = document.getElementById("galleryImage");
const galleryTitle = document.getElementById("galleryTitle");
const galleryCaption = document.getElementById("galleryCaption");

function updateNavbar() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!galleryImage || !galleryTitle || !galleryCaption) return;

    tabButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    galleryImage.style.opacity = "0";
    window.setTimeout(() => {
      galleryImage.src = button.dataset.image;
      galleryImage.alt = `${button.dataset.title} screenshot`;
      galleryTitle.textContent = button.dataset.title;
      galleryCaption.textContent = button.dataset.caption;
      galleryImage.style.opacity = "1";
    }, 180);
  });
});

function animateCounter(element) {
  const target = Number.parseInt(element.dataset.target, 10);
  if (!Number.isFinite(target) || element.dataset.animated === "true") return;

  element.dataset.animated = "true";
  let current = 0;
  const steps = 44;
  const increment = Math.max(1, Math.ceil(target / steps));

  const timer = window.setInterval(() => {
    current = Math.min(target, current + increment);
    element.textContent = String(current);
    if (current >= target) window.clearInterval(timer);
  }, 24);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll(".stat-num").forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.35 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) statsObserver.observe(statsSection);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});
