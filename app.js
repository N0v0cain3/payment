const express = require('express')
const Razorpay = require('razorpay')
require('dotenv').config()
var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})
console.log(instance)
const app = express();
const port = 3000

app.listen(port, function (error) {
    if (error) throw error
    console.log("Server running on port 3000")
})