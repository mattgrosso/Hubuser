(function(ns) {
  'use strict';

  ns.toggleProfileData = function toggleProfileData(userDataObject) {
    var username = userDataObject.login;
    var name = userDataObject.name;
    var repos = userDataObject.public_repos;
    var followers = userDataObject.followers;
    var following = userDataObject.following;
    var acctStart = userDataObject.created_at;
    $('#profileUsername').text(username);
    $('#profileName').text(name);
    $('#profileRepos').text(repos);
    $('#profileFollowers').text(followers);
    $('#profileFollowing').text(following);
    $('#profileCreated').text(acctStart);
  };

  if(ns.token !== ""){
    ns.ajaxLogin(ns.token);
  } else {
    window.location.hash = '#login';
    ns.doNav();
  }

  window.ns = ns;
})(window.ns || {});
