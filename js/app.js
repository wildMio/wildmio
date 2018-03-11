var app = {};
app.menuVisible = false;
app.keyCodeESC = 27;

// Shim for requestAnimationFrame from Paul Irishpaul ir
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
const requestAnimFrame = (function(){
  'use strict';

  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

const $ = function(item) {
  if(document.querySelectorAll(item).length > 1) {
    return document.querySelectorAll(item);
  }
  return document.querySelector(item);
}

document.addEventListener("DOMContentLoaded", function() {
  if($("body").classList.contains("main-screen") || $("body").classList.contains("single-page")) { app.loadAndFadeInCaseImages(); }
  // Top menu
  $(".menu").addEventListener("click", function(e) {
    e.preventDefault();
    !app.menuVisible ? app.revealMenu() : app.hideMenu();
  });

  // // Hide nav if clicked outside of a menu alternative
  $(".nav").addEventListener("click", function() {
    app.hideMenu();
  });

  // // Make sure that links don't close the menu
  $(".nav a").forEach(el => {
    el.addEventListener("click", function(e) {
      e.stopPropagation();
    });
  });

  // listen to ESC, close menu if visible
  document.addEventListener("keyup", function(e) {
    if(e.keyCode === app.keyCodeESC) app.handleESCKey();
  });

  if($(".intro-header")) {
    // Wrap every letter in a span
    $(".intro-header").innerHTML = $(".intro-header").innerText.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
    setTimeout(function() {
      $(".intro-header .letter").forEach((el, index) => {
        anima({
          el: el,
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "linear",
          duration: 950,
          delay: (70*index)
        });
      });
    }, 300);
  }
}, false);

app.loadAndFadeInCaseImages = function() {
  // Load background images
  let $elem = $("[data-image]");
  let url = `./img/${$elem.dataset.image}`;
  console.log(url);
  if(url == null || url.length <= 0) { return; }

  let pic = `<div class="case-item-bg" style="background-image: url(${url});"></div>`;
  $elem.innerHTML += pic;
  $elem.classList.add("image-ready");
}

app.handleESCKey = function() {
  if(app.menuVisible) { app.hideMenu(); }
}

app.toggleMenuStates = function() {
  $("body").classList.toggle("no-scroll");
  $(".menu").classList.toggle("menu-active");
  $(".nav").classList.toggle("nav-active");
}

function anima(obj) {
  
  let animationStartTime;
  let animationDuration = obj.duration;
  let target = obj.el || document.querySelector(obj.targets);

  function update() {
    let currentTime = Date.now();
    let base = (currentTime - animationStartTime) / animationDuration;

    if(obj.easing) {
      switch(obj.easing) {
        case "easeIn":
          base = base >= 1 ? 1 : 1-Math.sqrt(1-base*base);
          break;
        case "easeOut":
          base = base >= 1 ? 1 : Math.sqrt(1-(base-1)*(base-1));
          break;
        default:
          base = base >= 1 ? 1 : base;
          break;
      }
    }

    if(obj.scale) {
      let scale = obj.scale[0] + (obj.scale[1] - obj.scale[0]) * base;
      target.style.transform = `scale(${scale})`;
    }
    if(obj.opacity) {
      let opacity = obj.opacity[0] + (obj.opacity[1] - obj.opacity[0]) * base;
      target.style.opacity = opacity;
    }
    if(obj.scaleX) {
      let scaleX = obj.scaleX[0] + (obj.scaleX[1] - obj.scaleX[0]) * base;
      target.style.transform = `scaleX(${scaleX})`;
    }
    if(obj.translateX) {
      let translateX = obj.translateX[0] + (obj.translateX[1] - obj.translateX[0]) * base;
      target.style.transform = `translateX(${translateX}px)`;
    }
    if(obj.translateY) {
      let translateY = obj.translateY[0] + (obj.translateY[1] - obj.translateY[0]) * base;
      target.style.transform = `translateY(${translateY}px)`;
    }
    if(obj.translateZ) {
      target.style.transform = `translateY(${obj.translateY}px)`;
    }

    if(base <= 1) {
      requestAnimFrame(update);
    }
  }

  let delay = obj.delay || 0;
  setTimeout(function() { 
    animationStartTime = Date.now();
    requestAnimFrame(update); 
  }, delay);
}

app.revealMenu = function() {
  app.menuVisible = true;
  app.toggleMenuStates();

  new anima({
    targets:'.menu-animated-background',
    scale: [0.2, 3],
    opacity: [0.2,1],
    easing: "easeIn",
    duration: 300
  });

  let containerDelay = 200;
  new anima({
    targets:'.js-nav',
    opacity: [0, 1],
    delay: containerDelay,
    easing: "easeIn",
    duration: 200
  });

  containerDelay += 75;
  $(".js-nav-header").style.opacity = 0;
  new anima({
    targets: ".js-nav-header",
    opacity: [0,1],
    delay: containerDelay,
    easing: "easeIn",
    duration: 200
  });

  $(".js-nav-header-line").style.transform = "scale(0.2)";
  new anima({
    targets:'.js-nav-header-line',
    scaleX: [0.28, 1],
    delay: containerDelay,
    easing: "easeIn",
    duration: 600
  });

  containerDelay += 350;

  let menuItemDelay = 90;
  $(".js-nav-animate").forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "scale(0.9)";

    new anima({
      el: el,
      translateY: [-7, 0],
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: (containerDelay + menuItemDelay * (i+1)),
      duration: 1100,
      easing: "easeIn"
    })
  });
}

app.hideMenu = function() {
  app.menuVisible = false;
  app.toggleMenuStates();

  new anima({
    targets: ".menu-animated-background",
    scale: [3,0],
    opacity: [1,0],
    easing: "easeOut",
    duration: 300
  });

  new anima({
    targets: ".js-nav",
    opacity: [1, 0],
    easing: "easeOut",
    duration: 200
  });

  new anima({
    targets:".js-nav-header-line",
    scale: [1, 0],
    easing: "easeOut",
    duration: 300
  });

  $(".js-nav-animate").forEach((el) => {
    new anima({
      el: el,
      translateY: "10px",
      scale: [1, 0.9],
      opacity: [1, 0],
      easing: "easeOut",
      duration: 200
    });
  });
}

// Typically called by views that want to display something in the same
// position of the menu icon
app.hideMenuIcon = function() {
  $(".menu").style.display = "none";
}

app.showMenuIcon = function() {
  $(".menu").style.display = "block";
}