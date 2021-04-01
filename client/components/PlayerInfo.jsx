import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

const PlayerInfo = ({refreshRoster, currentRoster, reportPlayerStats, otherPlayerStats}) => {
  const [person, setPerson] = useState('');
  const [playerInfo, setPlayerInfo] = useState({});

  const handlePlayer = (event) => {
    event.preventDefault();

    axios
      .get(`/api/playersInfo/${person}`)
      .then((results) => {
        setPlayerInfo(results.data);
        reportPlayerStats(results.data);
      })
      .then(setPerson(''))
      .catch(console.log);
  };

  const handleFavorite = (event) => {
    event.preventDefault();

    const { position, player } = playerInfo;

    for (let i = 0; i < currentRoster.length; i++) {
      if (player === currentRoster[i].player) {
        return;
      }
    }

    axios
      .post('/api/addPlayer', { position, player })
      .then((data) => {
        console.log(data.status);
      })
      .then(() => refreshRoster())
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

  const getPercentageColor = () => {
    if (Object.keys(otherPlayerStats).length === 0) {
      return 'black';
    }

    const currentPlayerPercent = playerPercentage(
      playerInfo.gamesplayed,
      playerInfo.gamesmissed,
    );

    const otherPlayerPercent = playerPercentage(
      otherPlayerStats.gamesplayed,
      otherPlayerStats.gamesmissed,
    );

    if (currentPlayerPercent > otherPlayerPercent) {
      return 'red';
    }

    return 'black';
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

    const num = q + (d * 4) + (o * 5);

    if (Number.isNaN(num)) {
      return '-';
    }

    return num;
  };

  const getTeamTotal = () => {
    if (Object.keys(otherPlayerStats).length === 0) {
      return 'black';
    }

    const currentPlayerTeam = teamScore(
      playerInfo.questionableperseason,
      playerInfo.doubtfulperseason,
      playerInfo.outperseason,
    );

    const otherPlayerTeam = teamScore(
      otherPlayerStats.questionableperseason,
      otherPlayerStats.doubtfulperseason,
      otherPlayerStats.outperseason,
    );

    if (currentPlayerTeam > otherPlayerTeam) {
      return 'red';
    }

    return 'black';
  };

  return (
    <>
      <form className={styles.playerForm}>
        Player:
        <input type="text" placeholder="Marshawn Lynch" value={person} onChange={(event) => setPerson(event.target.value)} />
        {' '}
        <button type="submit" onClick={handlePlayer}>Get Player Stats</button>
      </form>
      <div className={styles.playerDataContainer}>
        <div className={styles.nameAndTeam}>
          Player:
          <div style={{ fontWeight: 'normal', margin: '3% 3%' }}>{playerInfo.player}</div>
          Position:
          <div style={{ fontWeight: 'normal', margin: '3% 3%' }}>{playerInfo.position}</div>
          Current Team:
          <div style={{ fontWeight: 'normal', margin: '3% 3%' }}>{playerInfo.team}</div>
        </div>
        <div className={styles.scores}>
          Career Injury Percentage:
          <div style={{ fontWeight: 'normal', margin: '3% 3%', color: getPercentageColor() }}>{playerPercentage(playerInfo.gamesplayed, playerInfo.gamesmissed)}</div>
          Team Injury Score:
          <div style={{ fontWeight: 'normal', margin: '3% 3%', color: getTeamTotal() }}>{teamScore(playerInfo.questionableperseason, playerInfo.doubtfulperseason, playerInfo.outperseason)}</div>
        </div>
        {(playerInfo.photo === undefined)
          ? (null)
          : <input className={styles.playerPhoto} type="image" src={playerInfo.photo} alt={playerInfo.player} />}
        {(playerInfo.logo === undefined)
          ? (null)
          : <input className={styles.playerPhoto} type="image" src={playerInfo.logo} alt={playerInfo.team} />}
      </div>
      <button type="submit" onClick={handleFavorite}>Add Player to Roster</button>
    </>
  );
};

export default PlayerInfo;
