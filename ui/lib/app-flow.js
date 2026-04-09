// App flow and dashboard navigation for static HTML
import supabase from './supabaseClient.js';

// Protección de rutas y sesión
async function getUserRole() {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.user_metadata?.role || null;
}

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


let currentUserRole = null;
async function showDashboard(email) {
  authContainer.style.display = 'none';
  appContainer.style.display = 'block';
  dashboardEmail.textContent = email;
  currentUserRole = await getUserRole();

  // Mostrar solo el botón del rol correspondiente (admin ve todos)
  if (currentUserRole === 'client') {
    clientBtn.style.display = '';
    driverBtn.style.display = 'none';
    marketplaceBtn.style.display = 'none';
    showSection('client');
  } else if (currentUserRole === 'driver') {
    clientBtn.style.display = 'none';
    driverBtn.style.display = '';
    marketplaceBtn.style.display = 'none';
    showSection('driver');
  } else if (currentUserRole === 'vendor') {
    clientBtn.style.display = 'none';
    driverBtn.style.display = 'none';
    marketplaceBtn.style.display = '';
    showSection('marketplace');
  } else if (currentUserRole === 'admin') {
    clientBtn.style.display = '';
    driverBtn.style.display = '';
    marketplaceBtn.style.display = '';
    showSection('client');
  } else {
    // Si el rol no es válido, ocultar todo
    clientBtn.style.display = 'none';
    driverBtn.style.display = 'none';
    marketplaceBtn.style.display = 'none';
  }
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

supabase.auth.getSession().then(async ({ data: { session } }) => {
  if (session && session.user) {
    showDashboard(session.user.email);
  } else {
    showLogin();
  }
});
