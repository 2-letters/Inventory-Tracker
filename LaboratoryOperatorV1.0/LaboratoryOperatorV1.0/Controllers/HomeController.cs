using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LaboratoryOperatorV1._0.Models;


namespace LaboratoryOperatorV1._0.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
          
            var model = new CustomIndex
            {
                description = "Lab 7 is about Kirchoff's rule Students will try to jump around",
                Name = "Lab 7: Kirchoff's rule",
            };

            return View(model);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}