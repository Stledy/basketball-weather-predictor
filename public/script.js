// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-images img");
const totalSlides = slides.length;
let slideInterval;

function moveCarousel(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;
  updateCarousel();
  resetInterval();
}

function updateCarousel() {
  const offset = -currentSlide * 100;
  document.querySelector(".carousel-images").style.transform = `translateX(${offset}%)`;
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => moveCarousel(1), 7000);
}

// Initialize carousel
updateCarousel();
slideInterval = setInterval(() => moveCarousel(1), 7000);

// Pause on hover
document.querySelector(".carousel-container").addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

document.querySelector(".carousel-container").addEventListener("mouseleave", resetInterval);

// Button event listeners
document.querySelector(".carousel-button.left").addEventListener("click", () => moveCarousel(-1));
document.querySelector(".carousel-button.right").addEventListener("click", () => moveCarousel(1));

// Form submission
document.getElementById("weatherForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  
  try {
    const response = await fetch('../src/process.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Prediction failed');
    
    const result = await response.json();
    const resultDiv = document.getElementById("result");
    const predictionText = document.getElementById("predictionText");
    
    resultDiv.classList.remove("hidden", "yes", "no");
    resultDiv.classList.add(result.prediction === "Yes" ? "yes" : "no");
    
    predictionText.textContent = result.prediction === "Yes" 
      ? "✅ Good conditions for basketball!" 
      : "❌ Not ideal for basketball today.";
    
    resultDiv.classList.remove("hidden");
    resultDiv.scrollIntoView({ behavior: 'smooth' });
    
  } catch (error) {
    console.error('Error:', error);
    document.getElementById("predictionText").textContent = "Error making prediction. Please try again.";
    document.getElementById("result").classList.remove("hidden");
  }
});