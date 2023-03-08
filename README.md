# Cowe: confirm with Ethereum

A convenience library for developers allowing for easy signing of action intents and verifying them in a node.js backend. Actions are always Javascript `Object`s.

A live preview of this module in action can be found [here](https://poap-xyz.github.io/confirm-with-ethereum/).

You can preview what the data in and outputs look like locally by running:

```shell
cd preview
npm i
npm start
# Now click the "sign action" text on the page
```

## Frontend: confirm an action

An action is a Javascript object, which a user will sign with their wallet. The frontend function takes in:

1. The first parameter of `sign_action` is a Javascript object with data you want to send to the backend
1. The second parameter of `sign_action` is the [signer](https://docs.ethers.org/v5/api/signer/) your app is connected to
1. The third parameter of `sign_action` is an optional message, which will be included as a comment in the signature (so it is visible in the Wallet when signing), this however has no impact on the contents of your action when it is verified and parsed in the backend

Note that every action's json is annotated with a `timestamp` property that contains the `Date.now()` value at the time of triggering the signing process.

```javascript

// Import the signing module
import { sign_action } from '@poap/confirm-with-ethereum'

// Make sure you have a signer that is connected to a wallet, this will depend on how your app connects to a web3 endpoint
const signer = window.provider.getSigner() || useSigner()

// Specify a json object that contains the action data your backend needs
// The below structure and content is arbitrary, you can specify any object
const action = {
    intent: 'update_profile',
    payload: {
        name: 'vitalik',
        groups: [ 1, 5 ]
    }
}

// Sign the message
const signed_action = await sign_action( action, signer, "This signature confirms that you want to update your profile details" )

// Send your signature to your backend
await send_to_backend( signed_action )
```

## Backend: verify the action

```javascript
// Import confirmation function
const { confirm_action } = require( '@poap/confirm-with-ethereum' )

// Parse the action the backend received
exports.receive_on_backend = signed_action => {

    try {

        // Check if the action is valid (ie signed by the wallet it claims to be sent by)
        const { action, address, timestamp } = confirm_action( signed_action )

        // Note that this is the content of the object we provided at sign_action
        const { payload, intent } = action

        // Check if signature is older than a minute and exit if so
        if( timestamp < ( Date.now() - 1000 * 60 ) ) throw new Error( "Signature is older than a minute" )

        // Do what you need to do with the action json
        save_address_name( address, payload.name )

    } catch( e ) {

        // Handle invalidly signed action signatures

    }

}
```

## Parameter documentation

The parameter details are documented as `JSDoc` paragraphs in `modules/sign.js` and `modules/verify.js`.
