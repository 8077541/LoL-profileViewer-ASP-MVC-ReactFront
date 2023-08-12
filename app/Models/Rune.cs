
namespace app.Models
{

    public class Rune
    {

        public string icon { get; set; }
        public int id { get; set; }
        public string key { get; set; }
        public string name { get; set; }
        public List<Slot> slots { get; set; }
    }
}