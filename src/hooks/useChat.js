import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/alert.js';
import { sendMessage, sendAnswer } from '../services/api'; 

const useChat = () => {
    const location = useLocation();
    const { state } = location;
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [responses, setResponses] = useState([]);
    const [clickedText, setClickedText] = useState('');
    const navigate = useNavigate();
    const messagesStartRef = useRef(null);
  
    const storeAnswer = async () => { // db에 answer 저장
      if (!clickedText) return;
      try {
        await sendAnswer(state.nickname, clickedText); 
      } catch (error) {
        console.error('에러 발생:', error);
        showAlert("error", "서버 에러", "250px");
      }
    };
  
    const sendToOpenAI = async () => { // open ai 에게 message 전달
      window.scrollTo(0, 0);
      if (messages.length !== 0) {
        try {
          const data = await sendMessage(messages, responses, state.nickname, state.job);// fetch
          setResponses([...responses, data]);
        } catch (error) {
          console.log(error);
          showAlert("error", "서버 에러", "250px");
        }
      }
    } 
  
    const handleSendMessage = () => {
      if (inputValue.trim() === '') {
        showAlert("warning", "내용을 입력해주세요.", "250px");
        return;
      }
      setMessages([...messages, inputValue]);
      setInputValue('');
    };
  
    const scrollMobileView = () => {
      const isMobile = window.matchMedia("(max-width: 450px)").matches; // 450px 이하의 모바일에서만 스크롤 조정
      if (isMobile) {
        setTimeout(() => {
          window.scrollTo({ top: 165, behavior: 'smooth' });
        }, 50); 
      }
    };
  
    const scrollToEnd = () => {
      if (messagesStartRef.current) {
        messagesStartRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    };
  
    const endInterview = () => {
      navigate('/');
    };
  
    useEffect(() => {
      sendToOpenAI();
      scrollToEnd()
    }, [messages]);
  
    useEffect(() => {
      scrollToEnd()
    }, [responses]);
  
    useEffect(() => {
      storeAnswer();
    }, [clickedText]);

    return {
        messages,
        responses,
        inputValue,
        setInputValue,
        handleSendMessage,
        endInterview,
        messagesStartRef,
        setClickedText,
        scrollToEnd,
        scrollMobileView,
    };
}

export {useChat};