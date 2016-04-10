(function(ns) {
  'use strict';

  ns.logout = {};

  ns.logout.load = function loadLogout() {
      ns.userData = {};
      $('#navbar').hide();
      $('main').hide();
      $('#profile').empty();
      $('#repos').empty();
      $('.repo-detail').empty();
      $('.repo-issues').empty();
      $('#reponewissue').empty();
      $('#temp-tags').empty();
      window.location.hash = '#login';
  };


  window.ns = ns;
})(window.ns || {});
