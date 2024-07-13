import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faRobot } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';
import {pageVariants} from "../utils/animations.js"
import { showAlert, askToSaveAnswer } from '../utils/alert.js';
import { submitMessage, sendAnswer } from '../utils/dataHandler.js'; 

const ChatApp = () => {
  const location = useLocation();
  const { state } = location;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [responses, setResponses] = useState([]);
  const [clickedText, setClickedText] = useState('');
  const navigate = useNavigate();
  const messagesStartRef = useRef(null);

  const handleSendAnswer = async () => { // db에 answer 저장
    if (!clickedText) return;
    try {
      await sendAnswer(state.nickname, clickedText); // fetch
    } catch (error) {
      console.error('에러 발생:', error);
      showAlert("error", "서버 에러", "250px");
    }
  };

  const handleSubmitMessage = async () => { // open ai 에게 message 전달
    window.scrollTo(0, 0);
    if (messages.length !== 0) {
      try {
        const data = await submitMessage(messages, responses, state.nickname, state.job);// fetch
        setResponses([...responses, data]);
      } catch (error) {
        console.log(error);
        showAlert("error", "서버 에러", "250px");
      }
    }
  } 

  const handleSendMessage = () => {
    if (inputValue.trim() === '') {
      showAlert("warning", "내용을 입력해주세요.", "250px");
      return;
    }
    setMessages([...messages, inputValue]);
    setInputValue('');
  };

  const handleInputClick = () => {
    const isMobile = window.matchMedia("(max-width: 450px)").matches; // 450px 이하의 모바일에서만 스크롤 조정
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({ top: 165, behavior: 'smooth' });
      }, 50); 
    }
  };

  const scrollToEnd = () => {
    if (messagesStartRef.current) {
      messagesStartRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const handleEndInterview = () => {
    navigate('/');
  };

  useEffect(() => {
    handleSubmitMessage();
    scrollToEnd()
  }, [messages]);

  useEffect(() => {
    scrollToEnd()
  }, [responses]);

  useEffect(() => {
    handleSendAnswer();
  }, [clickedText]);

  return (
    <>
    <div className="wave" style={{position: 'absolute', width: '100%', top: '0', zIndex: '0' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#FFC75F" fillOpacity="1" d="M0,224L40,208C80,192,160,160,240,149.3C320,139,400,149,480,165.3C560,181,640,203,720,197.3C800,192,880,160,960,138.7C1040,117,1120,107,1200,117.3C1280,128,1360,160,1400,176L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
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
            <div className='message ai notice'>
              안녕하세요!<br/>저는 인공지능 면접관입니다.<br/>희망하는 직업이나 직무가 무엇인지 알려주세요.<br/>그러면 해당 직무에 관련된 첫 번째 면접 질문을 준비해 드릴게요.
              <br/><span>답변을 클릭하면 저장할 수 있습니다.</span>
            </div>
            <div className='bot-icon'><FontAwesomeIcon icon={faRobot} /></div>
            <div style={{clear:'both'}}></div>
            {messages.map((messages, index) => (
              <>
              <div key={index} className="message">
                {messages.split('\n').map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div style={{clear:'both'}}></div>
              {responses[index] ? (
                  <div className='message ai' onClick={() => 
                  askToSaveAnswer (responses[index], setClickedText)}>
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
            <textarea
              style={{fontWeight:'bold'}}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClick={()=>{handleInputClick()}}
              spellCheck="false"
            />
            <button style={{cursor:'pointer'}} onClick={handleSendMessage}>
              Send
            </button>
            <div>
              <button className='end-btn' onClick={handleEndInterview}>
                면접 종료
              </button>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
};

export default ChatApp;
