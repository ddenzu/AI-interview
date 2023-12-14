import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [job, setJob] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    },[]);
  const handleLogin = async () => {
    try {
      if (!nickname || !job || !gender) {
        alert('닉네임과 희망 직무를 입력해주세요.');
        return;
      }

      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nickname: nickname, 
          job: job,
          gender: gender }),
      })
      .then((response) => {
        if (response.ok) { // 응답send 하면 true 반환
          navigate('/chatApp', { state: { nickname, job, gender } });
          return response.json();
        }
        throw new Error('서버 에러');
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: '100vw' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100vw' },
    transition: { duration: 0.8 }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div className="wave" style={{position: 'absolute', top: '0', zIndex: '1' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#7D71EA" fillOpacity="1" d="M0,224L40,208C80,192,160,160,240,149.3C320,139,400,149,480,165.3C560,181,640,203,720,197.3C800,192,880,160,960,138.7C1040,117,1120,107,1200,117.3C1280,128,1360,160,1400,176L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
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
        <h2>Before We Get Started</h2>
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
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="female"
            onChange={(e) => setGender(e.target.value)}/>
            <label htmlFor="female">Female</label>
          </div>
          <button className='send-btn' type="submit" style={{ margin: '10px', padding: '8px', cursor: 'pointer', width: '90%' }}
          // onClick={()=>{navigate('/chatApp')}}
          >start</button>
        </form>
      </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
