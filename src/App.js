import React from "react";
import MovieList from "./components/MovieList";
import Greeter from "./components/Greeter";
import Calculator from "./components/Calculator";

const App = () => {
  return (
    <form style={{display:"flex"}}>
      <MovieList></MovieList>
    </form>
  );
};

export default App;