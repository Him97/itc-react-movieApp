import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Heading, Text, Button, Divider, Center } from '@chakra-ui/react'

export default function Dog() {
    const [imageSrc, setImageSrc] = useState('');
    const [breed, setBreed] = useState('');

    async function handleClick() {
        const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
        const data = await res.json();
        const breed = data.message.split("/")[4];
        const formattedBreed = breed
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        setImageSrc(data.message);
        setBreed(formattedBreed);
    }

    return (
        <Card maxW='sm'>
            <CardHeader><Heading>Random Dog Image</Heading></CardHeader>
            <CardBody>
                <Center gap={3}>
                    <Button variant='solid' colorScheme='teal' onClick={handleClick}>
                        Random Image
                    </Button>
                    <Text size='lg'>{breed}</Text>
                </Center>
            </CardBody>
            <Divider />
            <CardFooter>
                <Image
                    src={imageSrc}
                    borderRadius='lg' />
            </CardFooter>
        </Card>
    )
}