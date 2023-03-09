const { eth_address_regex, log, normalize_string, commented_text } = require( './helpers' ) 

/**
* The return object of a signed action
* @typedef {Object} SignedAction 
* @property {String} claimed_message - the message we expect the signer to have signed in plain text 
* @property {String} signature - the cryptographic signature the signer provided
* @property {String} address - the lowercase address that the signer claimed to have signed with
*/

/**
* @function sign_action - Action-signing function that decorates the action for user friendliness
* @param {Object} action - an object containing the data you want to send along with this action
* @param {String} [message_prompt] - a message describing what this action signature is for, it will be shown to the user but entirely disregarded by the action verification
* @param {Object} signer - the signer of the currently connected wallet, see https://docs.ethers.org/v5/api/signer/
* @param {Boolean} add_timestamp - whether to add a timestamp to the signature
* @returns {SignedAction} signed action object
*/
module.exports = async function sign_action( action, signer, message_prompt, add_timestamp=true ) {

    // Desctucture message
    if( !action ) throw new Error( `Please specify what action you want signed` )

    log( `Requesting signature for: `, action )
    if( message_prompt ) log( `Message prompt: `, message_prompt )

    // Check that we have a valid signer to work with
    if( !signer ) throw new Error( `No signer specified, are you connected to your wallet?` )

    // Get the address from the signer
    let address = await signer.getAddress()

    /* ///////////////////////////////
    // Validations and normalisations */

    // Make sure address is valid, lowercase, and trimmed
    if( !address ) throw new Error( `Please specify what address you expect to sign this message` )
    address = normalize_string( address )
    if( !address.match( eth_address_regex ) ) throw new Error( `${ address } is not a valid Ethereum address` )

    // Check that input it a valid js object
    try {
        action = JSON.parse( JSON.stringify( action ) )
    } catch ( e ) {
        throw new Error( `message format is not JSON` )
    }

    /* ///////////////////////////////
    // Generate user-friendly message */

    // Add timestamp to message
    if( add_timestamp ) action = { ...action, timestamp: Date.now() }

    // Format user-friendly message
    const stringified_action = JSON.stringify( action, null, 2 )
    let claimed_message = stringified_action
    if( message_prompt ) {
        claimed_message = commented_text( message_prompt )
        claimed_message += stringified_action
    }

    // Sign the message
    log( `Triggering signing of: `, claimed_message )
    const signature = await signer.signMessage( claimed_message )

    // Format the signature with it's message and claimed recipient
    const formatted_signature = {
        claimed_message,
        signature,
        address
    }

    log( `Signed `, formatted_signature )
    return formatted_signature

}