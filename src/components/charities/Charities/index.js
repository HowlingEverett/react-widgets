/** @jsx React.DOM */
"use strict";

var _                 = require('lodash');
var React             = require('react');
var I18nMixin         = require('../../mixins/I18n');
var pages             = require('../../../api/pages');
var Icon              = require('../../helpers/Icon');
var Charity           = require('../Charity');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "Charities",
  propTypes: {
    charityUids: React.PropTypes.array.isRequired,
    page_count: React.PropTypes.string,
    page_size: React.PropTypes.string,
    renderIcon: React.PropTypes.bool,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      charityUids: [],
      page_count: '1',
      page_size: '6',
      type: 'user',
      backgroundColor: '#EBEBEB',
      textColor: '#333333',
      defaultI18n: {
        heading: 'Fundraisers',
        emptyLabel: 'No charities to display.'
      }
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      hasResults: false,
      results: []
    };
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    var props = this.props;


    console.log(charityUids.length);

    // for each charityuid within our array

    // _.each(charityUids, function(i){
    //   charities.find(props.charityUid[i], this.onSuccess);
    // });


      // request this individual charity data

      // create a new object with just the shit we need

      // push this object to an array where we store out data



    /**
     *  TODO: Raise issue to have a way to bundle
     *        multiple charity ids in to one request.
     */
  },

  onSuccess: function(result) {
    this.setState({
      isLoading: false,
      results: result.pages
    },

    function() {
      if (!_.isEmpty(this.state.results)) {
        this.setState({
          hasResults: true
        });
      }
    }.bind(this));
  },

  renderCharity: function() {
    var emptyLabel = this.t('emptyLabel');

    if (this.state.isLoading) {
      return <Icon className="Charity__loading" icon="refresh" spin={ true }/>;
    } else {
      if (this.state.hasResults) {
        return this.state.results.map(function(d) {
          return <Charity key={ d.id } pageUrl={ d.url } imgSrc={ d.image.large_image_url } imgTitle={ d.name } />
        });
      } else {
        return (
          <p className="Charity__empty-label">{ emptyLabel }</p>
        )
      }
    }
  },

  render: function() {
    var heading = this.t('heading');
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className="Charity" style={ customStyle }>
        <h3 className="Charity__heading">{ heading }</h3>

        // RENDER TAB COMPONENT

        <div className="Charity__content">
          { this.renderCharity() }
        </div>
      </div>
    )
  }
});
