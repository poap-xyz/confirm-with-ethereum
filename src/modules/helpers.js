// Development helpers
const dev = process.env.NODE_ENV === 'development' ||  typeof location !== 'undefined' && ( location.href?.includes( 'debug=true' ) || location.href?.includes( 'localhost' ) )
export const log = ( ...messages ) => {
    const now = new Date()
    if( dev ) console.log( `[ ${ now.toLocaleTimeString() }:${ now.getMilliseconds() } ]`, ...messages )
}

// Validations and normalisations
export const normalize_string = string => `${ string }`.trim().toLowerCase()
export const eth_address_regex = /(0x[a-f0-9]{40})/i

// Visual text helpers
export const commented_text = text => `
${ text }

#######################

`
export const remove_comments = string => string.replace( /.*#/s, '' )