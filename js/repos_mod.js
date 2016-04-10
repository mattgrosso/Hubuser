(function(ns) {
  'use strict';

  ns.repos = {};

  var repoList = [];

  ns.repos.load = function loadRepos() {
    $('#nav-repos').addClass('active');
    ajaxRepoList();
  };


function ajaxRepoList() {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/' + ns.userData.username + '/repos',
    headers: {Authorization: "token " + ns.userData.token},
    dataType: 'JSON',
    success: function repoListAcquired(data) {
      createRepoList(data);
      addReposToTable(repoList);
    },
    error: function repoListNotAcquired(xhr) {
      console.log(xhr);
    }
  });
}

// ns.repos._createRepoList = function createRepoList(repoArray) {
function createRepoList(repoArray) {
  repoList = [];
  repoArray.forEach(function pullRepoData(each) {
    repoList.push({
      name: each.name,
      stars: each.stargazers_count,
      issues: each.open_issues
    });
  });
}

function addReposToTable(array) {
  $('#repos').empty();
  $('#repos')
    .append($('<table>')
      .attr({id: 'repo-table'})
      .addClass('table table-bordered table-striped table-hover')
      .append($('<thead>')
        .append($('<tr>')
          .append($('<td>')
            .text('Name')
          )
          .append($('<td>')
            .text('Stars')
          )
          .append($('<td>')
            .text('Open Issues')
          )
        )
      )
      .append($('<tbody>')
        .attr({id: 'repo-list-table-body'})
      )
    );
  array.forEach(function addRepoToNewRow(each) {
    $('#repo-list-table-body')
      .append($('<tr>')
        .append($('<td>')
          .addClass('repo-table-titles')
          .append($('<a>')
            .attr({href: '#repo-' + each.name})
            .text(each.name)
          )
        )
        .append($('<td>')
          .addClass('repo-table-stars')
          .text(each.stars)
        )
        .append($('<td>')
          .addClass('repo-table-issues')
          .text(each.issues)
        )
      );
  });
}


  window.ns = ns;
})(window.ns || {});
