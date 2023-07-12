namespace app.Models
{
    public class Game{
        public int id {get; set;}
        public ICollection<Summoner> Summoners {get; set;}
    }
}