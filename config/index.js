if (process.env.NODE_ENV === 'production') {
    module.exports = require('./config.prod.js')
} else {
    if (process.argv.indexOf("--stag") >= 0) {
        module.exports = require('./config.stag.js')
    } else if (process.argv.indexOf("--qa") >= 0) {
        module.exports = require('./config.qa.js')
    } else {
        module.exports = require('./config.dev.js')
    }
}