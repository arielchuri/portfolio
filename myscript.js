// }
// // END
// show contact div
var contactinfo =

  '<section class="" style="padding-bottom:0vh;padding-top:0vh"> \
          <div class="flex flex-col sm:flex-row justify-start gap-8"> \
          <ul  class="list-none flex justify-end flex-col"> \
                  <li><a href="mailto:ac@sparklelabs.com">ac@sparklelabs.com</a></li> \
                  <li><a href="tel:646-450-4576">(646) 450-4576</a></li> \
                  <li><a href="https://calendly.com/arielchuri/30min">Create a 30min. meeting.</a></li> \
                  <li><a href="https://arielchuri.sparklelabs.com">arielchuri.sparklelabs.com</a></li> \
                  <li><a href="https://linkedin.com/in/arielchuri/">linkedin.com/in/arielchuri</a></li> \
          </ul> \
          <ul class="list-none flex justify-end flex-col" > \
                  <li><a href="https://goo.gl/maps/oHnA1aaUuyH7s5W99">Montclair, NJ</a></li> \
                  <li>he/him or they/them</li> \
                  <li><a href="https://arielchuri.sparklelabs.com/resume/pronounce.mp3">ari-EL choo-REE</a> <a href="https://arielchuri.sparklelabs.com/resume/pronounce.mp3"><img style="display:inline-block;height:18px;width:18px;vertical-align:middle" src="resume/audio-document.svg"/></a></li> \
                  <li><a href="https://arielchuri.sparklelabs.com/resume/arielchuri_resume.pdf">arielchuri_resume.pdf</a> <a href="https://arielchuri.sparklelabs.com/resume/arielchuri_resume.pdf"><img style="display:inline-block;height:18px;width:18px;vertical-align:middle" src="resume/pdf-file.svg"></a></li> \
                  <li><a href="https://github.com/arielchuri/">github.com/arielchuri</a></li> \
          </ul> \
        </div> \
      </section> ';

// Simple section tracking for return button
function getCurrentSection() {
  const sections = [
    'sparkle-labs', 'bridgestone', 'sothebys', 'calvin-klein', 
    'unilever', 'ibm-holobot', 'moma-killscreen', 'more-work'
  ];
  
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section && section.offsetTop <= scrollPosition) {
      return sections[i];
    }
  }
  return ''; // No anchor if at top
}

function saveCurrentSection() {
  const currentSection = getCurrentSection();
  sessionStorage.setItem('indexSection', currentSection);
}

function updateReturnButton() {
  const returnButton = document.getElementById("returnbutton");
  if (returnButton) {
    // Get saved section from sessionStorage
    const savedSection = sessionStorage.getItem('indexSection') || '';
    const anchor = savedSection ? `#${savedSection}` : '';
    returnButton.innerHTML = `<a href="index.html${anchor}" class="btn-outline btn-small inline-block" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">&#8617; Return</span></a>`;
  }
}

function toggleContactBar(forceHide = false) {
  const div = document.getElementById("contactDiv");
  if (!div) return;

  const isVisible = div.classList.contains("show");
  if (isVisible || forceHide) {
    div.classList.remove("show");
    div.classList.add("hide");
    setTimeout(() => { div.style.display = "none"; }, 1000);
  } else {
    div.style.display = "block";
    void div.offsetHeight;
    div.classList.remove("hide");
    div.classList.add("show");
  }
}

// Setup contact bar and events
document.addEventListener("DOMContentLoaded", function () {
  // Create nav buttons
  const returnButton = document.getElementById("returnbutton");
  const resumeButton = document.getElementById("resumebutton");
  const contactButton = document.getElementById("contactbutton");
  
  if (returnButton) {
    updateReturnButton();
    
    // Update return button as user scrolls (only on index page)
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
      window.addEventListener('scroll', function() {
        saveCurrentSection(); // Save current section as user scrolls
        updateReturnButton();
      });
    }
  }
  
  if (resumeButton) {
    resumeButton.innerHTML = '<a href="resume.html" class="btn-outline btn-small inline-block" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">r&eacute;sum&eacute;</span></a>';
  }

  user = "&#97;&#99;";
  site = "&#115;&#112;&#97;&#114;&#107;&#108;&#101;&#108;&#97;&#98;&#115;&#46;&#99;&#111;&#109;";

  if (contactButton) {
    contactButton.innerHTML = '<a class="btn-outline btn-small inline-block" onclick="toggleContactBar()" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">contact</span></a>';
  }

  const contactDiv = document.getElementById("contactDiv");
  if (contactDiv) {
    contactDiv.innerHTML = `<div class="max-w-[2000px] mx-auto px-4 pt-14 pb-2 flex items-start  ">${contactinfo}</div>`;
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
      'The CSS started from <a href="http:www.getskeleton.com" target="_blank">Skeleton</a>. The typeface is <a href="https:rsms.me/inter/" target="_blank">Inter</a>.  </p></div></section>';
  }

  // Button animations (wipe + ripple)
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
  
  buttons.forEach((btn) => {
    
    // Wipe animation
    const bg = btn.querySelector('.wipe-bg');
    if (bg) {
      btn.addEventListener('mouseenter', () => {
        anime({
          targets: bg,
          width: ['0%', '100%'],
          duration: 500,
          easing: 'easeInOutCubic'
        });
      });
      btn.addEventListener('mouseleave', () => {
        anime({
          targets: bg,
          width: ['100%', '0%'],
          duration: 500,
          easing: 'easeInOutCubic'
        });
      });
    }

    // Ripple animation
    btn.addEventListener('click', function(e) {
      
      // Remove any existing ripple
      const oldRipple = btn.querySelector('.ripple');
      if (oldRipple) oldRipple.remove();

      // Get click position relative to button
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple element
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      btn.appendChild(ripple);

      // Animate ripple
      anime({
        targets: ripple,
        scale: [0, 4],
        opacity: [1, 0],
        duration: 600,
        easing: 'easeOutCubic',
        complete: () => ripple.remove()
      });
    });
  });

  // Page slide-in animation for index page
  const isIndexPage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  const isResumePage = window.location.pathname.endsWith('resume.html');
  
  // Nav animation for all pages
  const nav = document.querySelector('nav');
  if (nav) {
    // Set initial state for nav (faded out and moved up)
    nav.style.opacity = '0';
    nav.style.transform = 'translateY(-20px)';
    
    // Fade in nav from top
    anime({
      targets: nav,
      opacity: [1],
      translateY: [0],
      duration: 600,
      easing: 'easeInOutCubic',
      delay: 300
    });
  }
  
  if (isIndexPage) {
    // Find the main content container
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
      mainContent.classList.remove('preload');
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateX(0%)';
      anime({
        targets: mainContent,
        translateX: ['-100%', '0%'],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutCubic',
        delay: 100
      });
      
      // Find background animation element
      const backgroundAnimation = document.getElementById('background-animation');
      
      // Set initial opacity for background (faded out)
      if (backgroundAnimation) {
        backgroundAnimation.style.opacity = '0';
      }
      
      // Start animations immediately
      anime({
        targets: mainContent,
        translateX: ['-100%', '0%'],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutCubic',
        delay: 100
      });
      
      // Fade in background
      if (backgroundAnimation) {
        anime({
          targets: backgroundAnimation,
          opacity: [1],
          duration: 1000,
          easing: 'easeInOutCubic',
          delay: 200
        });
      }
      
      // Handle internal link clicks for slide-out
      document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && link.href.includes(window.location.origin) && 
            (!link.href.includes('#') || link.href.includes('index.html'))) {
          e.preventDefault();
          
          // Save current section before navigating
          saveCurrentSection();
          
          // Determine slide direction based on destination
          const isGoingToIndex = link.href.includes('index.html') || link.href.endsWith('/');
          const slideOutDirection = isGoingToIndex ? 'right' : 'left';
          
          // Fade out nav first
          if (nav) {
            anime({
              targets: nav,
              opacity: [0],
              translateY: [-20],
              duration: 300,
              easing: 'easeInOutCubic'
            });
          }
          
          // Fade out background
          if (backgroundAnimation) {
            anime({
              targets: backgroundAnimation,
              opacity: [0],
              duration: 900,
              easing: 'easeInOutCubic'
            });
          }
          
          // Slide out based on direction
          anime({
            targets: mainContent,
            translateX: slideOutDirection === 'right' ? [100] : [-100],
            duration: 600,
            easing: 'easeInOutCubic',
            delay: 200,
            complete: function() {
              // Navigate after animation completes
              window.location.href = link.href;
            }
          });
        }
      });
    }
  } else {
    // Non-index pages (including resume.html): slide in from right
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      // Add slide-in-from-right class initially
      mainContent.classList.add('slide-in-from-right');
      
      // Force reflow
      void mainContent.offsetHeight;
      
      // Animate in from right
      anime({
        targets: mainContent,
        translateX: ['100%', '0%'],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutCubic',
        delay: 100
      });
      
      // Handle internal link clicks for slide-out
      document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && link.href.includes(window.location.origin) && 
            (!link.href.includes('#') || link.href.includes('index.html'))) {
          e.preventDefault();
          
          // Save current section before navigating
          saveCurrentSection();
          
          // Determine slide direction based on destination
          const isGoingToIndex = link.href.includes('index.html') || link.href.endsWith('/');
          const slideOutDirection = isGoingToIndex ? 'right' : 'left';
          
          // Fade out nav first
          if (nav) {
            anime({
              targets: nav,
              opacity: [0],
              translateY: [-20],
              duration: 300,
              easing: 'easeInOutCubic'
            });
          }
          
          // Slide out based on direction
          anime({
            targets: mainContent,
            translateX: slideOutDirection === 'right' ? [100] : [-100],
            duration: 600,
            easing: 'easeInOutCubic',
            delay: 200,
            complete: function() {
              // Navigate after animation completes
              window.location.href = link.href;
            }
          });
        }
      });
    }
  }

  // Hide contact bar on scroll
  window.addEventListener("scroll", function () {
    toggleContactBar(true);
  });
});
