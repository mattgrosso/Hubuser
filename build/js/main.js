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
    if(ns.userData.token !== ""){
      ns.doNav();
    }
    else {
      window.location.hash = '#login';
      ns.doNav();
    }

  });

  ns.doNav = function doNav() {
    $('.view-trigger').hide();
    var modName = window.location.hash.substr(1);
    if(ns.modName && ns.modName.load){
      ns.modName.load();
    }
    $(window.location.hash).show();
  };

  ns.init = function init() {
    window.location.hash = '#login';
    ns.doNav();
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

  ns.repodetails = {};

  ns.repodetails.load = function loadRepoDetails() {
      
  };

  function createRepoDetails() {
    $('.repo-detail')
      .attr({id: window.location.hash.substr(3)})
      .append($('<h2>').text('Put a link to the appropriate repo here'))
      .append($('<p>').text('Put the description from the repo here'))
      .append($('<p>').text('Put the number of open issues here'))
      .append($('<ul>')
                .append($('<li>').text('Owner: the name of the owner'))
                .append($('<li>').text('Stars: the number of stars'))
                .append($('<li>').text('Forks: the number of forks'))
                .append($('<li>').text('Created on: the creation date'))
      );
  }

  window.ns = ns;
})(window.ns || {});



(function(ns) {
  'use strict';

  ns.repos = {};

  ns.repos.load = function loadRepos() {
    repoList = [];
    ajaxRepoList();
  };


function ajaxRepoList() {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/' + ns.userData.username + '/repos',
    headers: {Authorization: "token " + ns.userData.token},
    dataType: 'JSON',
    success: function repoListAcquired(data) {
      console.log(data);
      createRepoList(data);
      addReposToTable(repoList);
      window.location.hash = '#repos';
      ns.doNav();
    },
    error: function repoListNotAcquired(xhr) {
      console.log(xhr);
    }
  });
}

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
