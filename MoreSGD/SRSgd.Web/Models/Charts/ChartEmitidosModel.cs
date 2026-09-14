using SRSgd.Entities.General;
using SRSgd.Entities.Reportes;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace SRSgd.Web.Models.Charts
{
    public class ChartEmitidosModel
    {
        public List<BE_Dependencia> LstDependencias { get; set; }
        public List<BE_TipoDocumento> LstTipoDocumentos { get; set; }
        public List<SelectListItem> LstMesesI { get; set; }
        public List<SelectListItem> LstMesesF { get; set; }
        public List<SelectListItem> LstAnios { get; set; }
        public List<SelectListItem> LstTipo { get; set; }
        public BE_EmisionFiltro _Filtros { get; set; }
        public List<BE_Dependencia> LstDependenciasDestino { get; set; }

    }
}