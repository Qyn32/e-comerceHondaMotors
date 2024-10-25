document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display products
    displayProducts();
  
    // Add product button click
    const addProductBtn = document.getElementById('addProductBtn');
    addProductBtn.addEventListener('click', () => {
      $('#productForm').modal('show');
      // Clear form fields
      document.getElementById('productId').value = '';
      document.getElementById('productName').value = '';
      document.getElementById('productPrice').value = '';
      document.getElementById('productStock').value = '';
      document.getElementById('productImage').value = '';
    });
  
    // Save product button click
    const saveProductBtn = document.getElementById('saveProductBtn');
    saveProductBtn.addEventListener('click', () => {
      const productId = document.getElementById('productId').value;
      const productName = document.getElementById('productName').value;
      const productPrice = document.getElementById('productPrice').value;
      const productStock = document.getElementById('productStock').value;
      const productImage = document.getElementById('productImage').value;
  
      if (productId) {
        // Edit existing product
        editProduct(productId, productName, productPrice, productStock, productImage);
      } else {
        // Add new product
        addProduct(productName, productPrice, productStock, productImage);
      }
  
      $('#productForm').modal('hide');
    });
  
    // Delete product function
    function deleteProduct(productId) {
      fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            displayProducts();
          } else {
            console.error('Error deleting product');
          }
        });
    }
  
    // Edit product function
    function editProduct(productId, productName, productPrice, productStock, productImage) {
      fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: productId,
          name: productName,
          price: productPrice,
          stock: productStock,
          image: productImage
        })
      })
        .then(response => {
          if (response.ok) {
            displayProducts();
          } else {
            console.error('Error editing product');
          }
        });
    }
  
    // Add product function
    function addProduct(productName, productPrice, productStock, productImage) {
      fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: productName,
          price: productPrice,
          stock: productStock,
          image: productImage
        })
      })
        .then(response => {
          if (response.ok) {
            displayProducts();
          } else {
            console.error('Error adding product');
          }
        });
    }
  
    // Display products in the table
    function displayProducts() {
      const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
      productTable.innerHTML = '';
  
      fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
          products.forEach(product => {
            const row = productTable.insertRow();
            const nameCell = row.insertCell();
            const priceCell = row.insertCell();
            const stockCell = row.insertCell();
            const actionsCell = row.insertCell();
  
            nameCell.innerHTML = product.name;
            priceCell.innerHTML = product.price;
            stockCell.innerHTML = product.stock;
            actionsCell.innerHTML = `
              <button onclick="editProduct(${product.id}, '${product.name}', ${product.price}, ${product.stock}, '${product.image}')" class="btn btn-primary btn-sm">Edit</button>
              <button onclick="deleteProduct(${product.id})" class="btn btn-danger btn-sm">Delete</button>
            `;
          });
        });
    }
  
    const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.onclick = function() {
        window.location.href = "http://localhost:3000/";
    };
  } else {
    console.error("Back button not found in the DOM");
  }

  });