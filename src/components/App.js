import React from 'react';
import '../App.css'
import ChatApp from './chatApp.js'
import LoginPage from './login.js'
import MyAnswer from './myAnswer.js'
import { Modal} from './ui/modal.js';
import { Wave } from './ui/wave.js';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { pageVariants, useCircleAnimation } from "../utils/animations.js"
import { useModal } from '../hooks/useModal';

function App() {
  const {
    modalOpen,
    nickname,
    setNickname,
    toggleModal,
    storedAnswer
  } = useModal();

  useCircleAnimation(); // 배경 애니메이션 

  return (
    <>
      <div className='App'>
        {[...Array(15)].map((_, index) => (
          <div key={index} className="circle"></div>
        ))}
          <Routes>
            <Route path='/' element={
              <div className='main-wrap'>
                <Wave/>
                <motion.div
                className='page'
                variants={pageVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition='transition'
                style={{ position: 'relative', zIndex: '2' }}
                >
                <div className='second-wrap'>
                  <div className='second-wrap-1'>
                    <h1>AI 면접관과<br/>함께하는 모의 면접</h1>
                  </div>
                  <div className='second-wrap-2'>
                    <p>
                    어떤 직업, 직무든 상관없어요<br/>면접 단골 질문만 모았어요!<br/><br/>
                    실전과 유사한 모의 면접을 통해<br/>면접을 대비하세요 👍</p>
                  </div>
                  <div className='testInfo'>
                    <p>
                      1. 직업, 직무의 AI 면접관과 매칭됩니다<br/>
                      2. 자주 묻는 면접 질문 5개가 질문됩니다
                    </p>
                  </div>
                  <Link className='custom-button' to="/login">
                  모의 면접 진행하기
                  </Link>  
                  <Link  onClick={toggleModal}
                  className='custom-button stored' to="">
                  답변 확인하기
                  </Link>
                  <Modal
                    modalOpen={modalOpen}
                    toggleModal={toggleModal}
                    nickname={nickname}
                    setNickname={setNickname}
                    storedAnswer={storedAnswer}
                  />                  
                  <div className='main-imgBox'>
                    <img src="94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48-ezgif.com-optiwebp.webp" alt="AI 인터뷰"
                    loading='lazy'/>
                  </div>
                </div>
                </motion.div>
              </div>
            }/>
            <Route path='/ChatApp' element={<ChatApp/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/myAnswer' element={<MyAnswer/>}/>
          </Routes>
      </div>
      <footer>
        ⓒ 2023.<br/>✔ Contact<br/>eogks999@naver.com
      </footer>
    </>
  )
}

export default App