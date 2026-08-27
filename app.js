/* =========================================================
   LEXORA — v0.2
   Основная логика интерфейса
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- СОСТОЯНИЕ ПРИЛОЖЕНИЯ ---------- */

    const state = {
        currentPage: "Полная защита",
        notifications: 3,
        protectionRunning: false,
        documents: [],
        search: ""
    };


    /* ---------- НАВИГАЦИЯ ---------- */

    const pages = [
        "Главная",
        "Мои дела",
        "Документы",
        "Анализ дела",
        "Поиск рисков",
        "Хронология",
        "Полная защита",
        "AI Workspace",
        "Шаблоны",
        "Судебная практика",
        "Законы и НПА",
        "Обучение (AI)",
        "Избранное",
        "Уведомления",
        "Статистика",
        "Поддержка",
        "Настройки"
    ];


    /* ---------- СОЗДАНИЕ СООБЩЕНИЯ ---------- */

    function showToast(message, type = "info") {

        let toast = document.createElement("div");

        toast.className = `lexora-toast ${type}`;

        toast.innerHTML = `
            <div class="toast-icon">
                ${type === "success" ? "✓" : type === "error" ? "!" : "✦"}
            </div>
            <div class="toast-text">${message}</div>
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        setTimeout(() => {
            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 300);

        }, 3000);
    }


    /* ---------- АКТИВАЦИЯ ПУНКТА МЕНЮ ---------- */

    function activateMenuItem(item, page) {

        document.querySelectorAll(".sidebar a, .sidebar button, .nav-item")
            .forEach(el => {
                el.classList.remove("active");
            });

        item.classList.add("active");

        state.currentPage = page;

        renderPage(page);
    }


    /* ---------- ПОИСК ЭЛЕМЕНТА МЕНЮ ---------- */

    function setupNavigation() {

        const elements = document.querySelectorAll(
            ".sidebar a, .sidebar button, .nav-item"
        );

        elements.forEach(item => {

            const text = item.textContent
                .replace(/\s+/g, " ")
                .trim();

            const page = pages.find(p =>
                text.toLowerCase().includes(p.toLowerCase())
            );

            if (!page) return;

            item.addEventListener("click", (event) => {

                event.preventDefault();

                activateMenuItem(item, page);
            });
        });
    }


    /* ---------- РЕНДЕР СТРАНИЦ ---------- */

    function renderPage(page) {

        const main =
            document.querySelector("main") ||
            document.querySelector(".main-content") ||
            document.querySelector(".content");

        if (!main) return;


        /*
         * Если это основная страница —
         * оставляем существующий красивый интерфейс.
         */

        if (page === "Полная защита") {

            const existing = main.querySelector(".page-full-defense");

            if (existing) {
                showOnly(main, existing);
                return;
            }

            showOnly(main, main.firstElementChild);

            return;
        }


        /*
         * Для остальных разделов создаём
         * соответствующие экраны.
         */

        let screen = document.querySelector(
            `[data-lexora-page="${page}"]`
        );

        if (!screen) {

            screen = createPage(page);

            main.appendChild(screen);
        }

        showOnly(main, screen);
    }


    /* ---------- ПОКАЗ ТОЛЬКО ОДНОЙ СТРАНИЦЫ ---------- */

    function showOnly(container, active) {

        Array.from(container.children).forEach(child => {

            if (
                child === active ||
                child.classList.contains("global-header")
            ) {
                child.style.display = "";
            } else {
                child.style.display = "none";
            }

        });

        if (active) {
            active.style.display = "";
        }
    }


    /* ---------- СОЗДАНИЕ РАЗДЕЛОВ ---------- */

    function createPage(page) {

        const section = document.createElement("section");

        section.dataset.lexoraPage = page;

        section.className = "lexora-page";

        const icons = {
            "Главная": "⌂",
            "Мои дела": "▣",
            "Документы": "▤",
            "Анализ дела": "◉",
            "Поиск рисков": "◈",
            "Хронология": "◷",
            "AI Workspace": "✦",
            "Шаблоны": "☷",
            "Судебная практика": "⚖",
            "Законы и НПА": "§",
            "Обучение (AI)": "♧",
            "Избранное": "☆",
            "Уведомления": "♢",
            "Статистика": "▥",
            "Поддержка": "?",
            "Настройки": "⚙"
        };

        section.innerHTML = `
            <div class="lexora-section-header">

                <div>
                    <div class="eyebrow">LEXORA AI</div>

                    <h1>
                        ${icons[page] || "✦"}
                        ${page}
                    </h1>

                    <p>
                        Рабочее пространство LEXORA
                        для юридической работы.
                    </p>
                </div>

                <button class="primary-button">
                    ✦ Новое действие
                </button>

            </div>

            ${getPageContent(page)}
        `;

        return section;
    }


    /* ---------- СОДЕРЖИМОЕ РАЗДЕЛОВ ---------- */

    function getPageContent(page) {

        switch (page) {

            case "Главная":

                return `
                    <div class="cards-grid">

                        <div class="dashboard-card">
                            <span class="card-icon">▣</span>
                            <h3>Мои дела</h3>
                            <strong>12</strong>
                            <p>Активных дел</p>
                        </div>

                        <div class="dashboard-card">
                            <span class="card-icon">▤</span>
                            <h3>Документы</h3>
                            <strong>148</strong>
                            <p>Загруженных файлов</p>
                        </div>

                        <div class="dashboard-card">
                            <span class="card-icon">⚠</span>
                            <h3>Риски</h3>
                            <strong>7</strong>
                            <p>Требуют внимания</p>
                        </div>

                        <div class="dashboard-card">
                            <span class="card-icon">✦</span>
                            <h3>AI-анализ</h3>
                            <strong>24</strong>
                            <p>Завершённых анализа</p>
                        </div>

                    </div>

                    <div class="lexora-panel">
                        <h2>Добро пожаловать в LEXORA</h2>
                        <p>
                            Выберите нужный раздел в боковом меню
                            или начните работу с делом.
                        </p>

                        <button
                            class="primary-button"
                            data-action="new-case"
                        >
                            + Новое дело
                        </button>
                    </div>
                `;


            case "Мои дела":

                return `
                    <div class="lexora-panel">

                        <div class="panel-title">
                            <h2>Мои дела</h2>

                            <button
                                class="primary-button"
                                data-action="new-case"
                            >
                                + Новое дело
                            </button>
                        </div>

                        <div class="case-list">

                            ${createCase(
                                "Дело № А40-12345/2024",
                                "Первая инстанция",
                                "В работе"
                            )}

                            ${createCase(
                                "Дело № 2-567/2024",
                                "Апелляция",
                                "Готово"
                            )}

                            ${createCase(
                                "Дело № А56-7890/2024",
                                "Кассация",
                                "Анализ"
                            )}

                        </div>

                    </div>
                `;


            case "Документы":

                return `
                    <div class="lexora-panel">

                        <div class="panel-title">
                            <h2>Документы</h2>

                            <button
                                class="primary-button"
                                data-action="upload"
                            >
                                ↑ Загрузить документы
                            </button>
                        </div>

                        <div class="documents-list">

                            ${createDocument(
                                "Правовая позиция.pdf",
                                "PDF • 12 страниц"
                            )}

                            ${createDocument(
                                "Возражения на иск.docx",
                                "DOCX • 8 страниц"
                            )}

                            ${createDocument(
                                "Доказательства.zip",
                                "ZIP • 5 файлов"
                            )}

                        </div>

                    </div>
                `;


            case "Анализ дела":

                return `
                    <div class="cards-grid">

                        <div class="dashboard-card">
                            <span class="card-icon">◉</span>
                            <h3>Материалы дела</h3>
                            <strong>87%</strong>
                            <p>Проанализировано</p>
                        </div>

                        <div class="dashboard-card">
                            <span class="card-icon">⚖</span>
                            <h3>Аргументы</h3>
                            <strong>18</strong>
                            <p>Найдено AI</p>
                        </div>

                        <div class="dashboard-card">
                            <span class="card-icon">⚠</span>
                            <h3>Риски</h3>
                            <strong>7</strong>
                            <p>Обнаружено</p>
                        </div>

                    </div>

                    <div class="lexora-panel">

                        <h2>AI-анализ дела</h2>

                        <div class="progress-container">
                            <div
                                class="progress-bar"
                                style="width:87%"
                            ></div>
                        </div>

                        <p>
                            AI анализирует материалы,
                            доказательства и процессуальные документы.
                        </p>

                        <button
                            class="primary-button"
                            data-action="analysis"
                        >
                            ✦ Запустить анализ
                        </button>

                    </div>
                `;


            case "Поиск рисков":

                return `
                    <div class="lexora-panel">

                        <h2>Поиск рисков</h2>

                        <div class="risk-item high">
                            <b>Высокий риск</b>
                            <p>
                                Недостаточно документальных подтверждений
                                по одному из ключевых обстоятельств.
                            </p>
                        </div>

                        <div class="risk-item medium">
                            <b>Средний риск</b>
                            <p>
                                Возможны дополнительные вопросы
                                со стороны суда.
                            </p>
                        </div>

                        <div class="risk-item low">
                            <b>Низкий риск</b>
                            <p>
                                Требуется дополнительная проверка
                                сроков и реквизитов.
                            </p>
                        </div>

                    </div>
                `;


            case "Хронология":

                return `
                    <div class="lexora-panel">

                        <h2>Хронология дела</h2>

                        <div class="timeline">

                            <div>
                                <b>12.04.2024</b>
                                <span>Подан иск</span>
                            </div>

                            <div>
                                <b>18.04.2024</b>
                                <span>Получены документы</span>
                            </div>

                            <div>
                                <b>25.04.2024</b>
                                <span>Подготовлена позиция</span>
                            </div>

                            <div>
                                <b>02.05.2024</b>
                                <span>Судебное заседание</span>
                            </div>

                        </div>

                    </div>
                `;


            case "AI Workspace":

                return `
                    <div class="lexora-panel ai-workspace">

                        <div class="ai-avatar">✦</div>

                        <h2>LEXORA AI Workspace</h2>

                        <p>
                            Ваш AI-помощник для работы
                            с юридическими материалами.
                        </p>

                        <textarea
                            placeholder="Введите вопрос или задачу..."
                        ></textarea>

                        <button
                            class="primary-button"
                            data-action="ask-ai"
                        >
                            ✦ Спросить LEXORA AI
                        </button>

                    </div>
                `;


            case "Уведомления":

                return `
                    <div class="lexora-panel">

                        <h2>Уведомления</h2>

                        <div class="notification-item">
                            <b>Новое судебное событие</b>
                            <span>Сегодня</span>
                        </div>

                        <div class="notification-item">
                            <b>AI завершил анализ дела</b>
                            <span>2 часа назад</span>
                        </div>

                        <div class="notification-item">
                            <b>Требуется загрузить документ</b>
                            <span>Вчера</span>
                        </div>

                    </div>
                `;


            case "Статистика":

                return `
                    <div class="cards-grid">

                        <div class="dashboard-card">
                            <h3>Дел</h3>
                            <strong>42</strong>
                        </div>

                        <div class="dashboard-card">
                            <h3>Документов</h3>
                            <strong>284</strong>
                        </div>

                        <div class="dashboard-card">
                            <h3>AI-анализов</h3>
                            <strong>96</strong>
                        </div>

                        <div class="dashboard-card">
                            <h3>Готовых защит</h3>
                            <strong>18</strong>
                        </div>

                    </div>
                `;


            case "Настройки":

                return `
                    <div class="lexora-panel">

                        <h2>Настройки</h2>

                        <label class="setting-row">
                            <span>
                                Уведомления
                            </span>

                            <input
                                type="checkbox"
                                checked
                            >
                        </label>

                        <label class="setting-row">
                            <span>
                                Автоматический AI-анализ
                            </span>

                            <input
                                type="checkbox"
                                checked
                            >
                        </label>

                        <label class="setting-row">
                            <span>
                                Сохранять историю действий
                            </span>

                            <input
                                type="checkbox"
                                checked
                            >
                        </label>

                    </div>
                `;


            default:

                return `
                    <div class="lexora-panel">

                        <h2>${page}</h2>

                        <p>
                            Раздел готов к работе.
                        </p>

                        <button
                            class="primary-button"
                            data-action="coming-soon"
                        >
                            Открыть раздел →
                        </button>

                    </div>
                `;
        }
    }


    /* ---------- КАРТОЧКА ДЕЛА ---------- */

    function createCase(number, type, status) {

        return `
            <div class="case-item">

                <div class="case-icon">▤</div>

                <div class="case-info">

                    <strong>${number}</strong>

                    <span>
                        ${type}
                    </span>

                </div>

                <div class="case-status">
                    ${status}
                </div>

                <button
                    class="secondary-button"
                    data-action="open-case"
                >
                    Открыть →
                </button>

            </div>
        `;
    }


    /* ---------- ДОКУМЕНТ ---------- */

    function createDocument(name, info) {

        return `
            <div class="document-item">

                <div class="document-icon">
                    ▤
                </div>

                <div class="document-info">
                    <strong>${name}</strong>
                    <span>${info}</span>
                </div>

                <button
                    class="secondary-button"
                    data-action="open-document"
                >
                    Открыть
                </button>

            </div>
        `;
    }


    /* ---------- КНОПКИ СТРАНИЦ ---------- */

    document.addEventListener("click", event => {

        const button =
            event.target.closest("[data-action]");

        if (!button) return;

        const action =
            button.dataset.action;


        /* Новое дело */

        if (action === "new-case") {

            showNewCaseModal();

            return;
        }


        /* Загрузка документов */

        if (action === "upload") {

            const input =
                document.createElement("input");

            input.type = "file";

            input.multiple = true;

            input.accept =
                ".pdf,.doc,.docx,.txt,.jpg,.png,.zip";

            input.addEventListener("change", () => {

                if (!input.files.length) return;

                Array.from(input.files).forEach(file => {
                    state.documents.push(file);
                });

                showToast(
                    `Загружено файлов: ${input.files.length}`,
                    "success"
                );

            });

            input.click();

            return;
        }


        /* Анализ */

        if (action === "analysis") {

            showToast(
                "AI-анализ дела запущен",
                "success"
            );

            return;
        }


        /* AI */

        if (action === "ask-ai") {

            showToast(
                "Запрос передан LEXORA AI",
                "success"
            );

            return;
        }


        /* Открытие дела */

        if (action === "open-case") {

            showToast(
                "Открываем дело...",
                "success"
            );

            return;
        }


        /* Документ */

        if (action === "open-document") {

            showToast(
                "Открываем документ...",
                "success"
            );

            return;
        }


        /* Скоро */

        if (action === "coming-soon") {

            showToast(
                "Раздел будет доступен в следующем обновлении"
            );

        }

    });


    /* ---------- МОДАЛЬНОЕ ОКНО НОВОГО ДЕЛА ---------- */

    function showNewCaseModal() {

        const old =
            document.querySelector(".lexora-modal");

        if (old) old.remove();


        const modal =
            document.createElement("div");

        modal.className =
            "lexora-modal";

        modal.innerHTML = `

            <div class="modal-window">

                <button class="modal-close">
                    ×
                </button>

                <div class="eyebrow">
                    LEXORA AI
                </div>

                <h2>
                    Новое дело
                </h2>

                <p>
                    Создайте новое рабочее пространство
                    для юридического дела.
                </p>

                <input
                    class="modal-input"
                    placeholder="Номер дела"
                >

                <input
                    class="modal-input"
                    placeholder="Название дела"
                >

                <select class="modal-input">

                    <option>
                        Гражданское дело
                    </option>

                    <option>
                        Арбитражное дело
                    </option>

                    <option>
                        Административное дело
                    </option>

                    <option>
                        Уголовное дело
                    </option>

                </select>

                <button
                    class="primary-button create-case-button"
                >
                    Создать дело →
                </button>

            </div>
        `;


        document.body.appendChild(modal);


        modal.querySelector(".modal-close")
            .addEventListener("click", () => {
                modal.remove();
            });


        modal.querySelector(".create-case-button")
            .addEventListener("click", () => {

                showToast(
                    "Новое дело создано",
                    "success"
                );

                modal.remove();

            });
    }


    /* ---------- ПОИСК ---------- */

    function setupSearch() {

        const search =
            document.querySelector(
                'input[type="search"], .search-input, input[placeholder*="Поиск"]'
            );

        if (!search) return;

        search.addEventListener("input", () => {

            state.search =
                search.value.toLowerCase().trim();

            if (!state.search) return;

            showToast(
                `Поиск: ${search.value}`
            );

        });
    }


    /* ---------- ПРОФИЛЬ ---------- */

    function setupProfile() {

        const profile =
            document.querySelector(
                ".profile, .user-profile, .avatar"
            );

        if (!profile) return;

        profile.addEventListener("click", () => {

            showToast(
                "Профиль John Doe"
            );

        });
    }


    /* ---------- УВЕДОМЛЕНИЯ ---------- */

    function setupNotifications() {

        const bell =
            document.querySelector(
                ".notification, .notifications, .bell"
            );

        if (!bell) return;

        bell.addEventListener("click", () => {

            state.notifications = 0;

            showToast(
                "Все уведомления просмотрены",
                "success"
            );

        });
    }


    /* ---------- ЗАПУСК ---------- */

    setupNavigation();
    setupSearch();
    setupProfile();
    setupNotifications();


    /* ---------- АКТИВНАЯ СТРАНИЦА ---------- */

    const current =
        document.querySelector(
            ".sidebar .active, .nav-item.active"
        );

    if (current) {

        const text =
            current.textContent
                .replace(/\s+/g, " ")
                .trim();

        const page =
            pages.find(p =>
                text.toLowerCase()
                    .includes(p.toLowerCase())
            );

        if (page) {
            state.currentPage = page;
        }
    }


    console.log(
        "LEXORA v0.2 запущена"
    );

});
