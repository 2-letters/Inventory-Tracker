using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaboratoryOperatorV1._0.Models
{
    public class labItems
    {
        public string pictureUrl { get; set; }
        public List<string> itemName { get; set; }
        public string description { get; set; }
        public int quantity { get; set; }

    }

    public class listIndex
    {
        public List<labItems> IndexList {get; set;}
    }


    public class DataAll
    {
        public IReadOnlyList<DocumentSnapshot> documentSnapshot { get; set; }
    }


}


