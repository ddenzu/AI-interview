import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faRobot } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { Wave } from './modal.js';
import {pageVariants} from "../utils/animations.js"
import { askToSaveAnswer } from '../utils/alert.js';
import { useChat } from '../hooks/useChat';

const ChatApp = () => {
  const {
    messages,
    responses,
    inputValue,
    setInputValue,
    handleSendMessage,
    endInterview,
    messagesStartRef,
    setClickedText,
    scrollMobileView,
  } = useChat();

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

