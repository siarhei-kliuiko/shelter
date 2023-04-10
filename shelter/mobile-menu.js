const MENU = document.querySelector(".nav-menu");
const BURGER = document.querySelector(".burger");
let currentMenuTheme = BURGER.classList.contains("burger_dark") ? "nav-menu_mobile_bright" : "nav-menu_mobile_dark";
toggleMobileMenu(BURGER.offsetWidth);

BURGER.addEventListener("click", toggleMobileMenuVisibility);

MENU.addEventListener("transitionstart", (event) => {
    if (event.target === MENU && event.propertyName === "width") {
        if (MENU.classList.contains("nav-menu_mobile") && MENU.offsetWidth < 10 && BURGER.offsetWidth) {
            console.log(MENU.offsetWidth);
            setMobileMenuTheme();
            MENU.addEventListener("click", menuElementClicked);
        }

        BURGER.removeEventListener("click", toggleMobileMenuVisibility);
    }
});

function setMobileMenuTheme() {
    if (BURGER.classList.contains("burger_dark")) {
        currentMenuTheme = Math.round(Math.random()) ? "nav-menu_mobile_bright" : "nav-menu_mobile_dark";
        if (currentMenuTheme === "nav-menu_mobile_dark") {
            BURGER.classList.add("burger_bright");
        }
    } else {
        currentMenuTheme = "nav-menu_mobile_dark";
    }

    MENU.classList.add(currentMenuTheme);
}

function unSetMobileMenuTheme() {
    if (BURGER.classList.contains("burger_dark")) {
        BURGER.classList.remove("burger_bright");
    }

    MENU.classList.remove(currentMenuTheme);
}

function menuElementClicked(event) {
    if (event.target.closest(".nav-link")) {
        toggleMobileMenuVisibility();
    }
}

MENU.addEventListener("transitionend", (event) => {
    if (event.target === MENU && event.propertyName === "width") {
        if (!MENU.offsetWidth && BURGER.offsetWidth) {
            unSetMobileMenuTheme();
            MENU.removeEventListener("click", menuElementClicked);
        }

        BURGER.addEventListener("click", toggleMobileMenuVisibility);
    }
});

function toggleMobileMenuVisibility() {
    BURGER.removeEventListener("click", toggleMobileMenuVisibility);
    MENU.classList.toggle("nav-menu_hidden");
    BURGER.classList.toggle("burger_rotated");
    if (overlay) {
        removeOverlay();
    } else {
        showOverlay(null, mobileMenuOverlayClicked);
    }
}

function mobileMenuOverlayClicked() {
    toggleMobileMenuVisibility();
}

BURGER.addEventListener("transitionend", (event) => {
    if (event.target === BURGER && event.propertyName === "width") {
        toggleMobileMenu(BURGER.offsetWidth);
    }
});

BURGER.addEventListener("transitionstart", (event) => {
    if (event.target === BURGER && event.propertyName === "width" && BURGER.offsetWidth) {
        MENU.classList.add("nav-menu_hidden");
        BURGER.classList.remove("burger_rotated");
        if (overlay) {
            removeOverlay();
        }
    }
});

function removeOverlay() {
    overlay.removeEventListener("click", mobileMenuOverlayClicked);
    closeOverlay();
}

function toggleMobileMenu(burgerWidth) {
    if (burgerWidth) {
        MENU.classList.add("nav-menu_hidden");
        MENU.classList.add("nav-menu_mobile");
    } else {
        MENU.removeEventListener("click", menuElementClicked);
        MENU.classList.remove("nav-menu_mobile");
        MENU.classList.remove("nav-menu_hidden");
        unSetMobileMenuTheme();
        BURGER.classList.remove("burger_rotated");
    }
}