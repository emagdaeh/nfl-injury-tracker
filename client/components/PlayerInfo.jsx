import React, { useState } from 'react';
import axios from 'axios';
import styles from './App.module.css';

const PlayerInfo = (props) => {
  const [player, setPlayer] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playerInfo, setPlayerInfo] = useState({});

  const handlePlayer = (event) => {
    event.preventDefault();

    axios
      .get('/api/playersInfo/:player')
      .then((results) => {
        setPlayerInfo(
          playerInfo.position = results.position,
          playerInfo.name = results.name,
          playerInfo.team = results.team,
          playerInfo.gamesPlayed = results.gamesPlayed,
          playerInfo.gamesMissed = results.gamesMissed,
          playerInfo.teamQuestionables = results.questionablePerSeason,
          playerInfo.teamDoubtfuls = results.doubtfulPerSeason,
          playerInfo.teamOuts = results.outPerSeason,
        );
      })
      .catch(console.log);
  };

  const handleFavorite = (event) => {
    event.preventDefault();

    axios
      .post('/api/favoritePlayer', { playerPosition, player })
      .then((data) => {
        console.log(data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form className={styles.playerForm}>
        Player:
        <input type="text" placeholder="Marshawn Lynch" onChange={(event) => setPlayer(event.target.value)} />
      </form>
      <button type="submit" onClick={handlePlayer}>Get Player Stats</button>
      <div className={styles.playerDataContainer}>
        <div className={styles.playerData}>
          Player:
          <div style={{ margin: '3% 3%' }}>Hi Naveen</div>
          Current Team:
          <div style={{ margin: '3% 3%' }}>Team</div>
          Career Injury Percentage:
          <div style={{ margin: '3% 3%' }}>Person</div>
          Team Injury Score:
          <div style={{ margin: '3% 3%' }}>Team</div>
        </div>
        <div className={styles.playerPhoto}>
          Photo
        </div>
      </div>
      <button type="submit" onClick={handleFavorite}>Add Player to Roster</button>
    </>
  );
};

export default PlayerInfo;
