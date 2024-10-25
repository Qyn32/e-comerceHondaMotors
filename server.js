const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Enable CORS for cross-origin requests

const app = express();
const port = 3000; // Or any port you choose

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Read product data from data.json
let products = [];
try {
  const data = fs.readFileSync('data.json');
  products = JSON.parse(data);
} catch (err) {
  console.error("Error reading data.json:", err);
}

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1; // Assign a new ID
  products.push(newProduct);
  fs.writeFileSync('data.json', JSON.stringify(products, null, 2));
  res.json(newProduct);
});

// PUT (update) a product
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = updatedProduct;
    fs.writeFileSync('data.json', JSON.stringify(products, null, 2));
    res.json(updatedProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

// DELETE a product
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(product => product.id !== productId);
  fs.writeFileSync('data.json', JSON.stringify(products, null, 2));
  res.send('Product deleted');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});