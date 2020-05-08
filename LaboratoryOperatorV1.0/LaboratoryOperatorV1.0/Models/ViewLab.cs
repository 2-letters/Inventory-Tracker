using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LaboratoryOperatorV1._0.Models;

namespace LaboratoryOperatorV1._0.Models
{
    public class ViewLab
    {
        public List<labItems> ItemsAdded { get; set; }
        public List<labItems> LabItems { get; set; }
        public labs labDetails { get; set; }
    }
}