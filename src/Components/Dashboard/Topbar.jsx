import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-light bg-light p-3">
      <span className="navbar-brand">Welcome to the Dashboard</span>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default TopBar;
