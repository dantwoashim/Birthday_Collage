document.addEventListener("DOMContentLoaded", () => {
    const memories = [
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.37 (1).jpeg",
            accent: "#ebb689",
            alt: "Birthday memory 1"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.37 (2).jpeg",
            accent: "#efd199",
            alt: "Birthday memory 2"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.39 (1).jpeg",
            accent: "#d7a2b0",
            alt: "Birthday memory 3"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.39 (2).jpeg",
            accent: "#8fc4d0",
            alt: "Birthday memory 4"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.39.jpeg",
            accent: "#efc38f",
            alt: "Birthday memory 5"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.40 (1).jpeg",
            accent: "#d89a94",
            alt: "Birthday memory 6"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.40 (2).jpeg",
            accent: "#93c2cf",
            alt: "Birthday memory 7"
        },
        {
            src: "img/WhatsApp Image 2026-03-28 at 16.02.40.jpeg",
            accent: "#f2d9b6",
            alt: "Birthday memory 8"
        }
    ];

    const motion = [
        { rotation: "-9deg", entryX: "-160px", entryY: "-104px", entryRot: "-8deg", floatX: "8px", floatY: "-10px", floatRot: "0.9deg", hoverTilt: "-0.9deg", driftDuration: "10.8s" },
        { rotation: "-4deg", entryX: "-88px", entryY: "-128px", entryRot: "-5deg", floatX: "-6px", floatY: "-9px", floatRot: "-0.7deg", hoverTilt: "0.7deg", driftDuration: "12.4s" },
        { rotation: "7deg", entryX: "152px", entryY: "-118px", entryRot: "5deg", floatX: "-7px", floatY: "-8px", floatRot: "-0.8deg", hoverTilt: "-0.8deg", driftDuration: "11.2s" },
        { rotation: "10deg", entryX: "214px", entryY: "-16px", entryRot: "7deg", floatX: "8px", floatY: "-8px", floatRot: "0.8deg", hoverTilt: "0.9deg", driftDuration: "13.1s" },
        { rotation: "-10deg", entryX: "-182px", entryY: "128px", entryRot: "-8deg", floatX: "7px", floatY: "-9px", floatRot: "0.9deg", hoverTilt: "-0.8deg", driftDuration: "11.6s" },
        { rotation: "-4deg", entryX: "-96px", entryY: "168px", entryRot: "-5deg", floatX: "-7px", floatY: "-8px", floatRot: "-0.7deg", hoverTilt: "0.8deg", driftDuration: "10.9s" },
        { rotation: "4deg", entryX: "96px", entryY: "176px", entryRot: "5deg", floatX: "6px", floatY: "-8px", floatRot: "0.7deg", hoverTilt: "-0.7deg", driftDuration: "12.1s" },
        { rotation: "9deg", entryX: "196px", entryY: "112px", entryRot: "7deg", floatX: "-8px", floatY: "-9px", floatRot: "-0.8deg", hoverTilt: "0.8deg", driftDuration: "11.7s" }
    ];

    const introOverlay = document.getElementById("introOverlay");
    const introTitle = document.getElementById("introTitle");
    const introSkip = document.getElementById("introSkip");
    const collageWrapper = document.getElementById("collageWrapper");
    const stage = document.getElementById("stage");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const particleLayerBack = document.getElementById("particleLayerBack");
    const particleLayerMid = document.getElementById("particleLayerMid");
    const particleLayerFront = document.getElementById("particleLayerFront");
    const glintLayer = document.getElementById("glintLayer");
    const fullscreenHint = document.getElementById("fullscreenHint");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const supportsFullscreen = Boolean(
        document.documentElement.requestFullscreen ||
        document.documentElement.webkitRequestFullscreen
    );

    let lastFocusedElement = null;
    let introDismissed = false;
    let fullscreenHintDismissed = !supportsFullscreen;

    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    function pick(values) {
        return values[Math.floor(Math.random() * values.length)];
    }

    function getFullscreenElement() {
        return document.fullscreenElement || document.webkitFullscreenElement || null;
    }

    function buildIntroTitle(text) {
        introTitle.textContent = "";

        Array.from(text).forEach((character, index) => {
            if (character === " ") {
                introTitle.appendChild(document.createTextNode("\u00A0"));
                return;
            }

            const span = document.createElement("span");
            span.className = "char";
            span.style.setProperty("--delay", `${120 + index * 68}ms`);
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

        image.alt = memory.alt;
        image.loading = index < 4 ? "eager" : "lazy";
        image.decoding = "async";

        image.addEventListener("load", () => card.classList.add("is-loaded"), { once: true });
        image.addEventListener("error", () => card.classList.add("is-loaded"), { once: true });
        image.src = memory.src;

        if (image.complete) {
            card.classList.add("is-loaded");
        }

        frame.appendChild(image);
        shell.append(glow, frame);
        floatLayer.appendChild(shell);
        card.appendChild(floatLayer);
        card.addEventListener("click", () => openLightbox(index));

        return card;
    }

    function populateMemories() {
        const fragment = document.createDocumentFragment();

        memories.forEach((memory, index) => {
            fragment.appendChild(createMemoryCard(memory, motion[index], index));
        });

        collageWrapper.textContent = "";
        collageWrapper.appendChild(fragment);
    }

    function createParticles(container, count, options) {
        const fragment = document.createDocumentFragment();

        for (let index = 0; index < count; index += 1) {
            const particle = document.createElement("span");
            const size = randomBetween(options.size[0], options.size[1]);
            const duration = randomBetween(options.duration[0], options.duration[1]);
            const roll = Math.random();
            let variant = "particle-mote";

            if (roll < 0.18) {
                variant = "particle-glow";
            } else if (roll > 0.72) {
                variant = "particle-spark";
            }

            particle.className = `particle ${variant}`;
            particle.style.setProperty("--left", `${randomBetween(options.left[0], options.left[1]).toFixed(2)}%`);
            particle.style.setProperty("--top", `${randomBetween(options.top[0], options.top[1]).toFixed(2)}%`);
            particle.style.setProperty("--size", `${size.toFixed(2)}px`);
            particle.style.setProperty("--duration", `${duration.toFixed(2)}s`);
            particle.style.setProperty("--delay", `${(-randomBetween(0, duration)).toFixed(2)}s`);
            particle.style.setProperty("--tx-end", `${randomBetween(options.driftX[0], options.driftX[1]).toFixed(2)}px`);
            particle.style.setProperty("--ty-end", `${randomBetween(options.travelY[0], options.travelY[1]).toFixed(2)}px`);
            particle.style.setProperty("--scale-start", randomBetween(options.scale[0], options.scale[1]).toFixed(2));
            particle.style.setProperty("--scale-mid", randomBetween(options.scaleMid[0], options.scaleMid[1]).toFixed(2));
            particle.style.setProperty("--scale-end", randomBetween(options.scaleEnd[0], options.scaleEnd[1]).toFixed(2));
            particle.style.setProperty("--opacity", randomBetween(options.opacity[0], options.opacity[1]).toFixed(2));
            particle.style.setProperty("--blur", `${Math.max(0.9, size * 0.26).toFixed(2)}px`);
            particle.style.setProperty("--trail-rotation", `${randomBetween(-24, 24).toFixed(2)}deg`);
            particle.style.setProperty("--tone", pick(options.palette));

            fragment.appendChild(particle);
        }

        container.textContent = "";
        container.appendChild(fragment);
    }

    function createGlints(container, count) {
        const fragment = document.createDocumentFragment();

        for (let index = 0; index < count; index += 1) {
            const glint = document.createElement("span");

            glint.className = "glint";
            glint.style.setProperty("--left", `${randomBetween(8, 92).toFixed(2)}%`);
            glint.style.setProperty("--top", `${randomBetween(12, 88).toFixed(2)}%`);
            glint.style.setProperty("--size", `${randomBetween(18, 40).toFixed(2)}px`);
            glint.style.setProperty("--rotation", `${randomBetween(0, 180).toFixed(2)}deg`);
            glint.style.setProperty("--duration", `${randomBetween(7.5, 15).toFixed(2)}s`);
            glint.style.setProperty("--delay", `${(-randomBetween(0, 15)).toFixed(2)}s`);
            glint.style.setProperty("--opacity", `${randomBetween(0.16, 0.34).toFixed(2)}`);

            fragment.appendChild(glint);
        }

        container.textContent = "";
        container.appendChild(fragment);
    }

    function populateAmbient() {
        const reducedMotion = prefersReducedMotion.matches;

        document.body.classList.toggle("reduced-motion", reducedMotion);

        createParticles(particleLayerBack, reducedMotion ? 18 : 32, {
            left: [2, 98],
            top: [48, 110],
            size: reducedMotion ? [2, 4.8] : [2, 6.6],
            duration: reducedMotion ? [24, 36] : [18, 30],
            driftX: reducedMotion ? [-32, 32] : [-48, 48],
            travelY: reducedMotion ? [-320, -520] : [-460, -760],
            scale: [0.24, 0.6],
            scaleMid: [0.58, 0.9],
            scaleEnd: [0.78, 1.08],
            opacity: reducedMotion ? [0.1, 0.2] : [0.14, 0.32],
            palette: ["rgba(141, 194, 208, 0.52)", "rgba(239, 195, 143, 0.44)", "rgba(255, 250, 242, 0.42)"]
        });

        createParticles(particleLayerMid, reducedMotion ? 14 : 22, {
            left: [4, 96],
            top: [38, 106],
            size: reducedMotion ? [3, 6.2] : [3.4, 8.2],
            duration: reducedMotion ? [19, 28] : [14, 22],
            driftX: reducedMotion ? [-42, 42] : [-68, 68],
            travelY: reducedMotion ? [-340, -560] : [-520, -860],
            scale: [0.3, 0.78],
            scaleMid: [0.74, 1.08],
            scaleEnd: [0.92, 1.24],
            opacity: reducedMotion ? [0.16, 0.28] : [0.22, 0.46],
            palette: ["rgba(255, 248, 239, 0.64)", "rgba(239, 195, 143, 0.6)", "rgba(223, 157, 152, 0.54)"]
        });

        createParticles(particleLayerFront, reducedMotion ? 10 : 16, {
            left: [8, 94],
            top: [34, 102],
            size: reducedMotion ? [4.2, 7.4] : [4.8, 9.8],
            duration: reducedMotion ? [16, 22] : [12, 17],
            driftX: reducedMotion ? [-48, 48] : [-82, 82],
            travelY: reducedMotion ? [-360, -580] : [-560, -920],
            scale: [0.4, 0.92],
            scaleMid: [0.92, 1.24],
            scaleEnd: [1.02, 1.42],
            opacity: reducedMotion ? [0.24, 0.38] : [0.3, 0.62],
            palette: ["rgba(255, 255, 255, 0.82)", "rgba(239, 195, 143, 0.76)", "rgba(141, 194, 208, 0.66)"]
        });

        createGlints(glintLayer, reducedMotion ? 6 : 10);
    }

    function dismissIntro() {
        if (introDismissed) {
            return;
        }

        introDismissed = true;
        document.body.classList.add("scene-live");
        introOverlay.classList.add("is-hidden");
        introOverlay.setAttribute("aria-hidden", "true");

        if (!fullscreenHintDismissed && fullscreenHint) {
            window.setTimeout(() => {
                if (!getFullscreenElement()) {
                    fullscreenHint.classList.add("is-hidden");
                    fullscreenHintDismissed = true;
                }
            }, 7600);
        }
    }

    function setStageGlow(clientX, clientY) {
        const rect = stage.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;

        stage.style.setProperty("--glow-x", `${Math.max(10, Math.min(90, x))}%`);
        stage.style.setProperty("--glow-y", `${Math.max(12, Math.min(88, y))}%`);
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

    function enterFullscreen() {
        if (!supportsFullscreen || getFullscreenElement()) {
            return;
        }

        const root = document.documentElement;
        const request = root.requestFullscreen || root.webkitRequestFullscreen;

        fullscreenHintDismissed = true;

        if (fullscreenHint) {
            fullscreenHint.classList.add("is-hidden");
        }

        if (request) {
            const result = request.call(root);
            if (result && typeof result.catch === "function") {
                result.catch(() => {});
            }
        }
    }

    function exitFullscreen() {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;

        if (exit) {
            const result = exit.call(document);
            if (result && typeof result.catch === "function") {
                result.catch(() => {});
            }
        }
    }

    function syncFullscreenState() {
        const isFullscreen = Boolean(getFullscreenElement());
        document.body.classList.toggle("is-fullscreen", isFullscreen);

        if (!supportsFullscreen && fullscreenHint) {
            fullscreenHint.classList.add("is-hidden");
        }
    }

    buildIntroTitle("Happy Birthday");
    populateMemories();
    populateAmbient();
    syncFullscreenState();

    if (typeof prefersReducedMotion.addEventListener === "function") {
        prefersReducedMotion.addEventListener("change", populateAmbient);
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

    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);

    document.addEventListener("keydown", (event) => {
        const activeElement = document.activeElement;
        const tagName = activeElement && "tagName" in activeElement ? activeElement.tagName : "";
        const isEditable = activeElement instanceof HTMLElement &&
            (activeElement.isContentEditable || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT");

        if (isEditable) {
            return;
        }

        if (!event.ctrlKey && !event.metaKey && !event.altKey && event.key.toLowerCase() === "f") {
            if (!event.repeat) {
                dismissIntro();
                enterFullscreen();
            }
            event.preventDefault();
            return;
        }

        if (event.key === "Escape" && getFullscreenElement()) {
            exitFullscreen();
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

    window.setTimeout(dismissIntro, prefersReducedMotion.matches ? 420 : 2400);
});
