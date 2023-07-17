import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Tag, List, ListItem } from '@chakra-ui/react'

function Movie(props) {
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
                    <Tag size='md' variant='solid' colorScheme='teal'>
                        <List>
                            {props.movie.genres.map((genre) => (<ListItem>{genre}</ListItem>))}
                        </List>
                    </Tag>
                </CardFooter>
            </Stack>
        </Card>
    );
}

export default Movie;