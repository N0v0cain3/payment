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

//webhooks 
router.post("/verify", (req, res) => {
    const secret = process.env.RAZORPAY_SECRET;

    console.log(req.body);

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("request is legit");
        res.status(200).json({
            message: "OK",
        });
    } else {
        res.status(403).json({ message: "Invalid" });
    }
});

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
    let start_at = Date.now() + 15 * 60 * 60 * 24 * 1000
    // let expire_by = Date.now() + 15 * 60 * 60 * 24 * 1000
    //"plan_FN3TpeFOgUkhyP"
    data = {
        "plan_id": `${req.body.plan_id}`,
        "total_count": `${req.body.total_count}`,
        "quantity": 1,
        // "start_at": start_at,
        // "expire_by": expire_by,
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
        .then((json) => {

            res.status(200).json({
                json
            })

        }
        );
})




app.get("/subs/:id", (req, res) => {
    //sub_FRQuthyDbjXTwi
    let url = `https://api.razorpay.com/v1/subscriptions/${req.params.id}`;


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


// Invoices

app.get("/invoice/:id", (req, res) => {

    let url = `https://api.razorpay.com/v1/invoices?subscription_id=${req.params.id}`

    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + base64.encode(process.env.KEY_ID + ":" + process.env.KEY_SECRET)
        }



    })
        .then(response => response.json())
        .then((json) => {
            let array = []
            for (i = 0; i < json.items.length; i++) {
                array.push(json.items[i].short_url)
            }
            res.status(200).json({
                array
            })
        }
        ).catch((err) => {
            res.status(500).json({
                error: err.toString()
            })
        })


})


function parseJSON(response) {
    return response.json()
}


app.listen(port, function (error) {
    if (error) throw error
    console.log("Server running on port 3000")
})