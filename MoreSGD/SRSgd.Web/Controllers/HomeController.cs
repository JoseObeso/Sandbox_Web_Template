using SRSgd.DataProvider.Principal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRSgd.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            DAL_Indicador oDAL = new DAL_Indicador();
            var lst = oDAL.SGD_Listar_Cargos("");

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