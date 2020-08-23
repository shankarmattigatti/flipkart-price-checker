const config = require('./config.json');
const nightmare = require('nightmare')();
const nodemailer = require('nodemailer');

const args = process.argv.slice(2);
const url = args[0];
const minPrice = args[1];

const transporter = nodemailer.createTransport({
    service: config.Service,
    auth: {
        user: config.Username,
        pass: config.Password,
    },
});

// function to to check price 
function checkPrice() {
    nightmare.goto(url)
        .wait('._3qQ9m1')
        .evaluate(() => document.getElementsByClassName('_3qQ9m1')[0].innerText)
        .then((priceString) => {
            let price = parseFloat(priceString.replace(/[₹,]/g, ''));
            if (price < minPrice) {
                sendEmail('Price is Low', `The price on ${url} has dropped below ${minPrice}`);
            } else {
                console.log(`The price on ${url} is higher than ${minPrice}`);
            }
        }).catch((err) => {
            sendEmail('Flipkart Price Checker Error', err.message)
        });
}

// function to send email
function sendEmail(subject, text) {
    transporter.sendMail({
        from: config.Username,
        to: config.Receivers,
        subject: subject,
        text: text,
    }, function (err, info) {
        if (err) {
            console.log('Error while sending email', err);
        } else {
            console.log(`Email Sent: ${info.messageId}`);
        }
    });
}

setInterval(() => {
    checkPrice();
}, config.IntervalInMilliseconds);