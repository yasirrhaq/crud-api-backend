const mongoose = require('mongoose');
const express = require('express');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express();

require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use("/api/products", productRoute)

app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});

// connection to mongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(
        () => {
            console.log('Connected to Database!');
            app.listen(3000, () => {
                console.log("Server is running on port 3000");
            });
        }
    ).catch(() => console.log('Connection Failed'));