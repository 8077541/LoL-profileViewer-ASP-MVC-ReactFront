using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app.Models
{
    public class Item
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public bool active { get; set; }
        public bool inStore { get; set; }
        public int[] from { get; set; }
        public int[] to { get; set; }
        public string[] categories { get; set; }
        public int maxStacks { get; set; }
        public string requiredChampion { get; set; }
        public string requiredAlly { get; set; }
        public string requiredBuffCurrencyName { get; set; }
        public string requiredBuffCurrenctCost { get; set; }
        public int specialRecipe { get; set; }
        public bool isEnchantement { get; set; }
        public int price { get; set; }
        public int priceTotal { get; set; }
        public string iconPath { get; set; }
    }
}