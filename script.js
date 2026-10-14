/**
 * Viktor Kvist - Portfolio JavaScript
 * Lättviktig, snabbladdad och tillgänglig interaktivitet
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Header scroll elevation
    const header = document.getElementById("header");
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header?.classList.add("scrolled");
        } else {
            header?.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. Mobilmeny-hantering
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mainNav = document.getElementById("mainNav");

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener("click", () => {
            const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
            mobileMenuBtn.setAttribute("aria-expanded", String(!isExpanded));
            mainNav.classList.toggle("active");
        });

        // Stäng menyn automatiskt när en länk klickas
        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (mainNav.classList.contains("active")) {
                    mainNav.classList.remove("active");
                    mobileMenuBtn.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    // 3. Kopiera e-postadress med direkt återkoppling
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", async () => {
            const email = copyEmailBtn.getAttribute("data-email") || "kvist2001@gmail.com";
            try {
                await navigator.clipboard.writeText(email);
                const originalText = copyEmailBtn.textContent;
                copyEmailBtn.textContent = "Kopierad! ✓";
                copyEmailBtn.style.borderColor = "#34d399";
                copyEmailBtn.style.color = "#34d399";

                setTimeout(() => {
                    copyEmailBtn.textContent = originalText;
                    copyEmailBtn.style.borderColor = "";
                    copyEmailBtn.style.color = "";
                }, 2200);
            } catch (err) {
                // Fallback om clipboard API blockeras
                window.location.href = `mailto:${email}`;
            }
        });
    }

    // 4. ScrollSpy: Markera aktiv menysektion dynamiskt
    const sections = document.querySelectorAll("main > section");
    const navLinks = document.querySelectorAll(".main-nav .nav-link");

    if ("IntersectionObserver" in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute("id");
                    navLinks.forEach(link => {
                        const href = link.getAttribute("href");
                        if (href === `#${currentId}`) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));
    }

    console.log("Viktor Kvist · Portfolio laddad & redo (Antigravity)");
});
