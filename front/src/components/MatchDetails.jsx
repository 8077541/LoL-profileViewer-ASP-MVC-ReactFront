import React from "react";
import "./MatchDetails.css";
import { Link, useNavigate } from "react-router-dom";
const MatchDetails = ({
  mainSummonerName,
  runes,
  items,
  region,
  matchDetails,
}) => {
  const navigate = useNavigate();
  const summonerRedirect = (region, name) => {
    navigate(`/summoners/${region}/${name}`);
    navigate(0);
  };
  return (
    <table
      id={`i` + matchDetails.value.info.gameId}
      style={{ display: "none", marginLeft: "1em" }}
    >
      <tr id="tableHeaders">
        <th></th>
        <th>Summoner Name</th>
        <th>Kda</th>
        <th>Cs</th>
        <th>Runes</th>
        <th>Items</th>
        <th>Damage Dealt</th>
        <th>Gold Earned</th>
      </tr>
      {matchDetails.value.info.participants.map((player) => {
        return (
          <tr
            style={
              player.teamId == 100
                ? { backgroundColor: "#292146" }
                : { backgroundColor: "#462129" }
            }
          >
            <td>
              <img
                id="playerChamp"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png`}
                alt="Character Portrait"
                title={player.championName}
              ></img>
            </td>
            <td id="tableD">
              {" "}
              <h2
                onClick={() => summonerRedirect(region, player.summonerName)}
                id="playerName"
                style={
                  player.summonerName == mainSummonerName
                    ? { color: "#ee8eeb" }
                    : { color: "#948eee" }
                }
              >
                {player.summonerName}
              </h2>
            </td>{" "}
            <td>
              {" "}
              <h3 id="playerKDA">
                {player.kills} /{" "}
                <span className="redColor">{player.deaths} </span>/{" "}
                {player.assists}
              </h3>
            </td>
            <td>
              {player.totalMinionsKilled +
                player.totalEnemyJungleMinionsKilled +
                player.neutralMinionsKilled}{" "}
              CS (
              {(
                (player.totalMinionsKilled +
                  player.totalEnemyJungleMinionsKilled +
                  player.neutralMinionsKilled) /
                (matchDetails.value.info.gameDuration / 60)
              ).toFixed(1)}
              )
            </td>
            <td id="playerRunes">
              <div>
                {player.runesMain.map((rune) => {
                  return (
                    <img
                      className="rune"
                      alt="Summoner's keystone rune"
                      src={`http://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                      title={rune.key}
                    ></img>
                  );
                })}
              </div>
              <div>
                {player.runesSub.map((rune) => {
                  return (
                    <img
                      className="rune"
                      alt="Summoner's keystone rune"
                      src={`http://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                      title={rune.key}
                    ></img>
                  );
                })}
              </div>
            </td>
            <td id="playerItems">
              <div id="playerItemsDiv">
                {player.items.map((item) => {
                  return item.id != 0 ? (
                    <img
                      className="item"
                      alt="item"
                      src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/item/${item.id}.png`}
                    ></img>
                  ) : (
                    <div className="item"> </div>
                  );
                })}
              </div>
            </td>
            <td id="playerDamage">
              <div>
                {player.magicDamageDealtToChampions +
                  player.physicalDamageDealtToChampions +
                  player.trueDamageDealtToChampions}
              </div>
              <div id="playerDamageSplit">
                <span style={{ color: "#fcba03" }}>
                  {(
                    (100 * player.physicalDamageDealtToChampions) /
                    (player.magicDamageDealtToChampions +
                      player.physicalDamageDealtToChampions +
                      player.trueDamageDealtToChampions)
                  ).toFixed(1)}
                  %{" "}
                </span>
                <span style={{ color: "#415fd9" }}>
                  {(
                    (100 * player.magicDamageDealtToChampions) /
                    (player.magicDamageDealtToChampions +
                      player.physicalDamageDealtToChampions +
                      player.trueDamageDealtToChampions)
                  ).toFixed(1)}
                  %{" "}
                </span>
                <span style={{ color: "#f5f5f5" }}>
                  {(
                    (100 * player.trueDamageDealtToChampions) /
                    (player.magicDamageDealtToChampions +
                      player.physicalDamageDealtToChampions +
                      player.trueDamageDealtToChampions)
                  ).toFixed(1)}
                  %{" "}
                </span>
              </div>
            </td>
            <td id="playerGold">{player.goldEarned}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default MatchDetails;
