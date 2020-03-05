'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import '../vendor/gridforms.css';

import React, { Children, PropTypes } from 'react';

var classNames = function classNames() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(function (cn) {
    return !!cn;
  }).join(' ');
};

var GridForm = React.createClass({
  displayName: 'GridForm',

  getDefaultProps: function getDefaultProps() {
    return {
      component: 'form',
      custom: false
    };
  },
  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;
    var Component = _props.component;
    var custom = _props.custom;

    var props = _objectWithoutProperties(_props, ['children', 'className', 'component', 'custom']);

    return React.createElement(
      Component,
      _extends({}, props, { className: classNames(!custom && 'grid-form', className) }),
      children
    );
  }
});

export { GridForm };
var Fieldset = React.createClass({
  displayName: 'Fieldset',

  render: function render() {
    var _props2 = this.props;
    var children = _props2.children;
    var legend = _props2.legend;

    var props = _objectWithoutProperties(_props2, ['children', 'legend']);

    return React.createElement(
      'fieldset',
      props,
      legend && React.createElement(
        'legend',
        null,
        legend
      ),
      children
    );
  }
});

export { Fieldset };
var Row = React.createClass({
  displayName: 'Row',

  render: function render() {
    var _props3 = this.props;
    var children = _props3.children;

    var props = _objectWithoutProperties(_props3, ['children']);

    var span = 0;
    Children.forEach(children, function (child) {
      return span += Number(child.props.span);
    });
    return React.createElement(
      'div',
      _extends({}, props, { 'data-row-span': span }),
      children
    );
  }
});

export { Row };
var Field = React.createClass({
  displayName: 'Field',

  propTypes: {
    span: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  },
  getDefaultProps: function getDefaultProps() {
    return {
      span: 1
    };
  },
  render: function render() {
    var _props4 = this.props;
    var children = _props4.children;
    var span = _props4.span;

    var props = _objectWithoutProperties(_props4, ['children', 'span']);

    return React.createElement(
      'div',
      _extends({}, props, { 'data-field-span': span }),
      children
    );
  }
});
export { Field };