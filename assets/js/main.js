/**
 * Main JavaScript File
 * Adds Shared Header + Footer
 * Handles Theme Toggle, Mobile Menu, Dynamic Book Grid, and UI Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    injectHeader();
    injectFooter();

    initTheme();
    initMobileMenu();
    initScrollEffects();

    // Only load books on Home page
    const bookGrid = document.getElementById('book-grid');
    if (bookGrid) {
        loadBooks();
        initSearch();
    }
});

/* =========================================
   Inject Header into all pages
   ========================================= */
function injectHeader() {
    const headerHTML = `
    <header>
        <div class="container nav-container">
            <a href="index.html" class="logo">
                <img src="assets/images/logo-light.png" class="logo-light" alt="Logo" width="28" height="28">
                <img src="assets/images/logo-dark.png" class="logo-dark" alt="Logo" width="28" height="28">
                <span>Books | Aditya Jagdhane</span>
            </a>

            <button class="hamburger" id="hamburger" aria-label="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>
                </svg>
            </button>

            <nav class="nav-links" id="nav-links">
                <a href="index.html">Home</a>
                <a href="about.html">About the Author</a>
                <a href="contact.html">Contact</a>
                <a href="privacy-policy.html">Privacy Policy</a>

                <div class="theme-toggle" id="theme-toggle" role="button" aria-label="Toggle Dark Mode">
                    <div class="icon-sun">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="5"/>
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                        </svg>
                    </div>
                    <div class="icon-moon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    </div>
                    <div class="theme-toggle-thumb"></div>
                </div>
            </nav>
        </div>
    </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", headerHTML);
}

/* =========================================
   Inject Footer into all pages
   ========================================= */
function injectFooter() {
    const footerHTML = `
    <footer>
        <div class="container">
            <p>&copy; 2025 – Books | Aditya Jagdhane. All rights reserved.</p>
            <div class="social-links">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>

                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>

                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>

                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            </div>

            <div style="margin-top: 1.5rem; font-size: 0.85rem;">
                <a href="privacy-policy.html" style="color: var(--text-light);">Privacy Policy</a>
            </div>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footerHTML);
}

/* =========================================
   Theme Toggle Logic
   ========================================= */
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let theme = saved || (prefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', theme);

    if (toggle) {
        toggle.addEventListener('click', () => {
            theme = theme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }
}

/* =========================================
   Mobile Menu
   ========================================= */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

/* =========================================
   Scroll Effects
   ========================================= */
function initScrollEffects() {
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        });
    }
}

/* =========================================
   Books Loading
   ========================================= */
let allBooks = [];

async function loadBooks() {
    const grid = document.getElementById('book-grid');

    try {
        const res = await fetch('data/books.json');
        allBooks = await res.json();
        renderBooks(allBooks);
    } catch (err) {
        grid.innerHTML = `<p style="text-align:center;color:var(--text-muted);">Unable to load books.</p>`;
    }
}

function renderBooks(books) {
    const grid = document.getElementById('book-grid');
    grid.innerHTML = "";

    if (!books.length) {
        grid.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:2rem;">No books found.</p>`;
        return;
    }

    books.forEach((b, i) => {
        const card = document.createElement("article");
        card.className = "book-card";
        card.style.animationDelay = `${i * 0.1}s`;

        card.innerHTML = `
            <a href="${b.detailPage}" class="book-link-wrapper">
                <img src="${b.cover}" alt="${b.title}" class="book-cover" loading="lazy">
            </a>
            <div class="book-content">
                <h3 class="book-title"><a href="${b.detailPage}">${b.title}</a></h3>
                <p class="book-desc">${b.descriptionShort}</p>
                <a href="${b.detailPage}" class="btn btn-outline">View Details</a>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* =========================================
   Search
   ========================================= */
function initSearch() {
    const input = document.getElementById('book-search');

    if (!input) return;

    input.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();

        const filtered = allBooks.filter(b =>
            b.title.toLowerCase().includes(term) ||
            b.tags.some(t => t.toLowerCase().includes(term))
        );

        renderBooks(filtered);
    });
}
