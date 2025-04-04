import React, { useState } from 'react';

function Main({ setGameStarted, setOperator, setFirstNum, setSecondNum, setProblemCount }) {
    const [count, setCount] = useState(1);
    const [digitFirst, setDigitFirst] = useState("1 digit");
    const [selectedOperator, setSelectedOperator] = useState("+");
    const [digitSecond, setDigitSecond] = useState("1 digit");

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 1 ? count - 1 : 1);

    const handleStart = () => {
        setProblemCount(count);
        setOperator(selectedOperator);
        setFirstNum(parseInt(digitFirst.split(" ")[0]));
        setSecondNum(parseInt(digitSecond.split(" ")[0]));
        setGameStarted(true);
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-4">
            <div className="text-light p-4 rounded-4">
                <div className="mb-4">
                    <span className="d-block mb-2 fs-5">Problem Type</span>
                    <div className="d-flex gap-2">
                        <select 
                            className="form-select w-auto cursor-pointer"
                            value={digitFirst}
                            onChange={(e) => setDigitFirst(e.target.value)}
                        >
                            <option>1 digit</option>
                            <option>2 digits</option>
                            <option>3 digits</option>
                            <option>4 digits</option>
                            <option>5 digits</option>
                            <option>6 digits</option>
                        </select>
                        <select 
                            className="form-select w-auto cursor-pointer"
                            value={selectedOperator}
                            onChange={(e) => setSelectedOperator(e.target.value)}
                        >
                            <option>+</option>
                            <option>-</option>
                            <option>*</option>
                            <option>÷</option>
                        </select>
                        <select 
                            className="form-select w-auto cursor-pointer"
                            value={digitSecond}
                            onChange={(e) => setDigitSecond(e.target.value)}
                        >
                            <option>1 digit</option>
                            <option>2 digits</option>
                            <option>3 digits</option>
                            <option>4 digits</option>
                            <option>5 digits</option>
                            <option>6 digits</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="d-block mb-2 fs-5">Number Of Problems</span>
                    <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-secondary" onClick={decrement}>-</button>
                        <input
                            type='number'
                            className='form-control text-center'
                            style={{ width: '80px', backgroundColor: 'transparent', color: 'white' }}
                            value={count}
                            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value)))}
                        />
                        <button className="btn btn-secondary" onClick={increment}>+</button>
                    </div>
                </div>
                <button className="btn btn-primary w-100" onClick={handleStart}>Start Now!</button>
            </div>
        </div>
    );
}

export default Main;