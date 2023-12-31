using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchController : Controller
    {

        private readonly IMatchService _matchService;
        public MatchController(IMatchService matchService)
        {
            _matchService = matchService;
        }

        [HttpGet("/MatchDetails")]
        public async Task<ActionResult<Match>> getMatchDetails(string matchId)
        {
            return Ok(await _matchService.getMatchDetails(matchId));

        }

        [HttpGet("/Match")]
        public async Task<ActionResult<List<string>>> getMatchId(string puuid, string region, string queueId = "", string countStart = "0", string countEnd = "20", string startTime = "", string endTime = "")
        {
            return Ok(await _matchService.getMatchId(puuid, region, queueId, countStart, countEnd, startTime, endTime));

        }

        [HttpGet("/LiveMatch")]
        public async Task<ActionResult<CurrentGameInfo>> getLiveMatch(string summonerId, string region)
        {
            return Ok(await _matchService.getLiveMatch(summonerId, region));

        }

    }
}