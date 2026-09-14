using SRSgd.Entities.General;
using SRSgd.Entities.Reportes;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Mvc;

namespace SRSgd.Web.Models.Reporting
{
    public class RepoRecibidosModel
    {
        public List<BE_Dependencia> LstDependencias { get; set; }
        public List<BE_Dependencia> LstDependenciasOrigen { get; set; }
        public List<BE_TipoDocumento> LstTipoDocumentos { get; set; }
        public List<BE_EstadoTran> LstEstadosTran { get; set; }
        public List<BE_Empleado> LstEmpleadosDestino { get; set; }
        public List<BE_ItemCombo> LstTipoEmision { get; set; }
        public DataTable LstData { get; set; }
        public BE_RecepcionFiltro _Filtros { get; set; }

        public List<SelectListItem> LstTipo { get; set; }
        public List<SelectListItem> LstMesesI { get; set; }
        public List<SelectListItem> LstMesesF { get; set; }
        public List<SelectListItem> LstAnios { get; set; }


    }
}