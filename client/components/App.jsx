import React, { useState } from 'react';
import axios from 'axios';
import styles from './App.module.css';

const App = () => {
  const [player1, setPlayer1] = useState('');
  const [player1Position, setPlayer1Position] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player2Position, setPlayer2Position] = useState('');
  const [firstPlayerInfo, setFirstPlayerInfo] = useState({});
  const [secondPlayerInfo, setSecondPlayerInfo] = useState({});
  const [roster, setRoster] = useState([]);

  const handlePlayerOne = (event) => {
    event.preventDefault();

    axios
      .get('/api/playersInfo')
      .then((results) => {
        console.log(results);
        setFirstPlayerInfo('Tyler');
      })
      .catch(console.log);

    setFirstPlayerInfo('Player 1 works');
  };

  const handlePlayerTwo = (event) => {
    event.preventDefault();

    // axios
    //   .get('/api/playersInfo')
    //   .then((results) => {
    //     console.log(results);
    //     setSecondPlayerInfo('Doug');
    //   })
    //   .catch(console.log);

    setSecondPlayerInfo('Player 2 works');
  };

  const handleFavorite = (event) => {
    event.preventDefault();

    const player = player1;
    const position = player1Position;

    console.log('player: ', player);

    axios
      .post('/api/favoritePlayer', { position, player })
      .then((data) => {
        console.log(data.status);
      })
      .catch((error) => {
        console.log(error);
      });

    setPlayer1('');
    setPlayer2('');
  };

  return (
    <div className={styles.divider}>
      <div className={styles.colOne}>
        <form className={styles.player1Form}>
          Player 1:
          <input type="text" name={player1} placeholder="Marshawn Lynch" onChange={(event) => setPlayer1(event.target.value)} />
        </form>
        <button type="submit" onClick={handlePlayerOne}>Get Player 1 Stats</button>
        <div className={styles.player1DataContainer}>
          <div className={styles.player2Data}>
            Player:
            <div style={{ margin: '3% 3%' }}>{player1}</div>
            Current Team:
            <div style={{ margin: '3% 3%' }}>Team</div>
            Injury Rate Per Season:
            <div style={{ margin: '3% 3%' }}>Person</div>
            Injury Rate for Current Team:
            <div style={{ margin: '3% 3%' }}>Bad Team</div>
          </div>
          <div className={styles.player1Photo}>
            Photo
          </div>
        </div>
        <button type="submit" onClick={handleFavorite}>Add Player to Roster</button>
        <div className={styles.roster}>
          Current Roster:
          {roster.map((player) => {
            <input type="text" value={player} />;
          })}
        </div>
      </div>
      <div className={styles.colTwo}>
        <form className={styles.player2Form}>
          Player 2:
          <input type="text" name={player2} placeholder="Jerry Rice" onChange={(event) => setPlayer2(event.target.value)} />
        </form>
        <button type="submit" onClick={handlePlayerTwo}>Get Player 2 Stats</button>
        <div className={styles.player2DataContainer}>
          <div className={styles.player2Data}>
            Player:
            <div style={{ margin: '3% 3%' }}>{player2}</div>
            Current Team:
            <div style={{ margin: '3% 3%' }}>Team</div>
            Injury Rate Per Season:
            <div style={{ margin: '3% 3%' }}>Person</div>
            Injury Rate for Current Team:
            <div style={{ margin: '3% 3%' }}>Bad Team</div>
          </div>
          <div className={styles.player2Photo}>
            Photo
          </div>
        </div>
        <button type="submit" onClick={handleFavorite}>Add Player to Roster</button>
      </div>
    </div>
  );
};

export default App;
