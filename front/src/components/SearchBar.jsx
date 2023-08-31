import React from "react";
import "./SearchBar.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("EUNE");
  const [summonerName, setSummonerName] = useState("");

  function toggleVisibility(e) {
    const x = document.getElementById("regionOptionsTwo");
    e.preventDefault();
    if (x.style.display === "none") {
      x.style.display = "block";
    } else x.style.display = "none";
  }
  function changeRegion(e) {
    e.preventDefault();
    setRegion(e.target.innerText);
    const x = document.getElementById("regionSelectorTwo");
    x.innerText = e.target.innerText;
    document.getElementById("regionOptionsTwo").style.display = "none";
    x.style.backgroundColor = e.target.name;
  }
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/summoners/${region}/${summonerName}`);
    navigate(0);
  }
  return (
    <div id="center">
      <form id="formSearchTwo" onSubmit={handleSubmit}>
        <button onClick={toggleVisibility} type="" id="regionSelectorTwo">
          EUN1
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
      <div id="regionOptionsTwo">
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
