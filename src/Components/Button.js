import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ message }) => {
    const navigate = useNavigate()
    const handleToast = () => {
        navigate('/home')
    }
    return (
        <div className='text-center'>
            <p className='fw-bold mb-1'>{message}</p>
            <button type='button' className='btn btn-success btn-sm' onClick={handleToast}>OK</button>
        </div>
    )
}

export default Button;