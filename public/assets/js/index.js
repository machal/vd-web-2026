// Vanilla JS helpers
// ------------------

function toggleClass(id, cssClass) {
  document.getElementById(id).classList.toggle(cssClass);
  event.preventDefault();
}

// jQuery a zavislosti
// ===================

$(document).ready(function() {

  // Otevirani schovanych sekci
  // TODO lepe pres nejake data-atributy a zobecnit
  // [1] TODO prilis obecne, co kdyz jich bude vic na strance?
  // [2] TODO Hardcoded
  // [3] TODO Zbytecne duplicitne a neobecne (#poptavka)

  $(".js .section-opener").click(function() {
    $(".section--openable") // [1]
      .toggleClass("section--openable-hidden")
      .toggleClass("section--openable-opened");
    $(this) // [2]
      .toggleClass("button--primary");
  });

  if (window.location.hash == "#poptavka") {
    // [3]
    $(".section--openable")
      .toggleClass("section--openable-hidden")
      .toggleClass("section--openable-opened");
    $(".js .section-opener").toggleClass("button--primary");
  }

  // Smooth scroll

  $('a[href^="#"]').smoothScroll({ preventDefault: false });

  // /intra/prace-seznam

  function doJobIntraFilter() {
    var state = $("#filter-stateSelect").val();
    window.location.href = "/intra/prace-seznam/" + state;
  }

  $("#filter-stateSelect, #filter-stateSelect").change(function() {
    doJobIntraFilter();
  });

  // Otevirani reklamniho buttonku

  if (!!$(".ad").length) {
    $(".ad").addClass("ad-ready");
    setTimeout("$('.ad').addClass('ad-visible');", 1500);
    if ($(window).width() >= 1024) {
      var $window_height = $(window).height();
      $(window).scroll(function() {
        if ($(window).scrollTop() > $window_height / 2) {
          $(".ad").addClass("ad-visible");
        }
        if (
          $(window).scrollTop() >
          $("#kurzy").offset().top - $window_height - 300
        ) {
          $(".ad").removeClass("ad-visible");
        }
      });
    }
  }

}); // $(document).ready(function()

// On document load
// ================

// once the entire page (images or iframes), not just the DOM, is ready
// https://learn.jquery.com/using-jquery-core/document-ready/

$(window).on("load", function() {

  // Install Service Worker
  // ----------------------

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }

}); // $(window).on( "load", function()
