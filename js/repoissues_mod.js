(function(ns) {
  'use strict';

  ns.repoIssues = {};

//1. ajax to get issues from given repo
//2. display those issues in a table

  ns.repoIssues.load = function loadRepoIssues(repoName, cb) {
    ajaxRepoIssues(repoName, cb);
  };

//1. ajax to get issues from a given repo
  function ajaxRepoIssues(repoName, cb) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/repos/' + ns.userData.username + '/' + repoName + '/issues',
      headers: {Authorization: "token " + ns.userData.token},
      dataType: 'JSON',
      success: function repoListAcquired(data) {
        ns.reponewissue.repoURL = data[0].repository_url;
        ns.reponewissue.repoName = data[0].repository_url.split('/')[5];
        var element = createRepoIssuesTable(data);
        cb(element);
      },
      error: function repoListNotAcquired(xhr) {
        console.log(xhr);
      }
    });

  }

//2. display those issues in a table
  function createRepoIssuesTable(data) {
    $('.repo-issues').empty();
    $('.repo-issues')
      .addClass('view-trigger')
      .append($('<a>')
          .append($('<button>')
            .text('New Issue')
          )
          .attr({href: '#reponewissue'})
      )
      .append(
        $('<table>')
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
    data.forEach(function addIssuesToTableRows(each) {
      $('#issues-table-body')
        .append(
          $('<tr>')
            .append($('<td>')
              .text(each.title)
            )
            .append($('<td>')
              .text(each.user.login)
            )
            .append($('<td>')
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
