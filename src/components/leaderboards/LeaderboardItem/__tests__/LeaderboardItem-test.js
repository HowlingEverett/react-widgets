"use strict";
jest.autoMockOff();

describe('LeaderboardItem', function() {
  var React           = require('react');
  var ReactDOM        = require('react-dom');
  var LeaderboardItem = require('../');
  var TestUtils       = require('react-addons-test-utils');
  var findByClass     = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass     = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    var leaderboardItem;
    var element;

    beforeEach(function() {
      leaderboardItem = <LeaderboardItem url="hello-world.com" />;
      element = TestUtils.renderIntoDocument(leaderboardItem);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('is a link', function() {
      var parentNode = ReactDOM.findDOMNode(element);
      expect(parentNode.tagName).toBe('A');
      expect(parentNode.getAttribute('href')).toEqual('hello-world.com');
    });

    it('renders funds raised', function() {
      var elementFunds = findByClass(element, 'LeaderboardItem__amount');
      expect(elementFunds).not.toBeNull();
    });

    it('renders a name', function() {
      var elementName = findByClass(element, 'LeaderboardItem__name');
      expect(elementName).not.toBeNull();
    });

    it('renders a rank', function() {
      var elementRank = findByClass(element, 'LeaderboardItem__rank');
      expect(elementRank).not.toBeNull();
    });
  });

  describe('Render image option', function() {
    var leaderboardItem;
    var element;
    var elementImg;

    it('renders a profile image if set to true', function() {
      leaderboardItem = <LeaderboardItem renderImage={ true } />;
      element = TestUtils.renderIntoDocument(leaderboardItem);
      elementImg = scryByClass(element, 'LeaderboardItem__image');
      expect(elementImg.length).toEqual(1);
    });

    it('renders wont render an image if set to false', function() {
      leaderboardItem = <LeaderboardItem renderImage={ false } />;
      element = TestUtils.renderIntoDocument(leaderboardItem);
      elementImg = scryByClass(element, 'LeaderboardItem__image');
      expect(elementImg.length).toEqual(0);
    });
  });

  describe('Render charity name option', function() {
    var leaderboardItem;
    var element;
    var elementCharity;

    it('renders a charity name if present', function() {
      leaderboardItem = <LeaderboardItem charityName='foo' />;
      element = TestUtils.renderIntoDocument(leaderboardItem);
      elementCharity = scryByClass(element, 'LeaderboardItem__charity');
      expect(elementCharity.length).toEqual(1);
      expect(elementCharity[0].textContent).toEqual('foo');
    });

    it('won\'t render a charity name if not present', function() {
      leaderboardItem = <LeaderboardItem />;
      element = TestUtils.renderIntoDocument(leaderboardItem);
      elementCharity = scryByClass(element, 'LeaderboardItem__charity');
      expect(elementCharity.length).toEqual(0);
    });
  });
});
