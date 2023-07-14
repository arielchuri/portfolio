console.log("Hello world!");
document.getElementById("footer").innerHTML =
  '<hr class="zig"> <hr class="zag"> <div class="container"><div class="twelve columns small">' +
  // '<h6>Colophon</h6>' +
'<p style="padding:12px;">This document was written in vanilla HTML, javascript, and CSS. ' +
  'The CSS started from <a href="http:www.getskeleton.com" target="_blank">Skeleton</a>. The typeface is <a href="https:rsms.me/inter/" target="_blank">Inter</a>. ' +
  '🄯 Created by Ariel Churi in 2022. </p></div></section>' ;

document.getElementById("returnbutton").innerHTML =
  '<a href="index.html" class="button button-primary">&#8617; Return</a>';

document.getElementById("resumebutton").innerHTML =
  '<a href="resume.html" class="button button-primary">r&eacute;sum&eacute;</a>';

user = '&#97;&#99;';
site = '&#115;&#112;&#97;&#114;&#107;&#108;&#101;&#108;&#97;&#98;&#115;&#46;&#99;&#111;&#109;';

document.getElementById("emailbutton").innerHTML =
  '<a class="button button-primary" href=\"mailto:' + user + '@' + site + '\">' +
  user + '@' + site + '</a>' ;
