using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace app.services.MatchService
{
    public interface IMatchService
    {
          Task<ActionResult<Match>> getMatchDetails(string matchId);
          Task<List<string>> getMatchId(string puuid, string region, string queueId="", string count="20");
    }
}