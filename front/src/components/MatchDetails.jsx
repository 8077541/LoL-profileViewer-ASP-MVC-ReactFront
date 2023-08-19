import React from "react";
import "./MatchDetails.css";
const MatchDetails = ({
  mainSummonerName,
  runes,
  items,
  region,
  matchDetails,
}) => {
  return (
    <table>
      <tr id="tableHeaders">
        <th>Summoner Name</th>
        <th>Kda</th>
        <th>Cs</th>
      </tr>
      {matchDetails.value.info.participants.map((player) => {
        return (
          <tr>
            <td id="tableD">
              {" "}
              <img
                id="playerChamp"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png`}
                alt="Character Portrait"
                title={player.championName}
              ></img>
              <h2
                style={
                  player.summonerName == mainSummonerName
                    ? { color: "#ee8eeb" }
                    : { color: "#948eee" }
                }
              >
                {player.summonerName}
              </h2>
              <h2 id="playerKDA">
                {player.kills} / {player.deaths} / {player.assists}
              </h2>
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default MatchDetails;
