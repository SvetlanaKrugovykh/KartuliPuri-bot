require('dotenv').config()
const { app, assistApiServer, interConnectApp } = require('./index')
const HOST = process.env.HOST || '127.0.0.1'
const HOST_FOR_CONNECT = process.env.HOST_FOR_CONNECT || '127.0.0.1'

app.listen({ port: process.env.PORT || 7999, host: HOST }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`${new Date()}:[API] Service listening on ${address}`)
})




