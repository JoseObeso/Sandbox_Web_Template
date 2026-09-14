using Newtonsoft.Json;
using SRSgd.DataProvider.Seguridad;
using SRSgd.Entities.General;
 


using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System.Configuration;
using SRSgd.Entities.Seguridad;

namespace SRSgd.Web.Controllers
{
    [HandleError]
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// FECHA: 12-11-2019
        /// </summary>
        /// <param name="empty"></param>
        /// <param name="usuario"></param>
        /// <param name="password"></param>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        /// 


        public async Task<int> valigarlogin(string usuario, string contra)
        {
            int rpta = 0;
            try
            {

                MarcacionDAL oMarcacionDAL = new MarcacionDAL();
                int numeroveces = oMarcacionDAL.LoginPermitido(usuario);

                if (numeroveces > 0)
                {
                    string link = ConfigurationManager.AppSettings["linkSI"].ToString();
                    int iidtiposistema = int.Parse(ConfigurationManager.AppSettings["iidtiposistema"].ToString());
                    LoginDAL oLoginDAL = new LoginDAL();
                    int idusuario = oLoginDAL.LoginAsistencia(usuario, contra);
                    Session["idusuario"] = idusuario;
                    UsuarioCLS oUsuarioCLS = null;
                    try
                    {
                        oUsuarioCLS = oLoginDAL.usuarioLogueado(idusuario);
                        string[] array = oUsuarioCLS.Empleado.Vempleado.Split(' ');
                        string nombre = array[array.Length - 1];
                        Session["userLogin"] = nombre.Substring(0, 1) + nombre.Substring(1).ToLower();

                    }
                    catch (Exception)
                    {
                        Session["userLogin"] = "";
                    }

                    if (idusuario == 0)
                    {
                        Session["userSession"] = null;
                    }
                    else
                    {
                        Session["userSession"] = oUsuarioCLS;                                        
                    }
                    return idusuario;
                }
                else
                {
                    return -1;
                }

            }
            catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        public JsonResult FiltroDependencia(string pUsuario, string pCodEmp)
        {
            try
            {
                var lstResultado = new List<BE_Dependencia>();

                var oDAL = new DAL_Acceso();
                if (!string.IsNullOrEmpty(pUsuario))
                    lstResultado = oDAL.SGD_Listar_DependenciasByUsuario(pUsuario, pCodEmp);
                return Json(lstResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public ActionResult LogOut()
        {

            try
            {                
                FormsAuthentication.SignOut();
                System.Web.HttpContext.Current.Session.RemoveAll();

             
                return RedirectToAction("Index", "Login");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

    }
}
