var mySwiper = new Swiper(".swiper-container", {
  slidesPerView: "auto",
  grabCursor: true,
  zoom: true,
  grabCursor: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
  mousewheel: {
    forceToAxis: true,
    eventsTarget: ".grid",
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
  spaceBetween: 30,
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
        eventsTarget: ".grid",
      },
    },
  },
});

$(function () {
  if ($(window).width() >= 1024) {
    accardionDesktop();
    showSimilarProductsDesktop();
  } else {
    accardionTabletPhone();
  }
});

function accardionDesktop() {
  console.log("DESKTOP");
  $(".item").hover(
    function (e) {
      // over
      mySwiper.mousewheel.disable();
      spSwiper.mousewheel.disable();
      const height = $(this).find(".body-wrapper").height() / 10;
      // console.log(height);
      $(".accardion-container").css({ height: `${height + 5}rem` });
      // console.log(`${height / 10}`)
    },
    function () {
      // out
      if (!mySwiper.mousewheel.enabled) {
        spSwiper.mousewheel.enable();
      } else {
        mySwiper.mousewheel.enable();
      }

      $(".accardion-container").css({ height: "5rem" });
    }
  );
}
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

function showSimilarProductsDesktop() {
  mySwiper.on("reachEnd", function () {
    console.log("mySwiper reached end");
    $(".similar-products").css({ opacity: 1, visibility: "visible" });
    mySwiper.allowSlidePrev = false;
    // $(".box2").css("pointer-events", "none");
    spSwiper.mousewheel.enable();
    mySwiper.mousewheel.disable();
  });

  spSwiper.on("reachBeginning", function () {
    console.log("spSwiper reached beginning");
    mySwiper.allowSlidePrev = true;
    // $(".box2").css("pointer-events", "");
    mySwiper.mousewheel.enable();
    spSwiper.mousewheel.disable();
  });

  mySwiper.on("fromEdge", function () {
    console.log("mySwiper is going from beginning or end");
    $(".similar-products").css({ opacity: 0, visibility: "hidden" });
    spSwiper.mousewheel.disable();
  });

  spSwiper.on("reachEnd", function () {
    $("html").css("overflow", "auto");
  });

  ///////////////////////////////////////////////////////

  ScrollTrigger.create({
    markers: true,
    trigger: ".grid",
    end: "100% 99%",
    // onToggle: (self) => console.log("toggled, isActive:", self.isActive),
    onToggle: (self) => {
      if (self.isActive) {
        $("html").css("overflow", "hidden");
        spSwiper.mousewheel.enable();
        spSwiper.allowSlidePrev = true;
        // $(".grid").css("pointer-events", "");
      } else {
        $("html").css("overflow", "auto");
        spSwiper.mousewheel.disable();
        spSwiper.allowSlidePrev = false;
        // $(".grid").css("pointer-events", "none");
      }
    },
  });
}
