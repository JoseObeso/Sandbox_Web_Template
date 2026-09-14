using OfficeOpenXml;
using SRSgd.DataProvider.General;
using SRSgd.DataProvider.Principal;
using SRSgd.Entities.Charts;
using SRSgd.Entities.Reportes;
using SRSgd.Web.Models.Charts;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using io=System.IO;
using System.Collections;
using static SRSgd.Web.MvcApplication;
using System.Data;


namespace SRSgd.Web.Controllers
{
    //[Authorize]
    //[SessionExpire]
    public class ChartsController : Controller
    {
        // GET: Charts
        public ActionResult Index()
        {
            return View();
        }




        //[Authorize]
        public ActionResult VChart_DocumentosEmitidos()
        {
            var model = new ChartEmitidosModel();
            var oDAL = new DAL_Combos();

            model.LstDependencias = oDAL.ListarDependencias();
            model.LstTipoDocumentos = oDAL.ListarTipoDocumentos();

            
            var listMeses = new List<SelectListItem>() { new SelectListItem() { Text = "(Todos)", Value = "0" } };
            for (int i = 1; i <= 12; i++)
                listMeses.Add(new SelectListItem() { Text = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i), Value = i.ToString() });
                 model.LstMesesI = listMeses;

          var listAnios = new List<SelectListItem>();
          //  var listAnios = new List<SelectListItem>() { new SelectListItem() { Text = "(Todos)", Value = "0" } };
            for (int i = 2019; i <= 2025; i++)
                listAnios.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });
                model.LstAnios = listAnios;

            return View(model);
        }

        //16.05.2023
        //Grafico por dependencia tipo documento y año
        public JsonResult _ChartResumenAnualProductivo(BE_EmisionFiltro pFiltro)
        {
            var oDAL = new DAL_Charts();

            var dataList = oDAL.SGD_Chart_ResumenAnual_DocumentosEmitidos(pFiltro);
            return Json(dataList, JsonRequestBehavior.AllowGet);
        }




        //////////////////////////////////////////////////////////////////////////////////////
        //CARGA CONTROLES POR PRIMERA VEZ
        //25.09.2024
        //[Authorize]
        public ActionResult Rpt_Reporte()
        {
            var model = new ChartAnualProductivoModel();
            var oDAL = new DAL_Combos();

            model.LstDependencias = oDAL.ListarDependencias();
            model.LstTipoDocumentos = oDAL.ListarTipoDocumentos();

            var listMeses = new List<SelectListItem>() { new SelectListItem() { Text = "(Todos)", Value = "0" } };
            //listMeses.Add(new SelectListItem() { Text = "(Todos)", Value = "0" });
            for (int i = 1; i <= 12; i++)
                listMeses.Add(new SelectListItem() { Text = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i), Value = i.ToString() });

            model.LstMeses = listMeses;

            //var listAnios = new List<SelectListItem>() { new SelectListItem() { Text = "2", Value = "2024" } };
            var listAnios = new List<SelectListItem>();
            for (int i = 2019; i <= 2025; i++)
                listAnios.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });

            model.LstAnios = listAnios;

            return View(model);

        }



        ////
        //LISTADO DE DOCUMENTO EMITIDOS
        //20.09.2024
        ///////////

        public PartialViewResult _GridEmitidosView(BE_EmisionFiltro pFiltro)
        {
            var oDAL = new DAL_Charts();

            var dataList = oDAL.SGD_Reporte_Documentos(pFiltro);
            return PartialView(dataList);
        }

        //LISTADO DE DOCUMENTO RECIBIDOS
        //25.09.2024
        //10.10.2024
        ///////////

 
        public PartialViewResult _GridRecibidoView(BE_RecepcionFiltro pFiltro)

        {
            var oDAL = new DAL_Charts();

            var dataList = oDAL.SGD_Reporte_DocumentosRecibidos(pFiltro);
            return PartialView(dataList);
        }


        //REQUISITO REPORTE RECIBIDOS
        //25.09.2024
        ///////////
        public ActionResult Rpt_ReporteRecibido()

        {
            var model = new ChartAnualProductivoModel();
            var oDAL = new DAL_Combos();

            model.LstDependencias = oDAL.ListarDependencias();
            model.LstTipoDocumentos = oDAL.ListarTipoDocumentos();

            var listMeses = new List<SelectListItem>() { new SelectListItem() { Text = "(Todos)", Value = "0" } };
            //listMeses.Add(new SelectListItem() { Text = "(Todos)", Value = "0" });
            for (int i = 1; i <= 12; i++)
                listMeses.Add(new SelectListItem() { Text = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i), Value = i.ToString() });

            model.LstMeses = listMeses;

            var listAnios = new List<SelectListItem>();
            for (int i = 2019; i <= 2025; i++)
                listAnios.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });

            model.LstAnios = listAnios;

            return View(model);

        }



        //REQUISITO GRAFICOS EMITIDOS
        //29.09.2024
        ///////////
        public ActionResult Grafico_Emitidos()

        {
            var model = new ChartAnualProductivoModel();
            var oDAL = new DAL_Combos();

            model.LstDependencias = oDAL.ListarDependencias();
            model.LstTipoDocumentos = oDAL.ListarTipoDocumentos();

            var listMeses = new List<SelectListItem>() { new SelectListItem() { Text = "(Todos)", Value = "0" } };
            //listMeses.Add(new SelectListItem() { Text = "(Todos)", Value = "0" });
            for (int i = 1; i <= 12; i++)
                listMeses.Add(new SelectListItem() { Text = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i), Value = i.ToString() });

            model.LstMeses = listMeses;

            var listAnios = new List<SelectListItem>();
            for (int i = 2019; i <= 2025; i++)
                listAnios.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });

            model.LstAnios = listAnios;

            return View(model);

        }

        //REQUISITO GRAFICOS EMITIDOS
        //29.09.2024
        ///////////
        public ActionResult Grafico_ResumenTipoDocumento()

        {
            var model = new ChartAnualProductivoModel();
            var oDAL = new DAL_Combos();

            model.LstDependencias = oDAL.ListarDependencias();
            model.LstTipoDocumentos = oDAL.ListarTipoDocumentos();

            var listMeses = new List<SelectListItem>() { new SelectListItem() { Text = "(Todos)", Value = "0" } };
            //listMeses.Add(new SelectListItem() { Text = "(Todos)", Value = "0" });
            for (int i = 1; i <= 12; i++)
                listMeses.Add(new SelectListItem() { Text = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i), Value = i.ToString() });

            model.LstMeses = listMeses;

            var listAnios = new List<SelectListItem>();
            for (int i = 2019; i <= 2025; i++)
                listAnios.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });

            model.LstAnios = listAnios;

            return View(model);

        }

        /// <summary>
        /// opcion graficos
        /// </summary>
        /// <param name="pFiltro"></param>
        /// <returns></returns>
        public JsonResult _ChartResumenDocumentosEmitidosv2(BE_EmisionFiltro pFiltro)
        {
            var oDAL = new DAL_Charts();
            string VDependencia = pFiltro.CodDependencia, V_Mes = pFiltro.Vmes, V_Anio = pFiltro.Vanio;
            var dataList = oDAL.SGD_Chart_ResumenDocumentosEmitidosV02(VDependencia, V_Mes, V_Anio);
            //var dataList = oDAL.SGD_Chart_ResumenDocumentosEmitidosV02(pFiltro);

            return Json(dataList, JsonRequestBehavior.AllowGet);
        }



        public ActionResult Grafico_HistoricoEmision()

        {
            var model = new ChartAnualProductivoModel();
            var oDAL = new DAL_Combos();

            model.LstDependencias = oDAL.ListarDependencias();
            model.LstTipoDocumentos = oDAL.ListarTipoDocumentos();

            ////////var listMeses = new List<SelectListItem>() { new SelectListItem() { Text = "(Todos)", Value = "0" } };
            //////////listMeses.Add(new SelectListItem() { Text = "(Todos)", Value = "0" });
            ////////for (int i = 1; i <= 12; i++)
            ////////    listMeses.Add(new SelectListItem() { Text = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i), Value = i.ToString() });

            ////////model.LstMeses = listMeses;

            var listAnios = new List<SelectListItem>();
            for (int i = 2019; i <= 2025; i++)
                listAnios.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });

            model.LstAnios = listAnios;

            return View(model);

        }


        public JsonResult _ChartHistoricoEmision(BE_EmisionFiltro pFiltro)
        {
            var oDAL = new DAL_Charts();
            ///pFiltro.CodDependencia = Convert.ToString(Session["codDependenciaUser"]);
            var dataList = oDAL.SGD_ChartHistoricoEmision(pFiltro);
            return Json(dataList, JsonRequestBehavior.AllowGet);
        }


        //////////////////////////////////////////////////////////////////////////////////////////

    }
}
