document.addEventListener('DOMContentLoaded', function() {
    const motorcycleGrid = document.getElementById('motorcycle-grid');
    fetch('http://localhost:3000/products') // Fetch from backend server
      .then(response => response.json())
      .then(motorcycles => {
        motorcycles.forEach(motorcycle => {
          const motorcycleCard = `
            <div class="col-md-4">
              <div class="motorcycle-card">
                <img src="${motorcycle.image}" alt="${motorcycle.name}">
                <h3>${motorcycle.name}</h3>
                <p>$${motorcycle.price}</p>
                <p>${motorcycle.description}</p>
                <a href="#" class="btn btn-primary">View Details</a>
              </div>
            </div>
          `;
          motorcycleGrid.innerHTML += motorcycleCard;
        });
      });
  });