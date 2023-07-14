using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

namespace app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SummonerController : ControllerBase
    {
        private static List<Summoner> dummies = new List<Summoner>{
            new Summoner(),
            new Summoner {id = 1, name ="ivy2"}
        };
        [HttpGet("GetAll")]
        public ActionResult<List<Summoner>> Get()
        {
            return Ok(dummies);
        }
        [HttpGet("{id}")]
        public ActionResult<Summoner> GetSingle(int id){   
            return Ok(dummies.FirstOrDefault(x => x.id == id));

        }
         [HttpPost]
        public ActionResult<List<Summoner>> AddSummoner(Summoner newSummoner){
            dummies.Add(newSummoner);
            return Ok(dummies);
        }
}
}