using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using app.services.SummonerService;
using System.Web.Http.Cors;

namespace app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors(origins: "http://mywebclient.azurewebsites.net", headers: "*", methods: "*")]
    public class SummonerController : ControllerBase

    {

        private readonly ISummonerService _summonerService;
        public SummonerController(ISummonerService summonerService)
        {
            _summonerService = summonerService;
        }

        [HttpGet("{region}/{id}")]
        public async Task<ActionResult<Summoner>> GetSingle(string id, string region)
        {
            return Ok(await _summonerService.GetSingle(id, region));

        }

        [HttpGet("Mostplayed/{puuid}/{region}")]
        public async Task<ActionResult<List<string>>> getMostPlayed(string puuid, string region)
        {
            return Ok(await _summonerService.getMostPlayed(puuid, region));
        }

    }
}