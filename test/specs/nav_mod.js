(function() {
  'use strict';
  var assert = chai.assert;

  var fixtureHTML = $('#fixtures').html();

  suite('nav testing', function () {

    setup(function() {
            $('#fixtures').html(fixtureHTML);
        });

    test('Nav hides .view-trigger',function () {
      assert.ok( $('.view-trigger').length > 0 , 'There are items in class .view-trigger');
      window.ns.userData = {token: 'fjdkaslfdask'};
      window.ns.doNav();
      assert.ok( $('.view-trigger:hidden').length > 0, 'All .view-triggers are hidden' );
    });

    test('addTabs function adds tabs', function () {
      assert.strictEqual($('#navbar ul li').length, 2, 'At the start the Nav should have 2 entries');
      var type = 'repodetail';
      var hash = '#repo-asteroids';
      window.ns._addTabs(type, hash);
      assert.strictEqual( $('#navbar ul li').length, 3, 'There should be one new tab in the nav');
      assert.strictEqual( $('#navbar ul li:last-child a').attr('href'), hash, 'The href value of the added element has the correct hash');
    });

    test('addTabs function handles a blank type given', function () {
      assert.strictEqual(window.ns._addTabs(), 'not a type', 'If no type or hash is given returns not a type');
      assert.strictEqual(window.ns._addTabs('not a type'), 'not a type', 'If wrong type is given returns not a type');
      assert.strictEqual(window.ns._addTabs(), 'not a type', 'If no type or hash is given returns not a type');
    });






  });

})();
