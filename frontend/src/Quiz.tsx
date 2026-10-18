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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data: Question[] = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
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
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (isLoading) {
    return <div>Загрузка вопросов...</div>;
  }

  if (isFinished) {
    return <div>Спасибо!</div>;
  }

  if (questions.length === 0) {
    return <div>Нет доступных вопросов.</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h2>{currentQuestion.text}</h2>
      <textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Введите ваш ответ"
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleSubmitAnswer}>Отправить ответ</button>
    </div>
  );
};
