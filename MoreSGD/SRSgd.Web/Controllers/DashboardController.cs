using SRSgd.DataProvider.Principal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static SRSgd.Web.MvcApplication;

namespace SRSgd.Web.Controllers
{
    public class DashboardController : Controller
    {
      
        public ActionResult Index()
        {
            ViewBag.DependenciaLogin = TempData["DependenciaLogin"];

            DAL_Indicador oDAL = new DAL_Indicador();
            var lst = oDAL.SGD_Listar_Cargos("");

            return View();
        }

        // GET: Dashboard/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }


        // POST: Dashboard/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        public JsonResult _GetIndicadores(int Anio)
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);

            var oDataItem = oDAL.SGD_Chart_Dashboard_Indicador_A(codDependencia, Anio);

            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }





        //public JsonResult _ChartDocRecibidos()
        //{
        //    var oDAL = new DAL_Indicador();
        //    var codDependencia = Convert.ToString(Session["codDependenciaUser"]);

        //    var oDataItem = oDAL.SGD_Chart_Dashboard_DocRecibido(codDependencia);

        //    return Json(oDataItem, JsonRequestBehavior.AllowGet);
        //}

        //ROLANDO 22.04.2023
        //16.05.2023

        public JsonResult _GeneradoAnio()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_GeneradoAnio(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }



        public JsonResult _GeneradoMes()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_GeneradoMes(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }


        public JsonResult _GeneradoDia()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_GeneradoDia(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }



        public JsonResult _PorAnio()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_TotalPorAnio(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }

        public JsonResult _PorTipoDocumento()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_TotalPorTipoDocumento(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }

        public JsonResult _PorEstado()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_TotalPorEstado(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }

       
        public JsonResult _PorDependencia()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_TotalPorDependencia(codDependencia);

            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }


        public JsonResult _DocumentosTotalEmitidos()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_TotalEmitidos(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }


        public JsonResult _DocumentosTotalAnioPIDE()
        {
           var oDAL = new DAL_Indicador();
           var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
           var oDataItem = oDAL.SGD_DocumentosTotalAnioPIDE(codDependencia);
           return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }


        /////////////////////////////////////////////////////////////////////////////////////////
        /// 27.09.2024
        /// 

        public JsonResult _DocumentosNoleidoTotal()

        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_Chart_Dashboard_DocumentosNoleidoTotal("10103"); //(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }

        public JsonResult _ChartDocNoLeidoOficina()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);

            var oDataItem = oDAL.SGD_Chart_Dashboard_DocNoLeidoOficina("10103"); //(codDependencia);

            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }

        public JsonResult _DocumentosAtendidoTotal()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_Chart_Dashboard_DocumentosAtendidoTotal("10103"); //(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }

        public JsonResult _ChartDocAtendidos()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);

            var oDataItem = oDAL.SGD_Chart_Dashboard_DocAtendidos("10103"); //(codDependencia);

            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }

        public JsonResult _ChartDocRecibidos()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);

            var oDataItem = oDAL.SGD_Chart_Dashboard_DocRecibido("10103"); //(codDependencia);

            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }

        public JsonResult _DocumentosRecibidoTotal()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_Chart_Dashboard_DocumentosRecibidoTotal("10103"); //(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }


        public JsonResult _Documentosparadespacho_total()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            // var oDataItem = oDAL.SGD_Chart_Dashboard_DocumentosProyectoTotal(codDependencia);
            var oDataItem = oDAL.SGD_Chart_Dashboard_Documentosparadespacho_total("10114"); //(codDependencia);

            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }


        public JsonResult _DocumentosDespacho()
        {
            var oDAL = new DAL_Indicador();
            var codDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var oDataItem = oDAL.SGD_Chart_Dashboard_DocumentosDespacho("10114"); //(codDependencia);
            return Json(oDataItem, JsonRequestBehavior.AllowGet);
        }


    }
}
