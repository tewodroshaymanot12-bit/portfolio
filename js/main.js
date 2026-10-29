// ===== 1. Dark / light mode =====
const root = document.documentElement;          // the <html> tag
const themeBtn = document.getElementById("theme-toggle");

// Read the saved choice. try/catch stops errors if storage is blocked.
function getSavedTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (e) {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem("theme", theme);
    } catch (e) {
        // Not saving is fine; the theme still changes for this visit.
    }
}

// Apply a theme and update the button's icon and label
function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
        themeBtn.innerHTML = "&#9728;";             // sun icon
        themeBtn.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeBtn.innerHTML = "&#9790;";             // moon icon
        themeBtn.setAttribute("aria-label", "Switch to dark mode");
    }
}

// Start with the saved choice, or the device's own setting
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(getSavedTheme() || (prefersDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
});

// ===== 2. Mobile hamburger menu =====
const menuBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("nav-menu");

function setMenu(open) {
    menu.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => {
    setMenu(!menu.classList.contains("open"));
});

// Close the menu after tapping a link
menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

// Close the menu with the Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
});

// ===== 3. Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();