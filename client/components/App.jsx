import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [firstPlayerInfo, setFirstPlayerInfo] = useState('');
  const [secondPlayerInfo, setSecondPlayerInfo] = useState('');
  const [dataTest, setDataTest] = useState('');

  const handleCompare = (event) => {
    event.preventDefault();

    // axios
    //   .get('/api/playersInfo')
    //   .then((results) => {
    //     console.log(results);
    //     setFirstPlayerInfo('Marsh');
    //   })
    //   .catch(console.log);

    setFirstPlayerInfo('Tested true');
    setSecondPlayerInfo('Tested true too');
  };

  const handleFavorite = (event) => {
    event.preventDefault();

    // const player = event.target;

    // console.log('player: ', player);

    // axios
    //   .post('/api/favoritePlayer', {})
    //   .then((status) => {
    //     console.log('Status: ', status);
    //   })
    //   .catch((error) => {
    //     console.log('Error: ', error);
    //   });

    // setPlayer1('');
    // setPlayer2('');
  };

  return (
    <div>
      <form>
        Player 1:
        <input type="text" name={player1} placeholder="Marshawn Lynch" onChange={(event) => setPlayer1(event.target.value)} />
      </form>
      <button type="submit" onClick={handleCompare}>Get Player 1 Stats</button>
      <button type="submit" onClick={handleFavorite}>Add Player to Roster</button>
      {(firstPlayerInfo !== '') ? (
        <div>
          Current Team:
          <div>Team</div>
          Injury Rate Per Season:
          <div>Person</div>
          Injury Rate for Current Team:
          <div>Bad Team</div>
        </div>
      )
        : null}
      <form>
        Player 2:
        <input type="text" name={player2} placeholder="Jerry Rice" onChange={(event) => setPlayer2(event.target.value)} />
      </form>
      <button type="submit" onClick={handleCompare}>Get Player 2 Stats</button>
      <button type="submit" onClick={handleFavorite}>Add Player to Roster</button>
      {(secondPlayerInfo !== '') ? (
        <div>
          Current Team:
          <div>Team</div>
          Injury Rate Per Season:
          <div>Person</div>
          Injury Rate for Current Team:
          <div>Bad Team</div>
        </div>
      )
        : null}
    </div>
  );
};

export default App;
