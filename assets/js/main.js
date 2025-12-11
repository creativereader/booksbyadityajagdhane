/**
 * Main JavaScript File
 * Shared Header + Footer Injection
 * Theme Toggle, Mobile Menu, Dynamic Grid
 */

document.addEventListener("DOMContentLoaded", () => {

    injectHeader();
    injectFooter();

    // Re-initialize AFTER injecting header/footer
    initTheme();
    initMobileMenu();
    initScrollEffects();

    // Only for Home page:
    const grid = document.getElementById("book-grid");
    if (grid) {
        loadBooks();
        initSearch();
    }
});

/* =========================================
   Detect Path Depth (root OR /books/)
   ========================================= */
function pathPrefix() {
    return location.pathname.includes("/books/") ? "../" : "";
}

/* =========================================
   Inject Header
   ========================================= */
function injectHeader() {

    const p = pathPrefix();

    const header = `
    <header>
        <div class="container nav-container">
            <a href="${p}index.html" class="logo">
                <img src="${p}assets/images/logo-light.png" class="logo-light" width="28" height="28">
                <img src="${p}assets/images/logo-dark.png" class="logo-dark" width="28" height="28">
                <span>Books | Aditya Jagdhane</span>
            </a>

            <button class="hamburger" id="hamburger" aria-label="Menu">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <line x1="4" y1="6"  x2="20" y2="6"/>
                    <line x1="4" y1="18" x2="20" y2="18"/>
                </svg>
            </button>

            <nav class="nav-links" id="nav-links">
                <a href="${p}index.html">Home</a>
                <a href="${p}about.html">About the Author</a>
                <a href="${p}contact.html">Contact</a>
                <a href="${p}privacy.html">Privacy Policy</a>

                <div class="theme-toggle" id="theme-toggle" role="button">
                    <div class="icon-sun">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="5"/>
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.3 18.3l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.3 5.6l1.4-1.4"/>
                        </svg>
                    </div>

                    <div class="icon-moon">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>
                        </svg>
                    </div>

                    <div class="theme-toggle-thumb"></div>
                </div>
            </nav>
        </div>
    </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", header);
}

/* =========================================
   Inject Footer
   ========================================= */
function injectFooter() {
    const p = pathPrefix();

    const footer = `
    <footer>
        <div class="container">
            <p>&copy; 2025 – Books | Aditya Jagdhane. All rights reserved.</p>

            <div class="footer-links">
                <a href="${p}privacy.html">Privacy Policy</a>
            </div>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footer);
}

/* =========================================
   Theme Toggle
   ========================================= */
function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    let saved = localStorage.getItem("theme");
    let prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let theme = saved || (prefersDark ? "dark" : "light");
    html.setAttribute("data-theme", theme);

    if (toggle) {
        toggle.addEventListener("click", () => {
            theme = theme === "light" ? "dark" : "light";
            html.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        });
    }
}

/* =========================================
   Mobile Menu
   ========================================= */
function initMobileMenu() {
    const burger = document.getElementById("hamburger");
    const nav = document.getElementById("nav-links");

    if (!burger || !nav) return;

    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

/* =========================================
   Scroll Effect → Header Shadow
   ========================================= */
function initScrollEffects() {
    const header = document.querySelector("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
    });
}

/* =========================================
   Load Books
   ========================================= */
let allBooks = [];

async function loadBooks() {
    const grid = document.getElementById("book-grid");
    if (!grid) return;

    try {
        const res = await fetch("data/books.json");
        allBooks = await res.json();
        renderBooks(allBooks);
    } catch (e) {
        grid.innerHTML = `<p style="text-align:center">Unable to load books.</p>`;
    }
}

/* =========================================
   Render Books
   ========================================= */
function renderBooks(books) {
    const grid = document.getElementById("book-grid");
    grid.innerHTML = "";

    if (!books.length) {
        grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;">No books found.</p>`;
        return;
    }

    books.forEach((b, i) => {
        const el = document.createElement("article");
        el.className = "book-card";
        el.style.animationDelay = `${i * 0.1}s`;

        el.innerHTML = `
            <a href="${b.detailPage}" class="book-link-wrapper">
                <img src="${b.cover}" class="book-cover" alt="${b.title}">
            </a>
            <div class="book-content">
                <h3>${b.title}</h3>
                <p>${b.descriptionShort}</p>
                <a href="${b.detailPage}" class="btn btn-outline">View Details</a>
            </div>
        `;

        grid.appendChild(el);
    });
}

/* =========================================
   Search Function
   ========================================= */
function initSearch() {
    const input = document.getElementById("book-search");
    if (!input) return;

    input.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase();

        const filtered = allBooks.filter(b =>
            b.title.toLowerCase().includes(q) ||
            b.tags.some(t => t.toLowerCase().includes(q))
        );

        renderBooks(filtered);
    });
}
