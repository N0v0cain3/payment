
require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

var Publishable_Key = process.env.PUBLISH
var Secret_Key = process.env.SECRET

const stripe = require('stripe')(Secret_Key)

const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// View Engine Setup 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('Home', {
        key: Publishable_Key
    })
})

app.post('/payment', function (req, res) {

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Shivam',
        address: {
            line1: 'not from bhopal',
            postal_code: '452331',
            city: 'bhopal',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: 2500,	 // Charing Rs 25 
                description: 'kaloory',
                currency: 'INR',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.send("Success") // If no error occurs 
        })
        .catch((err) => {
            res.send(err)	 // If some error occurs 
        });
})

app.listen(port, function (error) {
    if (error) throw error
    console.log("Server created Successfully")
}) 
