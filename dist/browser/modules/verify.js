var _excluded = ["timestamp"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { log, remove_comments, normalize_string } from "./helpers";
import { utils } from 'ethers';
var verify_message = function verify_message(_ref) {
  var claimed_message = _ref.claimed_message,
    signature = _ref.signature,
    address = _ref.address;
  try {
    log("Verifying claimed message ", claimed_message, " on behalf of ", address);

    // Check that the signed message equals the claimed message
    var confirmed_signatory = utils.verifyMessage(claimed_message, signature);

    // Normalisations
    confirmed_signatory = normalize_string(confirmed_signatory);
    address = normalize_string(address);

    // Verify that the claimed signatory is the one that signed the message
    var message_valid = confirmed_signatory === address;
    log("Message was signed by ".concat(confirmed_signatory, ", valid: "), message_valid);

    // Verify that the claimed signatory is the one that signed the message
    return message_valid;
  } catch (e) {
    log("Verification error: ", e);
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
export default function confirm_action(signed_message) {
  var throw_on_fail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  // Check if the signed message is valid
  var is_valid = verify_message(signed_message);
  if (!is_valid && throw_on_fail) throw new Error("This message is NOT valid");
  if (!is_valid && !throw_on_fail) return undefined;

  // Parse message if it was valid
  var claimed_message = signed_message.claimed_message,
    address = signed_message.address;
  var sanetised_message = remove_comments(claimed_message);
  var _JSON$parse = JSON.parse(sanetised_message),
    timestamp = _JSON$parse.timestamp,
    action = _objectWithoutProperties(_JSON$parse, _excluded);

  // Return the parsed json
  return {
    action: action,
    address: address,
    timestamp: timestamp
  };
}
//# sourceMappingURL=verify.js.map