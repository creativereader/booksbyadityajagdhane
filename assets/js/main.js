/**
 * Main JavaScript File
 * Loads header.html + footer.html
 * Handles Theme Toggle, Mobile Menu, Dynamic Grid
 */

document.addEventListener("DOMContentLoaded", async () => {

    await loadHeaderFooter();   // Header + Footer injected first

    initMobileMenu();
    initScrollEffects();

    // Load books only on home page
    if (document.getElementById("book-grid")) {
        loadBooks();
        initSearch();
    }

});

/* =========================================
   Detect correct path (root OR /books/)
========================================= */
function pathPrefix() {
    return location.pathname.includes("/books/") ? "../" : "";
}

/* =========================================
   Load Header + Footer from external HTML files
========================================= */
async function loadHeaderFooter() {
    const prefix = pathPrefix();

    // ----- Load Header -----
    try {
        const headerHTML = await fetch(`${prefix}header.html`).then(r => r.text());
        document.body.insertAdjacentHTML("afterbegin", headerHTML);

        // ⭐ IMPORTANT LINE — THEME FIX ⭐
        initTheme();    
        
    } catch (e) {
        console.error("Header load failed:", e);
    }

    // ----- Load Footer -----
    try {
        const footerHTML = await fetch(`${prefix}footer.html`).then(r => r.text());
        document.body.insertAdjacentHTML("beforeend", footerHTML);
    } catch (e) {
        console.error("Footer load failed:", e);
    }
}

/* =========================================
   THEME TOGGLE
========================================= */
function initTheme() {
    const html = document.documentElement;

    let saved = localStorage.getItem("theme");
    let prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let theme = saved || (prefersDark ? "dark" : "light");
    html.setAttribute("data-theme", theme);

    // dynamic header → event delegation
    document.addEventListener("click", (e) => {
        if (e.target.closest("#theme-toggle")) {
            theme = theme === "light" ? "dark" : "light";
            html.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    });
}

/* =========================================
   MOBILE MENU
========================================= */
function initMobileMenu() {
    document.addEventListener("click", e => {
        const burger = document.getElementById("hamburger");
        const nav = document.getElementById("nav-links");

        if (!burger || !nav) return;

        if (e.target.closest("#hamburger")) {
            nav.classList.toggle("active");
        }
    });
}

/* =========================================
   HEADER SHADOW
========================================= */
function initScrollEffects() {
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 10);
    });
}

/* =========================================
   LOAD BOOKS
========================================= */
let allBooks = [];

async function loadBooks() {
    try {
        const res = await fetch("data/books.json");
        allBooks = await res.json();
        renderBooks(allBooks);
    } catch (e) {
        document.getElementById("book-grid").innerHTML =
            `<p style="text-align:center">Unable to load books.</p>`;
    }
}

/* =========================================
   RENDER BOOK CARDS
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
   SEARCH
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
