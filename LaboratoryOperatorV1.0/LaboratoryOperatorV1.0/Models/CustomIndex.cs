using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaboratoryOperatorV1._0.Models
{
    public class labItems
    {
        public int pictureUrl { get; set; }
        public string itemName { get; set; }
        public string description { get; set; }
        public int quantity { get; set; }

    }

    public class listIndex
    {
        public List<labItems> IndexList {get; set;}
    }



}


