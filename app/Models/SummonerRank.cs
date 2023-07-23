namespace app.Models
{
    public class SummonerRank
    {
        public string leagueId { get; set; } = "dummy";
        public string summonerId { get; set; } = "dummy";
        public string summonerName { get; set; } = "dummy";
        public string queueType { get; set; } = "dummy";
        public string tier { get; set; } = "unranked";
        public string rank { get; set; } = " ";
        public int leaguePoints { get; set; } = 0;
        public int wins { get; set; } = 0;
        public int losses { get; set; } = 0;
        public bool hotStreak { get; set; } = false;
        public bool veteran { get; set; } = false;
        public bool freshBlood { get; set; } = false;
        public bool inactive { get; set; } = false;
    }
}