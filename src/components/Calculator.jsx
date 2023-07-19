import React, { useState } from 'react';
import { Box, Heading, Input, Button, Grid, GridItem } from '@chakra-ui/react'

export default function Calculator() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [result, setResult] = useState('');
    const [color, setColor] = useState('teal')

    function handleCalculate() {
        const result = parseInt(number1) + parseInt(number2);
        setResult(result);
        if (result > 10) {
            setColor('red');
        } else {
            setColor('teal')
        }
        setNumber1(0);
        setNumber2(0);
    }
    return (
        <Box>
            <Heading>Sum Calculator</Heading>
            <Grid templateColumns='repeat(4, 1fr)' gap={5}>
                <GridItem><Input type='number' value={number1} onChange={(e) => setNumber1(e.target.value)}></Input></GridItem>
                <GridItem><Input type='number' value={number2} onChange={(e) => setNumber2(e.target.value)}></Input></GridItem>
                <GridItem><Button type='button' colorScheme={color} onClick={handleCalculate}>Sum</Button></GridItem>
                <GridItem>{result}</GridItem>
            </Grid>
        </Box>
    )
}