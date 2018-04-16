'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var entries = _interopDefault(require('object.entries'));
var toArray = _interopDefault(require('array-from'));
var isColor = _interopDefault(require('is-color'));
var isLength = _interopDefault(require('is-css-length'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var DEFAULT_QUOTE = 'single';
var DEFAULT_SEPARATOR = 'comma';
var DEFAULT_OPTIONS = {
  quote: DEFAULT_QUOTE,
  separator: DEFAULT_SEPARATOR
};

var quotes = Object.freeze({
  none: '',
  single: '\'',
  double: '\"'
});

var getQuote = function getQuote(option) {
  if (option === void 0) {
    option = DEFAULT_QUOTE;
  }

  var quote = quotes[option];
  if (quote === undefined) throw new Error("Invalid quote option \"" + option + "\".");
  return quote;
};

var separators = Object.freeze({
  comma: ', ',
  space: ' '
});

var getSeparator = function getSeparator(option) {
  if (option === void 0) {
    option = DEFAULT_SEPARATOR;
  }

  var separator = separators[option];
  if (separator === undefined) throw new Error("Invalid separator option \"" + option + "\".");
  return separator;
};

var toString = function toString(value, options) {
  var quote = getQuote(options.quote);
  var string = quote + value.replace(/('|")/g, '\\$1') + quote;
  return string;
};

var toCompatible = function toCompatible(value) {
  return '' + value;
};

var createPairMapper = function createPairMapper(options) {
  return function (_a) {
    var property = _a[0],
        value = _a[1];
    var key = toString(property, options);
    var val = parse(value, options);
    var pair = key + ": " + val;
    return pair;
  };
};

var toMap = function toMap(values, options) {
  var separator = getSeparator('comma');
  var pairs = entries(values).map(createPairMapper(options));
  var map = "(" + pairs.join(separator) + ")";
  return map;
};

var toList = function toList(values, options) {
  var separator = getSeparator(options.separator);
  var items = toArray(values, function (value) {
    return parse(value, options);
  });
  var list = "(" + items.join(separator) + ")";
  return list;
};

var parse = (function (value, options) {
  if (options === void 0) {
    options = DEFAULT_OPTIONS;
  }

  if (typeof value === 'string' && (isColor(value) || isLength(value))) return value;
  if (typeof value === 'string') return toString(value, options);
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) return toCompatible(value);
  if (value && _typeof(value) === 'object' && value.length) return toList(value, options);
  if (value && _typeof(value) === 'object') return toMap(value, options);
  throw new Error("Can't parse value \"" + value + "\".");
});

module.exports = parse;
