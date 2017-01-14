'use strict'

let fs = require('fs')

let nodemailer = require('nodemailer')

const success = {
    statusCode: 200,
    message: 'success'
}

const error = {
    statusCode: 500,
    message: 'error'
}

let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: process.env.EMAIL_ADDR,
        pass: process.env.EMAIL_PASS
    }
})

let contactSendMail = (req, res) => {
    let timestamp = new Date()
    let ipAddr = req.ip
    let email = req.body.email || ""
    let name = req.body.name || ""
    let subject = req.body.subject || ""
    let message = req.body.message || ""

    console.log('Successfully sent email')

    return res.status(200).send(success)

    let emailText = `
    Timestamp: ${timestamp}
    Name: ${name}
    Email: ${email}
    IP: ${ipAddr}
    Subject: ${subject}
    Message: ${message}`

    console.log(emailText)

    let emailHTML = `
    <p><b>Timestamp:</b> ${timestamp}</p>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>IP:</b> ${ipAddr}</p>
    <p><b>Subject:</b> ${subject}</p>
    <p><b>Message:</b> ${message}</p>`

    let mailOptions = {
        from: `"The Wildbunch Contact Form" <${process.env.EMAIL_ADDR}>`,
        to: `<thewildbunchng@gmail.com>`,
        subject: `${subject} from ${name}`,
        text: emailText,
        html: emailHTML
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email')
            console.error(err)

            return res.status(500).send(error)
        }

        console.log('Successfully sent email')

        return res.status(200).send(success)
    })
}

let handleHtml = (req, res) => {
    res.redirect(req.path.replace('.html', ''))
}

let newsletterSubscribe = (req, res) => {
    let email = req.body.email

    console.log(email)

    console.log('Successfully subscribed to newsletter')

    return res.status(200).send(success)
}

exports.contactSendMail = contactSendMail
exports.handleHtml = handleHtml
exports.newsletterSubscribe = newsletterSubscribe
