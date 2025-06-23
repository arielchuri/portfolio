var showContact = false;

// Background animation scroll fade
function handleBackgroundFade() {
  const scrollY = window.scrollY || window.pageYOffset;
  const fadeStart = 100; // Start fading after 100px scroll
  const fadeEnd = 500; // Completely faded out after 500px scroll

  // For CSS version
  const bgAnimation = document.querySelector(".bg-animation-css");
  if (bgAnimation) {
    if (scrollY > fadeStart) {
      bgAnimation.classList.add("scrolled");
    } else {
      bgAnimation.classList.remove("scrolled");
    }
  }
}

// Add scroll event listener for background fade
window.addEventListener("scroll", handleBackgroundFade);

// scroll animation https://alvarotrigo.com/blog/css-animations-scroll/
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 450;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();
// END scroll animation https://alvarotrigo.com/blog/css-animations-scroll/
// function to hide contact info on scroll
// window.onscroll = function() {scrollcheck()};
// scrollcheck = () => {
//   if (document.documentElement.scrollTop > 200) {
//     contactDiv.style.display = "none";
//     showContact = false;
//   }
// }
// // END
// show contact div
var contactinfo =
  '<section class="" style="padding-bottom:0vh;padding-top:0vh"> \
        <div class="row"> \
          <div class="three columns"> \
            <table> \
              <thead> \
                <tr> \
                  <th></th> \
                </tr> \
              </thead> \
              <tbody> \
                <tr> \
                  <td><strong>Ariel Churi</strong></td> \
                </tr> \
                <tr> \
                  <td><a href="mailto:ac@sparklelabs.com">ac@sparklelabs.com</a></td> \
                </tr> \
                <tr> \
                  <td><a href="tel:646-450-4576">(646) 450-4576</a></td> \
                </tr> \
                <tr> \
                  <td><a href="https://calendly.com/arielchuri/30min">Create a 30min. meeting.</a></td> \
                </tr> \
                <tr> \
                  <td><a href="https://arielchuri.sparklelabs.com">arielchuri.sparklelabs.com</a></td> \
                </tr> \
                <tr> \
                  <td><a href="https://linkedin.com/in/arielchuri/">linkedin.com/in/arielchuri</a></td> \
                </tr> \
              </tbody> \
            </table> \
          </div> \
          <div class="three columns bottomspace"> \
            <table> \
              <thead> \
                <tr> \
                  <th></th> \
                </tr> \
              </thead> \
              <tbody> \
                <tr> \
                  <td style="visibility:hidden">.</a></td> \
                </tr> \
                <tr> \
                  <td><a href="https://goo.gl/maps/oHnA1aaUuyH7s5W99">Montclair, NJ</a></td> \
                </tr> \
                <tr> \
                  <td>he/him or they/them</td> \
                </tr> \
                <tr> \
                  <td><a href="https://arielchuri.sparklelabs.com/resume/pronounce.mp3">ari-EL choo-REE</a> <a href="https://arielchuri.sparklelabs.com/resume/pronounce.mp3"><img style="display:inline-block;height:18px;width:18px;vertical-align:middle" src="resume/audio-document.svg"/></a></td> \
                </tr> \
                <tr> \
                  <td><a href="https://arielchuri.sparklelabs.com/resume/arielchuri_resume.pdf">arielchuri_resume.pdf</a> <a href="https://arielchuri.sparklelabs.com/resume/arielchuri_resume.pdf"><img style="display:inline-block;height:18px;width:18px;vertical-align:middle" src="resume/pdf-file.svg"></a></td> \
                </tr> \
                <tr> \
                  <td><a href="https://github.com/arielchuri/">github.com/arielchuri</a></td> \
                </tr> \
              </tbody> \
            </table> \
          </div> \
        </div> \
      </section> ';

function showDiv() {
  var div = document.getElementById("contactDiv");
  
  // Toggle visibility
  const isVisible = div.style.display === "block";
  
  if (!isVisible) {
    // Move div to body for proper absolute positioning
    document.body.appendChild(div);
    
    // Show contact div with slide-in animation
    div.style.display = "block";
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.left = "0";
    div.style.right = "0";
    div.style.zIndex = "1000";
    div.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    div.style.backdropFilter = "blur(20px)";
    div.style.webkitBackdropFilter = "blur(20px)";
    div.style.padding = "2rem";
    div.style.transform = "translateY(-50px)";
    div.style.opacity = "0";
    
    // Slide in from above
    anime({
      targets: div,
      translateY: [0],
      opacity: [1],
      duration: 600,
      easing: 'easeInOutCubic'
    });
  } else {
    // Hide contact div with slide-out animation
    anime({
      targets: div,
      translateY: [-50],
      opacity: [0],
      duration: 400,
      easing: 'easeInOutCubic',
      complete: function() {
        div.style.display = "none";
        // Move div back to its original location
        const originalContainer = document.querySelector('.mx-auto.max-w-\\[2000px\\]');
        if (originalContainer) {
          originalContainer.appendChild(div);
        }
      }
    });
  }
}
// END show contact div
//
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
    contactButton.innerHTML = '<a class="btn-outline btn-small inline-block" onclick="showDiv()" style="position: relative; overflow: hidden;"><span class="wipe-bg"></span><span class="btn-text">contact</span></a>';
  }

  const contactDiv = document.getElementById("contactDiv");
  if (contactDiv) {
    contactDiv.innerHTML = contactinfo;
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
    console.log('Index page detected, setting up slide-in animation');
    
    // Find the main content container
    const mainContent = document.querySelector('.max-w-\\[2000px\\]');
    
    if (mainContent) {
      console.log('Found main content container, starting slide-in animation');
      
      // Set initial position (off-screen to the left) immediately
      mainContent.style.transform = 'translateX(-100%)';
      mainContent.style.opacity = '0';
      
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
        translateX: [0],
        opacity: [1],
        duration: 800,
        easing: 'easeInOutCubic',
        delay: 100,
        begin: function() {
          // Ensure opacity is set to 0 before animation starts
          mainContent.style.opacity = '0';
        }
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
          console.log('Internal link clicked, starting slide-out animation:', link.href);
          
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
      console.log('Main content container not found');
    }
  }
});
