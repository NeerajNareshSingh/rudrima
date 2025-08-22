/******************************************
    File Name: custom.js
    Template Name: Aven
******************************************/

(function ($) {
    "use strict";
  
    /* ==============================================
      AFFIX (Bootstrap 3 only)
    =============================================== */
    if ($(".megamenu").length) {
      $(".megamenu").affix({
        offset: {
          top: 800,
          bottom: function () {
            return (this.bottom = $(".footer").outerHeight(true));
          },
        },
      });
    }
  
    /* ==============================================
      BACK TO TOP
    =============================================== */
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 1) {
        $(".dmtop").css({ bottom: "75px" });
      } else {
        $(".dmtop").css({ bottom: "-100px" });
      }
    });
  
    /* ==============================================
      LOADER
    =============================================== */
    $(window).on("load", function () {
      $("#preloader").delay(500).fadeOut();
      $(".preloader").delay(600).fadeOut("slow");
    });
  
    /* ==============================================
      FUN FACTS COUNTER
    =============================================== */
    function count($el) {
      let current = parseInt($el.html(), 10);
      current += 50; // increment step
      if (current > $el.data("count")) {
        $el.html($el.data("count"));
      } else {
        $el.html(current);
        setTimeout(function () {
          count($el);
        }, 30);
      }
    }
  
    $(".stat_count, .stat_count_download").each(function () {
      $(this).data("count", parseInt($(this).html(), 10));
      $(this).html("0");
      count($(this));
    });
  
    /* ==============================================
      TOOLTIP & POPOVER
    =============================================== */
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
  
    /* ==============================================
      CONTACT FORM
    =============================================== */
    $(document).ready(function () {
      $("#contactform").on("submit", function (e) {
        e.preventDefault();
        var action = $(this).attr("action");
  
        $("#message").slideUp(750, function () {
          $("#message").hide();
          $("#submit")
            .after('<div class="loader"></div>') // replaced broken img with css loader
            .attr("disabled", "disabled");
  
          $.post(
            action,
            {
              first_name: $("#first_name").val(),
              last_name: $("#last_name").val(),
              email: $("#email").val(),
              phone: $("#phone").val(),
              select_service: $("#select_service").val(),
              select_price: $("#select_price").val(),
              comments: $("#comments").val(),
              verify: $("#verify").val(),
            },
            function (data) {
              $("#message").html(data).slideDown("slow");
              $("#contactform .loader").fadeOut("slow", function () {
                $(this).remove();
              });
              $("#submit").removeAttr("disabled");
              if (data.match("success") != null) {
                $("#contactform").slideUp("slow");
              }
            }
          );
        });
      });
    });
  
    /* ==============================================
      CODE WRAPPER (before/after slider)
    =============================================== */
    $(".code-wrapper").on("mousemove", function (e) {
      var offsets = $(this).offset();
      var fullWidth = $(this).width();
      var mouseX = e.pageX - offsets.left;
  
      mouseX = Math.max(0, Math.min(mouseX, fullWidth));
  
      $(this).parent().find(".divider-bar").css({
        left: mouseX,
        transition: "none",
      });
      $(this).find(".design-wrapper").css({
        transform: "translateX(" + mouseX + "px)",
        transition: "none",
      });
      $(this).find(".design-image").css({
        transform: "translateX(" + -1 * mouseX + "px)",
        transition: "none",
      });
    });
  
    $(".divider-wrapper").on("mouseleave", function () {
      $(this).parent().find(".divider-bar").css({
        left: "50%",
        transition: "all .3s",
      });
      $(this).find(".design-wrapper").css({
        transform: "translateX(50%)",
        transition: "all .3s",
      });
      $(this).find(".design-image").css({
        transform: "translateX(-50%)",
        transition: "all .3s",
      });
    });
  })(jQuery);
  