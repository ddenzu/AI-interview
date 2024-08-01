import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/alert';

const useModal = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [nickname, setNickname] = useState('');

    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };
    const storedAnswer = () => {
      if (nickname.trim() === '') {
        showAlert("warning", `닉네임을 입력해주세요.`, "250px")
      } else {
        setModalOpen(false); 
        navigate('/myAnswer',{ state: {nickname} }); 
        setNickname('');
      }
    };
    return {
        modalOpen,
        nickname,
        setNickname,
        toggleModal,
        storedAnswer
    };
}
export {useModal};