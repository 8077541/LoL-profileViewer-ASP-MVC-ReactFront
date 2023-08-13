namespace app.Models
{
    public class Summoner
    {
        public string accountId { get; set; } = "dummy";

        public int profileIconId { get; set; }
        public long revisionDate { get; set; } = 12;
        public string name { get; set; } = "dummy";
        public string id { get; set; }

        public string puuid { get; set; } = "dummy";
        public long summonerLevel { get; set; } = 321;

        public string tierFlex { get; set; } = "unranked";
        public string rankFlex { get; set; } = "IV";
        public int lpFlex { get; set; } = 0;
        public int winsFlex { get; set; } = 0;
        public int losesFlex { get; set; } = 0;

        public string tierSolo { get; set; } = "unranked";
        public string rankSolo { get; set; } = "IV";
        public int lpSolo { get; set; } = 0;
        public int winsSolo { get; set; } = 0;
        public int losesSolo { get; set; } = 0;

        public List<string> matchList { get; set; }
        public List<Rune> runes { get; set; }
        public List<Item> items { get; set; }
    }
}