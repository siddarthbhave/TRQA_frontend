// components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <button 
      className="bg-blue-500 rounded-sm py-2 px-4 text-white" 
      onClick={handleBackClick}
    >
      Back
    </button>
  );
};

export default BackButton;
