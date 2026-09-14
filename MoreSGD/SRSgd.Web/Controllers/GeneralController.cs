using SRSgd.DataProvider.General;
using SRSgd.DataProvider.Principal;
using System;
using System.Web.Mvc;

namespace SRSgd.Web.Controllers
{
    public class GeneralController : Controller
    {
        // GET: General
        public ActionResult Index()
        {
            return View();
        }


        /// <summary>
        /// FECHA: 04-10-19
        /// </summary>
        /// <returns></returns>
        public ActionResult ListarDependencias()
        {
            var oDAL = new DAL_Combos();
            var listado = oDAL.ListarDependencias();


            return View(listado);
        }

        /// <summary>
        /// FEHCHA: 14-10-19
        /// </summary>
        /// <returns></returns>
        public ActionResult ListarTipoDocumentos()
        {

            var oDAL = new DAL_Combos();
            var listado = oDAL.ListarTipoDocumentos();

            return View();
        }
        /*
        public ActionResult ListarEmpleadosDependencia(string CodDependencia)
        {

            var oDAL = new DAL_Combos();
            var listado = oDAL.ListarEmpleadosPorDependencia(CodDependencia);

            return View();
        }*/

        [HttpGet]
        public JsonResult ListarEmpleadosDependencia(string CodDependencia)
        {

            var oDAL = new DAL_Combos();
            var listado = oDAL.ListarEmpleadosPorDependencia(CodDependencia);

            return Json(listado, JsonRequestBehavior.AllowGet);
        }

    }
}
