/** @jsx React.DOM */
"use strict";
jest.autoMockOff();

var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var SearchModal = require('../');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('SearchModal', function() {
  it('renders a modal overlay', function() {
    var searchModal = <SearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(searchModal);
    var overlayElement = findByClass(element, 'Overlay');

    expect(overlayElement).toBeDefined();
  });

  it('has a header with input', function() {
    var searchModal = <SearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(searchModal);
    var headerElement = findByClass(element, 'SearchModal__header');
    var inputElement = findByClass(headerElement, 'SearchInput');

    expect(headerElement).toBeDefined();
    expect(inputElement).toBeDefined();
  });

  it('has a body with search results', function() {
    var searchModal = <SearchModal autoFocus={ false } />;
    var element = TestUtils.renderIntoDocument(searchModal);
    var bodyElement = findByClass(element, 'SearchModal__body');
    var resultsElement = findByClass(bodyElement, 'SearchResults');

    expect(bodyElement).toBeDefined();
    expect(resultsElement).toBeDefined();
  });

  it('has pagination', function() {
    var searchModal = <SearchModal autoFocus={ false } pagination={{ totalPages: 2 }} />;
    var element = TestUtils.renderIntoDocument(searchModal);
    var headerElement = findByClass(element, 'SearchModal__header');
    var paginationElement = findByClass(headerElement, 'SearchPagination');
    var bodyElement = findByClass(element, 'SearchModal__body');

    expect(headerElement).toBeDefined();
    expect(paginationElement).toBeDefined();
    expect(bodyElement.getDOMNode().getAttribute('class')).toContain('SearchModal__body--paginated');
  });
});