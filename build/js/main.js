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
        $('#navbar').show();
        $('main').show();
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
    ns.userData.userURL = data.html_url;
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
    $('.active').removeClass('active');
    if(!ns.userData.token && view !== '#login'){
      window.location.hash = '#login';
      return;
    }
    view = (view || "");
    var viewElement = $(view);
    var modName = view.substr(1);
    if(ns[modName] && ns[modName].load){
      ns[modName].load();
    } else if (modName.substr(0, 5) === 'repo-'){
      ns.repoDetails.load(modName.substr(5), function detailsCallback(element) {
        ns._addTabs('repodetail', view);
        element.show();
      });
    } else if (modName.substr(0, 11) === 'repoissues-'){
      ns.repoIssues.load(modName.substr(11), function issuesCallback(element) {
        ns._addTabs('repoissues', view);
        element.show();
      });
    } else if (!viewElement.length) {
      window.location.hash = '#login';
      return;
    }
    viewElement.show();
  };

  ns._addTabs = function addTabs(type, hash) {
    if(type === 'repodetail') {
      $('#temp-tags').empty();
      $('#temp-tags').addClass('nav nav-tabs');
      $('#temp-tags')
        .append($('<li>')
          .addClass('active')
          .attr({id: 'repo-detail-tab'})
          .append($('<a>')
            .attr({href: hash})
            .text('Repo Details')
          )
        );
    } else if(type === 'repoissues') {
      $('#repo-issues-tab').remove();
      $('#temp-tags')
        .append($('<li>')
          .addClass('active')
          .attr({id: 'repo-issues-tab'})
          .append($('<a>')
            .attr({href: hash})
            .text('Repo Issues')
          )
        );
    } else if(type === 'reponewissue'){
      $('#repo-new-issue').remove();
      $('#temp-tags')
        .append($('<li>')
          .addClass('active')
          .attr({id: 'repo-new-issue'})
          .append($('<a>')
            .attr({href: hash})
            .text('New Issue')
          )
        );
    } else {
      return 'not a type';
    }
  };




  ns.init = function init() {
    ns.doNav(window.location.hash);
  };


  window.ns = ns;
})(window.ns || {});

(function(ns) {
  'use strict';

  ns.profile = {};

  ns.profile.load = function loadProfile() {
    $('#nav-profile').addClass('active');
    toggleProfileData();
  };

  function toggleProfileData() {
    $('#profile').empty();
    $('#profile')
      .append($('<ul>')
        .attr({id: 'profile-list'})
        .append($('<li>').text('Name: ' + ns.userData.name))
        .append($('<li>')
          .text('Username: ')
          .append($('<a>')
            .text(ns.userData.username)
            .attr({href: ns.userData.userURL, target: '_blank'}))
        )
        .append($('<li>').text('Repos: ' + ns.userData.repos))
        .append($('<li>').text('Followers: ' + ns.userData.followers + ' (following ' + ns.userData.following + ')'))
        .append($('<li>').text('Account Created: ' + ns.userData.acctStart))
        .append($('<img>').attr({src: ns.userData.userImage, id: 'user-image'}))
      );
  }

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
        ns.reponewissue.repoName = data.name;
        ns.reponewissue.repoURL = data.html_url;
        ns.reponewissue.repoOwner = data.owner.login;
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
                .append($('<li>').text('Owner: ' + data.owner.login))
                .append($('<li>')
                  .text('Stars: ' + data.stargazers_count))
                .append($('<li>')
                  .text('Forks: ' + data.forks_count))
                .append($('<li>')
                  .text('Created on: ' + data.created_at))
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
    $('#repo-new-issue').remove();
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
        console.log(data);
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
      .attr({id: 'repo-issues'})
      .addClass('view-trigger')
      .append($('<h2>')
        .append($('<a>')
          .text(window.location.hash.substr(12))
          .attr({href: 'https://github.com/' + ns.userData.username + "/" + window.location.hash.substr(12), target: '_blank'})
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
    data.forEach(function addIssuesToTableRows(each) {
      $('#issues-table-body')
        .append(
          $('<tr>')
            .append($('<td>')
              .addClass('repo-issues-table-titles')
              .text(each.title)
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

(function(ns) {
  'use strict';

  ns.reponewissue = {};

  //This module needs to
  //1. Open a new tab
  //2. Add a form and a header
  //3. Post the new issue upon submit of the form.

  ns.reponewissue.load = function loadNewIssue() {
    ns._addTabs('reponewissue', window.location.hash);
    populateNewIssueForm();
  };

  //Add a form and a header.
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

  // Post new issue on click.
  function ajaxPostNewIssue(title, body) {
    $.ajax({
      type: 'POST',
      url: 'https://api.github.com/repos/' + ns.reponewissue.repoOwner + '/'+ ns.reponewissue.repoName + '/issues',
      headers: {Authorization: "token " + ns.userData.token},
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
