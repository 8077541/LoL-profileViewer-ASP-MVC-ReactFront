import React, { Component } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Summoner.css";
import Match from "../components/Match";

const api = axios.create({
  baseURL: "http://localhost:5191/",
});

const Summoner = () => {
  const params = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  //GET REQUEST THAT GETS CALLED INSTANTLY AFTER LOADING THE COMPONENT
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // const res = await axios.get(
      //   `http://localhost:5191/api/Summoner/${params.region}/${params.summonerName}`
      // );
      // await setPlayerData(res.data);
      // console.log(res);

      const response = await fetch(
        `http://localhost:5191/api/Summoner/${params.region.toLowerCase()}/${params.summonerName.toLowerCase()}`
      );

      const data = await response.json();
      setPlayerData(data);
      console.log(data);
      setLoading(false);
    };
    load();
  }, []);

  //CHECK IF THE DATA IS STILL LOADING
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
      <div id="main">
        <div id="firstBox">
          <div id="summonerIconAndLevelBox">
            <img
              id="summonerIcon"
              src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/profileicon/${playerData.value.profileIconId}.png`}
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
        <div>
          {playerData.value.matchList.map((match) => {
            return (
              <Match
                key={match}
                matchId={match}
                mainSummonerName={playerData.value.name}
                runes={playerData.value.runes}
                items={playerData.value.items}
                region={params.region.toLowerCase()}
              />
            );
          })}
        </div>
      </div>
      {/* TODO: map through playerData.value.matchList and pass every id to Match component in order to query for details etc. and and return in here  */}
    </div>
  );
};

export default Summoner;
