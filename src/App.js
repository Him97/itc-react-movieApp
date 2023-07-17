import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import MovieList from "./components/MovieList";
import Greeter from "./components/Greeter";
import Calculator from "./components/Calculator";

const App = () => {
  return (
    <ChakraProvider>
      <MovieList />
    </ChakraProvider>
  );
};

export default App;