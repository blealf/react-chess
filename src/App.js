import React from 'react';
import styled from 'styled-components';
import Board from './components/Board';
// import * as THREE from 'three';

const Header = styled.h1`
  text-align: center;
`;

const App = () => {

  return (
    <div className="App">
      <Header>Chess Game</Header>
      <Board />
    </div>
  );
}

export default App;
