import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

const PlayerInfo = (props) => {
  const [player, setPlayer] = useState('');
  const [playerInfo, setPlayerInfo] = useState({});

  // useEffect(() => {

  // }, [playerInfo]);

  const handlePlayer = (event) => {
    event.preventDefault();

    axios
      .get(`/api/playersInfo/${player}`)
      .then((results) => {
        setPlayerInfo(results.data);
      })
      .catch(console.log);
  };

  const handleFavorite = (event) => {
    event.preventDefault();

    const { position } = playerInfo;

    axios
      .post('/api/addPlayer', { position, player })
      .then((data) => {
        console.log(data.status);
        props.getUpdatedRoster();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const playerPercentage = (played, missed) => {
    const num = missed / played;

    if (Number.isNaN(num)) {
      return '-';
    }

    return (num * 100).toFixed(2) + '%';
  };

  const teamScore = (q, d, o) => {
    if (q === 0) {
      q = 1;
    }

    if (d === 0) {
      d = 1;
    }

    if (o === 0) {
      o = 1;
    }

    const num = q + (d * 2) + (o * 3);

    if (Number.isNaN(num)) {
      return '-';
    }

    return num;
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
          <div style={{ margin: '3% 3%' }}>{playerInfo.player}</div>
          Current Team:
          <div style={{ margin: '3% 3%' }}>{playerInfo.team}</div>
          Career Injury Percentage:
          <div style={{ margin: '3% 3%' }}>{playerPercentage(playerInfo.gamesplayed, playerInfo.gamesmissed)}</div>
          Team Injury Score:
          <div style={{ margin: '3% 3%' }}>{teamScore(playerInfo.questionableperseason, playerInfo.doubtfulperseason, playerInfo.outperseason)}</div>
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
