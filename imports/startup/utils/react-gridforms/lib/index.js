'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require('../vendor/gridforms.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PropTypes = require('prop-types');

var classNames = function classNames() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(function (cn) {
    return !!cn;
  }).join(' ');
};
var createReactClass = require('create-react-class');

var GridForm = createReactClass({
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

    return _react2['default'].createElement(
      Component,
      _extends({}, props, { className: classNames(!custom && 'grid-form', className) }),
      children
    );
  }
});

exports.GridForm = GridForm;
var Fieldset = createReactClass({
  displayName: 'Fieldset',

  render: function render() {
    var _props2 = this.props;
    var children = _props2.children;
    var legend = _props2.legend;

    var props = _objectWithoutProperties(_props2, ['children', 'legend']);

    return _react2['default'].createElement(
      'fieldset',
      props,
      legend && _react2['default'].createElement(
        'legend',
        null,
        legend
      ),
      children
    );
  }
});

exports.Fieldset = Fieldset;
var Row = createReactClass({
  displayName: 'Row',

  render: function render() {
    var _props3 = this.props;
    var children = _props3.children;

    var props = _objectWithoutProperties(_props3, ['children']);

    var span = 0;
    _react.Children.forEach(children, function (child) {
      return span += Number(child.props.span);
    });
    return _react2['default'].createElement(
      'div',
      _extends({}, props, { 'data-row-span': span }),
      children
    );
  }
});

exports.Row = Row;
var Field = createReactClass({
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

    return _react2['default'].createElement(
      'div',
      _extends({}, props, { 'data-field-span': span }),
      children
    );
  }
});
exports.Field = Field;