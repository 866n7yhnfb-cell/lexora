// ===============================
// LEXORA v0.2
// Application Logic
// ===============================

const defaultCases = [
  {
    id: 1,
    name: "Smith v. ABC Ltd",
    type: "Гражданское дело",
    number: "",
    description: "Демонстрационное дело Lexora.",
    docs: 24,
    status: "ready",
    created: "Сегодня"
  }
];


// ===============================
// STATE
// ===============================

let cases =
  JSON.parse(localStorage.getItem("lexoraCases")) ||
  defaultCases;

let activeFilter = "all";


// ===============================
// HELPERS
// ===============================

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
}


// Защита текста от HTML
function escapeHTML(value) {

  return String(value).replace(
    /[&<>"']/g,
    function (char) {

      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return entities[char];
    }
  );
}


// Сохраняем дела
function saveCases() {

  localStorage.setItem(
    "lexoraCases",
    JSON.stringify(cases)
  );
}


// ===============================
// RENDER CASES
// ===============================

function renderCases() {

  const container = $("#cases");

  if (!container) return;

  const search =
    ($("#caseSearch")?.value || "")
      .trim()
      .toLowerCase();


  const filteredCases = cases.filter((caseItem) => {

    const filterMatch =
      activeFilter === "all" ||

      (
        activeFilter === "ready" &&
        caseItem.status === "ready"
      ) ||

      (
        activeFilter === "active" &&
        caseItem.status !== "ready"
      );


    const searchText = `
      ${caseItem.name}
      ${caseItem.type}
      ${caseItem.number || ""}
    `.toLowerCase();


    return (
      filterMatch &&
      searchText.includes(search)
    );
  });


  container.innerHTML =
    filteredCases
      .map((caseItem) => {

        const statusText =
          caseItem.status === "ready"
            ? "Анализ готов"
            : "Новое дело";


        return `

          <article class="case-card">

            <div class="case-icon">
              ⚖
            </div>


            <div class="case-info">

              <h3>
                ${escapeHTML(caseItem.name)}
              </h3>

              <p>
                ${caseItem.docs || 0}
                документов ·
                ${escapeHTML(caseItem.type)}

                ${
                  caseItem.number
                    ? ` · № ${escapeHTML(caseItem.number)}`
                    : ""
                }
              </p>


              <span class="status">

                ${statusText}

              </span>

            </div>


            <button
              class="open-btn"
              data-open-case="${caseItem.id}"
            >

              Открыть →

            </button>

          </article>

        `;
      })
      .join("");


  $("#emptyState")?.classList.toggle(
    "hidden",
    filteredCases.length !== 0
  );


  $("#allCount").textContent =
    cases.length;
}


// ===============================
// MODALS
// ===============================

function openModal(selector) {

  const modal = $(selector);

  if (!modal) return;

  modal.classList.remove("hidden");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";
}


function closeModal(selector) {

  const modal = $(selector);

  if (!modal) return;

  modal.classList.add("hidden");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  const opened =
    $$(".modal:not(.hidden)");

  if (opened.length === 0) {

    document.body.style.overflow =
      "";
  }
}


// ===============================
// INFO MODAL
// ===============================

function showInfo(
  title,
  text,
  eyebrow = "LEXORA"
) {

  $("#infoTitle").textContent =
    title;

  $("#infoText").textContent =
    text;

  $("#infoEyebrow").textContent =
    eyebrow;

  openModal("#infoModal");
}


// ===============================
// NEW CASE BUTTONS
// ===============================

[
  "#newCaseBtn",
  "#newCaseBtn2",
  "#emptyNewBtn"
]
.forEach((selector) => {

  const button = $(selector);

  if (!button) return;

  button.addEventListener(
    "click",
    () => {

      openModal("#caseModal");

      setTimeout(() => {

        $("#caseName")?.focus();

      }, 100);
    }
  );
});


// ===============================
// CLOSE MODALS
// ===============================

$$("[data-close='modal']")
.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      closeModal("#caseModal");

    }
  );

});


$$("[data-close='info']")
.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      closeModal("#infoModal");

    }
  );

});


// ===============================
// CREATE CASE
// ===============================

$("#createBtn")?.addEventListener(
  "click",
  () => {

    const name =
      $("#caseName").value.trim();


    if (!name) {

      $("#caseName").focus();

      $("#caseName").style.borderColor =
        "#ff6f82";

      return;
    }


    const newCase = {

      id: Date.now(),

      name: name,

      type:
        $("#caseType").value,

      number:
        $("#caseNumber").value.trim(),

      description:
        $("#caseDescription").value.trim(),

      docs: 0,

      status: "active",

      created: "Только что"
    };


    cases.unshift(newCase);

    saveCases();

    renderCases();

    closeModal("#caseModal");


    // Очищаем форму

    $("#caseName").value = "";

    $("#caseNumber").value = "";

    $("#caseDescription").value = "";

    $("#fileInput").value = "";


    showInfo(
      "Дело создано",
      `${name} добавлено в ваше рабочее пространство. Следующим шагом можно добавить документы и запустить AI-анализ.`,
      "NEW CASE / READY"
    );

  }
);


// ===============================
// FILE UPLOAD
// ===============================

$("#fileInput")?.addEventListener(
  "change",
  (event) => {

    const files =
      event.target.files;


    if (!files.length) return;


    const uploadTitle =
      document.querySelector(
        ".upload-box strong"
      );


    if (uploadTitle) {

      uploadTitle.textContent =
        `Выбрано файлов: ${files.length}`;

    }

  }
);


// ===============================
// SEARCH
// ===============================

$("#caseSearch")?.addEventListener(
  "input",
  () => {

    renderCases();

  }
);


// ===============================
// FILTERS
// ===============================

$$(".filter")
.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      $$(".filter")
        .forEach((item) => {

          item.classList.remove(
            "active"
          );

        });


      button.classList.add(
        "active"
      );


      activeFilter =
        button.dataset.filter;


      renderCases();

    }
  );

});


// ===============================
// OPEN CASE
// ===============================

$("#cases")?.addEventListener(
  "click",
  (event) => {

    const button =
      event.target.closest(
        "[data-open-case]"
      );


    if (!button) return;


    const id =
      button.dataset.openCase;


    const caseItem =
      cases.find(
        (item) =>
          String(item.id) ===
          String(id)
      );


    if (!caseItem) return;


    showInfo(
      caseItem.name,

      `${caseItem.type}. ${
        caseItem.docs
          ? caseItem.docs +
            " документов уже в деле."
          : "Документы пока не добавлены."
      } Здесь следующим этапом появятся документы, хронология, риски и AI Case Analysis.`,

      "CASE / WORKSPACE"
    );

  }
);


// ===============================
// DEMO AI
// ===============================

$("#demoBtn")?.addEventListener(
  "click",
  () => {

    showInfo(
      "Демо-анализ",

      "Lexora сможет собирать ключевые факты, отмечать потенциальные риски, строить хронологию и отвечать на вопросы по материалам дела.",

      "AI CASE ANALYSIS"
    );

  }
);


// ===============================
// HERO AI BUTTON
// ===============================

$("#heroAnalysisBtn")
?.addEventListener(
  "click",
  () => {

    showInfo(
      "AI Case Analysis",

      "Модуль готов для следующего этапа. Здесь появится полноценный экран анализа конкретного дела.",

      "CASE INTELLIGENCE"
    );

  }
);


// ===============================
// SEARCH BUTTON
// ===============================

$("#searchBtn")
?.addEventListener(
  "click",
  () => {

    const search =
      $("#caseSearch");

    if (!search) return;

    search.focus();

    search.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }
);


// ===============================
// TOOLS
// ===============================

const tools = {

  docs: {
    title: "Документы",

    text:
      "Здесь будет загрузка, просмотр и структурирование материалов дела."
  },


  risks: {
    title: "Поиск рисков",

    text:
      "Здесь Lexora сможет находить потенциальные проблемы, противоречия и пробелы в материалах."
  },


  timeline: {
    title: "Хронология",

    text:
      "Здесь появится интерактивная последовательность событий дела."
  },


  ai: {
    title: "AI Workspace",

    text:
      "Здесь юрист сможет задавать вопросы по делу и получать ответы с указанием источников."
  }

};


$$("[data-tool]")
.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      const tool =
        tools[
          button.dataset.tool
        ];


      if (!tool) return;


      showInfo(
        tool.title,
        tool.text,
        "LEXORA TOOLS"
      );

    }
  );

});


// ===============================
// ESCAPE KEY
// ===============================

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") return;


    $$(".modal:not(.hidden)")
      .forEach((modal) => {

        closeModal(
          "#" + modal.id
        );

      });

  }
);


// ===============================
// START APP
// ===============================

renderCases();
