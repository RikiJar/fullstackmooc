const config = require('./utils/config')
const loggers = require('./utils/logger')
const app = require('./app')

app.listen(config.PORT, () => {
  loggers.info(`Server running on port ${config.PORT}`)
})