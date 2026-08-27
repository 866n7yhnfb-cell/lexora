const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* =========================
   SIDEBAR
========================= */

document.querySelectorAll(".nav-item").forEach(item => {

  item.addEventListener("click", () => {

    document.querySelectorAll(".nav-item")
      .forEach(x => x.classList.remove("active"));

    item.classList.add("active");

    const name = item.querySelector("span:not(.nav-icon)")?.textContent;

    if (name) {
      showToast(`Раздел «${name}» открыт`);
    }

  });

});


/* =========================
   SEARCH
========================= */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {

    const query = searchInput.value.trim();

    if (!query) {
      showToast("Введите запрос для поиска");
      return;
    }

    showToast(`Поиск: ${query}`);

  }

});


/* =========================
   NOTIFICATIONS
========================= */

document
  .getElementById("notificationButton")
  .addEventListener("click", () => {

    showToast("У вас 3 новых уведомления");

  });


/* =========================
   HERO GENERATE
========================= */

document
  .getElementById("generateButton")
  .addEventListener("click", startDefense);


/* =========================
   AI BUTTON
========================= */

document
  .getElementById("startAI")
  .addEventListener("click", startDefense);


function startDefense() {

  const button = document.getElementById("startAI");
  const heroButton = document.getElementById("generateButton");

  button.disabled = true;
  heroButton.disabled = true;

  button.textContent = "⟳  Анализ материалов...";

  showToast("Lexora AI начал анализ дела");

  const steps = document.querySelectorAll(".progress-step");

  steps.forEach(step => {
    step.classList.remove("active");
  });

  steps[0].classList.add("active");


  setTimeout(() => {

    steps[0].classList.remove("active");
    steps[1].classList.add("active");

    button.textContent = "⟳  Формирование стратегии...";

  }, 1800);


  setTimeout(() => {

    steps[1].classList.remove("active");
    steps[2].classList.add("active");

    button.textContent = "⟳  Подготовка документов...";

  }, 3600);


  setTimeout(() => {

    steps[2].classList.remove("active");
    steps[3].classList.add("active");

    button.disabled = false;
    heroButton.disabled = false;

    button.textContent = "✓  AI-защита подготовлена";

    showToast(
      "Подготовлен проект комплекта материалов"
    );

  }, 5400);

}


/* =========================
   FILE UPLOAD
========================= */

const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");

uploadButton.addEventListener("click", () => {
  fileInput.click();
});


fileInput.addEventListener("change", () => {

  const files = [...fileInput.files];

  if (!files.length) {
    return;
  }

  const names = files.map(file => file.name);

  showToast(
    `Загружено документов: ${names.length}`
  );

  uploadButton.textContent =
    `Документы загружены (${names.length}) ✓`;

});


/* =========================
   SELECTS
========================= */

document
  .getElementById("defenseType")
  .addEventListener("change", event => {

    showToast(
      `Тип защиты: ${event.target.value}`
    );

  });


document
  .getElementById("instance")
  .addEventListener("change", event => {

    showToast(
      `Инстанция: ${event.target.value}`
    );

  });


/* =========================
   PRO BUTTON
========================= */

document
  .querySelector(".pro-button")
  .addEventListener("click", () => {

    showToast("Lexora PRO скоро будет доступен");

  });


/* =========================
   CASE BUTTONS
========================= */

document
  .querySelectorAll(".open-button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const row = button.closest(".case-row");

      const title =
        row.querySelector(".case-info strong").textContent;

      showToast(`Открываем ${title}`);

    });

  });


/* =========================
   ALL CASES
========================= */

document
  .querySelector(".secondary-button")
  .addEventListener("click", () => {

    showToast("Открыт список всех защит");

  });
