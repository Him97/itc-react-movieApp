import React, { useState } from "react";
import Movie from "./Movie";
import { Container, Heading, VStack, StackDivider, Box, Input, Button, Center } from '@chakra-ui/react'


const initialMovies = [{
    "id": "1",
    "name": "Forrest Gump",
    "runtime": 142,
    "year": 1994,
    "plot": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    "genres": ["Drama", "Comedy"],
    "poster": "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    "imdb": "https://www.imdb.com/title/tt0109830/"
},

{
    "id": "2",
    "name": "Fight Club",
    "runtime": 139,
    "year": 1999,
    "plot": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    "genres": ["Drama"],
    "poster": "https://cinemadetective.com/wp-content/uploads/2020/04/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
}
];

function MovieList(props) {
    const [movies, setMovies] = useState(initialMovies);
    const [filtered, setFiltered] = useState('')

    function handlleChange(e) {
        const filteredSearch = initialMovies.filter(movie => movie.name.includes(e.target.value));
        setMovies(filteredSearch)
    }

    const filterOnlyComedy = () => {
        if (filtered) {
            setMovies(initialMovies);
            setFiltered(false);
        } else {
            setMovies(movies.filter((movie) => movie.genres.includes("Comedy")));
            setFiltered(true);
        }
    }

    return (
        <Container maxW='container.sm'>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch' >
                <Box>
                    <Heading><Center>Movie List</Center></Heading>
                </Box>
                <Box display='flex' alignItems='baseline'>
                    <Input type="text" placeholder="Filter Movies..." value={filtered} onChange={handlleChange}></Input>
                    <Button onClick={filterOnlyComedy} >Toggle Only Comedy</Button>
                </Box>
                <Box>
                    {movies.map((movie) => (
                        <Movie movie={movie} />
                    ))}
                </Box>
            </VStack>
        </Container>
    )
}

export default MovieList;