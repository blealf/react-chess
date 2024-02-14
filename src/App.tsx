import styled from 'styled-components';
import Board from './components/Board';
import KilledPieces from './components/KilledPieces.tsx'

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
