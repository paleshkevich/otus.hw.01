import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  text: string;
}

export const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answerText, setAnswerText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error('Не удалось загрузить вопросы. Сервер недоступен.');
        }
        const data: Question[] = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке вопросов:', error);
        setError('Не удалось загрузить вопросы. Проверьте подключение к серверу.');
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmitAnswer = async () => {
    if (currentIndex >= questions.length || !questions[currentIndex]) return;

    try {
      const response = await fetch('/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: questions[currentIndex].id,
          text: answerText,
        }),
      });

      if (response.ok) {
        setAnswerText('');
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setIsFinished(true);
        }
      } else {
        throw new Error('Не удалось отправить ответ. Сервер недоступен.');
      }
    } catch (error) {
      console.error('Ошибка при отправке ответа:', error);
      setError('Не удалось отправить ответ. Проверьте подключение к серверу.');
    }
  };

  if (isLoading) {
    return <div className="loading">Загрузка вопросов...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isFinished) {
    return <div className="finished">Спасибо!</div>;
  }

  if (questions.length === 0) {
    return <div className="no-questions">Нет доступных вопросов.</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-container">
      <h2 className="question-text">{currentQuestion.text}</h2>
      <textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Введите ваш ответ"
        rows={4}
        cols={50}
        className="answer-input"
      />
      <br />
      <button onClick={handleSubmitAnswer} className="submit-button">
        Отправить ответ
      </button>
    </div>
  );
};
