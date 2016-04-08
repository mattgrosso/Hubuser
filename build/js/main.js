(function(ns) {
  'use strict';

  ns.userData = {};

  $('#login').on('submit', function githubLogin(event) {
    event.preventDefault();
    ns.userData.token = $(this).find('#token-entry').val();
    ns.ajaxLogin();
  });

  ns.ajaxLogin = function ajaxLogin() {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'JSON',
      headers: {Authorization: "token " + ns.userData.token},
      success: function tokenAcquired(data) {
        createUserObject(data);
        ns.toggleProfileData();
        window.location.hash = '#profile';
      },
      error: function tokenNotAcquired(xhr) {
        alert('Invalid Token. Please check your entry and resubmit.');
      }
    });
  };

  function createUserObject(data) {
    ns.userData.username = data.login;
    ns.userData.name = data.name;
    ns.userData.repos = data.public_repos;
    ns.userData.followers = data.followers;
    ns.userData.following = data.following;
    ns.userData.acctStart = data.created_at;
    ns.userData.userImage = data.avatar_url;
  }

  window.ns = ns;
})(window.ns || {});

(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav(event) {
    ns.doNav(window.location.hash);
  });

  ns.doNav = function doNav(view) {
    $('.view-trigger').hide();
    if(!ns.userData.token && view !== '#login'){
      window.location.hash = '#login';
      return;
    }
    view = (view || "");
    var viewElement = $(view);
    var modName = view.substr(1);
    console.log(modName);
    console.log(modName.substr(0, 11));
    if(ns[modName] && ns[modName].load){
      ns[modName].load();
    } else if (modName.substr(0, 5) === 'repo-'){
      ns.repoDetails.load(modName.substr(5), function detailsCallback(element) {
        element.show();
      });
    } else if (modName.substr(0, 11) === 'repoissues-'){
      console.log('triggering repoissues- function');
      ns.repoIssues.load(modName.substr(11), function issuesCallback(element) {
        element.show();
      });

    } else if (!viewElement.length) {
      window.location.hash = '#login';
      return;
    }
    viewElement.show();
  };

  ns.init = function init() {
    ns.doNav(window.location.hash);
  };


  window.ns = ns;
})(window.ns || {});

(function(ns) {
  'use strict';

  ns.toggleProfileData = function toggleProfileData() {
    $('#profileUsername').text(ns.userData.username);
    $('#profileName').text(ns.userData.name);
    $('#profileRepos').text(ns.userData.repos);
    $('#profileFollowers').text(ns.userData.followers);
    $('#profileFollowing').text(ns.userData.following);
    $('#profileCreated').text(ns.userData.acctStart);
    $('#user-image').attr({src: ns.userData.userImage});
  };

  window.ns = ns;
})(window.ns || {});

(function(ns) {
  'use strict';

  ns.repoDetails = {};

  // 1. Run an ajax for repo details
  // 2. Create some HTML to display those details.
  ns.repoDetails.load = function loadRepoDetails(repoName, cb) {
      ajaxRepoDetails(repoName, cb);
  };

  //1. Run and ajax for repo details.
  function ajaxRepoDetails(repoName, cb) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/repos/' + ns.userData.username + "/" + repoName,
      headers: {Authorization: "token " + ns.userData.token},
      dataType: 'JSON',
      success: function repoListAcquired(data) {
        var element = createRepoDetails(data);
        cb(element);
      },
      error: function repoListNotAcquired(xhr) {
        console.log(xhr);
      }
    });
  }

  //2. Create some HTML to display those details.
  function createRepoDetails(data) {
    console.log(data);

    return $('.repo-detail')
      .empty()
      .attr({id: window.location.hash.substr(3)})
      .addClass('view-trigger')
      .append($('<h2>')
        .append($('<a>')
          .text(data.name))
          .attr({href: data.url})
      )
      .append($('<p>').text(data.description))
      .append($('<a>')
        .text(data.open_issues_count + ' open issues')
        .attr({href: '#repoissues-' + data.name})
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
