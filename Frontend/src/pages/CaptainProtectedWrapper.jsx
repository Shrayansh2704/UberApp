import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/captain-login');
    }
  }, [navigate]);


  return <>{children}</>;
};

export default CaptainProtectedWrapper;
