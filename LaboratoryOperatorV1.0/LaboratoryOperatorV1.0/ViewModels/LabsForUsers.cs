using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaboratoryOperatorV1._0.ViewModels
{
    public class LabsForUsers
    {
        public string labName { get; set; }

        public string description { get; set; }
        public string id { get; set; }
    }

    public class LabsForUsersList
    {
        public List<LabsForUsers> LabsForUsers { get; set; }
    }
}