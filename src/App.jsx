import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Main from './components/Main'
import Game from './components/Game'
import About from './pages/About'
import Tutorial from './pages/Tutorial'

function App() {
    const [gameStarted, setGameStarted] = useState(false)
    const [operator, setOperator] = useState('+')
    const [firstNum, setFirstNum] = useState(1)
    const [secondNum, setSecondNum] = useState(1)
    const [problemCount, setProblemCount] = useState(1)
    const [soundOn, setSoundOn] = useState(true)

    return (
        <BrowserRouter>
            <div className="container-fluid min-vh-100 d-flex flex-column p-3">
                <NavBar soundOn={soundOn} setSoundOn={setSoundOn}/>
                <Routes>
                    <Route path="/" element={
                        gameStarted ?
                            <Game
                                operator={operator}
                                firstNum={firstNum}
                                secondNum={secondNum}
                                problemCount={problemCount}
                                setGameStarted={setGameStarted}
                                soundOn={soundOn}
                            />
                            : <Main
                                setGameStarted={setGameStarted}
                                setOperator={setOperator}
                                setFirstNum={setFirstNum}
                                setSecondNum={setSecondNum}
                                setProblemCount={setProblemCount}
                            />
                    } />
                    <Route path="/about" element={<About />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                </Routes>
                {!gameStarted && <Footer />}
            </div>
        </BrowserRouter>
    )
}

export default App