(function(ns) {
  'use strict';

  ns.profile = {};

  ns.profile.load = function loadProfile() {
    toggleProfileData();
  };


  function toggleProfileData() {
    $('#profileUsername').text(ns.userData.username);
    $('#profileName').text(ns.userData.name);
    $('#profileRepos').text(ns.userData.repos);
    $('#profileFollowers').text(ns.userData.followers);
    $('#profileFollowing').text(ns.userData.following);
    $('#profileCreated').text(ns.userData.acctStart);
    $('#user-image').attr({src: ns.userData.userImage});
  }

  window.ns = ns;
})(window.ns || {});
