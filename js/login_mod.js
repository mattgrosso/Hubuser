(function(ns) {
  'use strict';

  ns.userData = {};

  $('#login').on('submit', function githubLogin(event) {
    event.preventDefault();
    ns.userData.token = $(this).find('#token-entry').val();
    ajaxLogin();
  });

  function ajaxLogin() {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'JSON',
      headers: {Authorization: 'token ' + ns.userData.token},
      success: function tokenAcquired(data) {
        createUserObject(data);
        $('#navbar').show();
        $('main').show();
        window.location.hash = '#profile';
      },
      error: function tokenNotAcquired(xhr) {
        alert('Invalid Token. Please check your entry and resubmit.');
      }
    });
  }

  function createUserObject(data) {
    ns.userData.username = data.login;
    ns.userData.name = data.name;
    ns.userData.repos = data.public_repos;
    ns.userData.followers = data.followers;
    ns.userData.following = data.following;
    ns.userData.acctStart = data.created_at;
    ns.userData.userImage = data.avatar_url;
    ns.userData.userURL = data.html_url;
  }

  window.ns = ns;
})(window.ns || {});
