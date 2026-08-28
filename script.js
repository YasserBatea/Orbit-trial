const glow = document.querySelector(".cursor-glow");

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
