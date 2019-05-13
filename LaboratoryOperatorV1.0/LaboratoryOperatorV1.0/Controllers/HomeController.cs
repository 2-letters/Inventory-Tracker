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

        public async System.Threading.Tasks.Task<ActionResult> IndexAsync()
        {

            //path used
            //model.documentSnapshot.Documents
            //var model = new DataAll
            //{
            //    documentSnapshot = await _client.GetAllItems()
            //};


            var model = new listIndex
            {
                IndexList = await _client.GetAllItemsMethod2()
            };

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