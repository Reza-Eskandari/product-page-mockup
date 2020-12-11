$(function () {
  $("body").css("opacity", 1);
});

$(window).on("beforeunload", function () {
  $("body").css("opacity", 0);
  window.scrollTo(0, 0);
});

var mySwiper = new Swiper(".swiper-container", {
  slidesPerView: "auto",
  grabCursor: true,
  zoom: true,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
  mousewheel: {
    forceToAxis: true,
    eventsTarget: "body",
  },
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    1: {
      freeMode: false,
      centeredSlides: true,
      spaceBetween: 20,
    },
    600: {
      spaceBetween: 30,
      direction: "horizontal",
      centeredSlides: true,
      freeMode: true,
    },
    1024: {
      spaceBetween: 50,
      direction: "vertical",
      freeMode: true,
    },
  },
});

var spSwiper = new Swiper(".swiper-container-sp", {
  grabCursor: true,
  direction: "horizontal",
  slidesPerView: "auto",
  spaceBetween: 40,
  freeMode: false,
  centeredSlides: true,
  centeredSlidesBounds: true,

  breakpoints: {
    1024: {
      spaceBetween: 50,
      direction: "vertical",
      freeMode: true,
      mousewheel: {
        forceToAxis: true,
        eventsTarget: "body",
      },
      keyboard: {
        enabled: true,
      },
    },
  },
});

$(function () {
  if ($(window).width() >= 1024) {
    accardionDesktop();
    showSimilarProductsDesktop();
    modelViewerMouseMove();
  } else {
    accardionTabletPhone();
    modelViewerMouseMoveMobile();
  }
});

function accardionTabletPhone() {
  console.log("TAB/PHONE");

  $(".title-wrapper").on("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.height) {
      panel.style.height = null;
    } else {
      panel.style.height = panel.scrollHeight + "px";
    }
  });
}

function modelViewerMouseMove() {
  $(".swiper-slide model-viewer").attr({
    "disable-zoom": "",
    "camera-orbit": "0 0 auto",
  });
  $(".swiper-slide model-viewer").removeAttr("camera-controls");

  let ease = 0.1,
    isZoomed = false,
    posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0,
    frame = $(".swiper-slide model-viewer").width() / 360,
    frameVertical = $(".swiper-slide model-viewer").height() / 180;
  $("model-viewer").on("mousemove", function (e) {
    var each = Math.floor(e.clientX / frame);
    var eachVertical = Math.floor(e.clientY / frameVertical);
    mouseX = each;
    mouseY = eachVertical;
  });

  $(".swiper-slide model-viewer").hover(
    function () {
      // over
      $(this).removeAttr("auto-rotate");
    },
    function () {
      // out
      $(this).attr({ "auto-rotate": "" });
    }
  );

  $("model-viewer").one("mouseenter", function (e) {
    gsap.ticker.add(updateAngle);
  });

  $(".swiper-slide model-viewer").on("dblclick", function () {
    isZoomed = !isZoomed;
  });

  function updateAngle() {
    posX += (mouseX - posX) * ease;
    let delay = Math.floor(posX);

    posY += (mouseY - posY) * ease;
    let delayVertical = Math.floor(posY);

    let zoom = isZoomed ? "70%" : "auto";

    $("model-viewer").attr(
      "camera-orbit",
      `-${delay - 180}deg ${delayVertical - 40}deg ${zoom}`
    );
  }
}

function accardionDesktop() {
  let spSwiperState;
  let mySwiperState;
  console.log(spSwiper.mousewheel.enabled, mySwiper.mousewheel.enabled);

  $(".item").hover(
    function (e) {
      // over
      spSwiperState = spSwiper.mousewheel.enabled;
      mySwiperState = mySwiper.mousewheel.enabled;
      console.log(
        "var:",
        spSwiperState,
        spSwiper.mousewheel.enabled,
        "var:",
        mySwiperState,
        mySwiper.mousewheel.enabled
      );
      spSwiperStuck();
      mySwiperStuck();
      const height = $(this).find(".body-wrapper").height() / 10;
      $(".accardion-container").css({ height: `${height + 5}rem` });
    },
    function () {
      // out
      toggleWheel(spSwiperState, mySwiperState);
      console.log(
        "var:",
        spSwiperState,
        spSwiper.mousewheel.enabled,
        "var:",
        mySwiperState,
        mySwiper.mousewheel.enabled
      );
      $(this).find(".body-wrapper").animate({ scrollTop: 0 }, "fast");
      $(".accardion-container").css({ height: "5rem" });
    }
  );
}

function toggleWheel(spSwiperState, mySwiperState) {
  if (spSwiperState) {
    spSwiperMove();
  } else {
    spSwiperStuck();
  }

  if (mySwiperState) {
    mySwiperMove();
  } else {
    mySwiperStuck();
  }
}

function spSwiperStuck() {
  spSwiper.mousewheel.disable();
  spSwiper.keyboard.disable();
  $(".similar-products").addClass("swiper-no-swiping");
  // spSwiper.allowSlidePrev = false;
  // spSwiper.allowSlidePrev = spSwiper.mousewheel.enabled;
  console.log("spSwiperStuck() called");
}
function spSwiperMove() {
  spSwiper.mousewheel.enable();
  spSwiper.keyboard.enable();
  $(".similar-products").removeClass("swiper-no-swiping");
  // spSwiper.allowSlidePrev = true;
  // spSwiper.allowSlidePrev = spSwiper.mousewheel.enabled;
  console.log("spSwiperMove() called");
}
function mySwiperStuck() {
  mySwiper.mousewheel.disable();
  mySwiper.keyboard.disable();
  $(".box2").addClass("swiper-no-swiping");
  // mySwiper.allowSlidePrev = false;
  // mySwiper.allowSlidePrev = mySwiper.mousewheel.enabled;
  console.log("mySwiperStuck() called");
}
function mySwiperMove() {
  mySwiper.mousewheel.enable();
  mySwiper.keyboard.enable();
  $(".box2").removeClass("swiper-no-swiping");
  // mySwiper.allowSlidePrev = true;
  // mySwiper.allowSlidePrev = mySwiper.mousewheel.enabled;
  console.log("mySwiperMove() called");
}

function showSimilarProductsDesktop() {
  mySwiper.on("fromEdge", function () {
    console.log("mySwiper is going from beginning or end");
    // $(".similar-products").css({ opacity: 0, visibility: "hidden" });
    gsap.to(".similar-products", { autoAlpha: 0, duration: 0.1 });
    gsap.to(".box2", {
      "-webkit-filter": "blur(0px)",
      scale: 1,
      ease: "back.out(1.7)",
    });
    spSwiperStuck();
    mySwiperMove();
  });

  mySwiper.on("reachEnd", function () {
    console.log("mySwiper reached end");
    $(".similar-products").css({ opacity: 1, visibility: "visible" });
    gsap.to(".similar-products", { autoAlpha: 1, duration: 0.1 });
    spSwiperMove();
    mySwiperStuck();
  });

  ///////////////////////////////////////////////////////

  spSwiper.on("reachBeginning", function () {
    console.log("spSwiper reached beginning");
    gsap.to(".similar-products", { autoAlpha: 0, duration: 0.1 });
    gsap.to(".box2", {
      "-webkit-filter": "blur(0px)",
      autoRound: false,
      scale: 1,
      ease: "back.out(1.7)",
    });
    spSwiperStuck();
    mySwiperMove();
  });

  spSwiper.on("fromEdge", function () {
    console.log("spSwiper is going from beginning or end");
    // $(".box2").css("filter", "blur(5px)");
    gsap.to(".box2", {
      "-webkit-filter": "blur(5px)",
      autoRound: false,
      scale: 0.8,
      ease: "back.out(1.7)",
    });
    spSwiperMove();
    mySwiperStuck();
  });

  spSwiper.on("reachEnd", function () {
    console.log("spSwiper reached end");
    $("html").css("overflow", "auto");
  });

  ///////////////////////////////////////////////////////

  ScrollTrigger.create({
    markers: true,
    trigger: ".grid",
    end: "50% 49.5%",
    // onToggle: (self) => {
    //   if (self.isActive) {
    //     $("html").css("overflow", "hidden");
    //     gsap.to(".accardion-container", { autoAlpha: 1, y: 0, duration: 0.2 });
    //     spSwiperMove();
    //     console.log("toggled, isActive:", self.isActive);
    //   } else {
    //     $("html").css("overflow", "auto");
    //     gsap.to(".accardion-container", { autoAlpha: 0, y: 50, duration: 0.2 });
    //     spSwiperStuck();
    //     console.log("toggled, isActive:", self.isActive);
    //   }
    // },
    onEnterBack: () => {
      $("html").css("overflow", "hidden");
      gsap.to(".accardion-container", { autoAlpha: 1, y: 0, duration: 0.2 });
      spSwiperMove();
      console.log("ScrollTrigger onEnterBack");
    },
    onLeave: () => {
      $("html").css("overflow", "auto");
      gsap.to(".accardion-container", { autoAlpha: 0, y: 50, duration: 0.2 });
      spSwiperStuck();
      console.log("ScrollTrigger onLeave");
    },
  });
}

$(".addtocart").tilt({
  glare: true,
  maxGlare: 1,
  scale: 1.2,
  perspective: 1000,
  transition: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
});
