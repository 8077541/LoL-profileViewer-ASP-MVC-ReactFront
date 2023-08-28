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


        //WIP FUNCTION TO CALCULATE MOST PLAYED CHARACTERS 
        public async Task<ActionResult<List<string>>> getMostPlayed(string puuid, string region)
        {

            DateTime currentDate = DateTime.Now;
            TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            long secondsSinceEpoch = (long)t.TotalSeconds;
            string seasonStart = "1689724800";


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

                //API RATE LIMIT = 100 REQUEST EVERY TWO MINUTES, WILL GET RID OF THIS ONCE IM DONE WITH THE APPLICATION AND REGISTER IT OFFICIALLY.
                Thread.Sleep(120000);

            }



            var list = new List<string>();
            return list;


        }

        //GENERIC GET REQUEST TO THEIR ENDPOINT. TWO CALLS IN ONE FUNCTION SINCE I WILL NEVER USE THIS DATA SEPARATLY UNLIKE GET MATCHES FUNCTION.
        public async Task<ActionResult<Summoner>> GetSingle(string id, string region)
        {

            var response = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{id}?api_key=RGAPI-69e7a11d-004e-406b-86b0-2f439c81d763");
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("Summoner not found");
            }
            var json = await response.Content.ReadAsStringAsync();
            var summoner = JsonConvert.DeserializeObject<Summoner>(json);


            var response2 = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner.id}?api_key=RGAPI-69e7a11d-004e-406b-86b0-2f439c81d763");
            if (response2.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("Summoner not found");

            }
            var json2 = await response2.Content.ReadAsStringAsync();
            var summoner2 = JsonConvert.DeserializeObject<List<SummonerRank>>(json2);

            var response3 = await _httpClient.GetAsync("http://ddragon.leagueoflegends.com/cdn/13.15.1/data/en_US/runesReforged.json");
            var json3 = await response3.Content.ReadAsStringAsync();
            var summoner3 = JsonConvert.DeserializeObject<List<Rune>>(json3);

            var response4 = await _httpClient.GetAsync("https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/items.json");
            var json4 = await response4.Content.ReadAsStringAsync();
            var summoner4 = JsonConvert.DeserializeObject<List<Item>>(json4);


            summoner.runes = summoner3;
            summoner.items = summoner4;



            IMatchService _matchService = new MatchService.MatchService();
            List<string> res = await _matchService.getMatchId(summoner.puuid, region);

            summoner.matchList = res;
            foreach (SummonerRank rank in summoner2)
            {
                var check = rank.queueType.Length;

                if (check == 15)
                {
                    summoner.tierSolo = rank.tier;
                    summoner.rankSolo = rank.rank;
                    summoner.winsSolo = rank.wins;
                    summoner.losesSolo = rank.losses;
                    summoner.lpSolo = rank.leaguePoints;
                }
                if (check == 14)
                {
                    summoner.tierFlex = rank.tier;
                    summoner.rankFlex = rank.rank;
                    summoner.winsFlex = rank.wins;
                    summoner.losesFlex = rank.losses;
                    summoner.lpFlex = rank.leaguePoints;
                }
            }


            return summoner;

        }



    }
}