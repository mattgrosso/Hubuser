(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav(event) {
    ns.doNav();
  });

  ns.doNav = function doNav() {
    $('.view-trigger').hide();
    $(window.location.hash).show();
  };



  window.ns = ns;
})(window.ns || {});
