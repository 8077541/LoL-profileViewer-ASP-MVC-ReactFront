using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace app.services.MatchService
{
    public class MatchService : IMatchService

    {
        private readonly HttpClient _httpClient = new HttpClient();


        public async Task<ActionResult<Match>> getMatchDetails(string matchId)
        {
            var region = "";
            if (matchId[0] == 'E')
            {
                region = "europe";
            }
            else if (matchId[0] == 'N')
            {
                region = "americas";
            }
            else
            {
                region = "asia";
            }


            var response = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/match/v5/matches/{matchId}?api_key=RGAPI-a891aa1a-15d7-452e-bf1b-4f3105337d37");
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("Summoner not found");



            }
            var json = await response.Content.ReadAsStringAsync();
            var game = JsonConvert.DeserializeObject<Match>(json);

            return game;
        }

        public async Task<List<string>> getMatchId(string puuid, string region, string queueId = "", string count = "20")
        {
            //queue id 420 soloq
            //2ZtXknMv0eBkiwTRBOFOiMFf2sPSx3xz2dgf0YdM6OoOi19R7x1jn2dG6AcaD4DStPtJ1Hlg7xli0A
            if (region == "euw1" || region == "eun1")
            {
                region = "europe";
            }
            else if (region == "na1")
            {
                region = "americas";
            }
            else
            {
                region = "asia";
            }
            if (queueId != "")
            {
                queueId = $"&queue={queueId}&";
            }
            var response = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?{queueId}start=0&count={count}&api_key=RGAPI-a891aa1a-15d7-452e-bf1b-4f3105337d37");
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("Summoner not found");
            }
            var json = await response.Content.ReadAsStringAsync();
            var matchList = JsonConvert.DeserializeObject<List<string>>(json);

            return matchList;
        }

    }
}