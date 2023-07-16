import '../css/moviePage.css'
import React from "react";

function Movie(props) {
    return (
        <div className="movie">
            <img src={props.movie.poster} alt={props.movie.name} style={{ width: "200px", height: "auto" }} />
            <div className='movie-info'>
                <h2>{props.movie.name}</h2>
                <p>{props.movie.plot}</p>
                {props.movie.genres.map((genre) => (<li>{genre}</li>))}
            </div>
        </div>
    );
}

export default Movie;