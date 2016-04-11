(function(ns) {
  'use strict';

  ns.reponewissue = {};

  ns.reponewissue.load = function loadNewIssue() {
    ns._addTabs('reponewissue', window.location.hash);
    populateNewIssueForm();
  };

  function populateNewIssueForm() {
    $('#reponewissue').empty();
    $('#reponewissue')
      .append($('<h2>')
        .append($('<a>')
          .attr({id: 'new-issue-repo-name', href: ns.reponewissue.repoURL})
          .text(ns.reponewissue.repoName)
        )
      )
      .append($('<form>')
        .attr({action: '', method: 'post'})
        .append($('<textarea>')
          .attr({id: 'new-issue-title', rows: '2', cols: '40', placeholder: 'Issue title...'})
        )
        .append($('<textarea>')
          .attr({id: 'new-issue-body', rows: '8', cols: '40', placeholder: 'Issue content...'})
        )
      )
      .append($('<button>')
        .attr({type: 'button', href: '#repoissues-' + ns.reponewissue.repoName})
        .text('Cancel')
      )
      .append($('<button>')
        .attr({id: 'new-issue-submit-button'})
        .text('Submit')
      );
  }

  $('#reponewissue').on('click', '#new-issue-submit-button', function newIssueSubmit() {
    event.preventDefault();
    ajaxPostNewIssue( $('#new-issue-title').val(), $('#new-issue-body').val()
    );
  });

  function ajaxPostNewIssue(title, body) {
    $.ajax({
      type: 'POST',
      url: 'https://api.github.com/repos/' + ns.reponewissue.repoOwner + '/'+ ns.reponewissue.repoName + '/issues',
      headers: {Authorization: 'token ' + ns.userData.token},
      dataType: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({
        title: title,
        body: body
      }),
      success: function issuePosted(data) {
        window.location.hash = '#repoissues-' + ns.reponewissue.repoName;
      },
      error: function issueNotPosted(xhr) {
        console.log(xhr);
      }
    });
  }

  window.ns = ns;
})(window.ns || {});
