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
  // slidesPerView: "auto",
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
    console.log("Swiper reached end");
    $(".similar-products").css("opacity", 1);
    mySwiper.mousewheel.disable();
    $(".box2").css("pointer-events", "none");
    spSwiper.mousewheel.enable();
  });

  spSwiper.on("reachBeginning", function () {
    $(".box2").css("pointer-events", "");
    mySwiper.mousewheel.enable();
    spSwiper.mousewheel.disable();
  });

  mySwiper.on("fromEdge", function () {
    console.log("fromEdge");
    $(".similar-products").css("opacity", 0);
    spSwiper.mousewheel.disable();
  });
}
