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

        public async Task<ActionResult<List<string>>> getMostPlayed(string puuid, string region)
        {

            DateTime currentDate = DateTime.Now;
            TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            long secondsSinceEpoch = (long)t.TotalSeconds;
            string seasonStart = "1673913600";


            IMatchService _matchService = new MatchService.MatchService();



            int counter = 80;
            while (counter == 80)
            {
                var res = await _matchService.getMatchId(puuid, region, "420", "0", "80", seasonStart, secondsSinceEpoch.ToString());
                foreach (var match in res)
                {
                    ActionResult<Match> matchDetails = await _matchService.getMatchDetails(match);

                    foreach (var player in matchDetails.Value.info.participants)
                    {
                        if (player.puuid == puuid)
                        {

                            Console.WriteLine($"[{player.summonerName}] {player.championName} KdA: {player.kills} / {player.deaths} / {player.assists}");
                            continue;
                        }



                    }
                    counter--;
                    secondsSinceEpoch = matchDetails.Value.info.gameEndTimestamp / 1000;
                }
                if (counter == 0)
                {
                    counter = 80;

                }
                else break;

                Thread.Sleep(120000);

            }



            var list = new List<string>();
            return list;


        }
        public async Task<ActionResult<Summoner>> GetSingle(string id, string region)
        {

            var response = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{id}?api_key=RGAPI-fb5f0ef8-7676-4530-b8bc-4055c9284e4a");
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("Summoner not found");
            }
            var json = await response.Content.ReadAsStringAsync();
            var summoner = JsonConvert.DeserializeObject<Summoner>(json);


            var response2 = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner.id}?api_key=RGAPI-fb5f0ef8-7676-4530-b8bc-4055c9284e4a");
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