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
        public string name { get; set; }
        public string description { get; set; }
        public string location { get; set; }
        public int quantity { get; set; }
        public string id { get; set; }
        public string room { get; set; }
        public string sub_location{get; set;}
    }

    public class listIndex
    {
        public List<labItems> IndexList {get; set;}
    }


    public class DataAll
    {
        public IReadOnlyList<DocumentSnapshot> documentSnapshot { get; set; }
    }

    public class labs
    {
        public string labName { get; set; }
        public string description { get; set; }
    }


}


