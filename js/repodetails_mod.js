(function(ns) {
  'use strict';

  ns.repodetails = {};

  ns.repodetails.load = function loadRepoDetails() {
      
  };

  function createRepoDetails() {
    $('.repo-detail')
      .attr({id: window.location.hash.substr(3)})
      .append($('<h2>').text('Put a link to the appropriate repo here'))
      .append($('<p>').text('Put the description from the repo here'))
      .append($('<p>').text('Put the number of open issues here'))
      .append($('<ul>')
                .append($('<li>').text('Owner: the name of the owner'))
                .append($('<li>').text('Stars: the number of stars'))
                .append($('<li>').text('Forks: the number of forks'))
                .append($('<li>').text('Created on: the creation date'))
      );
  }

  window.ns = ns;
})(window.ns || {});
