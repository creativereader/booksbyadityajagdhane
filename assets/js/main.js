/**
 * Main JavaScript File
 * Handles Theme Toggle, Mobile Menu, Dynamic Book Grid, and UI Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollEffects();
    
    // Only load books if we are on the home page (check for grid container)
    const bookGrid = document.getElementById('book-grid');
    if (bookGrid) {
        loadBooks();
        initSearch();
    }
});

/* =========================================
   Theme Toggle Logic
   ========================================= */
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // 1. Check LocalStorage
    const savedTheme = localStorage.getItem('theme');
    
    // 2. Check System Preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 3. Determine initial theme
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // 4. Apply Theme
    html.setAttribute('data-theme', currentTheme);
    
    // 5. Toggle Event Listener
    if (toggle) {
        toggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }
}

/* =========================================
   Mobile Menu Logic
   ========================================= */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Optional: Animate hamburger icon
            const isOpen = navLinks.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
    }
}

/* =========================================
   Scroll Effects (Navbar Shadow)
   ========================================= */
function initScrollEffects() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/* =========================================
   Dynamic Book Grid Logic
   ========================================= */
let allBooks = [];

async function loadBooks() {
    const grid = document.getElementById('book-grid');
    
    try {
        // Fetch data from local JSON file
        const response = await fetch('data/books.json');
        if (!response.ok) throw new Error('Failed to load books');
        
        allBooks = await response.json();
        renderBooks(allBooks);
        
    } catch (error) {
        console.error('Error loading books:', error);
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--text-muted);">Unable to load books. Please try again later.</p>';
    }
}

function renderBooks(books) {
    const grid = document.getElementById('book-grid');
    grid.innerHTML = ''; // Clear current content
    
    if (books.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--text-muted); padding: 2rem;">No books found matching your search.</p>';
        return;
    }

    books.forEach((book, index) => {
        const card = document.createElement('article');
        card.className = 'book-card';
        
        // Staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <a href="${book.detailPage}" class="book-link-wrapper">
                <img src="${book.cover}" alt="${book.title}" class="book-cover" loading="lazy">
            </a>
            <div class="book-content">
                <h3 class="book-title"><a href="${book.detailPage}">${book.title}</a></h3>
                <p class="book-desc">${book.descriptionShort}</p>
                <a href="${book.detailPage}" class="btn btn-outline">View Details</a>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

/* =========================================
   Search / Filter Logic
   ========================================= */
function initSearch() {
    const searchInput = document.getElementById('book-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            
            const filtered = allBooks.filter(book => 
                book.title.toLowerCase().includes(term) || 
                book.tags.some(tag => tag.toLowerCase().includes(term))
            );
            
            renderBooks(filtered);
        });
    }
}
