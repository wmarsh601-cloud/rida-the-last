import { useState } from 'react';
import useLoginLogic from './Login.logic';
import Input from '../components/Input';
import Button from '../components/Button';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, loading, error } = useLoginLogic();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
      {error && <div style={{color: '#ff00cc', marginBottom: '1em'}}>{error}</div>}
      <Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
    </form>
  );
}
