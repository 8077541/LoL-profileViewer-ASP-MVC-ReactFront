
namespace app.Models
{

    public class PerkStyle{
        public string description { get; set; }
        public List<PerkStyleSelection> selections { get; set; }
        public int style { get; set; }
    }
}