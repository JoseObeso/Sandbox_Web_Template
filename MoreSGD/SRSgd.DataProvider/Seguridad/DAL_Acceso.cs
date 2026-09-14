using Microsoft.Practices.EnterpriseLibrary.Data;
using Oracle.DataAccess.Client;
using SRSgd.Entities.General;
using SRSgd.Entities.Seguridad;
using System;
using System.Collections.Generic;
using System.Data;

namespace SRSgd.DataProvider.Seguridad
{
    public class DAL_Acceso
    {
        private readonly Database database;

        public DAL_Acceso()
        {            
            DatabaseProviderFactory factory = new DatabaseProviderFactory();

            database = factory.Create("sgdprod");         
        }

        public BE_Usuario SGD_GET_UsuarioByUserLogin(string pUserLogin, string pContrasena)
        {

            BE_Usuario oUsuario = new BE_Usuario();
            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_SECURITY.GET_USUARIO_ByUserLogin"))
            {
                comando.Parameters.Add("P_UserLogin", OracleDbType.Varchar2, pUserLogin, ParameterDirection.Input);                
                comando.Parameters.Add("P_Password", OracleDbType.Varchar2, pContrasena, ParameterDirection.Input);
                comando.Parameters.Add("CCURSOR_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                using (IDataReader reader = database.ExecuteReader(comando))
                {
                    while (reader.Read())
                    {
                        oUsuario = new BE_Usuario();
                        //oUsuario.ApellidoPaterno = reader.IsDBNull(reader.GetOrdinal("ApellidoPaterno")) ? String.Empty : reader.GetString(reader.GetOrdinal("ApellidoPaterno"));
                        //oUsuario.ApellidoMaterno = reader.IsDBNull(reader.GetOrdinal("ApellidoMaterno")) ? String.Empty : reader.GetString(reader.GetOrdinal("ApellidoMaterno"));
                        //oUsuario.Nombre = reader.IsDBNull(reader.GetOrdinal("Nombre")) ? String.Empty : reader.GetString(reader.GetOrdinal("Nombre"));
                        oUsuario.CodEmpleado = reader.IsDBNull(reader.GetOrdinal("CodEmpleado")) ? String.Empty : reader.GetString(reader.GetOrdinal("CodEmpleado"));
                        oUsuario.UserLogin = reader.IsDBNull(reader.GetOrdinal("CodigoUsuario")) ? String.Empty : reader.GetString(reader.GetOrdinal("CodigoUsuario"));
                        ////oUsuario.Password = reader.IsDBNull(reader.GetOrdinal("Contrasena")) ? String.Empty : reader.GetString(reader.GetOrdinal("Contrasena"));
                        oUsuario.Dependencia = reader.IsDBNull(reader.GetOrdinal("Dependencia")) ? String.Empty : reader.GetString(reader.GetOrdinal("Dependencia"));
                        //oUsuario.NroIntentos = reader.IsDBNull(reader.GetOrdinal("NroIntentos")) ? 0 : reader.GetInt32(reader.GetOrdinal("NroIntentos"));
                        ////oUsuario.CEMP_CO_CARGO = reader.IsDBNull(reader.GetOrdinal("CEMP_CO_CARGO")) ? String.Empty : reader.GetString(reader.GetOrdinal("CEMP_CO_CARGO"));

                    }
                }
            }

            return oUsuario;
        }

        /// <summary>
        /// FECHA: 26-11-19
        /// </summary>
        /// <param name="pUserLogin"></param>
        /// <returns></returns>
        public List<BE_Dependencia> SGD_Listar_DependenciasByUsuario(string pUserLogin, string pCodEmp)
        {
            List<BE_Dependencia> LstDependencia = new List<BE_Dependencia>();
            BE_Dependencia oDependencia;

            using (
                
                
                OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_SECURITY.LIST_DEPENDENCIA_ByUsuario"))
            {

                comando.Parameters.Add("P_UserLogin", OracleDbType.Varchar2, pUserLogin, ParameterDirection.Input);
                comando.Parameters.Add("P_CodEmp", OracleDbType.Varchar2, pCodEmp, ParameterDirection.Input);
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);



                using (IDataReader reader = database.ExecuteReader(comando))
                {
                    while (reader.Read())
                    {
                        oDependencia = new BE_Dependencia();
                        oDependencia.Codigo = reader.IsDBNull(reader.GetOrdinal("CodDependencia")) ? String.Empty : reader.GetString(reader.GetOrdinal("CodDependencia"));
                        oDependencia.Descripcion = reader.IsDBNull(reader.GetOrdinal("DescDependencia")) ? String.Empty : reader.GetString(reader.GetOrdinal("DescDependencia"));

                        LstDependencia.Add(oDependencia);
                    }
                }



            }

            return LstDependencia;
        }


    }
}
