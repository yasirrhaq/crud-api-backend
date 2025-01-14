const mongoose = require('mongoose');
const express = require('express');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use("/api/products", productRoute)

app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});

// connection to mongoDB
mongoose.connect("mongodb+srv://admin:glsnpB3pbgw4FCNl@backenddb.vhwpc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(
        () => {
            console.log('Connected to Database!');
            app.listen(3000, () => {
                console.log("Server is running on port 3000");
            });
        }
    ).catch(() => console.log('Connection Failed'));