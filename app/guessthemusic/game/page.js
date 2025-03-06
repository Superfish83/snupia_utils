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
  const [shakingButton, setShakingButton] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);

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
    setShowPlayer(true);

    const correctTitle = questions[currentQuestion].title;
    const correctArtist = questions[currentQuestion].artist;
    const selectedTitle = selected.split(' - ')[0].trim();

    if (selectedTitle === correctTitle) {
      setMessage(
        <>
          정답입니다!<br />
          {correctArtist}의 {correctTitle}입니다.
        </>
      );
      setScore(prev => Math.round((prev + 1) * 100) / 100);
    } else {
      setMessage(
        <>
          틀렸습니다!<br />
          정답은 {correctArtist}의 {correctTitle}입니다.
        </>
      );
      setLives(prev => prev - 1);
      if (lives - 1 <= 0) {
        setMessage("게임 오버!");
        setTimeout(() => setStep(4), 2000);
        return;
      }
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (currentQuestion + 1 >= questions.length) {
      setTimeout(() => setStep(4), 2000);
    } else {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setMessage("");
        setShowPlayer(false);
        setTimeLeft(0);
        setScore(prev => Math.round(prev * 100) / 100);
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

      // 입문자가 오히려 어려워서 그냥 모두 다 randomize 함
      if (['입문자', '보통', '고수', '작곡가', '악마', '미친'].includes(difficulty)) {
        startTime = Math.floor(Math.random() * (videoDuration - 15)); // 마지막 15초는 제외
      }

      playerRef.current.seekTo(startTime, true);
      playerRef.current.playVideo();
      const playTime = { '입문자': 15, '보통': 10, '고수': 5, '작곡가': 3, '악마': 2, '미친': 1 }[difficulty] || 5;
      setTimeLeft(playTime);
      setSamplePlayed(true);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
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
    if (selectedGenre === 'metal' || selectedGenre === 'jpop') {
      setShakingButton(selectedGenre);
      setNotifications((prev) => [...prev, "미구현된 기능입니다!"]);
      setTimeout(() => {
        setShakingButton(null);
      }, 1500); // 1.5초 후 원래 상태로 복귀
    } else {
      setGenre(selectedGenre);
      setStep(2);
    }
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

  const handleRevealArtist = () => {
    setOptions(options.map(option => {
      const matchingQuestion = questions.find(q => q.title === option);
      return matchingQuestion ? `${option} - ${matchingQuestion.artist}` : option;
    }));
    setScore(prev => prev - 0.5);
  };

  const handleRemoveOption = () => {
    const incorrectOptions = options.filter(option => option !== questions[currentQuestion].title);
    if (incorrectOptions.length > 0) {
      const optionToDisable = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
      setOptions(options.map(option => option === optionToDisable ? `${option} (비활성화)` : option));
      setScore(prev => prev - 0.6);
    }
  };

  const handleReplay = () => {
    if (playerRef.current && isPlayerReady) {
      playerRef.current.playVideo();
      const additionalTime = 15; // 추가로 들을 시간
      setTimeLeft(additionalTime);
      setScore(prev => prev - 0.5);

      // 기존 타이머를 정지하고 새 타이머 시작
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
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

  const handleFreeReplay = () => {
    if (playerRef.current && isPlayerReady) {
      playerRef.current.playVideo();
      const additionalTime = 5; // 추가로 들을 시간
      setTimeLeft(additionalTime);

      // 기존 타이머를 정지하고 새 타이머 시작
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
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

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

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

      {notifications.length > 0 && (
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="bg-red-500 text-white px-4 py-2 rounded shadow-md fade-out shake-notification"
            >
              {note}
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center justify-center" style={{ marginTop: '10vh' }}>
          <h1 className="text-2xl font-bold mb-8">장르를 선택하세요</h1>
          <div className="flex flex-col space-y-4 mb-8">
            <h1 className="text-xl font-bold text-center">당신이 좋아하는 장르는 무엇인가요?</h1>
            <h1 className="text-xl font-bold text-center">스누피아에서는 좋아하는 곡을 원할 때 언제든 연습할 수 있답니다.</h1>
            <button
              className={`systemBtn ${shakingButton === 'classic' ? "bg-gray-400 text-gray-700 shake-button" : ""}`}
              style={{ width: '70vw' }}
              onClick={() => handleGenreSelect('classic')}
            >
              클래식
            </button>
            <button
              className={`systemBtn ${shakingButton === 'jazz' ? "bg-gray-400 text-gray-700 shake-button" : ""}`}
              style={{ width: '70vw' }}
              onClick={() => handleGenreSelect('jazz')}
            >
              재즈
            </button>
            <button
              className={`systemBtn ${shakingButton === 'korean' ? "bg-gray-400 text-gray-700 shake-button" : ""}`}
              style={{ width: '70vw' }}
              onClick={() => handleGenreSelect('korean')}
            >
              한국가요
            </button>
            <button
              className={`systemBtn ${shakingButton === 'metal' ? "bg-gray-400 text-gray-700 shake-button" : ""}`}
              style={{ width: '70vw' }}
              onClick={() => handleGenreSelect('metal')}
            >
              메탈
            </button>
            <button
              className={`systemBtn ${shakingButton === 'jpop' ? "bg-gray-400 text-gray-700 shake-button" : ""}`}
              style={{ width: '70vw' }}
              onClick={() => handleGenreSelect('jpop')}
            >
              제이팝
            </button>
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

          <div className="text-2xl mb-2 opacity-80 text-center">{message}</div>

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
                className="systemBtn m-3 rounded-lg option-button"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mt-4 px-4">
            <button className="systemBtn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded" onClick={handleRevealArtist}>
              누구의?
            </button>
            <button className="systemBtn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded" onClick={handleRemoveOption}>
              하나 제거
            </button>
            <button className="systemBtn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded" onClick={handleReplay}>
              계속듣기 (15초)
            </button>
            <button className="systemBtn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded" onClick={handleFreeReplay}>
              억까변상 (5초)
            </button>
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



      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .shake-button {
          animation: shake 0.5s ease-in-out;
        }
        .shake-notification {
          animation: shake 0.2s ease-in-out;
        }
        .fade-out {
          animation: fadeOut 1s ease-in-out forwards;
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .option-button {
          width: calc(30vw);
          height: calc(30vw);
          max-width: calc(30vh);
          max-height: calc(30vh);
          flex: 1 0 30%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
      `}</style>
    </div>
  );
}