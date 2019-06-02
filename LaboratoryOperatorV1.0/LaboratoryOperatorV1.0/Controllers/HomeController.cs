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

        public ActionResult IndexAsync()
        {
            var model = new LabsForUsersList
            {
                LabsForUsers =  _client.GetAllLabsForUsersAsync()
            };
            
            return View(model);
        }

        /// <summary>
        /// change this later to edit and add new lab
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ViewLabsAsync(string id)
        {
            //await _client.FireBaseConnectAsync();
            //id = "b8qypoYQVIy24AZO2cvp";
            var model = new ViewLab();
            if (id != null)
            {
                model.ItemsAdded =  _client.GetItemsForLabs(id);
                model.labDetails =  _client.GetLabDetails(id);
                model.LabItems =  _client.GetAllItemsMethod2();
            }
            else
            {
                model.LabItems =  _client.GetAllItemsMethod2();
            }


            return View(model);
        }
        public ActionResult PreviewLab(string id)
        {
            id = "b8qypoYQVIy24AZO2cvp";
            var model = new ViewLab();
            if (id != null)
            {
                model.ItemsAdded = _client.GetItemsForLabs(id);
                model.labDetails = _client.GetLabDetails(id);
            }
            else
            {
                model.LabItems = _client.GetAllItemsMethod2();
            }


            return View();
        }







        [HttpPost]
        public ActionResult PushNewLab(string labName, string labDescription, List<labItems> itemsInLab)
        {
            //await _client.FireBaseConnectAsync();

             _client.pushNewLabAsync(labName, labDescription, itemsInLab);

            return View();
        }

        /// <summary>
        /// change viewInventory to EditInventory
        /// </summary>
        /// <returns></returns>
        public ActionResult ViewInventory()
        {
            //await _client.FireBaseConnectAsync();

            var model = new listIndex
            {
                IndexList =  _client.GetAllItemsMethod2()
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