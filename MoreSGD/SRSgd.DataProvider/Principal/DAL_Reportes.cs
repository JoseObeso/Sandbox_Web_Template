using Microsoft.Practices.EnterpriseLibrary.Data;
using Oracle.DataAccess.Client;
using Oracle.DataAccess.Types;
using SRSgd.Entities.Reportes;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;

namespace SRSgd.DataProvider.Principal
{
    public class DAL_Reportes
    {

        private readonly Database database;

        public DAL_Reportes()
        {
            DatabaseProviderFactory factory = new DatabaseProviderFactory();
            database = factory.Create("sgdprod");
        }

       






        public DataTable SGD_Reporte_DocumentosEmitidos(BE_EmisionFiltro oFiltro)
        {
            DataTable dt = new DataTable();
            var f1 = oFiltro.FechaInicio.ToShortDateString();
            var f2 = oFiltro.FechaFin.ToShortDateString();

            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.RPT_DOCU_EMITIDOS_ByFiltros"))
            {
                comando.Parameters.Add("P_CodDependencia", OracleDbType.Varchar2, oFiltro.CodDependencia, ParameterDirection.Input);
                comando.Parameters.Add("P_CodTipoDocumento", OracleDbType.Varchar2, oFiltro.CodTipoDocumento, ParameterDirection.Input);
                comando.Parameters.Add("P_CodEstado", OracleDbType.Varchar2, oFiltro.CodEstado, ParameterDirection.Input);
                comando.Parameters.Add("P_FechaInicio", OracleDbType.Varchar2, f1, ParameterDirection.Input);
                comando.Parameters.Add("P_FechaFin", OracleDbType.Varchar2, f2, ParameterDirection.Input);
                comando.Parameters.Add("P_Texto", OracleDbType.Varchar2, oFiltro.TextoFiltro, ParameterDirection.Input);
                comando.Parameters.Add("P_CodEmpleado", OracleDbType.Varchar2, oFiltro.CodEmpleado, ParameterDirection.Input);

                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                using (DataSet ds = database.ExecuteDataSet(comando))
                {
                    dt = ds.Tables[0];
                }
            }

            return dt;
        }


      


       

        public DataTable TotalDiasTranscurridos(string Filtros)
        {
            DataTable dt = new DataTable();
            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.RPT_DIASTRABSCURRIDOS"))
            {
                comando.Parameters.Add("P_FILTER", OracleDbType.Varchar2, Filtros, ParameterDirection.Input);
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                using (DataSet ds = database.ExecuteDataSet(comando))
                {
                    dt = ds.Tables[0];
                }
            }
            return dt;
        }


        public List<BE_EmisionFiltro> ListarAnexos(string numEmision)
        {
            List<BE_EmisionFiltro> lista = new List<BE_EmisionFiltro>();
            try
            {
                //string rpta = "";
                OracleConnection cn;
                cn = new OracleConnection(ConfigurationManager.ConnectionStrings["sgdprod"].ConnectionString);

                cn.Open();
                OracleCommand cmd = new OracleCommand("PKG_DSHB_REPORTES.VER_ANEXOS", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("P_NU_EMI", OracleDbType.Varchar2, numEmision, ParameterDirection.Input);
                cmd.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                OracleDataReader drd = cmd.ExecuteReader();
                while (drd.Read())
                {
                    BE_EmisionFiltro oBE_EmisionFiltro = new BE_EmisionFiltro();
                    oBE_EmisionFiltro.NroDocumento = drd.IsDBNull(2) ? "" : drd.GetString(2);
                    oBE_EmisionFiltro.Anio = drd.IsDBNull(1) ? 0 : drd.GetInt32(1);

                    lista.Add(oBE_EmisionFiltro);
                }
                cn.Close();
            }
            catch (Exception ex)
            {
                lista = new List<BE_EmisionFiltro>();
            }
            return lista;
        }


        


        //16.05.2023

        //Busqueda por nro. de expediente
        public DataTable SGD_Reporte_Expediente(string Filtros)
        {
            DataTable dt = new DataTable();
            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.RPT_EXPEDIENTE"))
            {
                comando.Parameters.Add("P_FILTER", OracleDbType.Varchar2, Filtros, ParameterDirection.Input);
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                using (DataSet ds = database.ExecuteDataSet(comando))
                {
                    dt = ds.Tables[0];
                }
            }
            return dt;
        }


        public List<BE_EmisionFiltro> Diastranscurridos(string numEmisionExp)
        {
            List<BE_EmisionFiltro> lista = new List<BE_EmisionFiltro>();
            try
            {
                OracleConnection cn;
                cn = new OracleConnection(ConfigurationManager.ConnectionStrings["sgdprod"].ConnectionString);

                cn.Open();
                OracleCommand cmd = new OracleCommand("PKG_DSHB_REPORTES.RPT_DIASTRANSCURRIDOS", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("P_FILTER", OracleDbType.Varchar2, numEmisionExp, ParameterDirection.Input);
                cmd.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                OracleDataReader drd = cmd.ExecuteReader();
                while (drd.Read())
                {
                    BE_EmisionFiltro oBE_EmisionFiltro = new BE_EmisionFiltro();
                    oBE_EmisionFiltro.Vdias = drd.IsDBNull(0) ? "" : drd.GetString(0);
                    lista.Add(oBE_EmisionFiltro);
                }
                cn.Close();
            }
            catch (Exception ex)
            {
                lista = new List<BE_EmisionFiltro>();
            }
            return lista;
        }



        //Descargar archivos en PDF
        public string recuperarPDF(string iiddoc)
        {
            string rpta = "";
            try
            {
                OracleConnection cn;
                cn = new OracleConnection(ConfigurationManager.ConnectionStrings["sgdprod"].ConnectionString);

                cn.Open();
                OracleCommand cmd = new OracleCommand("PKG_DSHB_REPORTES.VERDOCUMENTO_PDF", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("P_NU_EMI", OracleDbType.Varchar2, iiddoc, ParameterDirection.Input);
                cmd.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                OracleDataReader drd = cmd.ExecuteReader();
                while (drd.Read())
                {
                    byte[] buffer;
                    if (!drd.IsDBNull(0))
                    {
                        OracleBlob b = drd.GetOracleBlob(0);
                        buffer = (byte[])(drd.GetOracleBlob(0)).Value;
                        rpta = Convert.ToBase64String(buffer);

                    }
                }
                cn.Close();
            }
            catch (Exception ex)
            {
                rpta = "";
            }
            return rpta;
        }




        public string recuperarPDFAnexos(string iiddoc, int correlativo)
        {

            string rpta = "";
            try
            {
                OracleConnection cn;
                cn = new OracleConnection(ConfigurationManager.ConnectionStrings["sgdprod"].ConnectionString);

                cn.Open();
                OracleCommand cmd = new OracleCommand("PKG_DSHB_REPORTES.VER_ANEXOSCORRELATIVO", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("P_NU_EMI", OracleDbType.Varchar2, iiddoc, ParameterDirection.Input);
                cmd.Parameters.Add("P_CORRELA", OracleDbType.Int32, correlativo, ParameterDirection.Input);
                cmd.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                OracleDataReader drd = cmd.ExecuteReader();
                while (drd.Read())
                {
                    byte[] buffer;
                    if (!drd.IsDBNull(0))
                    {
                        OracleBlob b = drd.GetOracleBlob(0);
                        buffer = (byte[])(drd.GetOracleBlob(0)).Value;
                        rpta = Convert.ToBase64String(buffer);

                    }
                }
                cn.Close();
            }
            catch (Exception ex)
            {
                rpta = "";
            }
            return rpta;
        }




        public ArrayList DocumentosPorDependencia(string coddependencia)
        {
            var LstRecibidos = new List<BE_RecepcionFiltro>();
            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.VER_TDOCDEPENDENCIA"))
            {
                comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, coddependencia, ParameterDirection.Input);
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                using (IDataReader lector = database.ExecuteReader(comando))
                {
                    while (lector.Read())
                    {
                        LstRecibidos.Add(new BE_RecepcionFiltro
                        {
                            Vco_tip_doc = lector.IsDBNull(lector.GetOrdinal("CO_TIP_DOC")) ? String.Empty : lector.GetString(lector.GetOrdinal("CO_TIP_DOC")),
                            Vcdoc_desdoc = lector.IsDBNull(lector.GetOrdinal("CDOC_DESDOC")) ? String.Empty : lector.GetString(lector.GetOrdinal("CDOC_DESDOC"))
                        });
                    }
                }
            }
            ArrayList r = new ArrayList();
            r.Add(LstRecibidos);
            return r;
        }


        //Listar documentos  17.05.2023
        public List<BE_EmisionFiltro> ListarDocumentos(string numEmision)
        {
            List<BE_EmisionFiltro> lista = new List<BE_EmisionFiltro>();
            try
            {
                //string rpta = "";
                OracleConnection cn;
                cn = new OracleConnection(ConfigurationManager.ConnectionStrings["sgdprod"].ConnectionString);

                cn.Open();
                OracleCommand cmd = new OracleCommand("PKG_DSHB_REPORTES.VER_LISTARDOCUMENTOS", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("P_NU_EMI", OracleDbType.Varchar2, numEmision, ParameterDirection.Input);
                cmd.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                OracleDataReader drd = cmd.ExecuteReader();
                while (drd.Read())
                {
                    BE_EmisionFiltro oBE_EmisionFiltro = new BE_EmisionFiltro();
                    oBE_EmisionFiltro.NroDocumento = drd.IsDBNull(2) ? "" : drd.GetString(2);
                    oBE_EmisionFiltro.Anio = drd.IsDBNull(1) ? 0 : drd.GetInt32(1);

                    lista.Add(oBE_EmisionFiltro);
                }
                cn.Close();
            }
            catch (Exception ex)
            {
                lista = new List<BE_EmisionFiltro>();
            }
            return lista;
        }



        //DAL Busqueda por Dependencia, tipo documento y año
        ////////public DataTable SGD_Reporte_Documentos(string Filtros)
        ////////{
        ////////    DataTable dt = new DataTable();
        ////////    //using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.RPT_DOCUMENTO_EMITIDOS"))
        ////////    using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.RPT_DOCUMENTO"))
        ////////    {
        ////////        comando.Parameters.Add("P_FILTER", OracleDbType.Varchar2, Filtros, ParameterDirection.Input);
        ////////        comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
        ////////        using (DataSet ds = database.ExecuteDataSet(comando))
        ////////        {
        ////////            dt = ds.Tables[0];
        ////////        }
        ////////    }
        ////////    return dt;
        ////////}

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///  Implementacion MORE SGD
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        public ArrayList SGD_Reporte_Estado()

        {
            var LstEstado = new List<BE_RecepcionFiltro>();
            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.LISTA_ESTADO"))
            {
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                using (IDataReader lector = database.ExecuteReader(comando))
                {
                    while (lector.Read())
                    {
                        LstEstado.Add(new BE_RecepcionFiltro
                        {
                            co_est = lector.IsDBNull(lector.GetOrdinal("CO_EST")) ? String.Empty : lector.GetString(lector.GetOrdinal("CO_EST")),
                            de_est = lector.IsDBNull(lector.GetOrdinal("DE_EST")) ? String.Empty : lector.GetString(lector.GetOrdinal("DE_EST"))
                        });
                    }


                }
            }
            ArrayList r = new ArrayList();
            r.Add(LstEstado);
            return r;
        }

        public ArrayList SGD_Reporte_EstadoRecibido()

        {
            var LstEstado = new List<BE_RecepcionFiltro>();
            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.LISTA_ESTADO_RECEPCION"))
            {
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);
                using (IDataReader lector = database.ExecuteReader(comando))
                {
                    while (lector.Read())
                    {
                        LstEstado.Add(new BE_RecepcionFiltro
                        {
                            co_est = lector.IsDBNull(lector.GetOrdinal("CO_EST")) ? String.Empty : lector.GetString(lector.GetOrdinal("CO_EST")),
                            de_est = lector.IsDBNull(lector.GetOrdinal("DE_EST")) ? String.Empty : lector.GetString(lector.GetOrdinal("DE_EST"))
                        });
                    }


                }
            }
            ArrayList r = new ArrayList();
            r.Add(LstEstado);
            return r;
        }





        //Reporte documentos recibidos
        //20.09.2024

        public DataTable SGD_Reporte_DocumentosRecibidos(BE_RecepcionFiltro oFiltro)

        {
            DataTable dt = new DataTable();
            var f1 = oFiltro.FechaInicio.ToShortDateString();
            var f2 = oFiltro.FechaFin.ToShortDateString();

            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.RPT_DOCU_RECIBIDOS_ByFiltros"))
            {
                comando.Parameters.Add("P_CodDependencia", OracleDbType.Varchar2, oFiltro.CodDependencia, ParameterDirection.Input);
                comando.Parameters.Add("P_CodTipoDocumento", OracleDbType.Varchar2, oFiltro.CodTipoDocumento, ParameterDirection.Input);
                comando.Parameters.Add("P_CodEstado", OracleDbType.Varchar2, oFiltro.CodEstado, ParameterDirection.Input);
                comando.Parameters.Add("P_FechaInicio", OracleDbType.Varchar2, f1, ParameterDirection.Input);
                comando.Parameters.Add("P_FechaFin", OracleDbType.Varchar2, f2, ParameterDirection.Input);
                comando.Parameters.Add("P_Texto", OracleDbType.Varchar2, oFiltro.TextoFiltro, ParameterDirection.Input);
                //comando.Parameters.Add("P_CodEmpleado", OracleDbType.Varchar2, oFiltro.CodEmpleado, ParameterDirection.Input);

                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                using (DataSet ds = database.ExecuteDataSet(comando))
                {
                    dt = ds.Tables[0];
                }
            }

            return dt;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }

}
