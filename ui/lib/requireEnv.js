// Require critical environment variables before app start

export function requireEnvVars(vars) {
  const missing = vars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}.\n\nNO continuar sin estos datos.`
    );
  }
}

// Usage example (call at app entry):
// requireEnvVars(['REACT_APP_SUPABASE_URL', 'REACT_APP_SUPABASE_ANON_KEY', 'REACT_APP_GOOGLE_MAPS_API_KEY']);
