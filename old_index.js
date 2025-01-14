const mongoose = require('mongoose');
const express = require('express');
const Product = require('../models/product.model.js');
const productRoute = require('../routes/product.route.js')
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute)

app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});

// find all product
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: message.error });

    }
})

// find by id
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: message.error });

    }
})


// update product
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: message.error });
    }
})

// create product
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json(product);

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

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