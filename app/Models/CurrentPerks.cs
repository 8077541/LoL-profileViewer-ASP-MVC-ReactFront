using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app.Models
{
    public class CurrentPerks
    {
        public List<long> perkIds { get; set; }
        public long perkStyle { get; set; }
        public long perkSubStyle { get; set; }
    }
}