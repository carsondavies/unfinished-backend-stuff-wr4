const express = require("express")
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
require('dotenv').config()
const tankCtrl = require('./controllers/tankController')

const app = express()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 60000 },
  })
)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(db => {
    app.set('db', db)
    console.log('db connected')
  })

// endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)

app.get('/api/tanks/:country_id', tankCtrl.getTanks)

app.listen(SERVER_PORT, () => console.log(`Take us to warp ${SERVER_PORT}!`))