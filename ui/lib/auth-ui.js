// Basic Supabase Auth UI/Logic for static HTML
import supabase from './supabaseClient.js';

// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageDiv = document.getElementById('auth-message');
const loggedInDiv = document.getElementById('logged-in');
const userEmailSpan = document.getElementById('user-email');

function showMessage(msg, isError = false) {
  messageDiv.textContent = msg;
  messageDiv.style.color = isError ? 'red' : 'lightgreen';
}

function showLoggedIn(email) {
  loginForm.style.display = 'none';
  loggedInDiv.style.display = 'block';
  userEmailSpan.textContent = email;
}

function showLoginForm() {
  loginForm.style.display = 'block';
  loggedInDiv.style.display = 'none';
}

// Register
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  showMessage('Registering...');
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    showMessage(error.message, true);
  } else {
    showMessage('Registration successful! Check your email to confirm.');
  }
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  showMessage('Logging in...');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    showMessage(error.message, true);
  } else {
    showLoggedIn(data.user.email);
    showMessage('Login successful!');
  }
});

// Check session on load
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session && session.user) {
    showLoggedIn(session.user.email);
  } else {
    showLoginForm();
  }
});

// Listen for auth state changes
supabase.auth.onAuthStateChange((_event, session) => {
  if (session && session.user) {
    showLoggedIn(session.user.email);
  } else {
    showLoginForm();
  }
});
