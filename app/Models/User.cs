using System.Text.Json.Serialization;

namespace app.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public class User{
        public int id {get; set;}
        public string userName{get;set;} = "ivy";
        public string password{get;set;} ="1qaz2wsX";

    }
}