import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

const PlayerInfo = (props) => {
  const { refreshRoster, currentRoster, reportPlayerStats, otherPlayerStats } = props;

  const [person, setPlayer] = useState('');
  const [playerInfo, setPlayerInfo] = useState({});

  // useEffect(() => {

  // }, [otherPlayerStats]);

  const handlePlayer = (event) => {
    event.preventDefault();

    axios
      .get(`/api/playersInfo/${person}`)
      .then((results) => {
        setPlayerInfo(results.data);
        reportPlayerStats(results.data);
      })
      .then(setPlayer(''))
      .catch(console.log);
  };

  const handleFavorite = (event) => {
    event.preventDefault();

    for (let i = 0; i < currentRoster.length; i++) {
      if (player === currentRoster[i].player) {
        return;
      }
    }

    const { position, player } = playerInfo;

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

    const num = q + (d * 2) + (o * 3);

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
      otherPlayerStats.outperseason
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
        <input type="text" placeholder="Marshawn Lynch" value={person} onChange={(event) => setPlayer(event.target.value)} />
      </form>
      <button type="submit" onClick={handlePlayer}>Get Player Stats</button>
      <div className={styles.playerDataContainer}>
        {/* <div className={styles.playerData}>
          Player:
          <div style={{ margin: '3% 3%' }}>{playerInfo.player}</div>
          Current Team:
          <div style={{ margin: '3% 3%' }}>{playerInfo.team}</div>
          Career Injury Percentage:
          <div style={{ margin: '3% 3%', color: getPercentageColor() }}>{playerPercentage(playerInfo.gamesplayed, playerInfo.gamesmissed)}</div>
          Team Injury Score:
          <div style={{ margin: '3% 3%', color: getTeamTotal() }}>{teamScore(playerInfo.questionableperseason, playerInfo.doubtfulperseason, playerInfo.outperseason)}</div>
        </div> */}
        <div className={styles.nameAndTeam}>
          Player:
          <div style={{ margin: '3% 3%' }}>{playerInfo.player}</div>
          Current Team:
          <div style={{ margin: '3% 3%' }}>{playerInfo.team}</div>
        </div>
        <div className={styles.scores}>
          Career Injury Percentage:
          <div style={{ margin: '3% 3%', color: getPercentageColor() }}>{playerPercentage(playerInfo.gamesplayed, playerInfo.gamesmissed)}</div>
          Team Injury Score:
          <div style={{ margin: '3% 3%', color: getTeamTotal() }}>{teamScore(playerInfo.questionableperseason, playerInfo.doubtfulperseason, playerInfo.outperseason)}</div>
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
