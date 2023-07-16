import React, { useState } from "react";

function Greeter() {
    const [name, setName] = useState('');
    const [greetingColor, setGreetingColor] = useState('black');

    return (
        <div>
            <h1>Greeter</h1>
            <h2 style={{ color: {setGreetingColor} }}>Hello {name}</h2>
            <input type="text" onChange={(e) => setName(e.target.value)}></input>
        </div>
    )
}

export default Greeter;