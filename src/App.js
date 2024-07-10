import React, { useState, useEffect } from 'react';
import './App.css'
import ChatApp from './chatApp.js'
import LoginPage from './login.js'
import MyAnswer from './myAnswer.js'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { pageVariants, useCircleAnimation } from "./utils/animations.js"
import { showAlert } from './utils/alert.js';

function App() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useCircleAnimation(); // 배경 애니메이션 

  const storedAnswer = () => {
    if (nickname.trim() === '') {
      showAlert("warning", `닉네임을 입력해주세요.`, "250px")
    } else {
      setModalOpen(false); 
      navigate('/myAnswer',{ state: {nickname} }); 
      setNickname('');
    }
  };

  return (
    <>
      <div className='App'>
        {[...Array(15)].map((_, index) => (
          <div key={index} className="circle"></div>
        ))}

          <Routes>
            <Route path='/' element={
                <div className='main-wrap'>
                  <div className="wave">
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
                    {modalOpen && (
                      <div className='modal-overlay'>
                        <div className='modal'>
                          <button className='close-button' onClick={toggleModal}>
                            ×
                          </button>
                          <div className='modal-content'>
                            <input
                              type="text"
                              placeholder="Nickname"
                              value={nickname}
                              onChange={(e) => setNickname(e.target.value)}
                              style={{ margin: '10px', padding: '8px', width: '90%' }}
                            />
                            <button className='send-btn' type="submit" style={{letterSpacing:'0px'}}
                            onClick={storedAnswer}
                            >답변 보기</button>
                          </div>
                        </div>
                      </div>
                    )}                      
                    <div className='main-imgBox'>
                      <img src="94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif" alt="AI 인터뷰"/>
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