
import LoginForm from '../components/auth/login';
import { UserProvider } from '../../userContext';

const LoginPage = () => {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
        <LoginForm />
     
      
    </div>
  );
};

export default LoginPage;
