using Microsoft.Practices.EnterpriseLibrary.Data;
using Oracle.DataAccess.Client;
using SRSgd.Entities.General;
using System;
using System.Collections.Generic;
using System.Data;

namespace SRSgd.DataProvider.General
{
    public class DAL_Combos
    {


        private readonly Database database;

        public DAL_Combos()
        {
            DatabaseProviderFactory factory = new DatabaseProviderFactory();

            database = factory.Create("sgdprod");

        }

        /// <summary>
        /// FECHA: 04-10-19
        /// </summary>
        /// <returns></returns>
        public List<BE_Dependencia> ListarDependencias()
        {
            {
                try
                {
                    var lista = new List<BE_Dependencia>();
                    using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_COMBOS.LISTAR_DEPENDENCIA"))
                    {
                        //comando.Parameters.Add("P_FILTRO", OracleDbType.Varchar2, "", ParameterDirection.Input);
                        comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                        using (IDataReader lector = database.ExecuteReader(comando))
                        {
                            while (lector.Read())
                            {
                                lista.Add(new BE_Dependencia
                                {
                                    Codigo = lector.GetString(lector.GetOrdinal("CodigoDependencia")),
                                    Descripcion = lector.IsDBNull(lector.GetOrdinal("Descripcion")) ? String.Empty : lector.GetString(lector.GetOrdinal("Descripcion")),
                                    Sigla = lector.IsDBNull(lector.GetOrdinal("Sigla")) ? String.Empty : lector.GetString(lector.GetOrdinal("Sigla"))
                                });
                            }
                        }
                    }

                    return lista;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

            }


        }

        /// <summary>
        /// FECHA: 04-12-19
        /// </summary>
        /// <param name="pCodUsuario"></param>
        /// <param name="pCodEmpleado"></param>
        /// <returns></returns>
        public List<BE_Dependencia> Listar_DependenciasByPermiso(string pCodUsuario, string pCodEmpleado)
        {
            List<BE_Dependencia> LstDependencia = new List<BE_Dependencia>();
            BE_Dependencia oDependencia;

            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_COMBOS.LISTAR_DEPENDENCIA_ByPermiso"))
            {

                comando.Parameters.Add("P_CodUsuario", OracleDbType.Varchar2, pCodUsuario, ParameterDirection.Input);
                comando.Parameters.Add("P_CodEmpleado", OracleDbType.Varchar2, pCodEmpleado, ParameterDirection.Input);
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


        /// <summary>
        /// FECHA: 04-10-19
        /// </summary>
        /// <returns></returns>
        public List<BE_TipoDocumento> ListarTipoDocumentos()
        {
            {
                try
                {
                    var lista = new List<BE_TipoDocumento>();
                    //string total;

                    using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_COMBOS.LISTAR_TIPODOCUMENTO"))
                    {

                        // comando.Parameters.Add("P_FILTRO", OracleDbType.Varchar2, codDepFiltro, ParameterDirection.Input);
                        comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                        using (IDataReader lector = database.ExecuteReader(comando))
                        {
                            //total = comando.Parameters["R_TOTAL"].Value.ToString();

                            while (lector.Read())
                            {
                                lista.Add(new BE_TipoDocumento
                                {
                                    CodigoTipoDoc = lector.GetString(lector.GetOrdinal("CodigoTipoDoc")),
                                    Descripcion = lector.IsDBNull(lector.GetOrdinal("Descripcion")) ? String.Empty : lector.GetString(lector.GetOrdinal("Descripcion"))
                                });
                            }
                        }
                    }

                    return lista;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

            }


        }


        // oDAL.ListarTipoDocumentosEmitidos(VcodDepFiltro);




        public List<BE_TipoDocumento> ListarTipoDocumentosEmitidos(string VcodDepFiltro)
        {
            {
                try
                {
                    var lista = new List<BE_TipoDocumento>();

                    //string total;

                    using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_COMBOS.LISTAR_TIPODOCUMENTOEMITIDOS"))
                    {

                        comando.Parameters.Add("P_DEPENDENCIA", OracleDbType.Varchar2, VcodDepFiltro, ParameterDirection.Input);
                        comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                        using (IDataReader lector = database.ExecuteReader(comando))
                        {
                            //total = comando.Parameters["R_TOTAL"].Value.ToString();

                            while (lector.Read())
                            {
                                lista.Add(new BE_TipoDocumento
                                {
                                    CodigoTipoDoc = lector.GetString(lector.GetOrdinal("CodigoTipoDoc")),
                                    Descripcion = lector.IsDBNull(lector.GetOrdinal("Descripcion")) ? String.Empty : lector.GetString(lector.GetOrdinal("Descripcion"))
                                });
                            }
                        }
                    }

                    return lista;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

            }


        }





        public List<BE_EstadoTran> ListarEstadosPorTipoTransaccion(string codTransaccion)
        {
            {
                try
                {
                    var lista = new List<BE_EstadoTran>();
                    //string total;

                    using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_COMBOS.LISTAR_ESTADO_ByTran"))
                    {

                        comando.Parameters.Add("P_Transaccion", OracleDbType.Varchar2, codTransaccion, ParameterDirection.Input);
                        comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                        using (IDataReader lector = database.ExecuteReader(comando))
                        {

                            while (lector.Read())
                            {
                                lista.Add(new BE_EstadoTran
                                {
                                    CodigoEstado = lector.GetString(lector.GetOrdinal("CodigoEstado")),
                                    Descripcion = lector.IsDBNull(lector.GetOrdinal("Descripcion")) ? String.Empty : lector.GetString(lector.GetOrdinal("Descripcion"))
                                });
                            }
                        }
                    }

                    return lista;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

            }

        }


        public List<BE_Empleado> ListarEmpleadosPorDependencia(string codDependencia)
        {
            try
            {
                var lista = new List<BE_Empleado>();
                //string total;

                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_COMBOS.LISTAR_EMPLEADO_ByDepend"))
                {
                    comando.Parameters.Add("P_CodDependencia", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_Empleado
                            {
                                CodEmpleado = lector.IsDBNull(lector.GetOrdinal("CodigoEmpleado")) ? String.Empty : lector.GetString(lector.GetOrdinal("CodigoEmpleado")),
                                NombreCompleto = lector.IsDBNull(lector.GetOrdinal("NombreCompleto")) ? String.Empty : lector.GetString(lector.GetOrdinal("NombreCompleto"))
                            });
                        }
                    }
                }

                return lista;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

    }
}
