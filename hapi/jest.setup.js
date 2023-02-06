const chance = require("./src/lib/chance/chance")

/**
 * Sets a global seed value to be used by each returned by `chance.makeChance()`.
 * This is required to guarantee the same seed is used for all processes/threads and allows for
 * reproducible tests.
 */
const globalChanceSeed = function () {
    const current = chance.seed()
    process.stdout.write('>>>>>>')
    process.stdout.write(` Randomized with seed: ${current}.`)
    process.stdout.write(` Export RANDOM_SEED=${current} to repeat this test run.\n`)
}

/**
 * Sets 'silent' as a default value to the environment variable LOG_LEVEL.
 * This prevents logger from polluting the test logs while still preserving the expected
 * behavior for when this variable is set.
 */
const globalLogLevel = function () {
    if (!process.env['LOG_LEVEL']) process.env['LOG_LEVEL'] = 'silent'
    process.stdout.write('>>>>>>')
    process.stdout.write(` Log level is '${process.env['LOG_LEVEL']}'.`)
    process.stdout.write(' Export LOG_LEVEL=\'debug\' to restore default logger level.\n')
}

/**
 * Exported to be used on Jest globalSetup
 * @param {import('@jest/types').Config.GlobalConfig} _globalConfig
 * @param {import('@jest/types').Config.ProjectConfig} _projectConfig
 */
module.exports = (_globalConfig, _projectConfig) => {
    process.stdout.write('\n')
    globalChanceSeed()
    globalLogLevel()
    process.stdout.write('\n')
}
