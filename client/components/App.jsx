import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import PlayerInfo from './PlayerInfo';

const App = () => {
  const [roster, setRoster] = useState([]);
  const [player1Stats, setPlayer1Stats] = useState({});
  const [player2Stats, setPlayer2Stats] = useState({});

  useEffect(() => {
    axios
      .get('/api/getRoster')
      .then((results) => {
        setRoster(results.data);
      })
      .catch(console.log);
  }, []);

  const getUpdatedRoster = () => {
    axios
      .get('/api/getRoster')
      .then((results) => {
        setRoster(results.data);
      })
      .catch(console.log);
  };

  const removePlayer = (event) => {
    event.preventDefault();

    const player = event.target.value;

    axios
      .delete(`/api/removePlayer/${player}`)
      .then((response) => {
        console.log(response.status);
      })
      .then(() => getUpdatedRoster())
      .catch(console.log);
  };

  const handlePlayer1Stats = (obj) => {
    setPlayer1Stats(obj);
  };

  const handlePlayer2Stats = (obj) => {
    setPlayer2Stats(obj);
  };

  return (
    <div>
      <div className={styles.header}>
        <input className={styles.nflLogo} type="image" src="http://vignette3.wikia.nocookie.net/looneytunes/images/4/49/NFL-logo.png/revision/latest?cb=20140711021414" alt="NFL logo" />
        Fantasy Injury Tracker
      </div>
      <div className={styles.divider}>
        <div className={styles.colOne}>
          <PlayerInfo refreshRoster={getUpdatedRoster} currentRoster={roster} reportPlayerStats={handlePlayer1Stats} otherPlayerStats={player2Stats} />
          <div className={styles.footer}>
            <div className={styles.roster}>
              Current Roster:
              <ul>
                {roster.map((person) => (
                  <li>
                    {person.position}
                    {' | '}
                    {person.player}
                    {'  '}
                    <button className={styles.removePlayerBtn} type="submit" value={person.player} onClick={removePlayer}>Remove Player</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.colTwo}>
          <PlayerInfo refreshRoster={getUpdatedRoster} currentRoster={roster} reportPlayerStats={handlePlayer2Stats} otherPlayerStats={player1Stats} />
          <div className={styles.footer}>
            <div className={styles.legend}>
              Career Injury Percentage:
              <li>Calculated by dividing total games missed by the number of regular season games possible, over the length of the player's career</li>
              <br />
              Team Injury Score:
              <li>Calculated over the last 10 years of regular season games</li>
              <li>Each Questionable designation per game counts as 1 point</li>
              <li>Each Doubtful designation per game counts as 2 points</li>
              <li>Each Out designation per game counts at 3 points</li>
              <li>The total is the sum of designations divided by 10 to average out the seasons, the higher score being the worse team</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
