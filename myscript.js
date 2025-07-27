// }
// // END
// show contact div
var contactinfo =
  '<section class="" style="padding-bottom:0vh;padding-top:0vh"> \
          <div class="flex flex-col sm:flex-row justify-start gap-8"> \
          <ul  class="list-none flex justify-end flex-col"> \
                  <li><strong>Ariel Churi</strong></li> \
                  <li><a href="mailto:ac@sparklelabs.com" class="link-slide">ac@sparklelabs.com</a></li> \
                  <li><a href="tel:646-450-4576" class="link-slide">(646) 450-4576</a></li> \
                  <li><a href="https://calendly.com/arielchuri/30min" target=_blank class="link-slide">Create a 30min. meeting.</a></li> \
                  <li><a href="https://arielchuri.sparklelabs.com" target=_blank class="link-slide">arielchuri.sparklelabs.com</a></li> \
                  <li><a href="https://linkedin.com/in/arielchuri/" target=_blank class="link-slide">linkedin.com/in/arielchuri</a></li> \
          </ul> \
          <ul class="list-none flex justify-end flex-col" > \
                  <li><a href="https://goo.gl/maps/oHnA1aaUuyH7s5W99" target=_blank class="link-slide">Montclair, NJ</a></li> \
                  <li>he/him or they/them</li> \
                  <li><a href="https://arielchuri.sparklelabs.com/resume/pronounce.mp3" target=_blank class="link-slide">ari-EL choo-REE</a> <a href="https://arielchuri.sparklelabs.com/resume/pronounce.mp3" target=_blank class="link-slide"><img style="display:inline-block;height:18px;width:18px;vertical-align:middle" src="resume/audio-document.svg"/></a></li> \
                  <li><a href="https://arielchuri.sparklelabs.com/resume/arielchuri_resume.pdf" target=_blank class="link-slide">arielchuri_resume.pdf</a> <a href="https://arielchuri.sparklelabs.com/resume/arielchuri_resume.pdf" target=_blank class="link-slide"><img style="display:inline-block;height:18px;width:18px;vertical-align:middle" src="resume/pdf-file.svg"></a></li> \
                  <li><a href="https://github.com/arielchuri/" target=_blank class="link-slide">github.com/arielchuri</a></li> \
                  <li><a href="https://wireless2.fcc.gov/UlsApp/UlsSearch/license.jsp?licKey=3835821" target=_blank class="link-slide">KD2LPU</a></li> \
          </ul> \
        </div> \
      </section> ';

// Simple section tracking for return button
function getCurrentSection() {
  const sections = [
    "sparkle-labs",
    "bridgestone",
    "sothebys",
    "calvin-klein",
    "unilever",
    "ibm-holobot",
    "moma-killscreen",
    "more-work",
  ];

  const scrollPosition = window.scrollY + window.innerHeight / 2;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section && section.offsetTop <= scrollPosition) {
      return sections[i];
    }
  }
  return ""; // No anchor if at top
}

function saveCurrentSection() {
  const currentSection = getCurrentSection();
  sessionStorage.setItem("indexSection", currentSection);
}

function updateReturnButton() {
  const returnButton = document.getElementById("returnbutton");
  if (returnButton) {
    // Get saved section from sessionStorage
    const savedSection = sessionStorage.getItem("indexSection") || "";
    const anchor = savedSection ? `#${savedSection}` : "";
    returnButton.innerHTML = `<a href="index.html${anchor}" class="btn-outline btn-extrasmall inline-block" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">&#8617; Return</span></a>`;
  }
}

function toggleContactBar(forceHide = false) {
  const div = document.getElementById("contactDiv");
  if (!div) return;

  const isVisible = div.classList.contains("show");
  if (isVisible || forceHide) {
    div.classList.remove("show");
    div.classList.add("hide");
    setTimeout(() => {
      if (div.classList.contains("hide")) {
        div.style.display = "none";
      }
    }, 1000);
  } else {
    // Reset state before showing
    div.style.display = "block";
    div.classList.remove("show");
    div.classList.add("hide"); // Start in hidden position
    void div.offsetHeight; // Force reflow
    div.classList.remove("hide");
    div.classList.add("show"); // Then animate to visible
  }
}

// Animation initialization function
function initializePageAnimations() {
  // Create nav buttons
  const returnButton = document.getElementById("returnbutton");
  const resumeButton = document.getElementById("resumebutton");
  const contactButton = document.getElementById("contactbutton");
  const projectsButton = document.getElementById("projectsbutton");
  const physicalButton = document.getElementById("physicalbutton");
  const mobileButton = document.getElementById("mobilebutton");

  if (returnButton) {
    updateReturnButton();

    // Update return button as user scrolls (only on index page)
    if (
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("index.html")
    ) {
      window.addEventListener("scroll", function () {
        saveCurrentSection(); // Save current section as user scrolls
        updateReturnButton();
      });
    }
  }

  if (resumeButton) {
    resumeButton.innerHTML =
      '<a href="resume.html" class="btn-outline btn-extrasmall inline-block" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">r&eacute;sum&eacute;</span></a>';
  }

  if (projectsButton) {
    const isCurrentlyOnIndex = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");
    const href = isCurrentlyOnIndex ? "#sparkle-labs" : "index.html#sparkle-labs";
    projectsButton.innerHTML =
      `<a href="${href}" class="btn-outline btn-extrasmall inline-block" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">projects</span></a>`;
  }

  if (mobileButton) {
    mobileButton.innerHTML =
      '<a href="g_mobile.html" class="btn-outline btn-extrasmall inline-block" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">mobile screens</span></a>';
  }

  if (physicalButton) {
    physicalButton.innerHTML =
      '<a href="g_physical.html" class="btn-outline btn-extrasmall inline-block" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">physical/spatial</span></a>';
  }

  user = "&#97;&#99;";
  site =
    "&#115;&#112;&#97;&#114;&#107;&#108;&#101;&#108;&#97;&#98;&#115;&#46;&#99;&#111;&#109;";

  if (contactButton) {
    contactButton.innerHTML =
      '<a class="btn-outline btn-extrasmall inline-block" onclick="toggleContactBar()" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">contact</span></a>';
  }

  const contactDiv = document.getElementById("contactDiv");
  if (contactDiv) {
    // Move contactDiv to document body if it's nested inside other containers
    if (contactDiv.parentElement && !contactDiv.parentElement.matches("body")) {
      document.body.insertBefore(contactDiv, document.body.firstChild);
    }

    contactDiv.innerHTML = `<div class="max-w-[2000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-14 pb-2 flex items-start">${contactinfo}</div>`;
    // Ensure consistent initial state across all pages
    contactDiv.style.display = "none";
    contactDiv.classList.remove("show", "hide");
    contactDiv.classList.add("hide");
  }

  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML =
      '<hr class="zig"> <hr class="zag"> <div class="container"><div class="twelve columns small">' +
      contactinfo +
      // '<h6>Colophon</h6>' +
      '<p class="small" style="padding:0px;">🄯 Ariel Churi in 2022.</br>' +
      "This document was written in vanilla HTML, javascript, and CSS. " +
      'The CSS started from <a href="http:www.getskeleton.com" target="_blank" class="link-slide">Skeleton</a>. The typeface is <a href="https:rsms.me/inter/" target="_blank" class="link-slide">Inter</a>.  </p></div></section>';
  }

  // Button animations (wipe + ripple)
  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .btn-outline",
  );

  buttons.forEach((btn) => {
    // Wipe animation
    const bg = btn.querySelector(".wipe-bg");
    if (bg) {
      btn.addEventListener("mouseenter", () => {
        anime({
          targets: bg,
          width: ["0%", "100%"],
          duration: 500,
          easing: "easeInOutCubic",
        });
      });
      btn.addEventListener("mouseleave", () => {
        anime({
          targets: bg,
          width: ["100%", "0%"],
          duration: 500,
          easing: "easeInOutCubic",
        });
      });
    }

    // Ripple animation
    btn.addEventListener("click", function (e) {
      // Remove any existing ripple
      const oldRipple = btn.querySelector(".ripple");
      if (oldRipple) oldRipple.remove();

      // Get click position relative to button
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple element
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      btn.appendChild(ripple);

      // Animate ripple
      anime({
        targets: ripple,
        scale: [0, 4],
        opacity: [1, 0],
        duration: 600,
        easing: "easeOutCubic",
        complete: () => ripple.remove(),
      });
    });
  });

  // Page slide-in animation for index page
  const isIndexPage =
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("index.html");
  const isResumePage = window.location.pathname.endsWith("resume.html");

  // Nav animation for all pages
  const nav = document.querySelector("nav");
  if (nav) {
    // Reset initial state for nav (important for browser back/forward)
    nav.style.opacity = "0";
    nav.style.transform = "translateY(-20px)";

    // Fade in nav from top
    anime({
      targets: nav,
      opacity: [1],
      translateY: [0],
      duration: 600,
      easing: "easeInOutCubic",
      delay: 300,
    });
  }

  if (isIndexPage) {
    // Find the main content container
    const mainContent = document.getElementById("mainContent");
    if (mainContent) {
      // Reset initial state (important for browser back/forward)
      mainContent.classList.remove("preload");
      mainContent.style.opacity = "0";
      mainContent.style.transform = "translateX(-100%)";
      
      anime({
        targets: mainContent,
        translateX: ["-100%", "0px"],
        opacity: [0, 1],
        duration: 800,
        easing: "easeInOutCubic",
        delay: 100,
        complete: function() {
          // Ensure final position is exactly 0
          mainContent.style.transform = "translateX(0px)";
        }
      });

      // Add scroll-based animation for "Ariel Churi" title
      const arielTitle = document.getElementById("ariel-churi-title");
      if (arielTitle) {
        // Calculate initial position based on current scroll position
        const initialScrollTop = window.scrollY;
        const maxScroll = window.innerHeight;
        const initialScrollProgress = Math.min(initialScrollTop / maxScroll, 1);
        const initialTranslateX = initialScrollProgress * -100;
        
        // Set initial position before fading in
        anime.set(arielTitle, {
          translateX: `${initialTranslateX}vw`,
          translateY: '-50%'
        });
        
        // Fade in title
        anime({
          targets: arielTitle,
          opacity: [0, 1],
          duration: 800,
          easing: "easeInOutCubic",
          delay: 300,
        });
        
        let ticking = false;
        
        function updateTitlePosition() {
          const scrollTop = window.scrollY;
          const maxScroll = window.innerHeight; // First viewport height
          const scrollProgress = Math.min(scrollTop / maxScroll, 1);
          
          // Move left as we scroll down (0 to -100vw)
          const translateX = scrollProgress * -100;
          
          // Use anime.js set to maintain exact positioning
          anime.set(arielTitle, {
            translateX: `${translateX}vw`,
            translateY: '-50%'
          });
          
          ticking = false;
        }
        
        function onScroll() {
          if (!ticking) {
            requestAnimationFrame(updateTitlePosition);
            ticking = true;
          }
        }
        
        window.addEventListener("scroll", onScroll);
      }

      // Find background animation element
      const backgroundAnimation = document.getElementById(
        "background-animation",
      );

      // Reset initial opacity for background (important for browser back/forward)  
      if (backgroundAnimation) {
        backgroundAnimation.style.opacity = "0";
      }

      // Fade in background
      if (backgroundAnimation) {
        anime({
          targets: backgroundAnimation,
          opacity: [1],
          duration: 1000,
          easing: "easeInOutCubic",
          delay: 200,
        });
      }

      // Handle internal link clicks for slide-out
      document.addEventListener("click", function (e) {
        const link = e.target.closest("a");
        if (
          link &&
          link.href &&
          link.href.includes(window.location.origin) &&
          (!link.href.includes("#") || link.href.includes("index.html")) &&
          !link.getAttribute("href").startsWith("#")
        ) {
          e.preventDefault();

          // Save current section before navigating
          saveCurrentSection();

          // Determine slide direction based on destination
          const isGoingToIndex =
            link.href.includes("index.html") || link.href.endsWith("/");
          const slideOutDirection = isGoingToIndex ? "right" : "left";

          // Fade out nav and title first
          if (nav) {
            anime({
              targets: nav,
              opacity: [0],
              translateY: [-20],
              duration: 300,
              easing: "easeInOutCubic",
            });
          }
          
          // Fade out title on page transition
          const arielTitleTransition = document.getElementById("ariel-churi-title");
          if (arielTitleTransition) {
            anime({
              targets: arielTitleTransition,
              opacity: [0],
              duration: 300,
              easing: "easeInOutCubic",
            });
          }

          // Fade out background
          if (backgroundAnimation) {
            anime({
              targets: backgroundAnimation,
              opacity: [0],
              duration: 900,
              easing: "easeInOutCubic",
            });
          }

          // Slide out based on direction
          anime({
            targets: mainContent,
            translateX: slideOutDirection === "right" ? [100] : [-100],
            duration: 600,
            easing: "easeInOutCubic",
            delay: 200,
            complete: function () {
              // Navigate after animation completes
              window.location.href = link.href;
            },
          });
        }
      });
    }
  } else {
    // Non-index pages (including resume.html): slide in from right
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
      // Reset position first (important for browser back/forward)
      mainContent.style.transform = "translateX(100%)";
      mainContent.classList.add("slide-in-from-right");

      // Force reflow
      void mainContent.offsetHeight;

      // Animate in from right
      anime({
        targets: mainContent,
        translateX: ["100%", "0%"],
        // opacity: [0, 1],
        duration: 800,
        easing: "easeInOutCubic",
        delay: 100,
      });

      // Handle internal link clicks for slide-out
      document.addEventListener("click", function (e) {
        const link = e.target.closest("a");
        if (
          link &&
          link.href &&
          link.href.includes(window.location.origin) &&
          (!link.href.includes("#") || link.href.includes("index.html")) &&
          !link.getAttribute("href").startsWith("#")
        ) {
          e.preventDefault();

          // Save current section before navigating
          saveCurrentSection();

          // Determine slide direction based on destination
          const isGoingToIndex =
            link.href.includes("index.html") || link.href.endsWith("/");
          const slideOutDirection = isGoingToIndex ? "right" : "left";

          // Fade out nav first
          if (nav) {
            anime({
              targets: nav,
              opacity: [0],
              translateY: [-20],
              duration: 300,
              easing: "easeInOutCubic",
            });
          }

          // Slide out based on direction
          anime({
            targets: mainContent,
            translateX: slideOutDirection === "right" ? [100] : [-100],
            duration: 600,
            easing: "easeInOutCubic",
            delay: 200,
            complete: function () {
              // Navigate after animation completes
              window.location.href = link.href;
            },
          });
        }
      });
    }
  }

  // Hide contact bar on scroll
  window.addEventListener("scroll", function () {
    const div = document.getElementById("contactDiv");
    if (div && div.classList.contains("show")) {
      toggleContactBar(true);
    }
  });

  // Reveal animation on scroll
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: "0px 0px -50px 0px", // Trigger 50px before element enters viewport
    },
  );

  reveals.forEach((reveal) => {
    observer.observe(reveal);
  });

  // Lightbox functionality for gallery pages
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    let group = null;
    let items = [];
    let current = 0;
    let targetSize = { width: 0, height: 0 };
    const content = document.getElementById("lightbox-content");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    // Preload all images in the group and calculate the largest dimension
    function preloadAndCalculateSize(groupItems) {
      let maxWidth = 0;
      let maxHeight = 0;
      let loaded = 0;
      const total = groupItems.length;
      return new Promise((resolve) => {
        groupItems.forEach((item) => {
          if (item.tagName === "IMG") {
            const img = new window.Image();
            img.onload = function () {
              maxWidth = Math.max(maxWidth, img.naturalWidth);
              maxHeight = Math.max(maxHeight, img.naturalHeight);
              loaded++;
              if (loaded === total) {
                const largerDimension = Math.max(maxWidth, maxHeight);
                targetSize = {
                  width: largerDimension,
                  height: largerDimension,
                };
                resolve();
              }
            };
            img.onerror = function () {
              loaded++;
              if (loaded === total) {
                const largerDimension = Math.max(maxWidth, maxHeight);
                targetSize = {
                  width: largerDimension,
                  height: largerDimension,
                };
                resolve();
              }
            };
            img.src = item.src;
          } else if (item.tagName === "VIDEO") {
            // Use a default size for videos
            maxWidth = Math.max(maxWidth, 1920);
            maxHeight = Math.max(maxHeight, 1080);
            loaded++;
            if (loaded === total) {
              const largerDimension = Math.max(maxWidth, maxHeight);
              targetSize = { width: largerDimension, height: largerDimension };
              resolve();
            }
          }
        });
      });
    }

    function show(index) {
      current = index;
      const el = items[index];
      // Add fade-out animation for content
      content.style.opacity = "0";
      content.style.transform = "scale(0.95)";
      setTimeout(() => {
        content.innerHTML = "";
        // Create a wrapper for sizing and centering only
        const wrapper = document.createElement("div");
        wrapper.style.width = `${targetSize.width}px`;
        wrapper.style.height = `${targetSize.height}px`;
        wrapper.style.maxWidth = "90vw";
        wrapper.style.maxHeight = "80vh";
        wrapper.className = "flex items-center justify-center";
        // Add click handler to close lightbox
        wrapper.addEventListener("click", function (e) {
          // Prevent closing if clicking navigation or close buttons
          if (
            e.target === prevBtn ||
            e.target === nextBtn ||
            e.target === closeBtn
          ) {
            return;
          }
          close();
        });
        if (el.tagName === "IMG") {
          const img = document.createElement("img");
          img.src = el.src;
          img.alt = el.alt;
          img.className = "object-contain max-w-full max-h-full rounded";
          wrapper.appendChild(img);
        } else if (el.tagName === "VIDEO") {
          const video = document.createElement("video");
          video.src = el.src;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          video.className = "object-contain max-w-full max-h-full rounded";
          wrapper.appendChild(video);
          video.play();
        }
        content.appendChild(wrapper);
        // Add fade-in animation
        setTimeout(() => {
          content.style.opacity = "1";
          content.style.transform = "scale(1)";
        }, 50);
      }, 150);
      prevBtn.classList.toggle("hidden", current === 0);
      nextBtn.classList.toggle("hidden", current === items.length - 1);
      lightbox.classList.remove("hidden");
    }

    document.querySelectorAll("[data-lightbox]").forEach((el) => {
      el.style.cursor = "pointer";
      el.addEventListener("click", function () {
        group = el.getAttribute("data-lightbox");
        items = Array.from(
          document.querySelectorAll('[data-lightbox="' + group + '"]'),
        );
        preloadAndCalculateSize(items).then(() => {
          show(items.indexOf(el));
        });
      });
    });

    function close() {
      // Add fade-out animation
      content.style.opacity = "0";
      content.style.transform = "scale(0.95)";
      setTimeout(() => {
        lightbox.classList.add("hidden");
        content.innerHTML = "";
        content.style.opacity = "";
        content.style.transform = "";
      }, 300);
    }

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (current > 0) show(current - 1);
    });
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (current < items.length - 1) show(current + 1);
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("hidden")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" && current > 0) show(current - 1);
      if (e.key === "ArrowRight" && current < items.length - 1)
        show(current + 1);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLightbox);
  } else {
    initLightbox();
  }

  // Add click-anywhere scroll functionality for the first viewport (index page only)
  if (isIndexPage) {
    const overlay = document.getElementById("viewport-click-overlay");
    
    function updateOverlay() {
      if (window.scrollY === 0) {
        overlay.style.pointerEvents = "auto";
      } else {
        overlay.style.pointerEvents = "none";
      }
    }
    
    updateOverlay();
    window.addEventListener("scroll", updateOverlay);

    overlay.addEventListener("click", function() {
      const targetSection = document.getElementById("sparkle-labs");
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Add click-to-scroll functionality for Sparkle Labs hero section
  const sparkleHeroSection = document.getElementById("sparkle-hero-section");
  if (sparkleHeroSection) {
    sparkleHeroSection.addEventListener("click", function (e) {
      // Don't scroll if clicking on nav buttons
      const nav = document.querySelector("nav");
      if (nav && nav.contains(e.target)) {
        return;
      }

      // Scroll down 100vh
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth"
      });
    });
  }
}

// Setup contact bar and events
document.addEventListener("DOMContentLoaded", initializePageAnimations);

// Handle browser back/forward navigation
window.addEventListener("pageshow", function(event) {
  // Only reinitialize animations if coming from cache
  if (event.persisted) {
    initializePageAnimations();
  }
});

// Note: Slide-out animations during browser forward/back navigation are not
// reliably supported due to browser performance optimizations. The browser
// may terminate JavaScript execution before animations can complete.
