(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav(event) {
    if(ns.token !== ""){
      ns.doNav();
    } else {
      window.location.hash = '#login';
      ns.doNav();
    }

  });

  if(ns.token !== ""){
    // ns.ajaxLogin(ns.userData.token);
  } else {
    window.location.hash = '#login';
    ns.doNav();
  }

  ns.doNav = function doNav() {
    $('.view-trigger').hide();
    $(window.location.hash).show();
  };

  ns.init = function initiate() {
    ns.doNav();
  };


  window.ns = ns;
})(window.ns || {});
