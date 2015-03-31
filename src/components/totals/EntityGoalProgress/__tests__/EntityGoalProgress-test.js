"use strict";
jest.autoMockOff();
jest.mock('../../../../api/campaigns');

describe('FundsRaised', function() {
  var React               = require('react/addons');
  var EntityGoalProgress  = require('../');
  var campaigns           = require('../../../../api/campaigns');
  var TestUtils           = React.addons.TestUtils;
  var findByClass         = TestUtils.findRenderedDOMComponentWithClass;

  var state = { isLoading: false, total: 15000, goal: 30000 };
  var element;

  beforeEach(function() {
    campaigns.find.mockClear();
    element = TestUtils.renderIntoDocument(<EntityGoalProgress campaignUid="us-22" />);
  });

  it('renders something', function() {
    expect(element).not.toBeNull();
  });

  it('renders GoalProgress text', function() {
    element.setState(state);
    findByClass(element, 'GoalProgress__text');
  });

  it('renders a GoalProgress bar', function() {
    element.setState(state);
    findByClass(element, 'GoalProgress__bar');
  });

  it('handles a single campaign id', function() {
    expect(campaigns.find).toBeCalledWith("us-22", element.onSuccess);
  });
});