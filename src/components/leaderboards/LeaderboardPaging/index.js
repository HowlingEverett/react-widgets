"use strict";

var _     = require('lodash');
var React = require('react');
var Icon  = require('../../helpers/Icon');
var cx    = require('react/lib/cx');

module.exports = React.createClass({
  displayName: 'LeaderboardPaging',

  handleNext: function() {
    this.props.nextPage();
  },

  handlePrev: function() {
    this.props.prevPage();
  },

  renderPrevBtn: function() {
    var classes = cx({
      "LeaderboardPaging__prevBtn": true,
      "LeaderboardPaging__prevBtn--active": this.props.currentPage > 1
    });

    return (
      <div onClick={ this.handlePrev } className={ classes }>
        <Icon className="LeaderboardPaging__icon" icon="caret-left"/>
      </div>
    );
  },

  renderNextBtn: function() {
    var pageCount = this.props.pageCount;
    var currentPage = this.props.currentPage;

    var classes = cx({
      "LeaderboardPaging__nextBtn": true,
      "LeaderboardPaging__nextBtn--active": currentPage < pageCount
    });

    return (
      <div onClick={ this.handleNext } className={ classes }>
        <Icon className="LeaderboardPaging__icon" icon="caret-right"/>
      </div>
    );
  },

  render: function() {
    return (
      <div className="LeaderboardPaging">
        { this.renderPrevBtn() }
        { this.renderNextBtn() }
      </div>
    );
  }
});
