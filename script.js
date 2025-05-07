// Initialize map
const map = L.map('map').setView([28.6139, 77.2090], 12); // Centered at Delhi

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Example markers (you can remove if not needed)
const markers = [
  { name: "Red Fort", lat: 28.6562, lon: 77.2410 },
  { name: "India Gate", lat: 28.6129, lon: 77.2295 },
  { name: "Lotus Temple", lat: 28.5535, lon: 77.2588 },
  { name: "Qutub Minar", lat: 28.5244, lon: 77.1855 },
  { name: "Akshardham", lat: 28.6127, lon: 77.2773 }
];

markers.forEach(marker => {
  L.marker([marker.lat, marker.lon])
    .addTo(map)
    .bindPopup(`<strong>${marker.name}</strong>`);
});

// Search location using Nominatim
function searchLocation() {
  const location = document.getElementById('location-input').value;
  if (!location) return;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        map.setView([lat, lon], 15);
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(`<strong>${location}</strong>`)
          .openPopup();
      } else {
        alert("Location not found. Try 'India Gate', 'Red Fort', etc.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Failed to search location.");
    });
}
