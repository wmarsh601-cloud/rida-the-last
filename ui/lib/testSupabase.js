import supabase from './supabaseClient';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Usage example (Node/React):
// testSupabaseConnection().then(console.log);
