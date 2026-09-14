using SRSgd.Entities.General;
using SRSgd.Entities.Reportes;
using System;
using System.Collections.Generic;
using System.Data;

namespace SRSgd.Web.Models.Reporting
{
    public class RepoEmitidosModel
    {
        public List<BE_Dependencia> LstDependencias { get; set; }
        public List<BE_Dependencia> LstDependenciasDestino { get; set; }
        public List<BE_TipoDocumento> LstTipoDocumentos { get; set; }
        public List<BE_TipoDocumento> LstTipoDocumentosEmitidos { get; set; }
        public List<BE_EstadoTran> LstEstadosTran { get; set; }        
        public DataTable LstData { get; set; }
        public BE_EmisionFiltro _Filtros { get; set; }

    }
}