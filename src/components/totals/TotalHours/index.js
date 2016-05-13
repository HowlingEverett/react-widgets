'use strict';

var _                = require('lodash');
var React            = require('react');
var campaigns        = require('../../../api/campaigns');
var numeral          = require('numbro');
var Total            = require('../Total');
var SECONDS_TO_HOURS = 1 / 3600;

module.exports = React.createClass({
  displayName: 'TotalHours',
  propTypes: {
    campaignUid: React.PropTypes.string,
    campaignUids: React.PropTypes.array,
    charityUid: React.PropTypes.string,
    renderIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    format: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      campaignUids: [],
      charityUid: '',
      renderIcon: true,
      backgroundColor: null,
      textColor: null,
      format: '0,0[.]0[0]',
      defaultI18n: {
        title: 'Hours',
        emptyLabel: 'No data to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      total: 0
    };
  },

  componentWillMount: function() {
    this.loadCampaigns();
  },

  setUids: function() {
    var campaignUids = [];

    if (this.props.campaignUid) {
      campaignUids.push(this.props.campaignUid);
    } else {
      campaignUids = this.props.campaignUids;
    }

    return campaignUids;
  },

  loadCampaigns: function() {
    this.setState({ isLoading: true });
    campaigns.findByUids(this.setUids(), this.onSuccess);
  },

  combineActivityData: function(fitnessActivity) {
    return _.reduce(fitnessActivity, function(sum, n) {
      return sum += n.duration_in_seconds;
    }, 0);
  },

  onSuccess: function(result) {
    var fitnessActivity = 0;

    _.forEach(result.campaigns, function(campaign) {
      fitnessActivity += this.combineActivityData(campaign.fitness_activity_overview);
    }.bind(this));

    if (fitnessActivity){
      this.setState({
        isLoading: false,
        hasResults: true,
        total: fitnessActivity
      });
    } else {
      this.setState({ isLoading: false });
    }
  },

  renderTotal: function() {
    return numeral(this.state.total * SECONDS_TO_HOURS).format(this.props.format);
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon === true) {
      renderIcon = 'clock-o';
    }

    return renderIcon;
  },

  render: function() {
    return (
      <Total
        total={ this.renderTotal() }
        renderIcon={ this.renderIcon() }
        backgroundColor={ this.props.backgroundColor }
        textColor={ this.props.textColor }
        i18n={ this.props.i18n }
        isLoading={ this.state.isLoading }
      />
    );
  }
});
