import React from 'react';
import { motion } from "framer-motion";
import { Wave } from './ui/wave.js';
import { pageVariants } from "../utils/animations.js"
import {useLogin} from '../hooks/useLogin';

const LoginPage = () => {
  const {
    nickname,
    setNickname,
    job,
    setJob,
    setGender,
    handleLogin
  } = useLogin();

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
