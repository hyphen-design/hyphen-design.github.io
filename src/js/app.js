//Required
var $ = require('jquery');

// Functions
$(function(){
  // user agent
  var ua = navigator.userAgent.toLowerCase();
  var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);
  if (isMobile) {
    $('body').addClass('is-mobile');
  } else {
    $('body').addClass('is-no-mobile');
    $('a[href^="tel:"]').on('click', function(e) {
      e.preventDefault();
    });
  }
  // animate scroll
  var headerHight = 0;
  $('a[href^="#"]').on('click',function() {
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top-headerHight;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
  // drawer menu
  $('#js-drawer-trigger').on('click',function(){
    $('#js-drawer-trigger').toggleClass('is-switch');
    $('#js-drawer-content').toggleClass('is-switch');
  });
  // offer information
  if($('#js-offer-information').length){
    $('#js-offer-information-close').on('click',function(){
      $('#js-offer-information').fadeOut();
    });
  }
  // cookie consent
  if($('#js-cookie-consent').length){
    $('#js-cookie-accept').on('click',function(){
      $('#js-cookie-consent').fadeOut();
    });
  }
  // dashboard current
  if(location.pathname != "/") {
      $('#js-dashboard-navigation a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('is-current');
  } else $('#js-dashboard-navigation li a:eq(0)').addClass('is-current');
});
