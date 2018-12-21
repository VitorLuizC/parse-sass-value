/*!
 * parse-sass-value v2.2.0
 * (c) 2018-present Vitor Luiz Cavalcanti <vitorluizc@outlook.com>
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isColor = _interopDefault(require('is-color'));
var isLength = _interopDefault(require('is-css-length'));

var DEFAULT_QUOTE = 'single';
var DEFAULT_SEPARATOR = 'comma';
var DEFAULT_OPTIONS = {
    quote: DEFAULT_QUOTE,
    separator: DEFAULT_SEPARATOR
};

var quotes = Object.freeze({
    none: '',
    single: '\'',
    double: '\"',
});
var getQuote = function (option) {
    if (option === void 0) { option = DEFAULT_QUOTE; }
    var quote = quotes[option];
    if (quote === undefined)
        throw new Error("Invalid quote option \"" + option + "\".");
    return quote;
};

var separators = Object.freeze({
    comma: ', ',
    space: ' ',
});
var getSeparator = function (option) {
    if (option === void 0) { option = DEFAULT_SEPARATOR; }
    var separator = separators[option];
    if (separator === undefined)
        throw new Error("Invalid separator option \"" + option + "\".");
    return separator;
};

var toString = function (value, options) {
    var quote = getQuote(options.quote);
    return quote + value.replace(/('|")/g, '\\$1') + quote;
};
var toCompatible = function (value) { return '' + value; };
var toMap = function (values, options) {
    var separator = getSeparator('comma');
    var pairs = Object.keys(values).map(function (property) {
        var key = toString(property, options);
        var value = parse(values[property], options);
        return key + ": " + value;
    });
    return "(" + pairs.join(separator) + ")";
};
var toList = function (values, options) {
    var separator = getSeparator(options.separator);
    var items = Array.prototype.map.call(values, function (value) { return parse(value, options); });
    return "(" + items.join(separator) + ")";
};

var parse = (function (value, options) {
    if (options === void 0) { options = DEFAULT_OPTIONS; }
    if (typeof value === 'string' && (isColor(value) || isLength(value)))
        return value;
    if (typeof value === 'string')
        return toString(value, options);
    if (typeof value === 'number' || typeof value === 'boolean' || value === null)
        return toCompatible(value);
    if (value && typeof value === 'object' && value.length)
        return toList(value, options);
    if (value && typeof value === 'object')
        return toMap(value, options);
    throw new Error("Can't parse value \"" + value + "\".");
});

module.exports = parse;
