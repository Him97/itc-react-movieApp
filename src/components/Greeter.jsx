import React, { useState } from "react";
import { Box, Heading, Center, Input } from '@chakra-ui/react'

export default function Greeter() {
    const [name, setName] = useState('');
    const [greetingColor, setGreetingColor] = useState('black');

    return (
        <Box>
            <Heading><Center>Greeter</Center></Heading>
            <Heading as='h2' style={{ color: { setGreetingColor } }}>Hello {name}</Heading>
            <Input type="text" onChange={(e) => setName(e.target.value)}></Input>
        </Box>
    )
}