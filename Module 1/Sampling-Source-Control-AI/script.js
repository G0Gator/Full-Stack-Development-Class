const reviewBtn = document.getElementById("review-btn");
const statusText = document.getElementById("status-text");
const locationBtn = document.getElementById("location-btn");
const demo = document.getElementById("demo");

if (reviewBtn && statusText) {
  const messages = [
    "Review complete",
    "Changes approved",
    "AI summary ready",
    "Team synced"
  ];

  let index = 0;

  reviewBtn.addEventListener("click", () => {
    index = (index + 1) % messages.length;
    statusText.textContent = messages[index];
    statusText.parentElement.style.borderColor = "rgba(100, 240, 255, 0.4)";
    statusText.parentElement.style.boxShadow = "0 0 20px rgba(100, 240, 255, 0.15)";
  });
}

if (locationBtn && demo) {
  locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      demo.textContent = "Getting your location...";

      navigator.geolocation.getCurrentPosition(
        (position) => {
          demo.innerHTML = `Latitude: ${position.coords.latitude.toFixed(4)}<br>Longitude: ${position.coords.longitude.toFixed(4)}`;
        },
        () => {
          demo.textContent = "Location access was denied. Please allow geolocation access.";
        }
      );
    } else {
      demo.textContent = "Geolocation is not supported by this browser.";
    }
  });
}
