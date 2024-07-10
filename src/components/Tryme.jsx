// ChatbotToggle.js
import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import Chatbot from './chat/Chatbot';

const Tryme = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <FaQuestionCircle 
        size={30} 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} 
      />
      {isOpen && <Chatbot />}
    </div>
  );
};



export default Tryme