"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function GuessTheMusicPage() {
  const [step, setStep] = useState(1); // 1: Genre, 2: Difficulty, 3: Quiz
  const [genre, setGenre] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [lives, setLives] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [player, setPlayer] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const playerRef = useRef(null);
  const timerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [samplePlayed, setSamplePlayed] = useState(false);

  useEffect(() => {
    if (step === 3 && genre) {
      fetch('/api/db')
        .then(res => res.json())
        .then(data => {
          const selectedTracks = data[genre] || [];
          const randomTracks = selectedTracks.sort(() => 0.5 - Math.random()).slice(0, 10);
          setQuestions(randomTracks);
          setCurrentQuestion(0);
          setLives(5);
        });
    }
  }, [step, genre]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0 && window.YT) {
      initializePlayer();
      generateOptions();
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [questions, currentQuestion]);

  useEffect(() => {
    setSamplePlayed(false);
  }, [currentQuestion]);

  const initializePlayer = () => {
    const currentTrack = questions[currentQuestion];
    if (currentTrack && window.YT) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      playerRef.current = new window.YT.Player('player', {
        height: '0',
        width: '0',
        videoId: currentTrack.id,
        events: {
          onReady: () => {
            setIsPlayerReady(true);
            setIsLoading(false);
          },
          onError: (e) => console.error(e),
        },
      });
    }
  };

  const generateOptions = () => {
    const correctTitle = questions[currentQuestion].title;
    const otherTitles = questions
      .filter((_, idx) => idx !== currentQuestion)
      .map(q => q.title)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const allOptions = [correctTitle, ...otherTitles].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  const startNextQuestion = () => {
    setIsPlayerReady(false);
    setShowCorrectMessage(false);
    setShowTimeoutMessage(false);
    setCurrentQuestion(prev => prev + 1);
    setTimeLeft(0);
    setIsLoading(true);
    setTimeout(() => {
      initializePlayer();
      generateOptions();
    }, 2000);
  };

  const handleAnswer = (selected) => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
      playerRef.current.destroy();
      playerRef.current = null;
    }
    setSamplePlayed(false);
    if (selected === questions[currentQuestion].title) {
      setMessage("정답입니다!");
      setScore(prev => prev + 1);
    } else {
      setMessage(`틀렸습니다! 정답은 ${questions[currentQuestion].title}입니다.`);
      setLives(prev => prev - 1);
      if (lives - 1 <= 0) {
        setMessage("게임 오버!");
        setTimeout(() => setStep(4), 2000);
        return;
      }
    }
    if (currentQuestion + 1 >= questions.length) {
      setTimeout(() => setStep(4), 2000);
    } else {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setMessage("");
      }, 2000);
    }
  };

  const resetGame = () => {
    setStep(1);
    setLives(5);
    setCurrentQuestion(0);
    setQuestions([]);
  };

  const handleBack = () => {
    if (step === 3 || step === 4) {
      window.location.href = "/guessthemusic";
    } else if (step > 1) {
      setStep(step - 1);
      setCurrentQuestion(0);
      setLives(5);
    } else {
      window.location.href = "/guessthemusic";
    }
  };

  const playSample = () => {
    if (playerRef.current && isPlayerReady) {
      const videoDuration = playerRef.current.getDuration();
      let startTime = 0;

      // 보통 이상의 난이도에서 랜덤 시작 시간 설정
      if (['보통', '고수', '작곡가', '악마', '미친'].includes(difficulty)) {
        startTime = Math.floor(Math.random() * (videoDuration - 15)); // 마지막 15초는 제외
      }

      playerRef.current.seekTo(startTime, true);
      playerRef.current.playVideo();
      const playTime = { '입문자': 15, '보통': 10, '고수': 5, '작곡가': 3, '악마': 2, '미친': 1 }[difficulty] || 5;
      setTimeLeft(playTime);
      setSamplePlayed(true);

      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
              playerRef.current.pauseVideo();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleGenreSelect = (selectedGenre) => {
    setGenre(selectedGenre);
    setStep(2);
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setStep(3);
  };

  const submitScore = () => {
    if (!name || !department || !studentId.match(/^\d{2}$/)) {
      alert("이름과 과를 입력하고, 학번은 2자리 숫자로 입력해주세요.");
      return;
    }

    fetch('/api/saveRank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ difficulty, name, department, studentId, score, genre }),
    })
    .then(res => res.json())
    .then(() => {
      alert("점수가 기록되었습니다!");
      window.location.href = "/guessthemusic";
    })
    .catch(err => {
      console.error(err);
      alert("점수 기록 중 오류가 발생했습니다.");
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {step >= 1 && (
        <button
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
          onClick={handleBack}
        >
          ↩
        </button>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center justify-center" style={{ marginTop: '10vh' }}>
          <h1 className="text-2xl font-bold mb-8">장르를 선택하세요</h1>
          <div className="flex flex-col space-y-4 mb-8">
            <h1 className="text-xl font-bold text-center">피아노 편곡을 들어보세요!</h1>
            <button className="systemBtn" style={{ width: '70vw' }} onClick={() => handleGenreSelect('classic')}>클래식</button>
            <button className="systemBtn" style={{ width: '70vw' }} onClick={() => handleGenreSelect('jazz')}>재즈</button>
            <button className="systemBtn" style={{ width: '70vw' }} onClick={() => handleGenreSelect('korean')}>한국가요</button>
            <button className="systemBtn" style={{ width: '70vw' }} onClick={() => handleGenreSelect('metal')}>메탈</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center justify-center" style={{ marginTop: '10vh' }}>
          <h1 className="text-2xl font-bold mt-10 mb-8">난이도를 선택하세요</h1>
          <div className="flex flex-col space-y-4 mb-8">
            <h2 className="text-l font-bold">난이도에 따라 들려주는 시간이 달라집니다.</h2>
            <button className="systemBtn bg-blue-600 hover:bg-blue-700 w-64" onClick={() => handleDifficultySelect('입문자')}>입문자</button>
            <button className="systemBtn bg-blue-700 hover:bg-blue-800 w-64" onClick={() => handleDifficultySelect('보통')}>보통</button>
            <button className="systemBtn bg-blue-800 hover:bg-blue-900 w-64" onClick={() => handleDifficultySelect('고수')}>고수</button>
            <button className="systemBtn bg-purple-800 hover:bg-purple-900 w-64" onClick={() => handleDifficultySelect('작곡가')}>작곡가</button>
            <button className="systemBtn bg-red-700 hover:bg-red-800 w-64" onClick={() => handleDifficultySelect('악마')}>악마</button>
            <button className="systemBtn bg-red-800 hover:bg-red-900 w-64" onClick={() => handleDifficultySelect('미친')}>미친</button>
          </div>
        </div>
      )}

      {step === 3 && questions.length > 0 && (
        <>
          <div className="absolute top-4 right-4 text-3xl opacity-80">
            문제: {currentQuestion + 1} / {questions.length}<br />
            점수: {score}
          </div>
          <div className="w-screen flex justify-center mb-8">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 mx-0.5 rounded-sm ${
                  index < currentQuestion
                    ? 'bg-white opacity-70'
                    : index === currentQuestion
                    ? 'bg-white opacity-60'
                    : 'bg-white opacity-25'
                }`}
              />
            ))}
          </div>
          <div className="flex space-x-2 mt-10 mb-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src={i < lives ? "/guessing/heart.png" : "/guessing/heart_empty.png"}
                alt="Heart"
                width={48}
                height={48}
              />
            ))}
          </div>
          <div className="text-2xl mb-2 opacity-80">{message}</div>
          <div className="text-2xl mb-2">
            {isLoading ? "로드 중..." : timeLeft > 0 ? `남은 시간: ${timeLeft}초` : "샘플을 재생하세요!"}
          </div>

          {!samplePlayed && (
            <button onClick={playSample} className="systemBtn mb-4">샘플 재생</button>
          )}

          <div id="player"></div>
          <div className="flex flex-wrap justify-center items-end fixed bottom-0 w-full mb-4">
            {options.map((option, index) => (
              <button
                key={index}
                className="systemBtn m-3 rounded-lg"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mt-10 mb-4">퀴즈 종료!</h1>
          <div className="text-2xl mb-4">획득한 점수: {score}</div>
          <input
            className="systemInput mb-2"
            style={{ color: 'black' }}
            placeholder="이름"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="systemInput mb-2"
            style={{ color: 'black' }}
            placeholder="과"
            value={department}
            onChange={e => setDepartment(e.target.value)}
          />
          <input
            className="systemInput mb-2"
            style={{ color: 'black' }}
            placeholder="학번 (2자리 숫자)"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
          />
          <button className="systemBtn mb-4" onClick={submitScore}>점수 제출</button>
          <button className="systemBtn" style={{ width: '60vw' }} onClick={() => window.location.href = "/guessthemusic"}>
            메인으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}