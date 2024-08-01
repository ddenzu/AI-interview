import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Wave } from './modal.js';
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
        if (data === 409){
          showAlert("warning", '이미 존재하는 닉네임 입니다.', "250px");
          setNickname('');
        } else if (data === 500){
          showAlert("error", "서버 에러", "250px");
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
      <Wave style={{position: 'absolute', top: '0', zIndex: '1' }}/>
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
            style={{ margin: '10px', width: '90%' }}
          />
          <input
            type="text"
            placeholder="Job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            style={{ margin: '10px', width: '90%' }}
          />
          <div className='selectGender'>
            <input type="radio" id="male" name="gender" value="male" 
            onChange={(e) => setGender(e.target.value)} />
            <label htmlFor="male">남성</label>
            <input type="radio" id="female" name="gender" value="female"
            onChange={(e) => setGender(e.target.value)}/>
            <label htmlFor="female">여성</label>
          </div>
          <button className='send-btn' type="submit" style={{width: '90%' }}
          >시작</button>
        </form>
      </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
