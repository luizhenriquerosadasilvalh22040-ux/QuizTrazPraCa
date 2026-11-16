// Add the business WhatsApp number with country/area code and no symbols,
// for example: "5511999999999".
const WHATSAPP_NUMBER = "";

const screens = [...document.querySelectorAll("[data-screen]")];
const answers = {
  "question-1": "Sim, seria ótimo!",
  "question-2": "Sim, e gostaria de facilitar ainda mais",
  "question-3": "Receber mais pedidos",
};

const questionSteps = {
  "question-1": 1,
  "question-2": 2,
  "question-3": 3,
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

  const step = questionSteps[screenName];
  if (step) {
    const percentage = `${(step / 3) * 100}%`;
    nextScreen.querySelector("[data-step-label]").textContent = `${step} de 3`;
    nextScreen.querySelector("[data-progress]").style.width = percentage;
    nextScreen.querySelector(".progress-badge").style.left = percentage;
  }

  document.querySelector("[data-announcer]").textContent =
    nextScreen.querySelector("h1")?.textContent ?? "Traz Pra Cá";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateWhatsAppLinks() {
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  const isDirectLink = phone.length > 0;
  const messages = {
    partner: `Olá! Quero ser parceiro do Traz Pra Cá.

Minhas respostas:
1. ${answers["question-1"]}
2. ${answers["question-2"]}
3. ${answers["question-3"]}`,
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

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const option = target.closest(".option-card");
  if (option) {
    const group = option.closest("[data-options]");
    for (const sibling of group.querySelectorAll(".option-card")) {
      const selected = sibling === option;
      sibling.classList.toggle("is-selected", selected);
      sibling.setAttribute("aria-pressed", String(selected));
    }
    answers[group.dataset.options] = option.dataset.value;
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

updateWhatsAppLinks();
