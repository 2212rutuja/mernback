import express, { Router } from "express";
import dotenv from 'dotenv';
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import router from "./routes/route.js";
import cors from 'cors'
import bodyParser from "body-parser";

import {v4 as uuid} from 'uuid'

const app = express();
const populate = express.Router();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended:true}))
populate.use(bodyParser.urlencoded({extended:true}))
app.use('/',router)
app.use('/populate', populate);

//const PORT = process.env.PORT || 8000;
const PORT = 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

//const URL =process.env.MONGODB.URI || `mongodb+srv://${USERNAME}:${PASSWORD}@flipkart-clone.krucsys.mongodb.net/?retryWrites=true&w=majority`;

//Connection(URL);

Connection(USERNAME,PASSWORD)

/* if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
} */

app.listen(PORT,()=>console.log(`Server running on ${PORT}`))

DefaultData();

export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID ,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(), // generates unique id
paytmParams['CUST_ID']= process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback',
//paytmParams['CALLBACK_URL'] = 'callback',
paytmParams['EMAIL'] = 'personaluse2212@gmail.com',
paytmParams['MOBILE_NO'] = '1212121212'







/*const express = require('express');
import { Router } from "express";
import dotenv from 'dotenv';
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import router from "./routes/route.js";
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors());
app.use('/',router);

const PORT = 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
      DefaultData();
    });
  })
  .catch((error) => {
    console.error('Failed to establish database connection.', error);
  });
  
app.on('error', (error) => {
  console.error('Failed to start the server.', error);
});
*/