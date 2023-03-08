import './App.css';
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { sign_action, confirm_action } from './dist/browser/index.js'

const example_action = {
  intent: 'do things',
  data: 12
}

const Json = ( { children, ...props } ) => <pre>
  <code>
    { JSON.stringify( children, null, 2 ).replace( /\\"/ig, `"` ).replace( /(?<!\\)\\n/ig, `\n` ).replace( '"{', "{" ).replace( '}"', "}" ) }
  </code>
</pre>

function App() {

  const [ signer, set_signer ] = useState( undefined )
  const [ signature, set_signature ] = useState(  )

  console.log( `Wallet connected: ${ !!signer }, signer: `, signer )

  useEffect( () => {

    window.ethereum.request( { method: 'eth_accounts' } ).then( accounts => {
      if( !accounts.length ) return alert( `Connect wallet please` )
      const provider = new ethers.providers.Web3Provider( window.ethereum, "any")
      const signer = provider.getSigner()
      set_signer( signer )
    } )

  }, [] )

  useEffect( () => {

    if( !signature ) return
    const extracted_data = confirm_action( signature )
    console.log( `Data from action signature: `, extracted_data )

  }, [ signature ] )

  async function do_signing() {

    const signed_action = await sign_action( example_action, signer, "The intention of this signature is to show you what action signatures look like" )
    console.log( `Signed action: `, signed_action )

    set_signature( signed_action )

  }

  return (
    <div className="App">
      <header className="App-header">
      <h3>Example action data:</h3>
        <Json>
          { JSON.stringify( example_action, null, 2 ) }
        </Json>
        <h3>Signed action:</h3>
        <Json>
          { signature ? JSON.stringify( signature, null, 2 ) : 'waiting for signature...' }
        </Json>
        <h3>Data extracted from confirmation:</h3>
        <Json>
          { signature ? JSON.stringify( confirm_action( signature ), null, 2 ) : 'waiting for signature...' }
        </Json>
        <button onClick={ do_signing } >
          Sign action
        </button>
      </header>
    </div>
  );
}

export default App;
