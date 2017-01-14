'use strict'

let views = {}

views.index = (req, res) => {
    res.render('index', {
        title : 'Wildbunch Amusement Park | The Place For Fun',
        view: 'index'
    })
}

views.about = (req, res) => {
    res.render('about', {
        title : 'About | Wildbunch Amusement Park',
        view: 'about'
    })
}

views.blog = (req, res) => {
    res.render('blog', {
        title : 'Blog | Wildbunch Amusement Park',
        view: 'blog'
    })
}

views.contact = (req, res) => {
    res.render('contact', {
        title : 'Contact | Wildbunch Amusement Park',
        view: 'contact'
    })
}

views.rides = (req, res) => {
    res.render('rides', {
        title : 'Rides | Wildbunch Amusement Park',
        view: 'rides'
    })
}

views.tickets = (req, res) => {
    res.render('tickets', {
        title : 'Tickets | Wildbunch Amusement Park',
        view: 'tickets'
    })
}

let resolveView = (req, res, next) => {
    if (views[req.path.replace('/', '')]) {
        views[req.path.replace('/', '')](req, res)
    }
    else {
        next()
    }
}

exports.index = views.index
exports.about = views.about
exports.blog = views.blog
exports.contact = views.contact
exports.rides = views.rides
exports.tickets = views.tickets
exports.resolveView = resolveView
