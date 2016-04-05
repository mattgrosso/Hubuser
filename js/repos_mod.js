(function(ns) {
  'use strict';

  ns.repos = [];

  $('#nav-repos').on('click', function loadRepoList() {
    ajaxRepoList();
  });

function ajaxRepoList() {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/' + ns.userData.username + '/repos',
    headers: {Authorization: "token " + ns.userData.token},
    dataType: 'JSON',
    success: function repoListAcquired(data) {
      console.log(data);
      createRepoList(data);
      addReposToTable(ns.repos);
      window.location.hash = '#repos';
      ns.doNav();
    },
    error: function repoListNotAcquired(xhr) {
      console.log(xhr);
    }
  });
}

function createRepoList(repoArray) {
  ns.repos = [];
  repoArray.forEach(function pullRepoData(each) {
    ns.repos.push({
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
        .append($('<td>').text(each.name))
        .append($('<td>').text(each.stars))
        .append($('<td>').text(each.issues))
      );
  });
}


  window.ns = ns;
})(window.ns || {});
