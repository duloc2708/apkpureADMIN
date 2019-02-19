// Bugsnag({ notifyReleaseStages: ['production', 'staging', 'development'] })
const bugsnagClient = Bugsnag('7b3f6a2cd15777ceeb3b762671359968')
// bugsnagClient.app.version = '0.0.22'
// bugsnagClient.app.releaseStage = 'staging'
export default bugsnagClient