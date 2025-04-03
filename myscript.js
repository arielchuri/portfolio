console.log("Hello world!");
var showContact = false;

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
  '<section class="" style="padding-bottom:0vh;"> \
        <div class="flex gap-2"> \
          <div class="flex flex-col"> \
                  <div class="font-medium">Ariel Churi</div> \
                  <div><a href="mailto:ac@sparklelabs.com">ac@sparklelabs.com</a></div> \
                  <div><a href="tel:646-450-4576">(646) 450-4576</a></div> \
                  <div><a href="https://calendly.com/arielchuri/30min">Create a 30min. meeting.</a></div> \
                  <div><a href="https://arielchuri.sparklelabs.com">arielchuri.sparklelabs.com</a></div> \
                  <div><a href="https://linkedin.com/in/arielchuri/">linkedin.com/in/arielchuri</a></div> \
          </div> \
          <div class="flex flex-col"> \
                  <div style="visibility:hidden">.</a></div> \
                  <div><a href="https://goo.gl/maps/oHnA1aaUuyH7s5W99">Montclair, NJ</a></div> \
                  <div>he/him or they/them</div> \
                  <div class="whitespace-nowrap"><a class="" href="https://arielchuri.sparklelabs.com/resume/pronounce.mp3">ari-EL choo-REE <img class="inline" style="height:18px;width:18px;vertical-align:middle" src="resume/audio-document.svg"/></a></div> \
                  <div class="whitespace-nowrap"><a href="https://arielchuri.sparklelabs.com/resume/arielchuri_resume.pdf">arielchuri_resume.pdf <img class="inline" style="height:18px;width:18px;vertical-align:middle" src="resume/pdf-file.svg"></a></div> \
                  <div><a href="https://github.com/arielchuri/">github.com/arielchuri</a></div> \
          </div> \
        </div> \
      </section> ';

function showDiv() {
  console.log(window.pageYOffset);
  var div = document.getElementById("contactDiv");
  if (window.pageYOffset > 200) {
    div.style.display = "block";
    window.scrollTo(0, 0);
  } else {
    div.style.display = div.style.display == "none" ? "block" : "none";
    // showContact = showContact == false ? true : false;
    console.log(showContact);
  }
}
// END show contact div
//
document.getElementById("contactDiv").innerHTML = contactinfo;

document.getElementById("returnbutton").innerHTML =
  '<a onclick="history.back()" class="button button-primary">&#8617; Return</a>';

// document.getElementById("homebutton").innerHTML =
//   '<a href="index.html#" class="button button-primary">home</a>';

document.getElementById("resumebutton").innerHTML =
  '<a href="resume.html" class="button button-primary">r&eacute;sum&eacute;</a>';

user = "&#97;&#99;";
site =
  "&#115;&#112;&#97;&#114;&#107;&#108;&#101;&#108;&#97;&#98;&#115;&#46;&#99;&#111;&#109;";

// document.getElementById("emailbutton").innerHTML =
//   '<a class="button button-primary" href=\"mailto:' + user + '@' + site + '\">' +
//   user + '@' + site + '</a>' ;

document.getElementById("contactbutton").innerHTML =
  '<a class="button button-primary" onclick="showDiv()">contact</a>';

document.getElementById("footer").innerHTML =
  '<hr class="zig"> <hr class="zag"> <div class="container mx-auto px-4"><div class="twelve columns small">' +
  contactinfo +
  // '<h6>Colophon</h6>' +
  '<p class="small" style="padding:0px;">🄯 2025.</br>' +
  "This document was created using HTML, javascript, CSS, tailwind, gimp, and inkscape. " +
  'The CSS started from <a href="http:www.getskeleton.com" target="_blank">Skeleton</a>. The typeface is <a href="https:rsms.me/inter/" target="_blank">Inter</a>.  </p></div></section>';
