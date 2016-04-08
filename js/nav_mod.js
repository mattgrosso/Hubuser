(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav(event) {
    if(ns.userData.token !== ""){
      ns.doNav();
    }
    else {
      window.location.hash = '#login';
      ns.doNav();
    }

  });

  ns.doNav = function doNav() {
    $('.view-trigger').hide();
    var modName = window.location.hash.substr(1);
    if(ns[modName] && ns[modName].load){
      ns[modName].load();
    } else if (modName.substr(0, 5) === 'repo-'){
      ns.repoDetails.load(modName.substr(5));
    } else if (modName.substr(0, 11) === 'repoissues-'){
      ns.repoIssues.load(modName.substr(11));
    }
    $(window.location.hash).show();
  };

  ns.init = function init() {
    window.location.hash = '#login';
    ns.doNav();
  };


  window.ns = ns;
})(window.ns || {});
