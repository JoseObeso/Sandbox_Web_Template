using SRSgd.DataProvider.General;
using SRSgd.DataProvider.Principal;
using SRSgd.Entities.General;
using SRSgd.Entities.Reportes;
using SRSgd.Entities.Charts;
using SRSgd.Entities.Seguridad;
using SRSgd.Helper.Constants;
using SRSgd.Web.Models.Reporting;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static SRSgd.Web.MvcApplication;

namespace SRSgd.Web.Controllers
{
    //[Authorize]
    //[SessionExpire]
    public class ReportesController : Controller
    {
        // GET: Reportes
        public ActionResult Index()
        {
            return View();
        }

        // GET: Reportes/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //[Authorize]
        [HttpGet]
        public ViewResult Rpt_DocumentosEmitidos()
        {
            var model = new RepoEmitidosModel();
            var oDAL = new DAL_Combos();
            //var oUserSession = (BE_Usuario)Session["userSession"];
            ///////var codDep = Session["codDependenciaUser"];
            //////string VcodDepFiltro = Session["codDependenciaUser"].ToString();
            string VcodDepFiltro = "10115";

            //model.LstDependencias = oDAL.Listar_DependenciasByPermiso(oUserSession.UserLogin, oUserSession.CodEmpleado);
            model.LstDependenciasDestino = oDAL.ListarDependencias();
            model.LstTipoDocumentos = oDAL.ListarTipoDocumentos();
            model.LstTipoDocumentosEmitidos = oDAL.ListarTipoDocumentosEmitidos(VcodDepFiltro);
            
            model._Filtros = new BE_EmisionFiltro();
            //////model._Filtros.CodDependencia = codDep.ToString();

            return View(model);
        }

        //[Authorize]
        [HttpPost]
        public ViewResult Rpt_DocumentosEmitidos(RepoEmitidosModel oFiltro)//BE_EmisionFiltro oFiltros)
        {
            var oFiltros = new BE_EmisionFiltro();
            oFiltros.CodDependencia = "10107";

            var data = new DataTable();
            try
            {
                DAL_Reportes oDAL = new DAL_Reportes();
                data = oDAL.SGD_Reporte_DocumentosEmitidos(oFiltros);
                oFiltro.LstData = data;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return View(oFiltro);
        }

       

        


        public JsonResult ObtenerData(string codigo)
        {
            var param = new BE_EmisionFiltro();
            var data = new DataTable();

            DAL_Reportes oDAL = new DAL_Reportes();

            data = oDAL.SGD_Reporte_DocumentosEmitidos(param);

            return Json(data, JsonRequestBehavior.AllowGet);
        }
       
       

        [HttpGet]
        public JsonResult Diastranscurridos(string numEmisionExp)
        {
            try
            {
                DAL_Reportes DDependencia = new DAL_Reportes();
                List<BE_EmisionFiltro> lstResultado = DDependencia.Diastranscurridos(numEmisionExp);
                return Json(lstResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Descargar archivos en PDF
        public string ExportarPDF(string iiddoc)
        {
            string rpta = "";
            DAL_Reportes oDAL = new DAL_Reportes();
            rpta = oDAL.recuperarPDF(iiddoc);

            return rpta;
        }


        //Tipo de documento segun seleccion de la dependencia.
        [HttpPost]
        public JsonResult _DocumentosPorDependencia(string coddependencia)
        {
            try
            {
                DAL_Reportes DDependencia = new DAL_Reportes();
                ArrayList lstResultado = DDependencia.DocumentosPorDependencia(coddependencia);
                return Json(lstResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        //Lista de documentos  digital
        [HttpGet]
        public JsonResult listaDocumentos(string numEmision)
        {
            try
            {
                DAL_Reportes DDependencia = new DAL_Reportes();
                List<BE_EmisionFiltro> lstResultado = DDependencia.ListarDocumentos(numEmision);
                return Json(lstResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///  Implementacion MORE SGD
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Lista de documentos recibidos
        //20.09.2024

        //[Authorize]
        [HttpPost]
        public ViewResult Rpt_DocumentosRecibidos(RepoEmitidosModel oFiltro)//BE_EmisionFiltro oFiltros)
        {
            var oFiltros = new BE_RecepcionFiltro();
            oFiltros.CodDependencia = "10107";

            var data = new DataTable();
            try
            {
                DAL_Reportes oDAL = new DAL_Reportes();
                data = oDAL.SGD_Reporte_DocumentosRecibidos(oFiltros);
                oFiltro.LstData = data;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return View(oFiltro);
        }

        //Lista de documentos emitidos
        //20.09.2024
        //10.10.2024
        ////////////////////public PartialViewResult _GridEmitidosViewRecibido(BE_EmisionFiltro pFiltro)
        ////////////////////{
        ////////////////////    var data = new DataTable();
        ////////////////////    if (!string.IsNullOrEmpty(pFiltro.Asunto)) 
        ////////////////////    {
        ////////////////////        try
        ////////////////////        {
        ////////////////////            DAL_Reportes oDAL = new DAL_Reportes();
        ////////////////////            string Filtros = "   AND ES_ELI = '0' AND ES_DOC_EMI NOT IN(5, 7, 9)   AND NU_SEC_EXP IS NOT NULL  ";
        ////////////////////            //var oUserSession = (BE_Usuario)Session["userSession"];
        ////////////////////            //pFiltro.CodEmpleado = oUserSession.CodEmpleado;
        ////////////////////            if (!string.IsNullOrEmpty(pFiltro.CodDependencia)) Filtros += " AND CO_DEP_EMI =  '" + pFiltro.CodDependencia + "'";
        ////////////////////            if (!string.IsNullOrEmpty(pFiltro.Asunto)) Filtros += " AND  UPPER(NROEXPEDIENTE) LIKE UPPER('" + pFiltro.Asunto + "')";
        ////////////////////            Filtros += " ORDER BY FE_EMI DESC ";
        ////////////////////            data = oDAL.SGD_Reporte_Expediente(Filtros);
        ////////////////////        }
        ////////////////////        catch (Exception ex)
        ////////////////////        {
        ////////////////////            throw new Exception(ex.Message);
        ////////////////////        }
        ////////////////////        return PartialView(data);
        ////////////////////    }
        ////////////////////    else
        ////////////////////    {
        ////////////////////        try
        ////////////////////        {
        ////////////////////            DAL_Reportes oDAL = new DAL_Reportes();
        ////////////////////            string Filtros = "AND 1=2";
        ////////////////////            //var oUserSession = (BE_Usuario)Session["userSession"];
        ////////////////////            //pFiltro.CodEmpleado = oUserSession.CodEmpleado;
        ////////////////////            Filtros += " ORDER BY FE_EMI DESC ";
        ////////////////////            data = oDAL.SGD_Reporte_Expediente(Filtros);
        ////////////////////        }
        ////////////////////        catch (Exception ex)
        ////////////////////        {
        ////////////////////            throw new Exception(ex.Message);
        ////////////////////        }

        ////////////////////        return PartialView(data);
        ////////////////////    }
        ////////////////////}



        //////////////////////////////////////////////////////////////////////////////////
        ///Lista de documento emitidos
        ///20.09.2024
        ///



        [HttpPost]
        public JsonResult _GridEmitidosViewEstado()
        {
            try
            {
                DAL_Reportes DEstado = new DAL_Reportes();
                ArrayList lstResultado = DEstado.SGD_Reporte_Estado();
                return Json(lstResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [HttpPost]
        public JsonResult _GridRecibidoViewEstado()

        {
            try
            {
                DAL_Reportes DEstado = new DAL_Reportes();
                ArrayList lstResultado = DEstado.SGD_Reporte_EstadoRecibido();
                return Json(lstResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

}
