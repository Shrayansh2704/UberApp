import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/user-login');
    }
  }, [navigate]);


  return <>{children}</>;
};

export default UserProtectedWrapper;
