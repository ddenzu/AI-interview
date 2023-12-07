import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Chat from './chat.js'
import ChatApp from './chatApp.js'
import LoginPage from './login.js'
import { Routes, Route, Link } from 'react-router-dom';

function App() {


  const getRandomDirection = () => {
    const angle = Math.random() * Math.PI * 2; // 무작위 각도 설정
    const minSpeed = 0.4; // 최저 속도
    return {
      x: Math.cos(angle) * minSpeed + (Math.random() * (0.6 - minSpeed)), // 최저 속도부터 1까지의 속도 랜덤 설정
      y: Math.sin(angle) * minSpeed + (Math.random() * (0.6 - minSpeed)) // 최저 속도부터 1까지의 속도 랜덤 설정
    };
  };

  const getRandomSize = () => {
    const size = Math.floor(Math.random() * 91) + 10; // 10부터 100까지의 크기 랜덤 설정
    return size;
  };

  const getRandomPosition = (size) => {
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);
    return { x, y };
  };
  
  useEffect(() => {
    const circles = document.querySelectorAll('.circle');
    const moveCircles = () => {
      circles.forEach(circle => {
        const direction = getRandomDirection();
        const size = getRandomSize();
        const position = getRandomPosition(size);
        let x = position.x;
        let y = position.y;
  
        const move = () => {
          x += direction.x;
          y += direction.y;
  
          // 화면 경계에 닿으면 즉시 반사되도록 설정
          if (x <= 0 || x >= window.innerWidth - size || y <= 0 || y >= window.innerHeight - size) {
            direction.x *= -1;
            direction.y *= -1;
          }
  
          circle.style.left = x + 'px';
          circle.style.top = y + 'px';
          circle.style.width = size + 'px';
          circle.style.height = size + 'px';
  
          // 화면 밖으로 나가면 반사
          if (x < -size || x > window.innerWidth || y < -size || y > window.innerHeight) {
            const newPos = getRandomPosition(size);
            x = newPos.x;
            y = newPos.y;
          }
  
          requestAnimationFrame(move);
        };
        move();
      });
    };
    moveCircles();
  }, []);

    
  return (
    <>
      <div className='App' style={{ width: '100vw',height:'100%',backgroundColor:'#e0e0fc',position: 'relative', overflow: 'hidden',margin: '0'}}>
        {[...Array(15)].map((_, index) => (
          <div key={index} className="circle" style={{ zIndex: 2 ,position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '50%' }}></div>
        ))}
        <Routes>
          <Route path='/' element={
            <>
              <div style={{height:'100vh',background: 'linear-gradient(#7D71EA, #7D71EA 14%, #e0e0fc 14%)'}}>
                <div className="wave" style={{position: 'absolute', width: '100%', zIndex: '0' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#7D71EA" fillOpacity="1" d="M0,224L40,208C80,192,160,160,240,149.3C320,139,400,149,480,165.3C560,181,640,203,720,197.3C800,192,880,160,960,138.7C1040,117,1120,107,1200,117.3C1280,128,1360,160,1400,176L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                  </svg>
                </div>
                <div style={{ textAlign: 'center', paddingTop: '10px', fontFamily: 'Arial, sans-serif', color: '#333', background: 'transparent', width: '90%',  maxWidth: '600px', margin: '0 auto', height:'100%', padding:'0px', position: 'relative', zIndex: '2' }}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <h1 style={{fontSize: '2.3rem', fontWeight: 'bold',color:'white'}}>AI 면접관과<br/>함께하는 모의 면접</h1>
                  </div>
                  <div style={{ width: '70%',color: 'white', padding: '5px', margin: '15px auto', marginBottom:'50px', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px',boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    <p style={{fontWeight: 'bold', margin: '0px', fontSize: '1rem',padding:'10px' }}>
                    어떤 직업, 직무든 상관없어요<br/>면접 단골 질문만 모았어요!<br/><br/>
                    실전과 유사한 모의 면접을 통해<br/>면접을 대비하세요 👍</p>
                  </div>
                  <div className='testInfo' style={{ width: '77%', padding: '5px', margin: '15px auto', backgroundColor: 'white', borderRadius: '10px',border:'2px solid #7D71EA'}}>
                    <p style={{fontWeight: 'bold', margin: '0px', fontSize: '1.1rem',padding:'10px',color:'#7D71EA',fontSize:'15px'}}>
                      1. 직업, 직무에 맞는 AI 면접관과 매칭됩니다<br/>
                      2. 자주 묻는 면접 질문 10개가 질문됩니다
                    </p>
                  </div>
                  <Link className='custom-button' to="/login">
                  모의 면접 진행하기
                </Link>
                  <div style={{ marginTop: '50px', width: '100%', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    <img src="94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif" alt="AI 인터뷰" style={{ width: '90%', maxWidth: '450px', height: '250px', borderRadius: '10px',marginTop:'30px' }} />
                  </div>
                </div>
              </div>
              </>
          }/>
          <Route path='/ChatApp' element={<ChatApp/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </div>
      <footer>
        ⓒ 2023.<br/>✔ Contact<br/>eogks999@naver.com
      </footer>
    </>
  )
}

export default App