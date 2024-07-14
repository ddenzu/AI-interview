import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faRobot } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';
import { Wave } from './modal.js';
import {pageVariants} from "../utils/animations.js"
import { showAlert, askToSaveAnswer } from '../utils/alert.js';
import { sendMessage, sendAnswer } from '../utils/dataHandler.js'; 

const ChatApp = () => {
  const location = useLocation();
  const { state } = location;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [responses, setResponses] = useState([]);
  const [clickedText, setClickedText] = useState('');
  const navigate = useNavigate();
  const messagesStartRef = useRef(null);

  const storeAnswer = async () => { // db에 answer 저장
    if (!clickedText) return;
    try {
      await sendAnswer(state.nickname, clickedText); // fetch
    } catch (error) {
      console.error('에러 발생:', error);
      showAlert("error", "서버 에러", "250px");
    }
  };

  const sendToOpenAI = async () => { // open ai 에게 message 전달
    window.scrollTo(0, 0);
    if (messages.length !== 0) {
      try {
        const data = await sendMessage(messages, responses, state.nickname, state.job);// fetch
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

  const scrollMobileView = () => {
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

  const endInterview = () => {
    navigate('/');
  };

  useEffect(() => {
    sendToOpenAI();
    scrollToEnd()
  }, [messages]);

  useEffect(() => {
    scrollToEnd()
  }, [responses]);

  useEffect(() => {
    storeAnswer();
  }, [clickedText]);

  return (
    <>
    <Wave style={{position: 'absolute', width: '100%', top: '0', zIndex: '0' }}/>
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
              onClick={()=>{scrollMobileView()}}
              spellCheck="false"
            />
            <button style={{cursor:'pointer'}} onClick={handleSendMessage}>
              Send
            </button>
            <div>
              <button className='end-btn' onClick={endInterview}>
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

