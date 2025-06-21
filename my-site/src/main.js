import "./style.css";

// Animated mobile menu functionality
function initMobileMenu() {
  const button = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  const menuItems = document.querySelectorAll('.mobile-menu-item');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');
  
  if (!button || !menu) {
    console.log('Mobile menu elements not found');
    return;
  }
  
  function animateToX() {
    // Animate hamburger to X
    line1.style.transform = 'rotate(45deg) translate(5px, 5px)';
    line2.style.opacity = '0';
    line3.style.transform = 'rotate(-45deg) translate(7px, -6px)';
  }
  
  function animateToHamburger() {
    // Animate X back to hamburger
    line1.style.transform = 'rotate(0deg) translate(0px, 0px)';
    line2.style.opacity = '1';
    line3.style.transform = 'rotate(0deg) translate(0px, 0px)';
  }
  
  function showMenu() {
    menu.classList.remove('hidden');
    // Animate menu items in with staggered delay
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = 'translateY(0)';
        item.style.opacity = '1';
      }, index * 100);
    });
  }
  
  function hideMenu() {
    // Animate menu items out
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = 'translateY(-100%)';
        item.style.opacity = '0';
      }, index * 50);
    });
    
    // Hide menu after animation completes
    setTimeout(() => {
      menu.classList.add('hidden');
    }, menuItems.length * 50 + 300);
  }
  
  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (menu.classList.contains('hidden')) {
      showMenu();
      animateToX();
    } else {
      hideMenu();
      animateToHamburger();
    }
  });
  
  // Close menu when clicking on links
  menuItems.forEach(link => {
    link.addEventListener('click', function() {
      hideMenu();
      animateToHamburger();
    });
  });
}

// Scroll-based header animation
function initHeaderScroll() {
  const header = document.querySelector('nav');
  let lastScrollTop = 0;
  let isScrolling = false;
  
  if (!header) {
    console.log('Header not found');
    return;
  }
  
  function handleScroll() {
    if (isScrolling) return;
    
    isScrolling = true;
    requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isAtTop = scrollTop <= 0;
      const isScrollingUp = scrollTop < lastScrollTop;
      
      // Always show header at top of page
      if (isAtTop) {
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease-in-out';
      }
      // Hide header when scrolling down
      else if (!isScrollingUp && scrollTop > 64) {
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease-in-out';
      }
      // Show header when scrolling up
      else if (isScrollingUp) {
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease-in-out';
      }
      
      lastScrollTop = scrollTop;
      isScrolling = false;
    });
  }
  
  // Throttle scroll events for better performance
  let ticking = false;
  function updateHeader() {
    handleScroll();
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();
  });
} else {
  initMobileMenu();
  initHeaderScroll();
}
