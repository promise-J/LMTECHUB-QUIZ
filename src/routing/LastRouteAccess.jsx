import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LastRouteAccess = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('lastPathname', location.pathname)
  });

};

export default LastRouteAccess;