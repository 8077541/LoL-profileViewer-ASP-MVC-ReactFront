using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace app.services.SummonerService
{
    public interface ISummonerService
    {
        Task<ActionResult<Summoner>> GetSingle(string id, string region);
    
    }
}