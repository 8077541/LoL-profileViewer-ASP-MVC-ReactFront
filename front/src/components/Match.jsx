import React from "react";
import { useState, useEffect } from "react";
import "./Match.css";

const Match = ({ matchId, mainSummonerName }) => {
  const [loading, setLoading] = useState(true);
  const [matchDetails, setMatchDetails] = useState(null);
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5191/MatchDetails?matchId=${matchId}`
      );

      const data = await response.json();

      setMatchDetails(data);
      console.log(matchDetails);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div id="loading">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>{matchDetails.value.info.gameMode}</h1>
      <h2>test</h2>
    </div>
  );
};

export default Match;
