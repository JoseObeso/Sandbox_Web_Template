using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Oracle.DataAccess.Client;
using SRSgd.Entities.Principal;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRSgd.DataProvider.Principal
{
    public class DAL_Indicador
    {

        private readonly Database database;

        public DAL_Indicador()
        {
            //DatabaseProviderFactory factory = new DatabaseProviderFactory(new SystemConfigurationSource());
            //DatabaseFactory.SetDatabaseProviderFactory(factory, false);

            DatabaseProviderFactory factory = new DatabaseProviderFactory();

            database = factory.Create("sgdprod");
            //database = DatabaseFactory.CreateDatabase();
        }

        /// <summary>
        /// FECHA: 26-09-19
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public DataTable SGD_Listar_Cargos(string filter)
        {
            DataTable dt = new DataTable();
            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PK_SGD_CONSULTAS.LIST_CARGO"))
            {
                comando.Parameters.Add("P_FILTRO", OracleDbType.Varchar2, filter, ParameterDirection.Input);
                comando.Parameters.Add("CCURSOR_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                using (DataSet ds = database.ExecuteDataSet(comando))
                {
                    dt = ds.Tables[0];
                }
            }

            return dt;
        }


        /// <summary>
        /// 21-01-2020
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        /// 
        public BE_Indicador SGD_Chart_Dashboard_Indicador_A(string CodDependencia, int Anio)
        {
            DataTable dt = new DataTable();
            BE_Indicador oIndicador = new BE_Indicador();

            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_INDICADORES_A"))
            {
                comando.Parameters.Add("P_CodDependencia", OracleDbType.Varchar2, CodDependencia, ParameterDirection.Input);
                //comando.Parameters.Add("P_TipoPeriodo", OracleDbType.Int32, filtros.TipoPeriodo, ParameterDirection.Input);
                //comando.Parameters.Add("P_Mes", OracleDbType.Int32, filtros.MesI, ParameterDirection.Input);
                comando.Parameters.Add("P_Anio", OracleDbType.Int32, Anio, ParameterDirection.Input);
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                using (IDataReader reader = database.ExecuteReader(comando))
                {
                    while (reader.Read())
                    {
                        oIndicador.NEnBandeja = reader.IsDBNull(reader.GetOrdinal("NEnBandeja")) ? 0 : reader.GetInt32(reader.GetOrdinal("NEnBandeja"));
                        oIndicador.NEnBandejaProfesional = reader.IsDBNull(reader.GetOrdinal("NEnBandejaProf")) ? 0 : reader.GetInt32(reader.GetOrdinal("NEnBandejaProf"));
                        oIndicador.NEnProyecto = reader.IsDBNull(reader.GetOrdinal("NEnProyecto")) ? 0 : reader.GetInt32(reader.GetOrdinal("NEnProyecto"));
                        oIndicador.NUrgentes = reader.IsDBNull(reader.GetOrdinal("NUrgentes")) ? 0 : reader.GetInt32(reader.GetOrdinal("NUrgentes"));
                        oIndicador.NMuyUrgentes = reader.IsDBNull(reader.GetOrdinal("NMuyUrgentes")) ? 0 : reader.GetInt32(reader.GetOrdinal("NMuyUrgentes"));
                        oIndicador.NVencidos = reader.IsDBNull(reader.GetOrdinal("NVencidos")) ? 0 : reader.GetInt32(reader.GetOrdinal("NVencidos"));
                        oIndicador.NRecibidos = reader.IsDBNull(reader.GetOrdinal("NRecibidos")) ? 0 : reader.GetInt32(reader.GetOrdinal("NRecibidos"));
                        oIndicador.NRecibidosProfesional = reader.IsDBNull(reader.GetOrdinal("NRecibidosProf")) ? 0 : reader.GetInt32(reader.GetOrdinal("NRecibidosProf"));
                        oIndicador.NEnDespacho = reader.IsDBNull(reader.GetOrdinal("NEnDespacho")) ? 0 : reader.GetInt32(reader.GetOrdinal("NEnDespacho"));

                    }
                }

            }

            return oIndicador;
        }

      
        /// <summary>
        /// ROLANDO
        /// </summary>
        /// <param name="codDependencia"></param>
        /// <returns></returns>
        /// 
        //16.05.2023

        public List<BE_DataDashboard> SGD_GeneradoAnio(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_GENERADOANIO"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {

                                I_anio = lector.IsDBNull(lector.GetOrdinal("ANNO")) ? 0 : lector.GetInt32(lector.GetOrdinal("ANNO")),
                                V_mes = lector.IsDBNull(lector.GetOrdinal("MES")) ? String.Empty : lector.GetString(lector.GetOrdinal("MES")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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


        public List<BE_DataDashboard> SGD_GeneradoMes(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_GENERADOMES"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                I_dia = lector.IsDBNull(lector.GetOrdinal("DIA")) ? 0 : lector.GetInt32(lector.GetOrdinal("DIA")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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

        public List<BE_DataDashboard> SGD_GeneradoDia(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_GENERADODIA"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                I_dia = lector.IsDBNull(lector.GetOrdinal("DIA")) ? 0 : lector.GetInt32(lector.GetOrdinal("DIA")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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

        public List<BE_DataDashboard> SGD_TotalPorAnio(string codDependencia)

        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_TOTALANIO"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                I_anio = lector.IsDBNull(lector.GetOrdinal("ANNO")) ? 0 : lector.GetInt32(lector.GetOrdinal("ANNO")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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


        public List<BE_DataDashboard> SGD_TotalPorTipoDocumento(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_TOTALTIPODOC"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                V_doc = lector.IsDBNull(lector.GetOrdinal("DOC")) ? String.Empty : lector.GetString(lector.GetOrdinal("DOC")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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


        public List<BE_DataDashboard> SGD_TotalPorEstado(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_TOTALESTADO"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                V_doc = lector.IsDBNull(lector.GetOrdinal("DOC")) ? String.Empty : lector.GetString(lector.GetOrdinal("DOC")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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

        public List<BE_DataDashboard> SGD_TotalEmitidos(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_TOTALEMISION"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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

        public List<BE_DataDashboard> SGD_TotalPorDependencia(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_TOTALDEPEN"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {

                                V_dep = lector.IsDBNull(lector.GetOrdinal("DEP")) ? String.Empty : lector.GetString(lector.GetOrdinal("DEP")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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

        

        public List<BE_DataDashboard> SGD_DocumentosTotalAnioPIDE(string codDependencia)

        {
                try
                {
                    var lista = new List<BE_DataDashboard>();
                    using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_DASHBOARD_TOTALANIOPIDE"))
                    {
                        comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                        comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                        using (IDataReader lector = database.ExecuteReader(comando))
                        {
                            while (lector.Read())
                            {
                                lista.Add(new BE_DataDashboard
                                {
                                    I_anio = lector.IsDBNull(lector.GetOrdinal("ANIO")) ? 0 : lector.GetInt32(lector.GetOrdinal("ANIO")),
                                    I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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



        public List<BE_DataDashboard> SGD_Chart_Dashboard_DocumentosNoleidoTotal(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.DOCNOLEIDOOFITOTAL"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {


                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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


        public List<BE_DataDashboard> SGD_Chart_Dashboard_DocNoLeidoOficina(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.DOCNOLEIDOOFI"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                V_mes = lector.IsDBNull(lector.GetOrdinal("MES")) ? String.Empty : lector.GetString(lector.GetOrdinal("MES")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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



        public List<BE_DataDashboard> SGD_Chart_Dashboard_DocumentosAtendidoTotal(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.DOCATENDIDOSTOTAL"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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


        public List<BE_DataDashboard> SGD_Chart_Dashboard_DocAtendidos(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.DOCATENDIDOS"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                V_mes = lector.IsDBNull(lector.GetOrdinal("MES")) ? String.Empty : lector.GetString(lector.GetOrdinal("MES")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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


        public List<BE_DataDashboard> SGD_Chart_Dashboard_DocumentosRecibidoTotal(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.DOCRECIBIDOTOTAL"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {


                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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


        public List<BE_DataDashboard> SGD_Chart_Dashboard_DocRecibido(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.DOCRECIBIDO"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                V_mes = lector.IsDBNull(lector.GetOrdinal("MES")) ? String.Empty : lector.GetString(lector.GetOrdinal("MES")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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




        public List<BE_DataDashboard> SGD_Chart_Dashboard_DocumentosDespacho(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.DOCDESPACHO"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {

                                //I_anio = lector.IsDBNull(lector.GetOrdinal("ANNO")) ? 0 : lector.GetInt32(lector.GetOrdinal("ANNO")),
                                V_mes = lector.IsDBNull(lector.GetOrdinal("MES")) ? String.Empty : lector.GetString(lector.GetOrdinal("MES")),
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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


        public List<BE_DataDashboard> SGD_Chart_Dashboard_Documentosparadespacho_total(string codDependencia)
        {
            try
            {
                var lista = new List<BE_DataDashboard>();
                using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.DOCDESPACHOTOTAL"))
                {
                    comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, codDependencia, ParameterDirection.Input);
                    comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                    using (IDataReader lector = database.ExecuteReader(comando))
                    {
                        while (lector.Read())
                        {
                            lista.Add(new BE_DataDashboard
                            {
                                I_total = lector.IsDBNull(lector.GetOrdinal("TOTAL")) ? 0 : lector.GetInt32(lector.GetOrdinal("TOTAL"))
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
