var _location$href, _location$href2;
var dev = process.env.NODE_ENV === 'development' || typeof location !== 'undefined' && (((_location$href = location.href) === null || _location$href === void 0 ? void 0 : _location$href.includes('debug=true')) || ((_location$href2 = location.href) === null || _location$href2 === void 0 ? void 0 : _location$href2.includes('localhost')));
export var log = function log() {
  var _console;
  var now = new Date();
  for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }
  if (dev) (_console = console).log.apply(_console, ["[ ".concat(now.toLocaleTimeString(), ":").concat(now.getMilliseconds(), " ]")].concat(messages));
};
export var normalize_string = function normalize_string(string) {
  return "".concat(string).trim().toLowerCase();
};
export var eth_address_regex = /(0x[a-f0-9]{40})/i;
export var commented_text = function commented_text(text) {
  return "\n".concat(text, "\n\n#######################\n\n");
};
export var remove_comments = function remove_comments(string) {
  return string.replace(/[\s\S]*#/, '');
};
//# sourceMappingURL=helpers.js.map