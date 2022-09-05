const express = require("express")
const cors = require("cors")

const port = 8599
// import mysql
// const mysql = require("./configs/mysql.config");
// mysql.connect();
const mongodb = require("./common/configs/mongodb.config")
mongodb.connect()

const app = express()
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))
// parse application/json
app.use(express.json())
app.use(cors())

// import Route
const Route = require("./routes")
Route(app)
const socketio = require("./modules/socketio/socketio.module")

// response handler
const responseHandler = require("./modules/response-handlers")
app.use(responseHandler)

socketio(app, mongodb)

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT || port}!`)
)
