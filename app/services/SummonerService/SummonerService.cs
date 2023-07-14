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


        public async Task<ActionResult<Summoner>> GetSingle(string id, string region){

                    var response = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{id}?api_key=RGAPI-c7b408e7-df3a-4990-92e5-bb23227e6bbd");
                    if(response.StatusCode == HttpStatusCode.NotFound){
                        throw new Exception("Summoner not found");
                    }
                    var json = await response.Content.ReadAsStringAsync();
                    var summoner = JsonConvert.DeserializeObject<Summoner>(json);


                    var response2 = await _httpClient.GetAsync($"https://{region}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner.id}?api_key=RGAPI-c7b408e7-df3a-4990-92e5-bb23227e6bbd");
                    if(response2.StatusCode == HttpStatusCode.NotFound){
                        throw new Exception("Summoner not found");
                    
                    }
                    var json2 = await response2.Content.ReadAsStringAsync();
                    var summoner2 = JsonConvert.DeserializeObject<List<SummonerRank>>(json2);
                    if(summoner2.Count == 2){
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
                    }else if(summoner2.Count == 1){
                        summoner.tierSolo = summoner2[0].tier;
                        summoner.rankSolo = summoner2[0].rank;
                        summoner.winsSolo = summoner2[0].wins;
                        summoner.losesSolo = summoner2[0].losses;
                        summoner.lpSolo = summoner2[0].leaguePoints;
                    }

                    
                    var response3 = await _httpClient.GetAsync($"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=10&api_key=RGAPI-c7b408e7-df3a-4990-92e5-bb23227e6bbd");
                    if(response3.StatusCode == HttpStatusCode.NotFound){
                        throw new Exception("Summoner not found");
                    }
                    var json3 = await response3.Content.ReadAsStringAsync();

                    var matchList = JsonConvert.DeserializeObject<List<string>>(json3);

                    summoner.matchList = matchList;
                    return summoner;
                
                }

        private ActionResult<Summoner> Ok(object summoner)
        {
            throw new NotImplementedException();
        }

        private ActionResult<Summoner> NotFound()
        {
            throw new NotImplementedException();
        }
        
    }
}