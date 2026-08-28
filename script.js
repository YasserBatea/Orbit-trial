const glow = document.querySelector(".cursor-glow");
const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".navbar nav a");
const themeToggle = document.querySelector(".theme-toggle");
const themeImages = document.querySelectorAll("[data-dark][data-light]");
const scrollProgress = document.querySelector(".scroll-progress span");

const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

const setTheme = (isLight) => {
  document.body.classList.toggle("light-mode", isLight);
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  themeToggle.querySelector(".sr-only").textContent = isLight ? "Switch to dark mode" : "Switch to light mode";
  themeImages.forEach((image) => {
    image.src = isLight ? image.dataset.light : image.dataset.dark;
  });
};

const savedTheme = localStorage.getItem("orbit-theme");
setTheme(savedTheme === "light");

themeToggle.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light-mode");
  setTheme(isLight);
  localStorage.setItem("orbit-theme", isLight ? "light" : "dark");
});

const closeMenu = () => {
  navbar.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.querySelector(".sr-only").textContent = "Open navigation menu";
};

menuToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen ? "Close navigation menu" : "Open navigation menu";
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

document.addEventListener("pointerdown", (e) => {
  if (!navbar.contains(e.target)) closeMenu();
});

window.addEventListener("pointermove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 45, 350)}ms`;
  observer.observe(el);
});

const hero = document.querySelector(".hero");
const orbitOne = document.querySelector(".orbit-one");
const orbitTwo = document.querySelector(".orbit-two");
const planet = document.querySelector(".planet");

hero.addEventListener("pointermove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  orbitOne.style.marginLeft = `${x * 20}px`;
  orbitOne.style.marginTop = `${y * 15}px`;
  orbitTwo.style.marginLeft = `${x * -30}px`;
  orbitTwo.style.marginTop = `${y * -20}px`;
  planet.style.marginLeft = `${x * -12}px`;
  planet.style.marginTop = `${y * 10}px`;
});
