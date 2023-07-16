import React, { useState } from 'react';

function Calculator() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [result, setResult] = useState('');
    const [color, setColor] = useState('white')

    function handleCalculate() {
        const result = parseInt(number1) + parseInt(number2);
        setResult(result);
        if (result > 10) {
            setColor('green');
        } else {
            setColor('white')
        }
        setNumber1(0);
        setNumber2(0);
    }
    return (
        <div>
            <h1>Sum Calculator</h1>
            <input type='number' value={number1} onChange={(e) => setNumber1(e.target.value)}></input>
            <input type='number' value={number2} onChange={(e) => setNumber2(e.target.value)}></input>
            <button type='button' style={{ backgroundColor: color }} onClick={handleCalculate}>Sum</button>
            <span>{result}</span>
        </div>
    )
}

export default Calculator;