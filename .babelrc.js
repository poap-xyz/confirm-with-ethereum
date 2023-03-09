// Based on https://gist.github.com/ncochard/6cce17272a069fdb4ac92569d85508f4
module.exports = {
    shouldPrintComment: comment_value => {

        // Jsdoc attributes
        if (comment_value.match(/\* ?@.*{/)) return true

        // Commpn attributes to preserve
        if (comment_value.includes('@preserve')) return true
        if (comment_value.includes('@license')) return true
        return false

    },
    "env": {
        "development": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            "node": "6.10"
                        }
                    }
                ]
            ]
        },
        "browser": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            "browsers": "last 2 versions, ie 10-11"
                        },
                        "modules": false
                    }
                ]
            ]
        },
        "module": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            "node": "6.10"
                        },
                        "modules": false
                    }
                ]
            ]
        }
    },
    "sourceMaps": true
}