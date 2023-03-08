"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove_comments = exports.normalize_string = exports.log = exports.eth_address_regex = exports.commented_text = void 0;
var _location$href, _location$href2;
// Development helpers
const dev = process.env.NODE_ENV === 'development' || typeof location !== 'undefined' && (((_location$href = location.href) === null || _location$href === void 0 ? void 0 : _location$href.includes('debug=true')) || ((_location$href2 = location.href) === null || _location$href2 === void 0 ? void 0 : _location$href2.includes('localhost')));
const log = (...messages) => {
  const now = new Date();
  if (dev) console.log(`[ ${now.toLocaleTimeString()}:${now.getMilliseconds()} ]`, ...messages);
};

// Validations and normalisations
exports.log = log;
const normalize_string = string => `${string}`.trim().toLowerCase();
exports.normalize_string = normalize_string;
const eth_address_regex = /(0x[a-f0-9]{40})/i;

// Visual text helpers
exports.eth_address_regex = eth_address_regex;
const commented_text = text => `
${text}

#######################

`;
exports.commented_text = commented_text;
const remove_comments = string => string.replace(/[\s\S]*#/, '');
exports.remove_comments = remove_comments;
//# sourceMappingURL=helpers.js.map