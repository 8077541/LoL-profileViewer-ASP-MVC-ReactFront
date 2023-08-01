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


            var response = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/match/v5/matches/{matchId}?api_key=RGAPI-7167788a-d866-4478-b62a-431de9078ffb");
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("Summoner not found");



            }
            var json = await response.Content.ReadAsStringAsync();
            var game = JsonConvert.DeserializeObject<Match>(json);

            return game;
        }

        public async Task<List<string>> getMatchId(string puuid, string region, string queueId = "", string countStart = "0", string countEnd = "20", string startTime = "", string endTime = "")
        {
            //queue id 420 soloq 440flexq
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
                queueId = $"queue={queueId}&";
            }
            var response = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?{"startTime=" + startTime + "&"}{"endTime=" + endTime + "&"}{queueId}start=0&count={countEnd}&api_key=RGAPI-7167788a-d866-4478-b62a-431de9078ffb");
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