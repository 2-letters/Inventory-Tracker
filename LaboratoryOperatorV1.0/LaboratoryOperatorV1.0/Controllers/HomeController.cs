using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LaboratoryOperatorV1._0.Models;
using LaboratoryOperatorV1._0.Data;

namespace LaboratoryOperatorV1._0.Controllers
{
    public class HomeController : Controller
    {

        private readonly firebaseTest _client = new firebaseTest();

        public ActionResult Index()
        {
            _client.AuthExplicit("laboratory-2letter", @"C:\Users\rjvarona\Documents\GitHub\Laboratory.MVC\
            LaboratoryOperatorV1.0\LaboratoryOperatorV1.0\Laboratory-836fc4d08141.json");



            return View();
        }


        public async System.Threading.Tasks.Task<ActionResult> ViewLabsAsync()
        {
            //await _client.FireBaseConnectAsync();
           

            return View();
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