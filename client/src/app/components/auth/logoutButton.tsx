import { useUser } from '../../../userContext';

const LogoutButton: React.FC = () => {
  const { logout } = useUser();

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;