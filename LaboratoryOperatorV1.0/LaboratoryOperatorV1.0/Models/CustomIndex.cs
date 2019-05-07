using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaboratoryOperatorV1._0.Models
{
    public class CustomIndex
    {
        public int LabAssignment { get; set; }
        public string Name { get; set; }
        public string description { get; set; }

    }

    public class listIndex
    {
        public List<CustomIndex> IndexList {get; set;}
    }
}


