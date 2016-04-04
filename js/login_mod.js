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
        window.location.hash = '#profile';
        console.log(window.location.hash);
      },
      error: function tokenNotAcquired(xhr) {
        alert('Invalid Token. Please check your entry and resubmit.');
      }
    });
  }

  window.ns = ns;
})(window.ns || {});
