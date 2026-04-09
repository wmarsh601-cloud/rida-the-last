import AppLayout from '../layouts/AppLayout';
import Card from '../components/Card';
import LoginForm from './LoginForm';
import '../assets/theme.css';

export default function Login() {
  return (
    <AppLayout>
      <Card>
        <h2>Iniciar sesión</h2>
        <LoginForm />
      </Card>
    </AppLayout>
  );
}
