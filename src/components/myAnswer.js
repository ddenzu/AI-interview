import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { showAlert } from '../utils/alert.js';
import {pageVariants} from "../utils/animations.js"
import { fetchAnswers } from '../utils/dataHandler.js'; 

const MyAnswer = () => {
    const location = useLocation();
    const { state } = location;
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const showData = async () => { // answer 확인
          try {
            const data = await fetchAnswers(state.nickname); // fetch
            setAnswer(data);
          } catch (error) {
            console.error('에러 발생:', error);
            showAlert("error", "서버 에러", "250px");
          }
        };
      showData();
    }, []);

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
      <div className='main-wrap-answer'>
        {answer.length === 0 ? (
          <div className='no-answer'>
            저장된 답변이 존재하지 않습니다.
          </div>
        ) : (
          answer.map((answer, index) => (
            <div className='answerBox' key={index}>
              {answer}
            </div>
          ))
        )}
      </div>
    </motion.div>
    </>
  );
};

export default MyAnswer;