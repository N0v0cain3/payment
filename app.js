const express = require('express')
const Razorpay = require('razorpay')
const fetch = require('node-fetch')
const bodyParser = require("body-parser");
require('dotenv').config()
var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var z = instance.plans.all()
console.log(z)

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

//Fetch all the plans

app.get("/plans", (req, res) => {
    let url = "https://api.razorpay.com/v1/plans";
    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
        },

    })
        .then(response => response.json())
        .then(json => res.status(200).json({
            json
        }));

})

//Create Subs

app.post("/subs", (req, res) => {
    let url = "https://api.razorpay.com/v1/subscriptions"
    data = {
        "plan_id": "plan_FN3TpeFOgUkhyP",
        "total_count": 6,
        "quantity": 1,
        // "start_at": 1735689600,
        // "expire_by": 1893456000,
        "customer_notify": 1,
        // "addons": [
        //     {
        //         "item": {
        //             "name": "Delivery charges",
        //             "amount": 30000,
        //             "currency": "INR"
        //         }
        //     }
        // ],
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

// app.patch("/subs", (req, res) => {
//     let url = `https://api.razorpay.com/v1/subscriptions/sub_FRQuthyDbjXTwi`

//     data = {

//         "plan_id": "plan_FRVNgm8HVMHAiS",
//         "quantity": 1,
//         "remaining_count": 6,
//         "schedule_change_at": "now",
//         "customer_notify": 1


//     }

//     fetch(url, {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
//         },
//         body: JSON.stringify(data),



//     })
//         .then(response => response.json())
//         .then(json =>

//             res.status(200).json({
//                 json
//             })
//         );

// })

app.patch("/subs", (req, res) => {
    console.log(req.body)
    let url = `https://api.razorpay.com/v1/subscriptions/${req.body.sub_id}`



    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
        },



    })
        .then(response => response.json())
        .then((json) => {

            data1 = {

                "plan_id": `${req.body.plan_id}`,
                "quantity": 1,
                "remaining_count": json.remaining_count,
                "schedule_change_at": "now",
                "customer_notify": 1


            }

            fetch(url, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
                },
                body: JSON.stringify(data1),



            })
                .then(response => response.json())
                .then(json1 =>

                    res.status(200).json({
                        json1
                    })
                );
            // console.log("charge at : ", json.charge_at)
            // res.status(200).json({
            //     json
            // })
        }
        );






    // data = {

    //     "plan_id": `${req.body.plan_id}`,
    //     "quantity": 1,
    //     "remaining_count": 6,
    //     "schedule_change_at": "now",
    //     "customer_notify": 1


    // }

    // fetch(url, {
    //     method: 'PATCH',
    //     headers: {
    //         "Content-Type": "application/json",
    //         'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
    //     },
    //     body: JSON.stringify(data),



    // })
    //     .then(response => response.json())
    //     .then(json =>

    //         res.status(200).json({
    //             json
    //         })
    //     );

})

app.post("/subs/cancel", (req, res) => {
    // `https://api.razorpay.com/v1/subscriptions/${req.body.sub_id}/cancel`
    let url = "https://api.razorpay.com/v1/subscriptions/sub_FRVJkM7uEkUkmg/cancel"
    data = {
        "cancel_at_cycle_end": 0
    }
    //cancel at end = 1


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



function parseJSON(response) {
    return response.json()
}


app.listen(port, function (error) {
    if (error) throw error
    console.log("Server running on port 3000")
})