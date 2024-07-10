// Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, user: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await axios.post('https://backendhos.onrender.com/generate', { prompt: input });
      const botMessage = { text: response.data, user: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { text: 'Error generating response. Please try again.', user: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '60px', right: '20px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', width: '300px', backgroundColor: '#fff' }}>
      <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.user === 'user' ? 'right' : 'left', padding: '5px 0' }}>
            <p style={{ backgroundColor: msg.user === 'user' ? '#e1ffc7' : '#f1f1f1', padding: '10px', borderRadius: '10px' }}>{msg.text}</p>
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} 
        placeholder="How Can I Help You"
      />
      <button onClick={sendMessage} style={{ display: 'none' }}>Send</button>
    </div>
  );
};

export default Chatbot;
