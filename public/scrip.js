document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get values from the form
    const temperature = parseInt(document.getElementById('temperature').value);
    const rainy = document.getElementById('rainy').value === 'true';
    const windy = document.getElementById('wind').value === 'true';
  
    // Perform the prediction based on input
    const prediction = predictWeather(temperature, rainy, windy);
  
    // Display result
    const resultDiv = document.getElementById('result');
    const predictionText = document.getElementById('predictionText');
    predictionText.textContent = prediction;
    resultDiv.classList.remove('hidden');
});

// Simple rules for prediction (Naive Bayes-like logic can be added)
function predictWeather(temperature, rainy, windy) {
    if (rainy || temperature < 10 || windy) {
        return "Not suitable for basketball!";
    } else if (temperature >= 10 && temperature <= 25 && !windy && !rainy) {
        return "Great conditions for basketball!";
    } else {
        return "Weather conditions are uncertain!";
    }
}

// JavaScript for Carousel
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-images img");
const totalSlides = slides.length;

// Function to move carousel
function moveCarousel(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateCarousel();
}

// Update the carousel position
function updateCarousel() {
    const offset = -currentSlide * 100;
    document.querySelector(".carousel-images").style.transform = `translateX(${offset}%)`;
}

// Auto slide every 7 seconds
setInterval(() => {
    moveCarousel(1);
}, 7000);

// Optional: manually slide on button clicks
document.querySelector('.carousel-button.left').addEventListener('click', () => moveCarousel(-1));
document.querySelector('.carousel-button.right').addEventListener('click', () => moveCarousel(1));
