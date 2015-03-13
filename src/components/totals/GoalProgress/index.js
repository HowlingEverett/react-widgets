"use strict";

var _         = require('lodash');
var React     = require('react');
var campaigns = require('../../../api/campaigns');
var Icon      = require('../../helpers/Icon');
var numeral   = require('numeral');

module.exports = React.createClass({
  displayName: "GoalProgress",
  propTypes: {
    goal: React.PropTypes.number,
    campaignUid: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      goal: 0,
      campaignUid: '',
      textColor: '#FFFFFF',
      format: '0,0'
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      total: 0,
      currencySymbol: '$'
    };
  },

  componentWillMount: function() {
    this.loadCampaignGoal();
  },

  loadCampaignGoal: function() {
    this.setState({ isLoading: true });
    campaigns.find(this.props.campaignUid, this.onSuccess);
  },

  onSuccess: function(result) {
    var campaign = result.campaign;
    var funds_raised = campaign.funds_raised || {};
    var total = funds_raised.cents || 0;
    var currency = funds_raised.currency || {};
    var currencySymbol = currency.symbol || '$';

    this.setState({
      isLoading: false,
      total: total,
      currencySymbol: currencySymbol
    });
  },

  renderProgressBar: function() {
    var total = this.state.total;
    var goal = this.props.goal;
    var offsetWidth = numeral(total / goal).format('0%');
    var style = { width: offsetWidth || '100%' };
    var classes = 'GoalProgress__bar';

    if (offsetWidth == '100%') {
      classes += '--completed';
    }

    if (this.state.isLoading) {
      return null;
    } else {
      return (
        <div className={ classes } >
          <div className="GoalProgress__barTable" style={ style }>
            <div className="GoalProgress__barFill"></div>
            <div className="GoalProgress__barChevron"></div>
          </div>
        </div>
      );
    }
  },

  renderIcon: function() {
    var icon = "trophy";
    if (this.state.isLoading) {
      icon = "refresh";
    }

    return(
      <div className="GoalProgress__icon">
        <Icon icon={ icon } />
      </div>
    );
  },

  renderText: function() {
    var props = this.props,
        format = props.format,
        goal = props.goal / 100;
    var state = this.state,
        currencySymbol = state.currencySymbol,
        total = this.state.total / 100;
    var formattedGoal = currencySymbol + numeral(goal).format(format) + ' goal';
    var formattedTotal = currencySymbol + numeral(total).format(format);

    return (
      <p className="GoalProgress__text">
        { formattedTotal }
        <span className="GoalProgress__text--raised"> raised of </span>
        { formattedGoal}
      </p>
    );
  },

  render: function() {
    var customStyle = {
      color: this.props.textColor
    };

    return (
      <div className="GoalProgress" style={ customStyle }>
        <div className="GoalProgress__area">
          { this.renderProgressBar() }
          { this.renderText() }
        </div>
        { this.renderIcon() }
      </div>
    );
  }
});
