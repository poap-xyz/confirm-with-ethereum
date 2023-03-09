import { log, remove_comments, normalize_string } from "./helpers"
import { utils } from 'ethers'

const verify_message = ( { claimed_message, signature, address } ) => {

    try {

        log( `Verifying claimed message `, claimed_message, ` on behalf of `, address )

        // Check that the signed message equals the claimed message
        let confirmed_signatory = utils.verifyMessage( claimed_message, signature )

        // Normalisations
        confirmed_signatory = normalize_string( confirmed_signatory )
        address = normalize_string( address )

        // Verify that the claimed signatory is the one that signed the message
        const message_valid = confirmed_signatory === address

        log( `Message was signed by ${ confirmed_signatory }, valid: `, message_valid )

        // Verify that the claimed signatory is the one that signed the message
        return message_valid


    } catch ( e ) {

        log( `Verification error: `, e )
        return false

    }

}

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
export default function confirm_action ( signed_message, throw_on_fail=true ) {

    // Check if the signed message is valid
    const is_valid = verify_message( signed_message )
    if( !is_valid && throw_on_fail ) throw new Error( `This message is NOT valid` )
    if( !is_valid && !throw_on_fail ) return undefined

    // Parse message if it was valid
    const { claimed_message, address } = signed_message
    const sanetised_message = remove_comments( claimed_message )
    const { timestamp, ...action } = JSON.parse( sanetised_message )

    // Return the parsed json
    return {
        action,
        address,
        timestamp
    }

}
