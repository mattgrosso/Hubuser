(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav(event) {
    if(ns.userData.token !== ""){
      ns.doNav();
    } else if (window.location.hash.substr(0, 4) === 'repo') {
      //generate new HTML for repo detail page and give it an ID then change
      //the hash to that ID and doNav().
    }
    else {
      window.location.hash = '#login';
      ns.doNav();
    }

  });

  ns.doNav = function doNav() {
    $('.view-trigger').hide();
    $(window.location.hash).show();
  };

  ns.init = function init() {
    window.location.hash = '#login';
    ns.doNav();
  };


  window.ns = ns;
})(window.ns || {});
