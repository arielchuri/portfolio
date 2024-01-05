console.log("Hello world!");

document.getElementById("returnbutton").innerHTML =
  '<a href="index.html" class="button button-primary">&#8617; Return</a>';

document.getElementById("resumebutton").innerHTML =
  '<a href="resume.html" class="button button-primary">r&eacute;sum&eacute;</a>';

user = '&#97;&#99;';
site = '&#115;&#112;&#97;&#114;&#107;&#108;&#101;&#108;&#97;&#98;&#115;&#46;&#99;&#111;&#109;';

document.getElementById("emailbutton").innerHTML =
  '<a class="button button-primary" href=\"mailto:' + user + '@' + site + '\">' +
  user + '@' + site + '</a>' ;

document.getElementById("footer").innerHTML = '<hr class="zig"> <hr class="zag"> <div class="container"><div class="twelve columns small"> \
      <section class="" style="padding-bottom:0vh;padding-top:0vh"> \
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
                  <td><a href="https://goo.gl/maps/oHnA1aaUuyH7s5W99">Montclair, NJ</a></td> \
                </tr> \
                <tr> \
                  <td>he/him</td> \
                </tr> \
                <tr> \
                  <td><a href="https://arielchuri.sparklelabs.com/resume/pronounce.mp3">ari-EL choo-REE</a> <a href="https://arielchuri.sparklelabs.com/resume/pronounce.mp3"><img style="height:18px;width:18px;vertical-align:middle" src="resume/audio-document.svg"/></a></td> \
                </tr> \
                <tr> \
                  <td><a href="https://arielchuri.sparklelabs.com/resume/arielchuri_resume.pdf">arielchuri_resume.pdf</a> <a href="https://arielchuri.sparklelabs.com/resume/arielchuri_resume.pdf"><img style="height:18px;width:18px;vertical-align:middle" src="resume/pdf-file.svg"></a></td> \
                </tr> \
                <tr> \
                  <td><a href="https://github.com/arielchuri/">github.com/arielchuri</a></td> \
                </tr> \
              </tbody> \
            </table> \
          </div> \
        </div> \
      </section> ' +

  // '<h6>Colophon</h6>' +
  '<p class="small" style="padding:0px;">🄯 Ariel Churi in 2022.</br>' +
'This document was written in vanilla HTML, javascript, and CSS. ' +
  'The CSS started from <a href="http:www.getskeleton.com" target="_blank">Skeleton</a>. The typeface is <a href="https:rsms.me/inter/" target="_blank">Inter</a>.  </p></div></section>' ;
