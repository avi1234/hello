const logger = require('./logger')
require('./os-pg')
require('./express-pg')

const amount = 12

logger.info('hi there')
logger.error('oh no')

console.log('🏃‍♂️app is running')