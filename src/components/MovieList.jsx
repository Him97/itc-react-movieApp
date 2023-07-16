import React, { useState } from "react";
import Movie from "./Movie";


const initialMovies = [{
    "id": "1",
    "name": "Forrest Gump",
    "runtime": 142,
    "year": 1994,
    "plot": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    "genres": ["Drama", "Comedy"],
    "poster": "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg&quot;,
    "imdb": "https://www.imdb.com/title/tt0109830/&quot;
},

{
    "id": "2",
    "name": "Fight Club",
    "runtime": 139,
    "year": 1999,
    "plot": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    "genres": ["Drama"],
    "poster": "https://cinemadetective.com/wp-content/uploads/2020/04/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg&quot;
}
];

function MovieList(props) {
    const [movies, setMovies] = useState(initialMovies);
    const [filterd, setFilterd] = useState(false);

    const filterOnlyComedy = () => {
        if (filterd) {
            setMovies(initialMovies);
            setFilterd(false);
        } else {
            setMovies(movies.filter((movie) => movie.genres.includes("Comedy")));
            setFilterd(true);
        }
    }

    return (
        <div>
            <h1>Movie List</h1>
            <button onClick={filterOnlyComedy} >Toggle Only Comedy</button>
            {movies.map((movie) => (
                <Movie movie={movie} />
            ))}
        </div>
    )
}

export default MovieList;