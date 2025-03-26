const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/stock-management', { useNewUrlParser: true, useUnifiedTopology: true });

const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number
}));

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});