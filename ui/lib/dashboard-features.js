// Dashboard features for Client, Driver, and Marketplace modes

// --- Client Mode ---
const requestRideBtn = document.getElementById('request-ride-btn');
const rideStatusDiv = document.getElementById('ride-status');
if (requestRideBtn) {
  requestRideBtn.addEventListener('click', () => {
    rideStatusDiv.textContent = 'Searching driver...';
    requestRideBtn.disabled = true;
    setTimeout(() => {
      rideStatusDiv.textContent = 'Driver found!';
      requestRideBtn.disabled = false;
    }, 2000);
  });
}

// --- Driver Mode ---
const driverStatusBtn = document.getElementById('driver-status-btn');
const driverStatusLabel = document.getElementById('driver-status-label');
let isOnline = false;
if (driverStatusBtn) {
  driverStatusBtn.addEventListener('click', () => {
    isOnline = !isOnline;
    driverStatusBtn.textContent = isOnline ? 'Go Offline' : 'Go Online';
    driverStatusBtn.style.background = isOnline ? '#e67e22' : '#28a745';
    driverStatusLabel.textContent = isOnline ? 'Waiting for rides' : '';
  });
}

// --- Marketplace ---
// (Static list in HTML)

// --- UI Improvements ---
// Center all sections
['client-section','driver-section','marketplace-section'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.style.textAlign = 'center';
  }
});
