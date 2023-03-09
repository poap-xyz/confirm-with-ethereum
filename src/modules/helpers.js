// Development helpers
const dev = process.env.NODE_ENV === 'development' ||  typeof location !== 'undefined' && ( location.href?.includes( 'debug=true' ) || location.href?.includes( 'localhost' ) )
exports.log = ( ...messages ) => {
    const now = new Date()
    if( dev ) console.log( `[ ${ now.toLocaleTimeString() }:${ now.getMilliseconds() } ]`, ...messages )
}

// Validations and normalisations
exports.normalize_string = string => `${ string }`.trim().toLowerCase()
exports.eth_address_regex = /(0x[a-f0-9]{40})/i

// Visual text helpers
exports.commented_text = text => `
${ text }

#######################

`
exports.remove_comments = string => string.replace( /.*#/s, '' )