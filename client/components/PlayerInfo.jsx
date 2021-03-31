import React, { useState } from 'react';
import axios from 'axios';
import styles from './App.module.css';

const PlayerInfo = (props) => {
  const [player, setPlayer] = useState('');
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

    const position = playerInfo.position;

    axios
      .post('/api/favoritePlayer', { position, player })
      .then((data) => {
        console.log(data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const playerPercentage = (played, missed) => (played / missed);

  const teamScore = (q, d, o) => (q + (d * 2) + (o * 3));

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
          <div style={{ margin: '3% 3%' }}>{playerInfo.name}</div>
          Current Team:
          <div style={{ margin: '3% 3%' }}>{playerInfo.team}</div>
          Career Injury Percentage:
          <div style={{ margin: '3% 3%' }}>{playerPercentage(playerInfo.gamesPlayed, playerInfo.gamesMissed)}</div>
          Team Injury Score:
          <div style={{ margin: '3% 3%' }}>{teamScore(playerInfo.teamQuestionables, playerInfo.teamDoubtfuls, playerInfo.teamOuts)}</div>
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
