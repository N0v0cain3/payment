
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

async function lol() {
    const product = await stripe.products.create({
        name: 'Rajat Sablok',
        description: 'rajat bhaiya pro'
    });
    console.log(product)

    const price = await stripe.prices.create({
        product: 'prod_HjcakjZgZl2mdH',
        unit_amount: 1000,
        currency: 'inr',
        recurring: {
            interval: 'month',
        },
    });
    console.log(price)

    let session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: 'price_1HA9NqD3a83c3w5dGjznxc9B',
            quantity: 1,
        }],
        mode: 'subscription',
        success_url: 'https://example.com/success?session_id=cs_test_bbJRHqDpyjcWhGnXM7K1hx9Af3oyxH2Jo8Cl3DE7YzIqtph67A2VRjoe',
        cancel_url: 'https://example.com/cancel',
    });
    session.success_url = `https://example.com/success?session_id=${session.id}`

    console.log(session)





}





app.listen(port, function (error) {
    if (error) throw error
    console.log("Server created Successfully")
    lol()

}) 
