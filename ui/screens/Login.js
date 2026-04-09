import AppLayout from '../layouts/AppLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import '../assets/theme.css';

export default function Login() {
  return (
    <AppLayout>
      <Card>
        <h2>Iniciar sesión</h2>
        <form>
          <Input type="email" placeholder="Correo electrónico" required />
          <Input type="password" placeholder="Contraseña" required />
          <Button type="submit">Entrar</Button>
        </form>
      </Card>
    </AppLayout>
  );
}
