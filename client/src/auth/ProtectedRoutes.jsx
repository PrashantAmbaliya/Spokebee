import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    if(!token || !userData){
      localStorage.clear()
      return navigate('/seller/login');
    }
  }, []);

  return children
}

export default ProtectedRoutes;
