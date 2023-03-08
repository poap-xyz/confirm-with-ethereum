var _location$href, _location$href2;
// Development helpers
const dev = process.env.NODE_ENV === 'development' || typeof location !== 'undefined' && (((_location$href = location.href) === null || _location$href === void 0 ? void 0 : _location$href.includes('debug=true')) || ((_location$href2 = location.href) === null || _location$href2 === void 0 ? void 0 : _location$href2.includes('localhost')));
export const log = (...messages) => {
  const now = new Date();
  if (dev) console.log(`[ ${now.toLocaleTimeString()}:${now.getMilliseconds()} ]`, ...messages);
};

// Validations and normalisations
export const normalize_string = string => `${string}`.trim().toLowerCase();
export const eth_address_regex = /(0x[a-f0-9]{40})/i;

// Visual text helpers
export const commented_text = text => `
${text}

#######################

`;
export const remove_comments = string => string.replace(/[\s\S]*#/, '');
//# sourceMappingURL=helpers.js.map