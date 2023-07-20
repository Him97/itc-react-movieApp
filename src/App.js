import React from "react";
import { ChakraProvider, Container } from '@chakra-ui/react'

import MovieList from "./components/MovieList";
import Greeter from "./components/Greeter";
import Calculator from "./components/Calculator";
import SelectControlledComponent from "./components/Selector";
import Dog from "./components/Dog";

const App = () => {
  return (
    <ChakraProvider>
      <Container>
        <Dog />
        <Greeter />
        <Calculator />
        <SelectControlledComponent />
      </Container>
      <MovieList />
    </ChakraProvider>
  );
};

export default App;