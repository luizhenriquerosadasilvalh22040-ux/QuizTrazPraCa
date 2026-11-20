// Add the business WhatsApp number with country/area code and no symbols,
// for example: "5511999999999".
const WHATSAPP_NUMBER = "5544997158781";

const screens = [...document.querySelectorAll("[data-screen]")];
const answers = {
  objective: "Aumentar as vendas",
  categories: [],
};

const questionSteps = {
  objective: 2,
  categories: 3,
  "how-it-works": 4,
  result: 5,
};

function showScreen(screenName) {
  const nextScreen = screens.find((screen) => screen.dataset.screen === screenName);
  if (!nextScreen) {
    throw new Error(`Tela do quiz não encontrada: ${screenName}`);
  }

  for (const screen of screens) {
    const isActive = screen === nextScreen;
    screen.hidden = !isActive;
    screen.classList.toggle("is-active", isActive);
  }

  if (screenName === "welcome") {
    startCarousel();
  } else {
    stopCarousel();
  }

  const screenContent = nextScreen.querySelector(".screen-top");
  if (screenContent) {
    screenContent.scrollTop = 0;
  }

  const step = questionSteps[screenName];
  if (step) {
    const percentage = `${(step / 5) * 100}%`;
    nextScreen.querySelector("[data-step-label]").textContent = `${step}/5`;
    nextScreen.querySelector("[data-progress]").style.width = percentage;
    nextScreen.querySelector("[role='progressbar']").setAttribute("aria-valuenow", String(step));
  }

  document.querySelector("[data-announcer]").textContent =
    nextScreen.querySelector("h1")?.textContent ?? "Traz Pra Cá";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function updateWhatsAppLinks() {
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  const isDirectLink = phone.length > 0;
  const messages = {
    partner: `Olá! Quero começar a vender online com o Traz Pra Cá.

Minhas respostas:
Objetivo: ${answers.objective}
Categorias: ${answers.categories.length > 0 ? answers.categories.join(", ") : "Ainda não selecionadas"}`,
    contact: "Olá! Quero saber mais sobre o Traz Pra Cá.",
  };

  for (const link of document.querySelectorAll("[data-whatsapp]")) {
    const url = new URL(isDirectLink ? `https://wa.me/${phone}` : "https://wa.me/");
    url.searchParams.set("text", messages[link.dataset.whatsapp]);
    link.href = url.toString();
  }

  const note = document.querySelector("[data-whatsapp-note]");
  note.hidden = isDirectLink;
  note.textContent = isDirectLink
    ? ""
    : "Configure o número da equipe no arquivo app.js para direcionar estas mensagens diretamente.";
}

const carouselSlides = [...document.querySelectorAll("[data-slide]")];
const carouselDots = [...document.querySelectorAll("[data-carousel-dot]")];
const carouselAnnouncer = document.querySelector("[data-carousel-announcer]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeSlide = 0;
let carouselTimer;

function showCarouselSlide(index, announce = false) {
  activeSlide = (index + carouselSlides.length) % carouselSlides.length;

  carouselSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  carouselDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });

  if (announce) {
    carouselAnnouncer.textContent = carouselSlides[activeSlide].querySelector(".carousel-caption").textContent;
  }
}

function stopCarousel() {
  window.clearInterval(carouselTimer);
}

function startCarousel() {
  stopCarousel();
  if (
    prefersReducedMotion.matches ||
    document.hidden ||
    !document.querySelector(".welcome-screen.is-active")
  ) {
    return;
  }

  carouselTimer = window.setInterval(() => {
    showCarouselSlide(activeSlide + 1);
  }, 5000);
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const carouselDot = target.closest("[data-carousel-dot]");
  if (carouselDot) {
    showCarouselSlide(Number(carouselDot.dataset.carouselDot), true);
    startCarousel();
    return;
  }

  const option = target.closest(".option-card");
  if (option) {
    const group = option.closest("[data-options]");
    if (!group) return;

    const selected = option.getAttribute("aria-pressed") !== "true";
    if (group.dataset.selectionMode === "multiple") {
      const categories = answers[group.dataset.options];
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-pressed", String(selected));
      answers[group.dataset.options] = selected
        ? [...categories, option.dataset.value]
        : categories.filter((category) => category !== option.dataset.value);
    } else {
      for (const sibling of group.querySelectorAll(".option-card")) {
        const isSelected = sibling === option;
        sibling.classList.toggle("is-selected", isSelected);
        sibling.setAttribute("aria-pressed", String(isSelected));
      }
      answers[group.dataset.options] = option.dataset.value;
    }

    updateWhatsAppLinks();
    return;
  }

  const homeLink = target.closest("[data-home]");
  if (homeLink) {
    event.preventDefault();
    showScreen("welcome");
    return;
  }

  const navigation = target.closest("[data-go]");
  if (navigation) {
    event.preventDefault();
    showScreen(navigation.dataset.go);
  }
});

document.addEventListener("visibilitychange", startCarousel);
prefersReducedMotion.addEventListener("change", startCarousel);
showCarouselSlide(0);
startCarousel();
updateWhatsAppLinks();
