import { useState, useEffect, useRef } from 'react'
import { generateQuestion, checkAnswer } from '../utils/mathoperation'

const sounds = {
    correct: new Audio(new URL('../assets/sounds/correct-bg.mp3', import.meta.url).href),
    wow: new Audio(new URL('../assets/sounds/wow-bg.mp3', import.meta.url).href)
};

function Game({ operator, firstNum, secondNum, problemCount, setGameStarted, soundOn }) {
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [userAnswer, setUserAnswer] = useState('')
    const [questionNumber, setQuestionNumber] = useState(1)
    const [showAbortModal, setShowAbortModal] = useState(false)
    const [showGameOver, setShowGameOver] = useState(false)
    const [timer, setTimer] = useState(0)
    const timerInterval = useRef(null)

    const correct_bg = useRef(sounds.correct);
    const wow_bg = useRef(sounds.wow);

    useEffect(() => {
        // Initialize the question
        setCurrentQuestion(generateQuestion(firstNum, secondNum, operator))
        startTimer()

        // Cleanup function to clear timer when component unmounts
        return () => {
            clearInterval(timerInterval.current)
        }
    }, [firstNum, secondNum, operator])

    const startTimer = () => {
        clearInterval(timerInterval.current)
        setTimer(0)
        timerInterval.current = setInterval(() => {
            setTimer(timer => timer + 1)
        }, 1000)
    }

    const handleSubmit = (e) => {
        // Only process when Enter key is pressed or when checking the answer programmatically
        if (e.type !== 'keyup' || e.key === 'Enter') {
            if (checkAnswer(userAnswer, currentQuestion.answer)) {
                if (soundOn) correct_bg.current.play();
                if (questionNumber < problemCount) {
                    setUserAnswer('')
                    setQuestionNumber(questionNumber + 1)
                    setCurrentQuestion(generateQuestion(firstNum, secondNum, operator))
                } else {
                    if (soundOn) wow_bg.current.play();
                    clearInterval(timerInterval.current);
                    setShowGameOver(true)
                }
            }
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' + secs : secs}`
    }

    const quitGame = () => {
        clearInterval(timerInterval.current)
        setGameStarted(false)
    }

    // Early return while the question is loading
    if (!currentQuestion) {
        return <div className="text-center p-5">Loading question...</div>
    }

    return (
        <div className="p-4 fs-5">
            <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                <span>{questionNumber} / {problemCount}</span>
                <span>{formatTime(timer)}</span>
                <span className='cursor-pointer' onClick={() => setShowAbortModal(true)}>Abort</span>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center gap-4 p-4 rounded-4 fw-bold q-container">
                <span>{currentQuestion.num1}</span>
                <span>{currentQuestion.operator}</span>
                <span>{currentQuestion.num2}</span>
                <span>=</span>
                <span>?</span>
            </div>
            <input
                type="text"
                className="form-control mx-auto mt-3 fs-3 text-center"
                style={{ maxWidth: "150px" }}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyUp={handleSubmit}
                autoFocus
            />

            {/* Abort Confirmation Modal */}
            <div
                className={`modal fade ${showAbortModal ? 'show d-block' : ''}`}
                id="abortModal"
                tabIndex="-1"
                aria-hidden="true"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header border-0">
                            <h5 className="modal-title">Quit Game?</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => setShowAbortModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Are you sure you want to quit this game?</p>
                            <p>Your progress will be lost.</p>
                        </div>
                        <div className="modal-footer border-0 d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAbortModal(false)}>Continue Game</button>
                            <button type="button" className="btn btn-danger" onClick={quitGame}>Quit Game</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Over Modal */}
            <div
                className={`modal fade ${showGameOver ? 'show d-block' : ''}`}
                id="gameOverModal"
                tabIndex="-1"
                aria-hidden="true"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header border-0">
                            <h5 className="modal-title">Game Over 🎉</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={quitGame} aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Great job! You have successfully answered all the problems [{problemCount} / {problemCount}].</p>
                            <p>Keep practicing.</p>
                        </div>
                        <div className="modal-footer border-0 d-flex justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={quitGame}>Play Again</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game