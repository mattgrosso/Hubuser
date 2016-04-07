(function(ns) {
  'use strict';

  ns.repoDetails = {};

  // 1. Run an ajax for repo details
  // 2. Create some HTML to display those details.
  ns.repoDetails.load = function loadRepoDetails(repoName) {
      console.log('in repo details now');
      ajaxRepoDetails(repoName);
  };

  //1. Run and ajax for repo details.
  function ajaxRepoDetails(repoName) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/repos/' + ns.userData.username + "/" + repoName,
      headers: {Authorization: "token " + ns.userData.token},
      dataType: 'JSON',
      success: function repoListAcquired(data) {
        createRepoDetails(data);

      },
      error: function repoListNotAcquired(xhr) {
        console.log(xhr);
      }
    });
  }

  //2. Create some HTML to display those details.
  function createRepoDetails(data) {
    $('.repo-detail')
      .attr({id: window.location.hash.substr(3)})
      .append($('<h2>')
        .append($('<a>')
          .text(data.name))
          .attr({href: data.url})
      )
      .append($('<p>').text(data.description))
      .append($('<a>')
        .text(data.open_issues_count + ' open issues')
        .attr({href: data.issues_url})
      )
      .append($('<ul>')
                .append($('<li>')
                  .text('Owner: ')
                  .append($('<p>').text(data.owner.login))
                )
                .append($('<li>')
                  .text('Stars: ')
                  .append($('<p>').text(data.stargazers_count))

                )
                .append($('<li>')
                  .text('Forks: ')
                  .append($('<p>').text(data.forks_count))

                )
                .append($('<li>')
                  .text('Created on: ')
                  .append($('<p>').text(data.created_at))

                )
      );
  }

  window.ns = ns;
})(window.ns || {});
