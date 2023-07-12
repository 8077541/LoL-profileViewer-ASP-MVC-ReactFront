namespace app.Models
{
    public class Summoner{
        public int id {get; set;}
        public string name {get; set;}
        public string region {get;set;}
        public ICollection<Game> Games{get; set;}

        public bool isClaimed{get;set;}
    }
}