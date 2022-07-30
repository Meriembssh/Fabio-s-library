if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()

//views
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)

app.use(express.static('public'))

//router:
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const authorsRouter = require('./routes/authors')
app.use('/authors', authorsRouter)

//database:
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

///////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000)