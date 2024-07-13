import React from 'react';

const Modal = ({ modalOpen, toggleModal, nickname, setNickname, storedAnswer }) => {
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

export default Modal;