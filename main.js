document.addEventListener("DOMContentLoaded", () => {
    const memories = [
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.37 (1).jpeg",
            accent: "#ffb68a",
            alt: "Birthday memory 1"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.37 (2).jpeg",
            accent: "#ffc97a",
            alt: "Birthday memory 2"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.39 (1).jpeg",
            accent: "#ffdd9a",
            alt: "Birthday memory 3"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.39 (2).jpeg",
            accent: "#ff9ebe",
            alt: "Birthday memory 4"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.39.jpeg",
            accent: "#b4a0ff",
            alt: "Birthday memory 5"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.40 (1).jpeg",
            accent: "#8ee2ff",
            alt: "Birthday memory 6"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.40 (2).jpeg",
            accent: "#ffaac6",
            alt: "Birthday memory 7"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.40.jpeg",
            accent: "#ffd190",
            alt: "Birthday memory 8"
        }
    ];

    const motion = [
        { rotation: "-11deg", entryX: "-160px", entryY: "-80px", entryRot: "-7deg", floatX: "12px", floatY: "-15px", floatRot: "1.6deg", hoverTilt: "-1.4deg", driftDuration: "7.2s" },
        { rotation: "-5deg", entryX: "-60px", entryY: "-120px", entryRot: "-4deg", floatX: "-8px", floatY: "-13px", floatRot: "-1deg", hoverTilt: "1deg", driftDuration: "8.5s" },
        { rotation: "9deg", entryX: "150px", entryY: "-90px", entryRot: "6deg", floatX: "-10px", floatY: "-12px", floatRot: "-1.4deg", hoverTilt: "-1deg", driftDuration: "7.8s" },
        { rotation: "13deg", entryX: "180px", entryY: "20px", entryRot: "8deg", floatX: "8px", floatY: "-11px", floatRot: "1.2deg", hoverTilt: "1.4deg", driftDuration: "9.2s" },
        { rotation: "-12deg", entryX: "-170px", entryY: "110px", entryRot: "-8deg", floatX: "10px", floatY: "-14px", floatRot: "1.3deg", hoverTilt: "-1.1deg", driftDuration: "8.3s" },
        { rotation: "-6deg", entryX: "-80px", entryY: "150px", entryRot: "-5deg", floatX: "-9px", floatY: "-10px", floatRot: "-1deg", hoverTilt: "1.1deg", driftDuration: "7.4s" },
        { rotation: "5deg", entryX: "80px", entryY: "160px", entryRot: "4deg", floatX: "9px", floatY: "-14px", floatRot: "1deg", hoverTilt: "-0.8deg", driftDuration: "8.9s" },
        { rotation: "11deg", entryX: "170px", entryY: "95px", entryRot: "7deg", floatX: "-11px", floatY: "-12px", floatRot: "-1.2deg", hoverTilt: "1.2deg", driftDuration: "8.1s" },
        { rotation: "-9deg", entryX: "-120px", entryY: "10px", entryRot: "-5deg", floatX: "7px", floatY: "-10px", floatRot: "0.8deg", hoverTilt: "-0.8deg", driftDuration: "7.6s" },
        { rotation: "8deg", entryX: "120px", entryY: "-10px", entryRot: "5deg", floatX: "-7px", floatY: "-10px", floatRot: "-0.8deg", hoverTilt: "0.8deg", driftDuration: "8.7s" }
    ];

    const introOverlay = document.getElementById("introOverlay");
    const introTitle = document.getElementById("introTitle");
    const introSkip = document.getElementById("introSkip");
    const collageWrapper = document.getElementById("collageWrapper");
    const stage = document.getElementById("stage");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const fsExpand = document.getElementById("fsIconExpand");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const supportsFullscreen = "requestFullscreen" in document.documentElement || "webkitRequestFullscreen" in document.documentElement;
    let lastFocusedElement = null;
    let introDismissed = false;

    function buildIntroTitle(text) {
        introTitle.textContent = "";

        Array.from(text).forEach((character, index) => {
            if (character === " ") {
                introTitle.appendChild(document.createTextNode("\u00A0"));
                return;
            }

            const span = document.createElement("span");
            span.className = "char";
            span.style.setProperty("--delay", `${120 + index * 70}ms`);
            span.textContent = character;
            introTitle.appendChild(span);
        });
    }

    function createMemoryCard(memory, config, index) {
        const card = document.createElement("button");
        const floatLayer = document.createElement("span");
        const shell = document.createElement("span");
        const glow = document.createElement("span");
        const frame = document.createElement("span");
        const image = document.createElement("img");

        card.type = "button";
        card.className = `photo-card slot-${index + 1}`;
        card.setAttribute("aria-label", `Open birthday photo ${index + 1}`);
        card.style.setProperty("--delay", `${220 + index * 110}ms`);
        card.style.setProperty("--rotation", config.rotation);
        card.style.setProperty("--entry-x", config.entryX);
        card.style.setProperty("--entry-y", config.entryY);
        card.style.setProperty("--entry-rot", config.entryRot);
        card.style.setProperty("--float-x", config.floatX);
        card.style.setProperty("--float-y", config.floatY);
        card.style.setProperty("--float-rot", config.floatRot);
        card.style.setProperty("--hover-tilt", config.hoverTilt);
        card.style.setProperty("--drift-duration", config.driftDuration);
        card.style.setProperty("--accent", memory.accent);

        floatLayer.className = "photo-card-float";
        shell.className = "photo-card-shell";
        glow.className = "photo-card-glow";

        frame.className = "photo-frame";
        image.src = memory.src;
        image.alt = memory.alt;
        image.loading = index < 4 ? "eager" : "lazy";
        image.decoding = "async";

        image.addEventListener("load", () => card.classList.add("is-loaded"), { once: true });
        image.addEventListener("error", () => card.classList.add("is-loaded"), { once: true });

        frame.appendChild(image);
        shell.appendChild(glow);
        shell.appendChild(frame);
        floatLayer.appendChild(shell);
        card.appendChild(floatLayer);
        card.addEventListener("click", () => openLightbox(index));

        return card;
    }

    function populateMemories() {
        memories.forEach((memory, index) => {
            collageWrapper.appendChild(createMemoryCard(memory, motion[index], index));
        });
    }

    function dismissIntro() {
        if (introDismissed) {
            return;
        }

        introDismissed = true;
        document.body.classList.add("scene-live");
        introOverlay.classList.add("is-hidden");
        introOverlay.setAttribute("aria-hidden", "true");
    }

    function setStageGlow(clientX, clientY) {
        const rect = stage.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;

        stage.style.setProperty("--glow-x", `${Math.max(8, Math.min(92, x))}%`);
        stage.style.setProperty("--glow-y", `${Math.max(10, Math.min(90, y))}%`);
    }

    function resetStageGlow() {
        stage.style.setProperty("--glow-x", "52%");
        stage.style.setProperty("--glow-y", "28%");
    }

    function openLightbox(index) {
        const memory = memories[index];
        lastFocusedElement = document.activeElement;
        lightboxImg.src = memory.src;
        lightboxImg.alt = memory.alt;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
        lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightbox.classList.contains("is-open")) {
            return;
        }

        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
        lightboxImg.removeAttribute("src");

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    function toggleFullscreen() {
        const root = document.documentElement;
        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

        if (!isFullscreen) {
            const request = root.requestFullscreen || root.webkitRequestFullscreen;
            if (request) {
                const result = request.call(root);
                if (result && typeof result.catch === "function") {
                    result.catch(() => {});
                }
            }
            return;
        }

        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) {
            exit.call(document);
        }
    }

    function syncFullscreenIcon() {
        if (!supportsFullscreen) {
            fullscreenBtn.hidden = true;
            return;
        }

        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
        fsExpand.hidden = Boolean(isFullscreen);
        fullscreenBtn.hidden = Boolean(isFullscreen);
    }

    buildIntroTitle("Happy Birthday");
    populateMemories();

    if (!supportsFullscreen) {
        fullscreenBtn.hidden = true;
    }

    if (!prefersReducedMotion.matches && supportsFinePointer) {
        stage.addEventListener("pointermove", (event) => {
            setStageGlow(event.clientX, event.clientY);
        });

        stage.addEventListener("pointerleave", resetStageGlow);
    }

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    introSkip.addEventListener("click", dismissIntro);
    introOverlay.addEventListener("click", (event) => {
        if (event.target === introOverlay) {
            dismissIntro();
        }
    });

    fullscreenBtn.addEventListener("click", toggleFullscreen);
    document.addEventListener("fullscreenchange", syncFullscreenIcon);
    document.addEventListener("webkitfullscreenchange", syncFullscreenIcon);

    document.addEventListener("keydown", (event) => {
        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

        if (event.key === "Escape" && isFullscreen) {
            return;
        }

        if (event.key === "Escape") {
            if (lightbox.classList.contains("is-open")) {
                closeLightbox();
                return;
            }

            if (!introDismissed) {
                dismissIntro();
            }
        }
    });

    window.setTimeout(dismissIntro, prefersReducedMotion.matches ? 320 : 2400);
    syncFullscreenIcon();
});
