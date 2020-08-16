const express = require('express')
const Razorpay = require('razorpay')
const fetch = require('node-fetch')
require('dotenv').config()
var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

var z = instance.plans.all()
console.log(z)
const app = express();
const port = 3000

let base64 = require('base-64');

let url = 'https://api.razorpay.com/v1/plans';


fetch(url, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
    },

})
    .then(response => response.json())
    .then(json => console.log(json.items[0].item));


app.post("/subs", (req, res) => {
    let url = "https://api.razorpay.com/v1/subscriptions"
    data = {
        "plan_id": "plan_FN3TpeFOgUkhyP",
        "total_count": 6,
        "quantity": 1,
        // "start_at": 1735689600,
        // "expire_by": 1893456000,
        "customer_notify": 1,
        "addons": [
            {
                "item": {
                    "name": "Delivery charges",
                    "amount": 30000,
                    "currency": "INR"
                }
            }
        ],
    }

    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
        },
        body: JSON.stringify(data),



    })
        .then(response => response.json())
        .then(json =>

            res.status(200).json({
                json
            })
        );
})


app.get("/subs/:id", (req, res) => {
    let url = `https://api.razorpay.com/v1/subscriptions/sub_FRQuthyDbjXTwi`;


    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
        },



    })
        .then(response => response.json())
        .then((json) => {
            console.log("charge at : ", json.charge_at)
            res.status(200).json({
                json
            })
        }
        );

})

function parseJSON(response) {
    return response.json()
}


app.listen(port, function (error) {
    if (error) throw error
    console.log("Server running on port 3000")
})