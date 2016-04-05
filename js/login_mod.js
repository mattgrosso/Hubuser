(function(ns) {
  'use strict';

  ns.token = "";

  $('#login').on('submit', function githubLogin(event) {
    console.log('form submit');
    event.preventDefault();
    var enteredToken = $(this).find('#token-entry').val();
    ns.ajaxLogin(enteredToken);
  });

  ns.ajaxLogin = function ajaxLogin(enteredToken) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'JSON',
      headers: {Authorization: "token " + enteredToken},
      success: function tokenAcquired(data) {
        console.log('ajax succeding');
        ns.token = enteredToken;
        ns.toggleProfileData(data);
        window.location.hash = '#profile';
      },
      error: function tokenNotAcquired(xhr) {
        alert('Invalid Token. Please check your entry and resubmit.');
      }
    });
  };

  window.ns = ns;
})(window.ns || {});
