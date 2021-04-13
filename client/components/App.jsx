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
        <a aria-label="NFL logo" target="_blank" rel="noreferrer" href="https://fantasy.nfl.com/?icampaign=fty-nav-gnv-fantasy&o_click_id=ko_0u6l9lpylfxi7b31a">
          <input
            className={styles.nflLogo}
            type="image"
            src="http://vignette3.wikia.nocookie.net/looneytunes/images/4/49/NFL-logo.png/revision/latest?cb=20140711021414"
            alt="NFL logo"
          />
        </a>
        Fantasy Injury Tracker
      </div>
      <div className={styles.divider}>
        <div className={styles.colOne}>
          <PlayerInfo
            refreshRoster={getUpdatedRoster}
            currentRoster={roster}
            reportPlayerStats={handlePlayer1Stats}
            otherPlayerStats={player2Stats}
          />
          <div>
            <div className={styles.legend}>
              <h5>Breakdown of the injury percentage and team score:</h5>
              <p style={{ fontSize: 'small' }}>The injury percentage is the percentage of games the player has missed over their career.  The team injury score is a calculation of the quantity of injury designations for each week over the past 10 seasons, weighted by designation.  The score is weighted heaviest for the Out designation and lowest for the Questionable designation. Doubtful is weighted closer to Out due to the higher frequency that a Doubtful designation results in the player not playing that week.</p>
            </div>
          </div>
        </div>
        <div className={styles.colTwo}>
          <PlayerInfo
            refreshRoster={getUpdatedRoster}
            currentRoster={roster}
            reportPlayerStats={handlePlayer2Stats}
            otherPlayerStats={player1Stats}
          />
          <div className={styles.footer}>
            <div className={styles.roster}>
              <h3>Current Roster:</h3>
              <ul>
                {roster.map((person) => (
                  <li>
                    {person.position}
                    {' | '}
                    {person.player}
                    {'  '}
                    <button className={styles.removePlayerBtn} type="submit" value={person.player} onClick={removePlayer}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
