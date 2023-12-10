import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faRobot } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from "framer-motion";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [responses, setResponses] = useState([]);
  const messagesStartRef = useRef(null);



  useEffect(() => {
    window.scrollTo(0, 0);
    handleMessageSubmit()
    if (messagesStartRef.current) {
      messagesStartRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const handleInputClick = () => {
    const isMobile = window.matchMedia("(max-width: 450px)").matches; // 450px 이하의 모바일에서만 스크롤 조정
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({ top: 160, behavior: 'smooth' });
      }, 50); 
    }
  };

  const handleMessageSubmit = async () => {
    if(messages!=''){
      try{
        const response = await fetch('http://localhost:8000/interview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessages: messages,
          assistantMessages: responses,
        })
        })
        const data = await response.json();
        setResponses([...responses, data])
      } catch(error){
        console.log(error)
      }
    };
  } 

  const pageVariants = {
    initial: { opacity: 0, x: '100vw' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100vw' },
    transition: { duration: 0.8 }
  };

  return (
    <>
    <div className="wave" style={{position: 'absolute', width: '100%', top: '0', zIndex: '0' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#7D71EA" fillOpacity="1" d="M0,224L40,208C80,192,160,160,240,149.3C320,139,400,149,480,165.3C560,181,640,203,720,197.3C800,192,880,160,960,138.7C1040,117,1120,107,1200,117.3C1280,128,1360,160,1400,176L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
      </svg>
    </div>
    <motion.div
    className='page'
    variants={pageVariants}
    initial='initial'
    animate='animate'
    exit='exit'
    transition='transition'
    style={{ position: 'relative', zIndex: '2' }}>
      <div className='main-wrap-chat'>
        <div className="chat-container">
          <div className="messages-container">
            <div className='message ai'>
              안녕하세요!<br/>저는 인공지능 면접관입니다.<br/>당신의 직업이나 직무가 무엇인지 알려주시겠어요?<br/>그러면 해당 직무에 관련된 첫 번째 면접 질문을 준비해 드릴게요.
            </div>
            <div className='bot-icon'><FontAwesomeIcon icon={faRobot} /></div>
            <div style={{clear:'both'}}></div>
            {messages.map((messages, index) => (
              <>
              <div key={index} className="message">
                {messages}
              </div>
              <div style={{clear:'both'}}></div>
              {responses[index] ? (
                  <div className='message ai'>
                    {responses[index]}
                  </div>
                ) : (
                  <div className='message ai'>
                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                  </div>
                )}
                <div className='bot-icon'><FontAwesomeIcon icon={faRobot} /></div>
                <div style={{clear:'both'}}></div>
              <div ref={messagesStartRef} />
              </>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={inputValue} 
              onClick={()=>{handleInputClick()}}
              onChange={(e) => {setInputValue(e.target.value)} }
            />
            <button onClick={()=>{setMessages([...messages, inputValue]);
            setInputValue('')}}>Send</button>
          </div>
        </div>
      </div>
      </motion.div>
    </>

  );
};

export default ChatApp;

