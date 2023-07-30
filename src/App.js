import React, { useState } from "react";
import { ChakraProvider, Container } from '@chakra-ui/react'

import MovieList from "./components/MovieList";
import Greeter from "./components/Greeter";
import Calculator from "./components/Calculator";
import SelectControlledComponent from "./components/Selector";
import Dog from "./components/Dog";
import UserNameContext from './context/UserNameContext'

const App = () => {
  const [userName, setUserName] = useState('Xin');
  return (
    <ChakraProvider>
      <UserNameContext.Provider value={{ userName, setUserName }}>
        <MovieList />
      </UserNameContext.Provider>
    </ChakraProvider>
  );
};

export default App;