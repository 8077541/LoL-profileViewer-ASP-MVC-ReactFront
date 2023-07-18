import React from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Summoner = () => {
  const params = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await axios
        .get(
          `http://localhost:5191/api/Summoner/${params.region}/${params.summonerName}`
        )
        .then((res) => {
          setPlayerData(res.data);
          console.log(playerData.value);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h1>Summoner Name: {playerData.value.name} </h1>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/${playerData.value.profileIconId}.png`}
            alt="profileIcon"
          ></img>
          <h1>Summoner Level: {playerData.value.summonerLevel} </h1>
          <img src={`../Images/emblem-master.png`} alt="rank Emblem"></img>
          <h1>
            Solo/Duo rank: {playerData.value.tierSolo}{" "}
            {playerData.value.rankSolo}
          </h1>
          <h2>
            {playerData.value.lpSolo}LP {playerData.value.winsSolo}W{" "}
            {playerData.value.lossesSolo}L
          </h2>
        </div>
      )}
    </div>
  );
};

export default Summoner;
