

namespace app.Models
{

    public class Team{
        public List<Ban> bans{get;set;}
        public Objectives objectives{get;set;}
        public int teamId{get;set;}
        public bool win{get;set;}

    }
}