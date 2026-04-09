// App flow and dashboard navigation for static HTML
import supabase from './supabaseClient.js';

const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const dashboardEmail = document.getElementById('dashboard-email');
const clientBtn = document.getElementById('client-mode-btn');
const driverBtn = document.getElementById('driver-mode-btn');
const marketplaceBtn = document.getElementById('marketplace-btn');
const logoutBtn = document.getElementById('logout-btn');
const clientSection = document.getElementById('client-section');
const driverSection = document.getElementById('driver-section');
const marketplaceSection = document.getElementById('marketplace-section');

function showSection(section) {
  clientSection.style.display = section === 'client' ? 'block' : 'none';
  driverSection.style.display = section === 'driver' ? 'block' : 'none';
  marketplaceSection.style.display = section === 'marketplace' ? 'block' : 'none';
}

function showDashboard(email) {
  authContainer.style.display = 'none';
  appContainer.style.display = 'block';
  dashboardEmail.textContent = email;
  showSection('client'); // Default to client mode
}

function showLogin() {
  appContainer.style.display = 'none';
  authContainer.style.display = 'block';
}

clientBtn.addEventListener('click', () => showSection('client'));
driverBtn.addEventListener('click', () => showSection('driver'));
marketplaceBtn.addEventListener('click', () => showSection('marketplace'));
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  showLogin();
});

// Listen for auth state changes
supabase.auth.onAuthStateChange((_event, session) => {
  if (session && session.user) {
    showDashboard(session.user.email);
  } else {
    showLogin();
  }
});

// On load, check session
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session && session.user) {
    showDashboard(session.user.email);
  } else {
    showLogin();
  }
});
