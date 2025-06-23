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
  if (window.pageYOffset > 200) {
    div.style.display = "block";
    window.scrollTo(0, 0);
  } else {
    div.style.display = div.style.display == "none" ? "block" : "none";
    // showContact = showContact == false ? true : false;
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
      const size = Math.max(rect.width, rect.height) * 2; // Back to 2x for better effect
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      // Create ripple
      const ripple = document.createElement('span');
      ripple.className = 'ripple';

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      btn.appendChild(ripple);

      anime({
        targets: ripple,
        scale: [0, 1],
        // opacity: [0.95, 0],
        easing: 'easeOutCubic',
        duration: 300,
        complete: function() {
          ripple.remove();
        }
      });
    });
  });
});
