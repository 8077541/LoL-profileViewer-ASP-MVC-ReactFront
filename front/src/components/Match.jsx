import React from "react";
import { useState, useEffect } from "react";
import "./Match.css";
import { Link, useNavigate } from "react-router-dom";
import MatchDetails from "./MatchDetails";

const Match = ({ matchId, mainSummonerName, runes, items, region }) => {
  const [loading, setLoading] = useState(true);
  const [matchDetails, setMatchDetails] = useState(null);
  const [summoner, setSummoner] = useState(null);
  const navigate = useNavigate();
  const summonerRedirect = (region, name) => {
    navigate(`/summoners/${region}/${name}`);
    navigate(0);
  };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  function viewMatchDetails() {
    const el = document.querySelector("#viewMatchDetails");
    console.log(el);
    el.style.visibility = "shown";
  }
  function gameMode(id) {
    switch (id) {
      case 400:
        return "Normal Draft";
      case 420:
        return "Ranked Solo/Duo";
      case 430:
        return "Normal Blind";
      case 440:
        return "Ranked Flex";
      case 450:
        return "ARAM";
      case 830:
        return "Intro Bots";
      case 1700:
        return "Arena";
      default:
        return "Unknown gamemode";
    }
  }
  function summonerSpell(id) {
    switch (id) {
      case 1:
        return "SummonerBoost";
      case 3:
        return "SummonerExhaust";
      case 4:
        return "SummonerFlash";
      case 6:
        return "SummonerHaste";
      case 7:
        return "SummonerHeal";
      case 11:
        return "SummonerSmite";
      case 12:
        return "SummonerTeleport";
      case 13:
        return "SummonerMana";
      case 14:
        return "SummonerDot";
      case 21:
        return "SummonerBarrier";
      case 22:
        return "SummonerPoroRecall";
      case 30:
        return "SummonerPoroRecall";
      case 31:
        return "SummonerPoroThrow";
      case 32:
        return "SummonerSnowball";
      case 39:
        return "SummonerSnowURFSnowball_Mark";
      case 54:
        return "Summoner_UltBookPlaceholder";
      case 55:
        return "Summoner_UltBookSmitePlaceholder";
      case 2202:
        return "SummonerFlash";
      case 2201:
        return "SummonerCherryHold";
      default:
        return "Summoner_UltBookPlaceholder";
    }
  }
  function gameLength() {
    let sLength = matchDetails.value.info.gameDuration;
    let lengthDec = Math.trunc(sLength / 60);
    return `${lengthDec}m ${sLength - lengthDec * 60}s`;
  }
  function time(timestamp) {
    let tim = new Date().getTime();
    console.log(tim);
    let milago = tim - timestamp;
    let secondsAgo = Math.trunc(milago / 1000);
    let minutesAgo = Math.trunc(secondsAgo / 60);
    let hoursAgo = Math.trunc(minutesAgo / 60);
    let daysAgo = Math.trunc(hoursAgo / 24);
    if (daysAgo >= 1) {
      return `${daysAgo} ${daysAgo == 1 ? "Day" : "Days"} ago`;
    }
    if (hoursAgo >= 1) {
      return `${hoursAgo} ${hoursAgo == 1 ? "Hour" : "Hours"} ago`;
    }
    if (minutesAgo >= 1) {
      return `${minutesAgo} ${minutesAgo == 1 ? "Minute" : "Minutes"} ago`;
    }
    return "now";
  }
  function mainSummoner(arr) {
    for (let i of arr) {
      i.runesMain = runeRenderMain([
        i.perks.styles[0].style,
        i.perks.styles[0].selections[0].perk,
        i.perks.styles[0].selections[1].perk,
        i.perks.styles[0].selections[2].perk,
        i.perks.styles[0].selections[3].perk,
      ]);
      i.runesSub = runeRenderSub([
        i.perks.styles[1].style,
        i.perks.styles[1].selections[0].perk,
        i.perks.styles[1].selections[1].perk,
      ]);
      i.items = itemRender([
        i.item0,
        i.item1,
        i.item2,
        i.item3,
        i.item4,
        i.item5,
        i.item6,
      ]);
      i.summonerSpellName1 = summonerSpell(i.summoner1Id);
      i.summonerSpellName2 = summonerSpell(i.summoner2Id);
      if (mainSummonerName === i.summonerName) {
        setSummoner(i);
        console.log(i);
      }
    }
  }
  function itemRender(arr) {
    let counter = 0;
    let response = [];
    for (let x of arr) {
      if (x == 0) {
        response.push({
          id: 0,
        });
        continue;
      }
      for (let item of items) {
        if (x == item.id) {
          response.push(item);
          counter++;
          break;
        }
      }
    }
    return response;
  }
  function runeRenderMain(id) {
    let response = [];
    let i = 0;

    for (let tree of runes) {
      if (id[i] == tree.id) {
        response.push(tree);
        i++;

        for (const slot of tree.slots) {
          for (const rune of slot.runes) {
            if (id[i] == rune.id) {
              response.push(rune);
            }
          }
          i++;
        }
        break;
      }
    }
    return response;
  }
  function runeRenderSub(id) {
    let response = [];

    for (let tree of runes) {
      if (id[0] == tree.id) {
        response.push(tree);

        for (const slot of tree.slots) {
          for (const rune of slot.runes) {
            if (id[1] == rune.id || id[2] == rune.id) {
              response.push(rune);
            }
          }
        }
        break;
      }
    }
    return response;
  }
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5191/MatchDetails?matchId=${matchId}`
      );

      const data = await response.json();
      console.log(data);

      mainSummoner(data.value.info.participants);
      sleep(3000);
      setMatchDetails(data);

      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <div
        id="match"
        style={
          summoner.win
            ? { backgroundColor: "#292146" }
            : { backgroundColor: "#462129" }
        }
      >
        <div
          id="line"
          style={
            summoner.win
              ? { backgroundColor: "#33275c" }
              : { backgroundColor: "#6b2e3b" }
          }
        ></div>
        <div id="generalMatchInfo">
          <h1
            style={summoner.win ? { color: "#7bdeed" } : { color: "#ed7b7b" }}
          >
            {gameMode(matchDetails.value.info.queueId)}
          </h1>

          {summoner.win ? (
            <h2 style={{ color: "#7bdeed" }}>Victory</h2>
          ) : (
            <h2 style={{ color: "#ed7b7b" }}>Defeat</h2>
          )}
          <h2>{gameLength()}</h2>
          <h2>{time(matchDetails.value.info.gameEndTimestamp)}</h2>
        </div>
        <div id="champAndSumms">
          <img
            id="mainCharacterPortrait"
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${summoner.championId}.png`}
            alt="Character Portrait"
            title={summoner.championName}
          ></img>
          <div id="mainSummonerSpells">
            <div>
              <img
                className="summonerSpell"
                src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/spell/${summoner.summonerSpellName1}.png`}
                alt="summoner spell 1"
                title={summoner.summonerSpellName1}
              ></img>
            </div>
            <div>
              <img
                className="summonerSpell"
                src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/spell/${summoner.summonerSpellName2}.png`}
                alt="summoner spell 2"
                title={summoner.summonerSpellName2}
              ></img>
            </div>
          </div>
        </div>
        <div id="stats">
          <h1>
            {summoner.kills} /{" "}
            <span className="redColor">{summoner.deaths}</span> /{" "}
            {summoner.assists}
          </h1>
          <h2 id="kda">
            {" "}
            {summoner.deaths == 0
              ? summoner.kills + summoner.assists
              : ((summoner.kills + summoner.assists) / summoner.deaths).toFixed(
                  2
                )}{" "}
            KDA
          </h2>
          <h2 id="minions">
            {summoner.totalMinionsKilled +
              summoner.totalEnemyJungleMinionsKilled +
              summoner.neutralMinionsKilled}{" "}
            CS (
            {(
              (summoner.totalMinionsKilled +
                summoner.totalEnemyJungleMinionsKilled +
                summoner.neutralMinionsKilled) /
              (matchDetails.value.info.gameDuration / 60)
            ).toFixed(1)}
            )
          </h2>
        </div>
        {summoner.runesMain[4] ? (
          <div id="Runes">
            <div id="runesMain">
              {summoner.runesMain.map((rune) => {
                return (
                  <img
                    id="keystoneMain"
                    alt="Summoner's keystone rune"
                    src={`http://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                    title={rune.key}
                  ></img>
                );
              })}
            </div>
            <div id="runesSub">
              {summoner.runesSub.map((rune) => {
                return (
                  <img
                    id="keystoneMain"
                    alt="Summoner's keystone rune"
                    src={`http://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                    title={rune.key}
                  ></img>
                );
              })}
            </div>
          </div>
        ) : (
          <h1 id="noRunes">No Runes</h1>
        )}
        <div id="items">
          {summoner.items.map((item) => {
            return item.id != 0 ? (
              <img
                className="item"
                alt="item"
                src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/item/${item.id}.png`}
              ></img>
            ) : (
              <div className="item"></div>
            );
          })}
        </div>
        <div id="playerList">
          <div id="teamOne">
            {matchDetails.value.info.participants.map((player) => {
              if (player.teamId == 100) {
                return (
                  <div className="teamLeft">
                    <img
                      id="playerListChampImg"
                      src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png`}
                      alt="Character Portrait"
                      title={player.championName}
                    ></img>
                    <h1
                      onClick={() =>
                        summonerRedirect(region, player.summonerName)
                      }
                    >
                      {" "}
                      {player.summonerName}
                    </h1>
                  </div>
                );
              }
            })}
          </div>
          <div id="teamTwo">
            {matchDetails.value.info.participants.map((player) => {
              if (player.teamId == 200) {
                return (
                  <div className="teamRight">
                    <img
                      id="playerListChampImg"
                      src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png`}
                      alt="Character Portrait"
                      title={player.championName}
                    ></img>

                    <h1
                      onClick={() =>
                        summonerRedirect(region, player.summonerName)
                      }
                    >
                      {" "}
                      {player.summonerName}
                    </h1>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div
          onClick={() => {
            viewMatchDetails();
          }}
          id="expand"
          style={
            summoner.win
              ? { backgroundColor: "#33275c" }
              : { backgroundColor: "#6b2e3b" }
          }
        >
          <h1
            style={summoner.win ? { color: "#4c3c82" } : { color: "#bd5e5e" }}
          >
            v
          </h1>
        </div>
      </div>
      <div id="viewMatchDetails">
        <MatchDetails
          mainSummonerName={mainSummonerName}
          rune={runes}
          items={items}
          region={region}
          matchDetails={matchDetails}
        ></MatchDetails>
      </div>
    </div>
  );
};

export default Match;
