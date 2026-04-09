// Supabase Auth & Session logic for core system
import supabase from './supabaseClient.js';

// --- DOM Elements ---
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const recoverForm = document.getElementById('recover-form');
const authMessage = document.getElementById('auth-message');
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');
const showLoginBtn2 = document.getElementById('show-login2');
const showRecoverBtn = document.getElementById('show-recover');

function showMessage(msg, isError = false) {
  authMessage.textContent = msg;
  authMessage.style.color = isError ? '#ff4b6e' : '#00eaff';
}

function showForm(form) {
  loginForm.style.display = form === 'login' ? 'block' : 'none';
  registerForm.style.display = form === 'register' ? 'block' : 'none';
  recoverForm.style.display = form === 'recover' ? 'block' : 'none';
  showMessage('');
}

// --- Navigation ---
if (showRegisterBtn) showRegisterBtn.onclick = () => showForm('register');
if (showLoginBtn) showLoginBtn.onclick = () => showForm('login');
if (showLoginBtn2) showLoginBtn2.onclick = () => showForm('login');
if (showRecoverBtn) showRecoverBtn.onclick = () => showForm('recover');

// --- Register ---
if (registerForm) registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const password = document.getElementById('reg-password').value;
  const password2 = document.getElementById('reg-password2').value;
  if (!name || !email || !phone || !password || !password2) {
    showMessage('Completa todos los campos', true); return;
  }
  if (password !== password2) {
    showMessage('Las contraseñas no coinciden', true); return;
  }
  showMessage('Registrando...');
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, phone, role: 'client' } }
  });
  if (error) {
    showMessage(error.message, true);
  } else {
    showMessage('Registro exitoso. Revisa tu email para confirmar.');
    showForm('login');
  }
};

// --- Login ---
if (loginForm) loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  if (!email || !password) {
    showMessage('Completa todos los campos', true); return;
  }
  showMessage('Iniciando sesión...');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    showMessage(error.message, true);
  } else {
    showMessage('¡Bienvenido!');
    setTimeout(() => window.location.reload(), 800);
  }
};

// --- Recover ---
if (recoverForm) recoverForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById('recover-email').value.trim();
  if (!email) {
    showMessage('Ingresa tu email', true); return;
  }
  showMessage('Enviando enlace...');
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    showMessage(error.message, true);
  } else {
    showMessage('Enlace enviado. Revisa tu email.');
    showForm('login');
  }
};

// --- Session Persistence & Route Protection ---
export async function requireSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || !session.user) {
    showForm('login');
    return false;
  }
  return session;
}

// --- Logout ---
export async function logout() {
  await supabase.auth.signOut();
  window.location.reload();
}

// --- On load: show login by default ---
showForm('login');
