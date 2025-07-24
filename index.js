const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')
let lod = require('lodash')

console.log(lod.partition([1, 2, 3, 4], n => n % 2))

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})