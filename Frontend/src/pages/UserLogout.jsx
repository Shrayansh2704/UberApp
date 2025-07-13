import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 
import Spinner from '../components/Spinner';

const URL = import.meta.env.VITE_BASE_URL;

const UserLogout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    axios.get(`${URL}/users/logout `,{
        headers : {
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            localStorage.removeItem('token');
            navigate('/user-login');
        }
    });

  return (
    <div>
      <Spinner />
    </div>
  )
}

export default UserLogout
