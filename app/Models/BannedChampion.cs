using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app.Models
{
    public class BannedChampion
    {
        public int pickTurn { get; set; }
        public long championId { get; set; }
        public long teamId { get; set; }
    }
}