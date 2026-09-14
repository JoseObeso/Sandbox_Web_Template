using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Configuration;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using SRSgd.Entities.Seguridad;

namespace SRSgd.DataProvider.Seguridad
{
   public class MarcacionDAL
    {

        public int LoginPermitido(string nombreusuario)
        {
            int rpta = 0;
            try
            {
                using (OracleConnection cn = new OracleConnection(ConfigurationManager.ConnectionStrings["datasource"].ConnectionString))
                {
                    cn.Open();

                    using (OracleCommand cmd = new OracleCommand("ASISTENCIA.USP_PERMISO.LOGUEOMARCACION1", cn)
)
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("P_NOMBREUSUARIO", Oracle.DataAccess.Client.OracleDbType.Varchar2, nombreusuario.ToUpper(), ParameterDirection.Input);
                        cmd.Parameters.Add("R_CURSOR", OracleDbType.RefCursor, ParameterDirection.Output);
                        var obj = cmd.ExecuteScalar();
                        if (obj != null)
                        {
                            rpta = int.Parse(obj.ToString());
                        }
                        else
                        {
                            rpta = 0;
                        }
                    }


                    cn.Close();
                }


            }
            catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }




        



    



    }
}
