'use strict'

// \n.{1,}\| &#x9.*

let path = require('path')
let express = require('express')
let stylus = require('stylus')
let nib = require('nib')
let bodyParser = require('body-parser')
let favicon = require('serve-favicon')

let routes = require('./app/routes')
let views = require('./app/views')

let app = express()

let compile = (str, _path) => {
  return stylus(str)
    .set('filename', _path)
    .use(nib());
}

app.set('homedir', __dirname)
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/public/views/pug')
app.set('view engine', 'pug')

app.use(stylus.middleware({
    src: path.join(__dirname, '/public'),
    compile: compile
}))
app.use(express.static(path.join(__dirname + '/public')))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(favicon(path.join(__dirname, '/public/images/logo.ico')))

app.locals.company = 'The Wildbunch'
app.locals.handle = 'thewildbunchng'

app.get('/*.html', routes.handleHtml)
app.get('/', views.index)
app.post('/contact', routes.contactSendMail)
app.post('/newsletter', routes.newsletterSubscribe)
app.get('/:view', views.resolveView)

app.locals.pretty = true

app.listen(app.get('port'), () => {
    console.log(`Listening or port ${app.get('port')}`)
})
