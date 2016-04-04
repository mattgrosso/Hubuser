(function(ns) {
  'use strict';

  function toggleProfileData(userDataObject) {
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
  }



  window.ns = ns;
})(window.ns || {});
