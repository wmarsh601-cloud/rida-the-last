import supabase from './supabaseClient';

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email, password, role, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role, name }
    }
  });
  return { data, error };
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export function getSession() {
  return supabase.auth.getSession();
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}
