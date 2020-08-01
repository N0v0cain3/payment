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

// let headers = new Headers();

//headers.append('Content-Type', 'text/json');
// let headers = {}
fetch(url, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
    },
    //credentials: 'user:passwd'
})
    .then(response => response.json())
    .then(json => console.log(json.items[0].item));
//.done();

function parseJSON(response) {
    return response.json()
}

app.listen(port, function (error) {
    if (error) throw error
    console.log("Server running on port 3000")
})