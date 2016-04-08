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
    if(ns[modName] && ns[modName].load){
      ns[modName].load();
    } else if (modName.substr(0, 5) === 'repo-'){
      ns.repoDetails.load(modName.substr(5), function detailsCallback(element) {
        ns._addTabs('repodetail', view);
        element.show();
      });
    } else if (modName.substr(0, 11) === 'repoissues-'){
      ns.repoIssues.load(modName.substr(11), function issuesCallback(element) {
        ns._addTabs('repoissues', view);
        element.show();
      });

    } else if (!viewElement.length) {
      window.location.hash = '#login';
      return;
    }
    viewElement.show();
  };

  ns._addTabs = function addTabs(type, hash) {
    if(type === 'repodetail') {
      $('#temp-tags').empty();
      $('#temp-tags')
        .append($('<li>')
          .attr({id: 'repo-detail-tab'})
          .append($('<a>')
            .attr({href: hash})
            .text('Repo Details')
          )
        );
    } else if(type === 'repoissues') {
      $('#temp-tags')
        .append($('<li>')
          .attr({id: 'repo-issues-tab'})
          .append($('<a>')
            .attr({href: hash})
            .text('Repo Issues')
          )
        );
    } else if(type === 'reponewissue'){
      $('#temp-tags')
        .append($('<li>')
          .attr({id: 'repo-new-issue'})
          .append($('<a>')
            .attr({href: hash})
            .text('New Issue')
          )
        );
    } else {
      return 'not a type';
    }
  };




  ns.init = function init() {
    ns.doNav(window.location.hash);
  };


  window.ns = ns;
})(window.ns || {});
