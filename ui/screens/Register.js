import AppLayout from '../layouts/AppLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import '../assets/theme.css';

export default function Register() {
  return (
    <AppLayout>
      <Card>
        <h2>Crear cuenta</h2>
        <form>
          <Input type="text" placeholder="Nombre completo" required />
          <Input type="email" placeholder="Correo electrónico" required />
          <Input type="password" placeholder="Contraseña" required />
          <Button type="submit">Registrarse</Button>
        </form>
      </Card>
    </AppLayout>
  );
}
