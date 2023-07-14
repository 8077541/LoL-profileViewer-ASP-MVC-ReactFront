using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;


using Microsoft.AspNetCore.Mvc;
using System.Net;
using app.services.SummonerService;

namespace app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SummonerController : ControllerBase

    {
        private readonly HttpClient _httpClient = new HttpClient();
        private readonly ISummonerService _summonerService;
        public SummonerController(ISummonerService summonerService)
        {
            _summonerService = summonerService;
        }       

        [HttpGet("{region}/{id}")]
            public async Task<ActionResult<Summoner>> GetSingle(string id, string region){
               return Ok(await _summonerService.GetSingle(id, region));
            
            }

}
}