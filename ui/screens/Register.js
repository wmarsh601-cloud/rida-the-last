import AppLayout from '../layouts/AppLayout';
import Card from '../components/Card';
import RegisterForm from './RegisterForm';
import '../assets/theme.css';

export default function Register() {
  return (
    <AppLayout>
      <Card>
        <h2>Crear cuenta</h2>
        <RegisterForm />
      </Card>
    </AppLayout>
  );
}
