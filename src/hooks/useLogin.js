import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/alert';
import { login } from '../services/api';

const useLogin = () => {
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
    return {
        nickname,
        setNickname,
        job,
        setJob,
        gender,
        setGender,
        handleLogin
    };
}

export {useLogin};