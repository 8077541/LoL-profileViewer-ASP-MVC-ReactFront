using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app.Models
{
    public class CurrentGameInfo
    {
        public long gameId { get; set; }
        public string gameType { get; set; }
        public long gameStartTime { get; set; }
        public long mapId { get; set; }
        public long gameLength { get; set; }
        public string platformId { get; set; }
        public string gameMode { get; set; }

        public List<BannedChampion> bannedChampions { get; set; }
        public long gameQueueConfig { get; set; }
        public Observer observer { get; set; }
        public List<CurrentGameParticipant> participants { get; set; }
    }
}