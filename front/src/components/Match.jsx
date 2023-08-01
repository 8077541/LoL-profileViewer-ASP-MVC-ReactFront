import React from "react";
import { useState, useEffect } from "react";
import "./Match.css";

const Match = ({ matchId, mainSummonerName }) => {
  const [loading, setLoading] = useState(true);
  const [matchDetails, setMatchDetails] = useState(null);
  const [summoner, setSummoner] = useState(null);
  const [runes, setRunes] = useState(null);

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
  function mainSummoner(arr) {
    for (let i of arr) {
      if (mainSummonerName === i.summonerName) {
        setSummoner(i);
        console.log(i);
        break;
      }
    }
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
  const testValues = [8000, 8010, 9111, 9104, 8299];
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5191/MatchDetails?matchId=${matchId}`
      );
      const response2 = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json`
      );

      const data = await response.json();
      const data2 = await response2.json();

      setMatchDetails(data);
      setRunes(data2);
      setLoading(false);

      mainSummoner(data.value.info.participants);
      console.log(matchDetails);
      console.log(runes);
      console.log(runeRenderMain(testValues));
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
    <div id="match">
      <div id="generalMatchInfo">
        <h1>{gameMode(matchDetails.value.info.queueId)}</h1>

        <h2>{summoner.win ? "Victory" : "Defeat"}</h2>
      </div>
      <img
        id="mainCharacterPortrait"
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${summoner.championId}.png`}
        alt="Character Portrait"
        title={summoner.championName}
      ></img>
      <div id="mainSummonerSpells">
        <img
          className="summonerSpell"
          src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/spell/${summonerSpell(
            summoner.summoner1Id
          )}.png`}
          alt="summoner spell 1"
          title={summonerSpell(summoner.summoner1Id)}
        ></img>
        <img
          className="summonerSpell"
          src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/spell/${summonerSpell(
            summoner.summoner2Id
          )}.png`}
          alt="summoner spell 2"
          title={summonerSpell(summoner.summoner2Id)}
        ></img>
      </div>
      <h1>
        {summoner.kills} / {summoner.deaths} / {summoner.assists}
      </h1>
      <h2>
        {" "}
        KDA{" "}
        {summoner.deaths == 0
          ? summoner.kills + summoner.assists
          : ((summoner.kills + summoner.assists) / summoner.deaths).toFixed(2)}
      </h2>
    </div>
  );
};

export default Match;
