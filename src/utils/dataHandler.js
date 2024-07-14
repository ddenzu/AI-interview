//fetch 함수
const URL = '';

const apiRequest = async (endpoint, body) => {
    const response = await fetch(`${URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('서버 오류');
    }
    return response.json();
  };

export const login = async (nickname, job, gender) => {
    const data = await apiRequest('/login', { nickname, job, gender });
    return data;
};

export const fetchAnswers = async (nickname) => {
    const data = await apiRequest('/showAnswer', { nickname });
    return data.answerArray;
};

export const sendMessage = async (messages, responses, nickname, job) => {
    const data = await apiRequest('/interview', {
        userMessages: messages,
        assistantMessages: responses,
        nickname,
        job
    });
    return data;
};

export const sendAnswer = async (nickname, answer) => { // 답변 저장
    const data = await apiRequest('/answer', { nickname, answer });
    return data;
};