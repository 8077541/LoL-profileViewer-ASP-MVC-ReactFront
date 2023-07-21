import React from "react";
import "./Home.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("EUNE");
  const [summonerName, setSummonerName] = useState("");

  function toggleVisibility(e) {
    const x = document.getElementById("regionOptions");
    e.preventDefault();
    if (x.style.visibility === "hidden") {
      x.style.visibility = "visible";
    } else x.style.visibility = "hidden";
  }
  function changeRegion(e) {
    e.preventDefault();
    setRegion(e.target.innerText);
    const x = document.getElementById("regionSelector");
    x.innerText = e.target.innerText;
    document.getElementById("regionOptions").style.visibility = "hidden";
    x.style.backgroundColor = e.target.name;
  }
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`summoners/${region}/${summonerName}`, {
      state: { region: region, summonerName: summonerName },
    });
  }
  return (
    <div id="homeSearch">
      <form id="formSearch" onSubmit={handleSubmit}>
        <button onClick={toggleVisibility} type="" id="regionSelector">
          EUNE
        </button>
        <input
          autocomplete="off"
          id="searchBar"
          type="text"
          onChange={(e) => setSummonerName(e.target.value)}
          value={summonerName}
          placeholder="Summoner's name"
        />
        <button type="submit">Search</button>
      </form>
      <div id="regionOptions">
        <button id="euneButton" name="#0077FF" onClick={changeRegion}>
          EUN1
        </button>
        <button id="euwButton" name="#090CDA" onClick={changeRegion}>
          EUW1
        </button>
        <button id="naButton" name="#AF2A56" onClick={changeRegion}>
          NA1
        </button>
        <button id="krButton" name="#DA0909" onClick={changeRegion}>
          KR
        </button>
      </div>
    </div>
  );
};

export default Home;
