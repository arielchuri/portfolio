// }
// // END
// show contact div
var contactinfo =

  '<section class="" style="padding-bottom:0vh;padding-top:0vh"> \
          <div class="flex flex-col sm:flex-row justify-start gap-4"> \
          <ul  class="list-none flex justify-end flex-col"> \
                  <li><strong>Ariel Churi</strong></li> \
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
    returnButton.innerHTML = '<a href="index.html" class="btn-outline btn-small inline-block" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">&#8617; Return</span></a>';
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
    contactDiv.innerHTML = `<div class="max-w-[2000px] mx-auto px-4 pt-10 pb-6 flex items-start">${contactinfo}</div>`;
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
      
      // Find nav element
      const nav = document.querySelector('nav');
      
      // Set initial opacity for background and nav (faded out)
      if (backgroundAnimation) {
        backgroundAnimation.style.opacity = '0';
      }
      if (nav) {
        nav.style.opacity = '0';
        nav.style.transform = 'translateY(-20px)';
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
      
      // Fade in nav from top
      if (nav) {
        anime({
          targets: nav,
          opacity: [1],
          translateY: [0],
          duration: 600,
          easing: 'easeInOutCubic',
          delay: 300
        });
      }
      
      // Handle internal link clicks for slide-out
      document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && link.href.includes(window.location.origin) && !link.href.includes('#')) {
          e.preventDefault();
          
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
          
          // Slide out to the left
          anime({
            targets: mainContent,
            translateX: [-100],
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
    } else {
    }
  }

  // Hide contact bar on scroll
  window.addEventListener("scroll", function () {
    toggleContactBar(true);
  });
});
