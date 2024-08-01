import { useState, useEffect } from 'react';
import { fetchAnswers } from '../services/api';
import { showAlert } from '../utils/alert';

const useAnswers = (nickname) => {
    const [answers, setAnswers] = useState([]);
  
    useEffect(() => {
      const showData = async () => {
        try {
          const data = await fetchAnswers(nickname); 
          setAnswers(data);
        } catch (error) {
          console.error('에러 발생:', error);
          showAlert("error", "서버 에러", "250px");
        }
      };
      showData();
    }, []);
    return answers;
};
  
export {useAnswers};