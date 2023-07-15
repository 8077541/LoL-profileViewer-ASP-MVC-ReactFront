using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using app.services.MatchService;






namespace app.services.SummonerService
{
    public class SummonerService : ISummonerService

    {
        private readonly HttpClient _httpClient = new HttpClient();

        public async Task<ActionResult<Summoner>> GetSingle(string id, string region)
        {

            var response = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{id}?api_key=RGAPI-a891aa1a-15d7-452e-bf1b-4f3105337d37");
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("Summoner not found");
            }
            var json = await response.Content.ReadAsStringAsync();
            var summoner = JsonConvert.DeserializeObject<Summoner>(json);


            var response2 = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner.id}?api_key=RGAPI-a891aa1a-15d7-452e-bf1b-4f3105337d37");
            if (response2.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("Summoner not found");

            }
            var json2 = await response2.Content.ReadAsStringAsync();
            var summoner2 = JsonConvert.DeserializeObject<List<SummonerRank>>(json2);
            if (summoner2.Count == 2)
            {
                summoner.tierFlex = summoner2[0].tier;
                summoner.rankFlex = summoner2[0].rank;
                summoner.winsFlex = summoner2[0].wins;
                summoner.losesFlex = summoner2[0].losses;
                summoner.lpFlex = summoner2[0].leaguePoints;

                summoner.tierSolo = summoner2[1].tier;
                summoner.rankSolo = summoner2[1].rank;
                summoner.winsSolo = summoner2[1].wins;
                summoner.losesSolo = summoner2[1].losses;
                summoner.lpSolo = summoner2[1].leaguePoints;
            }
            else if (summoner2.Count == 1)
            {
                summoner.tierSolo = summoner2[0].tier;
                summoner.rankSolo = summoner2[0].rank;
                summoner.winsSolo = summoner2[0].wins;
                summoner.losesSolo = summoner2[0].losses;
                summoner.lpSolo = summoner2[0].leaguePoints;
            }

            IMatchService _matchService = new MatchService.MatchService();
            var res = await _matchService.getMatchId(summoner.puuid, region);

            summoner.matchList = res;

            return summoner;

        }



    }
}