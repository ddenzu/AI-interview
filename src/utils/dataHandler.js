const URL = '';

const apiRequest = async (endpoint, method, body) => {
  const response = await fetch(`${URL}${endpoint}`, {
    method: method,
    headers: {
        'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (response.ok) {
    return response.json();
  } else if (response.status === 409){
    return response.status; 
  } else if (response.status === 500){
    return response.status; 
  } else {
    throw new Error('서버 오류');
  }
};

export const login = async (nickname, job, gender) => {
    const data = await apiRequest('/login', 'POST' ,{ nickname, job, gender });
    return data;
};

export const fetchAnswers = async (nickname) => {
    const data = await apiRequest(`/answer/${nickname}`, 'GET');
    return data.answerArray;
};

export const sendMessage = async (messages, responses, nickname, job) => {
    const data = await apiRequest('/interview', 'POST',{
        userMessages: messages,
        assistantMessages: responses,
        nickname,
        job
    });
    return data;
};

export const sendAnswer = async (nickname, answer) => { // 답변 저장
    const data = await apiRequest('/answer', 'POST',{ nickname, answer });
    return data;
};