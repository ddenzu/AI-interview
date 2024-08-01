import React from 'react';
import { motion } from "framer-motion";
import { Wave } from './modal.js';
import { useLocation } from 'react-router-dom';
import {pageVariants} from "../utils/animations.js"
import {useAnswers} from '../hooks/useAnswer';

const MyAnswer = () => {
    const location = useLocation();
    const { state } = location;
    const answers = useAnswers(state.nickname);

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
        {answers.length === 0 ? (
          <div className='no-answer'>
            저장된 답변이 존재하지 않습니다.
          </div>
        ) : (
          answers.map((answer, index) => (
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