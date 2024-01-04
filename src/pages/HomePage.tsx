import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="mb-4">
              <img src="/Fetch_Rewards_Logo.jpeg" alt="Fetch Logo" className="logo img-fluid mb-4 w-50" />
            </div>
            <h1 className="text-center mb-4">Welcome to Fetch</h1>
            <LoginForm onSubmit={handleLogin} />
          </div>
        </div>
      </div>
    );
};

export default HomePage;
