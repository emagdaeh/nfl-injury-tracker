import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [firstPlayerInfo, setFirstPlayerInfo] = useState('');
  const [secondPlayerInfo, setSecondPlayerInfo] = useState('');

  const handleCompare = (event) => {
    event.preventDefault();

    axios
      .get('/api/playersInfo')
      .then(results)
      .catch();
  };

  return (
    <div>
      <form>
        Player 1:
        <input type="text" name={player1} placeholder="Marshawn Lynch" onChange={event => setPlayer1(event.target.value)} />
      </form>
      <button type="submit" onClick={handleCompare}>Get Player 1 Stats</button>
      <form>
        Player 2:
        <input type="text" name={player2} placeholder="Jerry Rice" onChange={event => setPlayer2(event.target.value)} />
      </form>
      <button type="submit" onClick={handleCompare}>Get Player 2 Stats</button>
    </div>
  );
};

export default App;
