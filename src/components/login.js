import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { pageVariants } from "../utils/animations.js"
import { showAlert } from '../utils/alert.js';
import { login } from '../utils/dataHandler.js'; 

const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [job, setJob] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => { 
    if (!nickname || !job || !gender) {
      showAlert("warning", `닉네임과 희망 직무를 입력해주세요.`, "250px");
      return;
    }
    try {
      const data = await login(nickname, job, gender); // fetch
      if (data === '이미 존재하는 닉네임') {
        showAlert("warning", '이미 존재하는 닉네임 입니다.', "250px");
        setNickname('');
      } else {
        navigate('/chatApp', { state: { nickname, job, gender } });
      }
    } catch (error) {
      console.error(error);
      showAlert("error", "서버 에러", "250px");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div className="wave" style={{position: 'absolute', top: '0', zIndex: '1' }}>
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
      style={{ position: 'relative', zIndex: '2'}}>
      <div className='login'>
        <h2>시작하기 전에 !</h2>
        <form onSubmit={(e) => { e.preventDefault();handleLogin();}}>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ margin: '10px', padding: '8px', width: '90%' }}
          />
          <input
            type="text"
            placeholder="Job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            style={{ margin: '10px', padding: '8px', width: '90%' }}
          />
          <div className='selectGender'>
            <input type="radio" id="male" name="gender" value="male" 
            onChange={(e) => setGender(e.target.value)} />
            <label htmlFor="male">남성</label>
            <input type="radio" id="female" name="gender" value="female"
            onChange={(e) => setGender(e.target.value)}/>
            <label htmlFor="female">여성</label>
          </div>
          <button className='send-btn' type="submit" style={{ 
          margin: '10px', padding: '8px', cursor: 'pointer', width: '90%' }}
          >시작</button>
        </form>
      </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;