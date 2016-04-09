(function(ns) {
  'use strict';

  ns.reponewissue = {};

  //This module needs to
  //1. Open a new tab
  //2. Add a form and a header
  //3. Post the new issue upon submit of the form.

  ns.reponewissue.load = function loadNewIssue() {
    console.log(ns.reponewissue.repoURL);
    ns._addTabs('reponewissue', window.location.hash);
    populateNewIssueForm();
  };

  //Add a form and a header.
  function populateNewIssueForm() {
    $('#new-issue-repo-name')
      .attr({href: ns.reponewissue.repoURL})
      .text(ns.reponewissue.repoName);
  }

  $('#new-issue-submit-button').on('click', function submitNewIssue() {
    ajaxPostNewIssue(
      $('#new-issue-title').val(),
      $('#new-issue-body').val()
    );
  });

  // Post new issue on click.
  function ajaxPostNewIssue(title, body) {
    $.ajax({
      type: 'POST',
      url: ns.reponewissue.repoURL + '/issues',
      headers: {Authorization: "token " + ns.userData.token},
      dataType: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({
        title: title,
        body: body
      }),
      success: function issuePosted(data) {
        console.log(data);
      },
      error: function issueNotPosted(xhr) {
        console.log(xhr);
      }
    });
  }

  window.ns = ns;
})(window.ns || {});
