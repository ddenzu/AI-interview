import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Wave } from './modal.js';
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
    <Wave style={{position: 'absolute', width: '100%', top: '0', zIndex: '0' }}/>
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