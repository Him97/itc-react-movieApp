import React from "react";
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Tag } from '@chakra-ui/react'

export default function Movie(props) {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'>
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={props.movie.poster}
                alt={props.movie.name} />
            <Stack>
                <CardBody>
                    <Heading size='md'>{props.movie.name}</Heading>
                    <Text py='2'>{props.movie.plot}</Text>
                </CardBody>
                <CardFooter>
                    {props.movie.genres.map((genre) => (<Tag size='md' variant='solid' colorScheme='teal'>{genre}</Tag>))}
                </CardFooter>
            </Stack>
        </Card>
    );
}