"use strict";
jest.autoMockOff();

describe('Total', function() {
  var React       = require('react');
  var Total  = require('../');
  var TestUtils   = require('react-addons-test-utils');
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Component defaults', function() {
    var total;
    var element;

    beforeEach(function() {
      total = <Total />;
      element = TestUtils.renderIntoDocument(total);
    });

    it('renders something', function() {
      expect(element).not.toBeNull();
    });

    it('renders no icon', function() {
      var icon = scryByClass(element, 'Totals__icon');
      expect(icon.length).toEqual(0);
    });

    it('renders a refresh icon when loading', function() {
      total = <Total isLoading={ true } />;
      element = TestUtils.renderIntoDocument(total);
      var icon = scryByClass(element, 'fa-refresh');
      expect(icon.length).toEqual(1);
    });

  });

  describe('Custom parameters', function() {
    var total;
    var element;

    it('renders a total', function() {
      total = <Total total="5000" />;
      element = TestUtils.renderIntoDocument(total);

      var formattedTotal = findByClass(element, 'Totals__total');
      expect(formattedTotal.textContent).toBe('5000');
    });


    it('renders a specified icon', function() {
      total = <Total renderIcon="clock-o" />;
      element = TestUtils.renderIntoDocument(total);
      var icon = scryByClass(element, 'fa-clock-o');
      expect(icon.length).toEqual(1);
    });
  });
});
