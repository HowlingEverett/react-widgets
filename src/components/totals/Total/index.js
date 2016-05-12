'use strict';

var React            = require('react');
var Icon             = require('../../helpers/Icon');
var I18nMixin        = require('../../mixins/I18n');

module.exports = React.createClass({
  displayName: 'Total',
  mixins: [I18nMixin],
  propTypes: {
    total: React.PropTypes.string,
    renderIcon: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    i18n: React.PropTypes.object,
    isLoading: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      backgroundColor: null,
      textColor: null
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      total: 0
    };
  },

  renderTotal: function() {
    if (this.props.isLoading) {
      return <Icon className="Totals__loading" icon="refresh" />;
    }

    if (this.props.total) {
      return (
        <div className="Totals__content">
          <div className="Totals__total">{ this.props.total }</div>
          <div className="Totals__title">{ this.t('title') }</div>
        </div>
      );
    }

    return <p className="Totals__empty-label">{ this.t('emptyLabel') }</p>;
  },

  renderIcon: function() {
    var renderIcon = this.props.renderIcon;

    if (renderIcon) {
      return <Icon className="Totals__icon" icon={ renderIcon } />;
    }
  },

  render: function() {
    var customStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor
    };

    return (
      <div className={ "Totals" } style={ customStyle }>
        { this.renderIcon() }
        { this.renderTotal() }
      </div>
    );
  }
});
