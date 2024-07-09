import { useEffect } from 'react';

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

export const pageVariants = {
    initial: { opacity: 0, x: '100vw' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100vw' },
    transition: { duration: 0.8 }
};

export const useCircleAnimation = () => {
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
};