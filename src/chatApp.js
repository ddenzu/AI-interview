import React, { useState, useRef, useEffect } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesStartRef = useRef(null);

  const scrollToTop = () => {
    messagesStartRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop();
  }, [messages]);

  const handleMessageSubmit = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div className="wave" style={{position: 'absolute', width: '100%', top: '0', zIndex: '0' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#7D71EA" fillOpacity="1" d="M0,224L40,208C80,192,160,160,240,149.3C320,139,400,149,480,165.3C560,181,640,203,720,197.3C800,192,880,160,960,138.7C1040,117,1120,107,1200,117.3C1280,128,1360,160,1400,176L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg>
      </div>
      <div className="chat-container" style={{ width: '70%',  maxWidth: '500px', height: '75%', backgroundColor: 'rgba(52, 53, 65, 0.8)', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -30%)',zIndex:'3' }}>
        <div className="messages-container" style={{ overflowY: 'scroll', height: 'calc(100% - 10px)', marginTop: '10px' }}>
          {messages.map((message, index) => (
            <div key={index} className="message" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' , width: '80%',backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '8px', borderRadius: '5px', marginBottom: '5px' }}>
              {message}
            </div>
          ))}
          <div ref={messagesStartRef} />
        </div>
        <div className="input-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: 'calc(100% - 70px)', padding: '8px', borderRadius: '5px', border: 'none' }}
          />
          <button onClick={handleMessageSubmit} style={{ width: '70px', padding: '8px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white' }}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

