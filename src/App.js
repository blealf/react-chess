import React from 'react';
import styled from 'styled-components';
import Board from './components/Board';
// import * as THREE from 'three';
import KilledPieces from 'components/KilledPieces'

const Header = styled.h1`
  text-align: center;
`;

const App = () => {

  return (
    <div className="App">
      <Header>Chess Game</Header>
      <Board />
      <KilledPieces />
    </div>
  );
}

export default App;
