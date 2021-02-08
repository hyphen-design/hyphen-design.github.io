// Required
var $ = require('jquery');

// Functions
$(function(){
  var ua = navigator.userAgent.toLowerCase();
  var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);
  if (isMobile) {
    $('body').addClass('mobile');
  } else {
    $('body').addClass('no-mobile');
    $('a[href^="tel:"]').on('click', function(e) {
      e.preventDefault();
    });
  }
  var headerHight = 80;
  $('a[href^="#"]').on('click',function() {
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top-headerHight;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
  $('#js-hamburger-button').on('click',function(){
    $('#js-hamburger-button').toggleClass('is-active');
    $('#js-global-navigation').toggleClass('is-active');
  });

});
