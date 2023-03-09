"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sign_action;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
const {
  eth_address_regex,
  log,
  normalize_string,
  commented_text
} = require('./helpers');

/**
* The return object of a signed action
* @typedef {Object} SignedAction 
* @property {String} claimed_message - the message we expect the signer to have signed in plain text 
* @property {String} signature - the cryptographic signature the signer provided
* @property {String} address - the lowercase address that the signer claimed to have signed with
*/

/**
* Action-signing function that decorates the action for user friendliness
* @param {Object} action - an object containing the data you want to send along with this action
* @param {String} [message_prompt] - a message describing what this action signature is for, it will be shown to the user but entirely disregarded by the action verification
* @param {Object} signer - the signer of the currently connected wallet, see https://docs.ethers.org/v5/api/signer/
* @param {Boolean} add_timestamp - whether to add a timestamp to the signature
* @returns {SignedAction} signed action object
*/
function sign_action(_x, _x2, _x3) {
  return _sign_action.apply(this, arguments);
}
function _sign_action() {
  _sign_action = _asyncToGenerator(function* (action, signer, message_prompt, add_timestamp = true) {
    if (!action) throw new Error(`Please specify what action you want signed`);
    log(`Requesting signature for: `, action);
    if (message_prompt) log(`Message prompt: `, message_prompt);
    if (!signer) throw new Error(`No signer specified, are you connected to your wallet?`);
    let address = yield signer.getAddress();
    if (!address) throw new Error(`Please specify what address you expect to sign this message`);
    address = normalize_string(address);
    if (!address.match(eth_address_regex)) throw new Error(`${address} is not a valid Ethereum address`);
    try {
      action = JSON.parse(JSON.stringify(action));
    } catch (e) {
      throw new Error(`message format is not JSON`);
    }
    if (add_timestamp) action = _objectSpread(_objectSpread({}, action), {}, {
      timestamp: Date.now()
    });
    const stringified_action = JSON.stringify(action, null, 2);
    let claimed_message = stringified_action;
    if (message_prompt) {
      claimed_message = commented_text(message_prompt);
      claimed_message += stringified_action;
    }
    log(`Triggering signing of: `, claimed_message);
    const signature = yield signer.signMessage(claimed_message);
    const formatted_signature = {
      claimed_message,
      signature,
      address
    };
    log(`Signed `, formatted_signature);
    return formatted_signature;
  });
  return _sign_action.apply(this, arguments);
}
//# sourceMappingURL=sign.js.map