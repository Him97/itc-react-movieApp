import '../css/moviePage.css'
import React from "react";

function Movie(props) {
    return (
        <div className="movie">
            <h2>{props.movie.name}</h2>
            <p>{props.movie.plot}</p>
            <img src={props.movie.poster} alt={props.movie.name} style={{width:"200px", height:"auto"}} />
            {props.movie.genres.map((genre) => (<li>{genre}</li>))}
        </div>
    );
}

export default Movie;