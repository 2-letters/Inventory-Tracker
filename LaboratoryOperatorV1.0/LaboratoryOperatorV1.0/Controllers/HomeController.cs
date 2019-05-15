using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LaboratoryOperatorV1._0.Models;
using LaboratoryOperatorV1._0.Data;
using LaboratoryOperatorV1._0.ViewModels;

namespace LaboratoryOperatorV1._0.Controllers
{
    public class HomeController : Controller
    {

        private readonly firebaseTest _client = new firebaseTest();

        public async System.Threading.Tasks.Task<ActionResult> IndexAsync()
        {
            var model = new LabsForUsersList
            {
                LabsForUsers = await _client.GetAllLabsForUsersAsync()
            };
            
            return View(model);
        }


        public async System.Threading.Tasks.Task<ActionResult> ViewLabsAsync()
        {
            //await _client.FireBaseConnectAsync();

            var model = new listIndex
            {
                IndexList = await _client.GetAllItemsMethod2()
            };

            return View(model);
        }

        [HttpPost]
        public async System.Threading.Tasks.Task<ActionResult> PushNewLab(string labName, string labDescription, List<labItems> itemsInLab)
        {
            //await _client.FireBaseConnectAsync();

            await _client.pushNewLabAsync(labName, labDescription, itemsInLab);

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