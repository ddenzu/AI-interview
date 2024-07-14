import React from 'react';

export const Modal = ({ modalOpen, toggleModal, nickname, setNickname, storedAnswer }) => {
  return (
    <>
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
              <button 
                className='send-btn' 
                type="submit" 
                style={{ letterSpacing: '0px' }}
                onClick={storedAnswer}
              >
                답변 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Wave = ({style}) => {
  return (
    <div className="wave" style={{ ...style }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#FFC75F" fillOpacity="1" d="M0,224L40,208C80,192,160,160,240,149.3C320,139,400,149,480,165.3C560,181,640,203,720,197.3C800,192,880,160,960,138.7C1040,117,1120,107,1200,117.3C1280,128,1360,160,1400,176L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
      </svg>
    </div>
  );
};