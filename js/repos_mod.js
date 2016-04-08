(function(ns) {
  'use strict';

  ns.repos = {};

  var repoList = [];

  ns.repos.load = function loadRepos() {
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
  $('#repo-list-table-body').empty();
  array.forEach(function addRepoToNewRow(each) {
    $('#repo-list-table-body')
      .append($('<tr>')
        .append($('<td>')
          .append($('<a>')
            .attr({href: '#repo-' + each.name})
            .text(each.name)
          )
        )
        .append($('<td>').text(each.stars))
        .append($('<td>').text(each.issues))
      );
  });
}


  window.ns = ns;
})(window.ns || {});
