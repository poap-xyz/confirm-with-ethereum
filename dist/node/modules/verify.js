"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = confirm_action;
var _helpers = require("./helpers");
var _ethers = require("ethers");
const _excluded = ["timestamp"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const verify_message = ({
  claimed_message,
  signature,
  address
}) => {
  try {
    (0, _helpers.log)(`Verifying claimed message `, claimed_message, ` on behalf of `, address);
    let confirmed_signatory = _ethers.utils.verifyMessage(claimed_message, signature);
    confirmed_signatory = (0, _helpers.normalize_string)(confirmed_signatory);
    address = (0, _helpers.normalize_string)(address);
    const message_valid = confirmed_signatory === address;
    (0, _helpers.log)(`Message was signed by ${confirmed_signatory}, valid: `, message_valid);
    return message_valid;
  } catch (e) {
    (0, _helpers.log)(`Verification error: `, e);
    return false;
  }
};

/**
* Return object of the action confirmation function
* @typedef {Object} ConfirmedAction 
* @property {Object} action - the javascript object that was submitted with the sign_action function
* @property {String} address - the address of the signer, normalised to lowercase
* @property {Number} timestamp - the timestamp at which this signature was created 
*/
/**
* Verify that a signature is valid, and parse it's json
* @param {Object} signed_message - a formatted message as created by the frontend sign_message function
* @param {String} signed_message.claimed_message - the message the user claims to have signed, this contains the json you signed
* @param {String} signed_message.claimed_signatory - the address the user claimed signed this message
* @param {String} signed_message.signature - the signature the user provided
* @returns {ConfirmedAction} - a confirmed action object
*/
function confirm_action(signed_message, throw_on_fail = true) {
  const is_valid = verify_message(signed_message);
  if (!is_valid && throw_on_fail) throw new Error(`This message is NOT valid`);
  if (!is_valid && !throw_on_fail) return undefined;
  const {
    claimed_message,
    address
  } = signed_message;
  const sanetised_message = (0, _helpers.remove_comments)(claimed_message);
  const _JSON$parse = JSON.parse(sanetised_message),
    {
      timestamp
    } = _JSON$parse,
    action = _objectWithoutProperties(_JSON$parse, _excluded);
  return {
    action,
    address,
    timestamp
  };
}
//# sourceMappingURL=verify.js.map