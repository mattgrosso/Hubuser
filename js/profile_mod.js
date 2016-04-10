(function(ns) {
  'use strict';

  ns.profile = {};

  ns.profile.load = function loadProfile() {
    $('#nav-profile').addClass('active');
    toggleProfileData();
  };

  function toggleProfileData() {
    $('#profile').empty();
    $('#profile')
      .append($('<ul>')
        .attr({id: 'profile-list'})
        .append($('<li>').text('Name: ' + ns.userData.name))
        .append($('<li>')
          .text('Username: ')
          .append($('<a>')
            .text(ns.userData.username)
            .attr({href: ns.userData.userURL, target: '_blank'}))
        )
        .append($('<li>').text('Repos: ' + ns.userData.repos))
        .append($('<li>').text('Followers: ' + ns.userData.followers + ' (following ' + ns.userData.following + ')'))
        .append($('<li>').text('Account Created: ' + ns.userData.acctStart))
        .append($('<img>').attr({src: ns.userData.userImage, id: 'user-image'}))
      );
  }

  window.ns = ns;
})(window.ns || {});
