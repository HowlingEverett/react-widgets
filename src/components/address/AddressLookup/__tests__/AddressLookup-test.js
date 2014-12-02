"use strict";
jest.autoMockOff();

jest.mock('../../../../api/address');
var address = require('../../../../api/address');
var _ = require('lodash');
_.debounce = function(callback) { return callback; };

var React = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var AddressLookup = require('../');
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var findByProp = require('../../../../test/helpers/scryRenderedDOMComponentsWithProp').findRenderedDOMComponentWithProp;
var addressSearchResult = {addresses: [
  { id: '123', label: 'TestAddressListing' }
]};
var addressFindResult = {address: {
  street_address: '1 Place Pl',
  street_address_2: '',
  locality: 'Sydney',
  postal_code: '2000',
  region: 'New South Wales',
  country_name: 'Australia' }
};

describe('AddressLookup', function() {
  beforeEach(function() {
    address.find.mockClear();
    address.search.mockClear();
  });

  it('allows you to select a country', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var countrySelect = findByClass(element, 'CountrySelect__Toggle').getDOMNode();
    TestUtils.Simulate.click(countrySelect);
    var country = findByClass(element, 'CountrySelectItem--Focused').getDOMNode();
    TestUtils.Simulate.click(country);
    expect(element.state.country).toBe('AF');
  });

  it('allows you to filter and select a country', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var countrySelect = findByClass(element, 'CountrySelect__Toggle').getDOMNode();
    TestUtils.Simulate.click(countrySelect);
    var input = findByClass(element, 'AddressInput__Field').getDOMNode();
    TestUtils.Simulate.change(input, { target: { value: "king" } });
    var country = findByClass(element, 'CountrySelectItem--Focused').getDOMNode();
    TestUtils.Simulate.click(country);
    expect(element.state.country).toBe('GB');
  });

  it('returns a list of addresses', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    var input = findByClass(element, 'AddressInput__Field').getDOMNode();
    TestUtils.Simulate.change(input, { target: { value: "TestAddress" } });
    expect(address.search).lastCalledWith('TestAddress', 'US', jasmine.any(Function));

    var callback = address.search.mock.calls[0][2];
    callback(addressSearchResult);
    expect(element.state.addressList).toBe(addressSearchResult.addresses);

    var listItem = findByClass(element, 'AddressListing__Primary').getDOMNode();
    expect(listItem.textContent).toContain('TestAddressListing');
  });

  it('breaks down a selected address', function() {
    var element = TestUtils.renderIntoDocument(<AddressLookup />);
    element.setList(addressSearchResult);
    var listItem = findByClass(element, 'AddressListing--Focused').getDOMNode();
    TestUtils.Simulate.click(listItem);
    expect(address.find).lastCalledWith('123', 'US', jasmine.any(Function));

    var callback = address.find.mock.calls[0][2];
    callback(addressFindResult);
    expect(element.state.address).toBe(addressFindResult.address);

    var breakdown = findByClass(element, 'Address__Breakdown');
    var streetAddress = findByProp(breakdown, 'id', 'street_address').getDOMNode();
    var locality = findByProp(breakdown, 'id', 'locality').getDOMNode();
    expect(streetAddress.value).toBe('1 Place Pl');
    expect(locality.value).toBe('Sydney');
  });
});