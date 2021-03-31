import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import PlayerInfo from './PlayerInfo';

const App = () => {
  const [roster, setRoster] = useState([]);

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
        console.log(response);
      })
      .catch(console.log);
  };

  return (
    <div className={styles.divider}>
      <div className={styles.colOne}>
        <PlayerInfo refreshRoster={getUpdatedRoster} />
        <div className={styles.roster}>
          Current Roster:
          <ul>
            {roster.map((player) => (
              <li>
                {player.position}
                {player.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.colTwo}>
        <PlayerInfo />
        <div className={styles.legend}>
          Career Injury Percentage:
          <li>Calculated by dividing total games missed by the number of regular season games possible over the length of the player's career</li>
          <br />
          Team Injury Score:
          <li>Calculated over the last 10 years of regular season games</li>
          <li>Each Questionable designation per game counts as 1 point</li>
          <li>Each Doubtful designation per game counts as 2 points</li>
          <li>Each Out designcation per game counts at 3 points</li>
          <li>The total is the sum of designations divided by 10 to average out the seasons, the higher score being the worse team</li>
        </div>
      </div>
    </div>
  );
};

export default App;
