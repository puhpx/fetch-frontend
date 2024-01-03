import { login } from '../api/auth';
import LoginForm from '../components/LoginForm';

interface HomePageProps {
  onLogin: () => void;
}

type LoginCredentials = {
  name: string;
  email: string;
};

const HomePage: React.FC<HomePageProps> = ({ onLogin }) => {
  const handleLogin = async (credentials: LoginCredentials) => {
        try {
            await login(credentials.name, credentials.email);
            onLogin();
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="container">
            <h1>Welcome to Fetch</h1>
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
};

export default HomePage;
