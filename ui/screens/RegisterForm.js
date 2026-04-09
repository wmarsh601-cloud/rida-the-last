import { useState } from 'react';
import useRegisterLogic from './Register.logic';
import Input from '../components/Input';
import Button from '../components/Button';

const roles = [
  { value: 'client', label: 'Cliente' },
  { value: 'driver', label: 'Conductor' },
  { value: 'vendor', label: 'Comercio' },
  { value: 'admin', label: 'Admin' }
];

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const { handleRegister, loading, error } = useRegisterLogic();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(name, email, password, role);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input type="text" placeholder="Nombre completo" value={name} onChange={e => setName(e.target.value)} required />
      <Input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
      <select className="ui-input" value={role} onChange={e => setRole(e.target.value)} required>
        {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
      </select>
      {error && <div style={{color: '#ff00cc', marginBottom: '1em'}}>{error}</div>}
      <Button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</Button>
    </form>
  );
}
