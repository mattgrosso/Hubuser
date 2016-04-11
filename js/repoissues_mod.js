(function(ns) {
  'use strict';

  ns.repoIssues = {};

  ns.repoIssues.load = function loadRepoIssues(repoName, cb) {
    $('#repo-new-issue').remove();
    ajaxRepoIssues(repoName, cb);
  };

  function ajaxRepoIssues(repoName, cb) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/repos/' + ns.userData.username + '/' + repoName + '/issues',
      headers: {Authorization: 'token ' + ns.userData.token},
      dataType: 'JSON',
      success: function repoListAcquired(data) {
        console.log(data);
        var element = createRepoIssuesTable(data);
        cb(element);
      },
      error: function repoListNotAcquired(xhr) {
        console.log(xhr);
      }
    });
  }

  function createRepoIssuesTable(data) {
    $('.repo-issues').empty();
    $('.repo-issues')
      .attr({id: 'repo-issues'})
      .addClass('view-trigger')
      .append($('<h2>')
        .append($('<a>')
          .text(window.location.hash.substr(12))
          .attr({href: 'https://github.com/' + ns.userData.username + '/' + window.location.hash.substr(12) + '/issues', target: '_blank'})
        )
      )
      .append($('<a>')
          .append($('<button>')
            .attr({id: 'new-issue-button'})
            .text('New Issue')
          )
          .attr({href: '#reponewissue'})
      )
      .append(
        $('<table>')
          .addClass('table table-bordered table-striped table-hover')
          .attr({id: 'repo-issues-table'})
          .append(
            $('<thead>')
              .append(
                $('<tr>')
                  .append($('<td>').text('Issue Title'))
                  .append($('<td>').text('Submitter'))
                  .append($('<td>').text('Close?'))
              )
          )
          .append(
            $('<tbody>')
              .attr({id: 'issues-table-body'})
          )
      );
    data.forEach(function addIssuesToTableRows(each, i) {
      $('#issues-table-body')
        .append(
          $('<tr>')
            .append($('<td>')
              .addClass('repo-issues-table-titles')
              .append($('<a>')
                .attr({href: data[i].html_url})
                .text(each.title)
              )
            )
            .append($('<td>')
              .addClass('repo-issues-table-names')
              .text(each.user.login)
            )
            .append($('<td>')
              .addClass('repo-issues-table-close')
              .append(
                $('<button>')
                  .text('Close Issue')
              )
            )
        );
    });
    return($('.repo-issues'));
  }
  
  window.ns = ns;
})(window.ns || {});
