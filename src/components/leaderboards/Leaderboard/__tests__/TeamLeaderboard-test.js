/** @jsx React.DOM */
"use strict";
jest.autoMockOff();
jest.mock('../../../../api/pages');

describe('Leaderboard', function() {
  var React                       = require('react/addons');
  var Leaderboard                 = require('../');
  var pages                       = require('../../../../api/pages');
  var TestUtils                   = React.addons.TestUtils;

  describe('component defaults', function() {
    var leaderboard;
    var element;

    beforeEach(function() {
      leaderboard = <Leaderboard campaignUid="au-0" />;
      element = TestUtils.renderIntoDocument(leaderboard);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });
  });
});
