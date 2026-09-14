using Microsoft.Practices.EnterpriseLibrary.Data;
using Oracle.DataAccess.Client;
using SRSgd.Entities.Charts;
using SRSgd.Entities.Reportes;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;



namespace SRSgd.DataProvider.Principal
{
    public class DAL_Charts
    {
        private readonly Database database;

        public DAL_Charts()
        {
            DatabaseProviderFactory factory = new DatabaseProviderFactory();

            database = factory.Create("sgdprod");
            //database = DatabaseFactory.CreateDatabase();
        }


        //16.05.2023
        //Grafico por Dependencia, tipo documento y año
        public List<Json_EmisionGroup> SGD_Chart_ResumenAnual_DocumentosEmitidos(BE_EmisionFiltro filtros)
        {
            DataTable dt = new DataTable();
            List<Json_EmisionGroup> dataList = new List<Json_EmisionGroup>();

            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_RESUMEN_EMITIDOS"))
            {
                comando.Parameters.Add("P_CodDependencia", OracleDbType.Varchar2, filtros.CodDependencia, ParameterDirection.Input);
                comando.Parameters.Add("P_Anio", OracleDbType.Int32, filtros.Anio, ParameterDirection.Input);
                comando.Parameters.Add("P_Mes", OracleDbType.Int32, filtros.Mes, ParameterDirection.Input);
                comando.Parameters.Add("P_CodTipoDocumento", OracleDbType.Varchar2, filtros.CodTipoDocumento, ParameterDirection.Input);
                comando.Parameters.Add("P_Asunto", OracleDbType.Varchar2, filtros.Asunto, ParameterDirection.Input);
                
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                using (IDataReader reader = database.ExecuteReader(comando))
                {
                    while (reader.Read())
                    {
                        var oItem = new Json_EmisionGroup();
                        oItem.CodTipoDocumento = reader.IsDBNull(reader.GetOrdinal("CodTipoDocumento")) ? String.Empty : reader.GetString(reader.GetOrdinal("CodTipoDocumento"));
                        oItem.DescTipoDocumento = reader.IsDBNull(reader.GetOrdinal("DescTipoDocumento")) ? String.Empty : reader.GetString(reader.GetOrdinal("DescTipoDocumento"));
                        oItem.Mes = reader.IsDBNull(reader.GetOrdinal("Mes")) ? 0 : reader.GetInt32(reader.GetOrdinal("Mes"));
                        oItem.Total = reader.IsDBNull(reader.GetOrdinal("Total")) ? 0 : reader.GetInt32(reader.GetOrdinal("Total"));
                        dataList.Add(oItem);
                    }
                }
            }

            return dataList;
        }

        //////////////////////////////////////////////////////////////////////////////////////////
        //LISTADO DOCUMENTOS EMITIDOS  25.09.2024
        //Lista de documentos por Dependencia, tipo documento y año
        public List<Json_EmisionGroup> SGD_Reporte_Documentos(BE_EmisionFiltro filtros)
        {
            DataTable dt = new DataTable();
            List<Json_EmisionGroup> dataList = new List<Json_EmisionGroup>();

            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.RPT_DOCUMENTO_EMITIDOS"))
            {
                comando.Parameters.Add("P_CodDependencia", OracleDbType.Varchar2, filtros.CodDependencia, ParameterDirection.Input);
                comando.Parameters.Add("P_Anio", OracleDbType.Int32, filtros.Anio, ParameterDirection.Input);
                comando.Parameters.Add("P_Mes", OracleDbType.Int32, filtros.Mes, ParameterDirection.Input);
                comando.Parameters.Add("P_CodTipoDocumento", OracleDbType.Varchar2, filtros.CodTipoDocumento, ParameterDirection.Input);
                comando.Parameters.Add("P_Asunto", OracleDbType.Varchar2, filtros.Asunto, ParameterDirection.Input);
                comando.Parameters.Add("P_Estado", OracleDbType.Varchar2, filtros.CodEstado, ParameterDirection.Input);
                comando.Parameters.Add("P_NroDocumento", OracleDbType.Varchar2, filtros.NroDocumento, ParameterDirection.Input);
                comando.Parameters.Add("P_NroExpediente", OracleDbType.Varchar2, filtros.NroExpediente, ParameterDirection.Input);
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                using (IDataReader reader = database.ExecuteReader(comando))
                {
                    while (reader.Read())
                    {
                        var oItem = new Json_EmisionGroup();
                        oItem.MESDOC = reader.IsDBNull(reader.GetOrdinal("MESDOC")) ? String.Empty : reader.GetString(reader.GetOrdinal("MESDOC"));
                        oItem.DOCUMENTO = reader.IsDBNull(reader.GetOrdinal("DOCUMENTO")) ? String.Empty : reader.GetString(reader.GetOrdinal("DOCUMENTO"));
                        oItem.FECHAEMISION = reader.IsDBNull(reader.GetOrdinal("FECHAEMISION")) ? String.Empty : reader.GetString(reader.GetOrdinal("FECHAEMISION"));
                        oItem.EMPLEADOREMITENTE = reader.IsDBNull(reader.GetOrdinal("EMPLEADOREMITENTE")) ? String.Empty : reader.GetString(reader.GetOrdinal("EMPLEADOREMITENTE"));
                        oItem.ASUNTO = reader.IsDBNull(reader.GetOrdinal("ASUNTO")) ? String.Empty : reader.GetString(reader.GetOrdinal("ASUNTO"));
                        //oItem.NU_EMI = reader.IsDBNull(reader.GetOrdinal("NU_EMI")) ? String.Empty : reader.GetString(reader.GetOrdinal("NU_EMI"));
                        //oItem.ESTADO = reader.IsDBNull(reader.GetOrdinal("DE_EST")) ? String.Empty : reader.GetString(reader.GetOrdinal("DE_EST"));
                        oItem.ESTADO = reader.IsDBNull(reader.GetOrdinal("DE_EST")) ? String.Empty : reader.GetString(reader.GetOrdinal("DE_EST"));
                        oItem.NRODOCUMENTO = reader.IsDBNull(reader.GetOrdinal("NRODOCUMENTO")) ? String.Empty : reader.GetString(reader.GetOrdinal("NRODOCUMENTO"));
                        oItem.NROEXPEDIENTE = reader.IsDBNull(reader.GetOrdinal("NROEXPEDIENTE")) ? String.Empty : reader.GetString(reader.GetOrdinal("NROEXPEDIENTE"));

                        dataList.Add(oItem);
                    }
                }
            }

            return dataList;
        }



        //////////////
        //LISTADO DOCUMENTOS RECIBIDOS  25.09.2024
        //Lista de documentos por Dependencia, tipo documento y año
        public List<Json_EmisionGroup> SGD_Reporte_DocumentosRecibidos(BE_RecepcionFiltro filtros)
        {
            DataTable dt = new DataTable();
            List<Json_EmisionGroup> dataList = new List<Json_EmisionGroup>();

            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_REPORTES.RPT_DOCUMENTO_RECIBIDOS"))
            {
                comando.Parameters.Add("P_CodDependencia", OracleDbType.Varchar2, filtros.CodDependencia, ParameterDirection.Input);
                comando.Parameters.Add("P_Anio", OracleDbType.Int32, filtros.Anio, ParameterDirection.Input);
                comando.Parameters.Add("P_Mes", OracleDbType.Int32, filtros.Mes, ParameterDirection.Input);
                comando.Parameters.Add("P_CodTipoDocumento", OracleDbType.Varchar2, filtros.CodTipoDocumento, ParameterDirection.Input);
                comando.Parameters.Add("P_Asunto", OracleDbType.Varchar2, filtros.Asunto, ParameterDirection.Input);
                comando.Parameters.Add("P_Estado", OracleDbType.Varchar2, filtros.CodEstado, ParameterDirection.Input);
                comando.Parameters.Add("P_NroDocumento", OracleDbType.Varchar2, filtros.NroDocumento, ParameterDirection.Input);
                comando.Parameters.Add("P_NroExpediente", OracleDbType.Varchar2, filtros.NroExpediente, ParameterDirection.Input);
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                using (IDataReader reader = database.ExecuteReader(comando))
                {
                    while (reader.Read())
                    {
                        var oItem = new Json_EmisionGroup();
                        oItem.MESDOC = reader.IsDBNull(reader.GetOrdinal("MESDOC")) ? String.Empty : reader.GetString(reader.GetOrdinal("MESDOC"));
                        oItem.DOCUMENTO = reader.IsDBNull(reader.GetOrdinal("DOCUMENTO")) ? String.Empty : reader.GetString(reader.GetOrdinal("DOCUMENTO"));
                        oItem.FECHAEMISION = reader.IsDBNull(reader.GetOrdinal("FECHAEMISION")) ? String.Empty : reader.GetString(reader.GetOrdinal("FECHAEMISION"));
                        oItem.NROEXPEDIENTE = reader.IsDBNull(reader.GetOrdinal("NROEXPEDIENTE")) ? String.Empty : reader.GetString(reader.GetOrdinal("NROEXPEDIENTE"));
                        oItem.EMPLEADOREMITENTE = reader.IsDBNull(reader.GetOrdinal("EMPLEADOREMITENTE")) ? String.Empty : reader.GetString(reader.GetOrdinal("EMPLEADOREMITENTE"));
                        oItem.ASUNTO = reader.IsDBNull(reader.GetOrdinal("ASUNTO")) ? String.Empty : reader.GetString(reader.GetOrdinal("ASUNTO"));
                        //oItem.NU_EMI = reader.IsDBNull(reader.GetOrdinal("NU_EMI")) ? String.Empty : reader.GetString(reader.GetOrdinal("NU_EMI"));
                        oItem.ESTADO = reader.IsDBNull(reader.GetOrdinal("ESTADORECEPCION")) ? String.Empty : reader.GetString(reader.GetOrdinal("ESTADORECEPCION"));
                        oItem.NRODOCUMENTO = reader.IsDBNull(reader.GetOrdinal("NRODOCUMENTO")) ? String.Empty : reader.GetString(reader.GetOrdinal("NRODOCUMENTO"));
                        oItem.NROEXPEDIENTE = reader.IsDBNull(reader.GetOrdinal("NROEXPEDIENTE")) ? String.Empty : reader.GetString(reader.GetOrdinal("NROEXPEDIENTE"));
                        dataList.Add(oItem);
                    }
                }
            }

            return dataList;
        }



        ///graficos
        ///
        public List<Json_EmisionGroup> SGD_Chart_ResumenDocumentosEmitidosV02(string VDependencia, string V_Mes, string V_Anio)
        {
            DataTable dt = new DataTable();
            List<Json_EmisionGroup> dataList = new List<Json_EmisionGroup>();
            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_TIPODOC_EMITIDOSV2"))
            {
                comando.Parameters.Add("P_DEPENDENCIA", OracleDbType.Varchar2, VDependencia, ParameterDirection.Input);
                comando.Parameters.Add("P_MES", OracleDbType.Varchar2, V_Mes, ParameterDirection.Input);
                comando.Parameters.Add("P_ANIO", OracleDbType.Varchar2, V_Anio, ParameterDirection.Input);
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);


                using (IDataReader reader = database.ExecuteReader(comando))
                {
                    while (reader.Read())
                    {
                        var oItem = new Json_EmisionGroup();
                        oItem.CodTipoDocumento = reader.IsDBNull(reader.GetOrdinal("CodTipoDocumento")) ? String.Empty : reader.GetString(reader.GetOrdinal("CodTipoDocumento"));
                        oItem.DescTipoDocumento = reader.IsDBNull(reader.GetOrdinal("DescTipoDocumento")) ? String.Empty : reader.GetString(reader.GetOrdinal("DescTipoDocumento"));
                        oItem.Total = reader.IsDBNull(reader.GetOrdinal("Total")) ? 0 : reader.GetInt32(reader.GetOrdinal("Total"));

                        dataList.Add(oItem);
                    }
                }
            }

            return dataList;
        }


        ////grafico historico emision
        ///

        public List<Json_EmisionGroup> SGD_ChartHistoricoEmision(BE_EmisionFiltro filtros)    
        {
            DataTable dt = new DataTable();
            List<Json_EmisionGroup> dataList = new List<Json_EmisionGroup>();

            using (OracleCommand comando = (OracleCommand)database.GetStoredProcCommand("PKG_DSHB_CHARTS.CHT_RESUMENANUAL_EMITIDOSV2"))
            {
                comando.Parameters.Add("P_CODDEPENDENCIA", OracleDbType.Varchar2, filtros.CodDependencia, ParameterDirection.Input);
                comando.Parameters.Add("P_CODTIPODOCUMENTO", OracleDbType.Varchar2, filtros.CodTipoDocumento, ParameterDirection.Input);
                comando.Parameters.Add("P_ANIO", OracleDbType.Int32, filtros.Vanio, ParameterDirection.Input);
                //comando.Parameters.Add("P_PROFESIONAL", OracleDbType.Varchar2, filtros.CodProfesional, ParameterDirection.Input);
                comando.Parameters.Add("R_RESULTADO", OracleDbType.RefCursor, ParameterDirection.Output);

                using (IDataReader reader = database.ExecuteReader(comando))
                {
                    while (reader.Read())
                    {
                        var oItem = new Json_EmisionGroup();
                        oItem.DescTipoDocumento = reader.IsDBNull(reader.GetOrdinal("CDOC_DESDOC")) ? String.Empty : reader.GetString(reader.GetOrdinal("CDOC_DESDOC"));
                        oItem.Ianio = reader.IsDBNull(reader.GetOrdinal("ANNO")) ? 0 : reader.GetInt32(reader.GetOrdinal("ANNO"));
                        oItem.Total = reader.IsDBNull(reader.GetOrdinal("TOTAL")) ? 0 : reader.GetInt32(reader.GetOrdinal("TOTAL"));

                        dataList.Add(oItem);
                    }
                }
            }

            return dataList;
        }



    }


}
