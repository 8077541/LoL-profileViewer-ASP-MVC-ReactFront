import React from "react";
import { useState, useEffect } from "react";
import "./Match.css";

const Match = ({ matchId, mainSummonerName }) => {
  const [loading, setLoading] = useState(true);
  const [matchDetails, setMatchDetails] = useState(null);
  const [summoner, setSummoner] = useState(null);
  const [runes, setRunes] = useState(null);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
    console.log(runes);
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
      if (mainSummonerName === i.summonerName) {
        setSummoner(i);
        console.log(i);
      }
    }
  }
  function runeRenderMain(id) {
    let response = [];
    let i = 0;
    console.log(runes);
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
      const response2 = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json`
      );

      const data = await response.json();
      const data2 = await response2.json();

      setRunes(data2);
      setMatchDetails(data);

      await sleep(5000);
      mainSummoner(data.value.info.participants);

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
      {summoner.runesMain[0] ? (
        <div>
          <img
            id="keystoneMain"
            alt="Summoner's keystone rune"
            src={`http://ddragon.leagueoflegends.com/cdn/img/${summoner.runesMain[0].icon}`}
            title={summoner.runesMain[0].key}
          ></img>
          <img
            id="keystoneMain"
            alt="Summoner's keystone rune"
            src={`http://ddragon.leagueoflegends.com/cdn/img/${summoner.runesMain[1].icon}`}
            title={summoner.runesMain[1].longDesc}
          ></img>
          <img
            id="keystoneMain"
            alt="Summoner's keystone rune"
            src={`http://ddragon.leagueoflegends.com/cdn/img/${summoner.runesMain[2].icon}`}
            title={summoner.runesMain[2].longDesc}
          ></img>
          <img
            id="keystoneMain"
            alt="Summoner's keystone rune"
            src={`http://ddragon.leagueoflegends.com/cdn/img/${summoner.runesMain[3].icon}`}
            title={summoner.runesMain[3].longDesc}
          ></img>
          <img
            id="keystoneMain"
            alt="Summoner's keystone rune"
            src={`http://ddragon.leagueoflegends.com/cdn/img/${summoner.runesMain[4].icon}`}
            title={summoner.runesMain[4].longDesc}
          ></img>
          <img
            id="keystoneMain"
            alt="Summoner's keystone rune"
            src={`http://ddragon.leagueoflegends.com/cdn/img/${summoner.runesSub[0].icon}`}
            title={summoner.runesSub[0].key}
          ></img>
          <img
            id="keystoneMain"
            alt="Summoner's keystone rune"
            src={`http://ddragon.leagueoflegends.com/cdn/img/${summoner.runesSub[1].icon}`}
            title={summoner.runesSub[1].longDesc}
          ></img>
          <img
            id="keystoneMain"
            alt="Summoner's keystone rune"
            src={`http://ddragon.leagueoflegends.com/cdn/img/${summoner.runesSub[2].icon}`}
            title={summoner.runesSub[2].longDesc}
          ></img>
        </div>
      ) : (
        <h1>{summoner.runes != null ? "true" : "false"}</h1>
      )}
    </div>
  );
};

export default Match;
