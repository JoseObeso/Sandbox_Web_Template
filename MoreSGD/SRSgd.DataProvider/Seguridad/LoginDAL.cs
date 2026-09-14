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
    public class LoginDAL
    {



        static string GetMd5Hash(MD5 md5Hash, string input)
        {
            try
            {
                // CONVIERTE UNA CADENA DE ENTRADA EN UN ARREGLO DE BYTES
                byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

                // CREA UN COLECTOR DE CADENAS PARA ALMACENAR LOS BYTES
                // Y CREA UNA CADENA
                StringBuilder sBuilder = new StringBuilder();

                // RECORRE CADA BYTE DE LA CADENA HASH
                // Y DA FORMATO A CADA UNO COMO CADENA HEXADECIMAL
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }

                // RETORNA UNA CADENA HEXADECIMAL
                return sBuilder.ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public UsuarioCLS usuarioLogueado(int iidusuario)
        {
            UsuarioCLS oUsuarioCLS = null;
            try
            {
                using (OracleConnection cn = new OracleConnection(ConfigurationManager.ConnectionStrings["datasource"].ConnectionString))
                {
                    cn.Open();

                    using (OracleCommand cmd = new OracleCommand("ASISTENCIA.USP_PERMISO.USUARIOLOGUEADO", cn)
)
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("P_IIDUSUARIO", Oracle.DataAccess.Client.OracleDbType.Int32, iidusuario, ParameterDirection.Input);
                        cmd.Parameters.Add("R_CURSOR", OracleDbType.RefCursor, ParameterDirection.Output);
                        OracleDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posVNOMBRE = drd.GetOrdinal("VNOMBRE");
                            int posVPERSONA = drd.GetOrdinal("VPERSONA");
                            int posVCARGO = drd.GetOrdinal("VCARGO");
                            int posVOFICINA = drd.GetOrdinal("VOFICINA");
                            int posCORREO = drd.GetOrdinal("CORREO");
                            int posDNI = drd.GetOrdinal("DNI");
                            int posIIDTIPOHORARIO = drd.GetOrdinal("IIDTIPOHORARIO");
                            int posVTIPO = drd.GetOrdinal("VTIPO");
                            int posIIDEMPLEADO = drd.GetOrdinal("IIDEMPLEADO");


                            while (drd.Read())
                            {
                                oUsuarioCLS = new UsuarioCLS();
                                oUsuarioCLS.Iidusuario = iidusuario;
                                oUsuarioCLS.Empleado = new EmpleadoCLS();
                                oUsuarioCLS.Empleado.Vnombre = drd.IsDBNull(posVNOMBRE) ? "" :
                                    drd.GetString(posVNOMBRE);
                                oUsuarioCLS.Empleado.Vempleado = drd.IsDBNull(posVPERSONA) ? "" :
                                   drd.GetString(posVPERSONA);
                                oUsuarioCLS.Empleado.Vcorreo1 = drd.IsDBNull(posCORREO) ? "" :
                                   drd.GetString(posCORREO);
                                oUsuarioCLS.Empleado.Vdni = drd.IsDBNull(posDNI) ? "" :
                                 drd.GetString(posDNI);
                                oUsuarioCLS.Empleado.Vcargo = drd.IsDBNull(posVCARGO) ? "" :
                               drd.GetString(posVCARGO);
                                oUsuarioCLS.Empleado.Voficina = drd.IsDBNull(posVOFICINA) ? "" :
                              drd.GetString(posVOFICINA);
                                oUsuarioCLS.Empleado.Vcargo = drd.IsDBNull(posVCARGO) ? "" :
                            drd.GetString(posVCARGO);
                                oUsuarioCLS.Empleado.IidTipoHorario = drd.IsDBNull(posIIDTIPOHORARIO) ? 0 :
                              drd.GetInt32(posIIDTIPOHORARIO);
                                oUsuarioCLS.Empleado.Vtipo = drd.IsDBNull(posVTIPO) ? "" :
                                drd.GetString(posVTIPO);
                                oUsuarioCLS.Empleado.Iidempleado = drd.IsDBNull(posIIDEMPLEADO) ? 0 :
                              drd.GetInt32(posIIDEMPLEADO);
                            }
                        }
                    }


                    cn.Close();
                }


            }
            catch (Exception ex)
            {
                oUsuarioCLS = new UsuarioCLS();
            }
            return oUsuarioCLS;
        }



        public int LoginAsistencia(string nombreusuario, string contra)
        {
            int rpta = 0;
            try
            {
                using (MD5 md5Hash = MD5.Create())
                {
                    contra = GetMd5Hash(md5Hash, contra);
                }
                using (OracleConnection cn = new OracleConnection(ConfigurationManager.ConnectionStrings["datasource"].ConnectionString))
                {
                    cn.Open();

                    using (OracleCommand cmd = new OracleCommand("ASISTENCIA.USP_PERMISO.LOGIN", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("P_NOMBREUSUARIO", Oracle.DataAccess.Client.OracleDbType.Varchar2, nombreusuario.ToUpper(), ParameterDirection.Input);
                        //contra = GetMd5Hash(contra);
                        cmd.Parameters.Add("P_CONTRA", Oracle.DataAccess.Client.OracleDbType.Varchar2, contra, ParameterDirection.Input);

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
