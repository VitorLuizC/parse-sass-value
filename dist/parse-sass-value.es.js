import isColor from 'is-color';
import isLength from 'is-css-length';
import entries from 'object.entries';
import toArray from 'array-from';

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
var getQuote = function (option) {
    if ( option === void 0 ) option = DEFAULT_QUOTE;

    var quote = quotes[option];
    if (quote === undefined) { throw new Error(("Invalid quote option \"" + option + "\".")); }
    return quote;
};

var separators = Object.freeze({
    comma: ', ',
    space: ' '
});
var getSeparator = function (option) {
    if ( option === void 0 ) option = DEFAULT_SEPARATOR;

    var separator = separators[option];
    if (separator === undefined) { throw new Error(("Invalid separator option \"" + option + "\".")); }
    return separator;
};

var toString = function (value, options) {
    var quote = getQuote(options.quote);
    var string = quote + value.replace(/('|")/g, '\\$1') + quote;
    return string;
};
var toCompatible = function (value) { return '' + value; };
var createPairMapper = function (options) {
    return function (ref) {
        var property = ref[0];
        var value = ref[1];

        var key = toString(property, options);
        var val = parse(value, options);
        var pair = key + ": " + val;
        return pair;
    };
};
var toMap = function (values, options) {
    var separator = getSeparator('comma');
    var pairs = entries(values).map(createPairMapper(options));
    var map = "(" + (pairs.join(separator)) + ")";
    return map;
};
var toList = function (values, options) {
    var separator = getSeparator(options.separator);
    var items = toArray(values, function (value) { return parse(value, options); });
    var list = "(" + (items.join(separator)) + ")";
    return list;
};

var parse = (function (value, options) {
    if ( options === void 0 ) options = DEFAULT_OPTIONS;

    if (typeof value === 'string' && (isColor(value) || isLength(value))) { return value; }
    if (typeof value === 'string') { return toString(value, options); }
    if (typeof value === 'number' || typeof value === 'boolean' || value === null) { return toCompatible(value); }
    if (value && typeof value === 'object' && value.length) { return toList(value, options); }
    if (value && typeof value === 'object') { return toMap(value, options); }
    throw new Error(("Can't parse value \"" + value + "\"."));
});

export default parse;
