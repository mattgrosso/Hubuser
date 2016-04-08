(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav(event) {
    ns.doNav(window.location.hash);
  });

  ns.doNav = function doNav(view) {
    $('.view-trigger').hide();
    if(!ns.userData.token && view !== '#login'){
      window.location.hash = '#login';
      return;
    }
    view = (view || "");
    var viewElement = $(view);
    var modName = view.substr(1);
    console.log(modName);
    console.log(modName.substr(0, 11));
    if(ns[modName] && ns[modName].load){
      ns[modName].load();
    } else if (modName.substr(0, 5) === 'repo-'){
      ns.repoDetails.load(modName.substr(5), function detailsCallback(element) {
        element.show();
      });
    } else if (modName.substr(0, 11) === 'repoissues-'){
      console.log('triggering repoissues- function');
      ns.repoIssues.load(modName.substr(11), function issuesCallback(element) {
        element.show();
      });

    } else if (!viewElement.length) {
      window.location.hash = '#login';
      return;
    }
    viewElement.show();
  };

  ns.init = function init() {
    ns.doNav(window.location.hash);
  };


  window.ns = ns;
})(window.ns || {});
