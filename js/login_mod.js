(function(ns) {
  'use strict';

  $('#login-form').on('submit', function githubLogin(event) {
    event.preventDefault();
    var enteredToken = $(this).find('#token-entry').val();
    ajaxLogin(enteredToken);
  });

  function ajaxLogin(enteredToken) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'JSON',
      headers: {Authorization: "token " + enteredToken},
      success: function tokenAcquired(data) {
        console.log(data);
      },
      error: function tokenNotAcquired(xhr) {
        console.log(xhr);
      }
    });
  }

  window.ns = ns;
})(window.ns || {});
