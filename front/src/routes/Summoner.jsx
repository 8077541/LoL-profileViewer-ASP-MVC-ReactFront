import React from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Summoner.css";
import Match from "../components/Match";

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
          console.log(res.data);
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
        <div id="main">
          <div id="firstBox">
            <div id="summonerIconAndLevelBox">
              <img
                id="summonerIcon"
                src={`http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/${playerData.value.profileIconId}.png`}
                alt="profileIcon"
              ></img>
              <h1 id="summonerLevel">{playerData.value.summonerLevel} </h1>
            </div>
            <h1 id="summonerName">{playerData.value.name} </h1>

            <div id="soloq">
              <img
                src={require(`../images/emblem-${playerData.value.tierSolo.toLowerCase()}.png`)}
                alt="rank Emblem"
              ></img>
              {playerData.value.tierSolo == "unranked" ? (
                <div>
                  <h1 id="soloqLabels">Unranked</h1>
                  <h3 id="queueType">Ranked Solo/Duo</h3>
                </div>
              ) : (
                <div id="soloqLabels">
                  <h1>
                    {playerData.value.tierSolo} {playerData.value.rankSolo}{" "}
                    {playerData.value.lpSolo}LP
                  </h1>
                  <h2>
                    <span id="winrate">
                      {Math.trunc(
                        (playerData.value.winsSolo /
                          (playerData.value.winsSolo +
                            playerData.value.losesSolo)) *
                          100
                      )}
                      % Winrate
                    </span>
                    {" | "}
                    {playerData.value.winsSolo}W {playerData.value.losesSolo}L
                  </h2>
                  <h3 id="queueType">Ranked Solo/Duo</h3>
                </div>
              )}
            </div>

            <div id="soloq">
              <img
                src={require(`../images/emblem-${playerData.value.tierFlex.toLowerCase()}.png`)}
                alt="rank Emblem"
              ></img>
              {playerData.value.tierFlex == "unranked" ? (
                <div>
                  <h1 id="soloqLabels">Unranked</h1>
                  <h3 id="queueType">Ranked Flex</h3>
                </div>
              ) : (
                <div id="soloqLabels">
                  <h1>
                    {playerData.value.tierFlex} {playerData.value.rankFlex}{" "}
                    {playerData.value.lpFlex}LP
                  </h1>
                  <h2>
                    <span id="winrate">
                      {Math.trunc(
                        (playerData.value.winsFlex /
                          (playerData.value.winsFlex +
                            playerData.value.losesFlex)) *
                          100
                      )}
                      % Winrate
                    </span>
                    {" | "}
                    {playerData.value.winsFlex}W {playerData.value.losesFlex}L
                  </h2>
                  <h3 id="queueType">Ranked Flex</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div id="matchHistory">Match history placeholer</div>
    </div>
  );
};

export default Summoner;
