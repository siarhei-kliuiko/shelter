let overlay;

function showOverlay(content = null) {
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    if (content) {
        overlay.classList.add("overlay_popup");
        overlay.append(content);
    }

    const bodyWidthWithScrollbar = document.body.clientWidth;
    document.body.classList.toggle("scroll-disable");
    const verticalScrollBarWidth = document.body.clientWidth - bodyWidthWithScrollbar;
    if (verticalScrollBarWidth) {
        document.body.style.paddingRight = verticalScrollBarWidth + "px";
    }

    document.body.prepend(overlay);
    overlay.addEventListener("click", closeOverlay);
}

function closeOverlay(event) {
        overlay.removeEventListener("click", closeOverlay);
        overlay.remove();
        document.body.classList.toggle("scroll-disable");
        document.body.style.paddingRight = "";
}