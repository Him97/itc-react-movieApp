import React, { useState, useEffect } from "react";
import { Box, Heading, Center, Input } from '@chakra-ui/react'

export default function Greeter() {
    const [name, setName] = useState('');
    const [greetingColor, setGreetingColor] = useState('black');

    useEffect(() => {
        const getName = window.prompt('What is your name?')
        if (getName) {
            setName(getName);
        }
        return () => {
            alert(`Goodbye ${name}`)
        }
    }, [])

    return (
        <Box>
            <Heading><Center>Welcome {name}</Center></Heading>
            <Heading as='h2' style={{ color: { setGreetingColor } }}>Hello {name}</Heading>
            <Input type="text" onChange={(e) => setName(e.target.value)}></Input>
        </Box>
    )
}