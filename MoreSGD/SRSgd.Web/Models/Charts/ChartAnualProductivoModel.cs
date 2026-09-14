using SRSgd.Entities.General;
using SRSgd.Entities.Reportes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRSgd.Web.Models.Charts
{
    public class ChartAnualProductivoModel
    {

        public List<BE_Dependencia> LstDependencias { get; set; }
        public List<BE_TipoDocumento> LstTipoDocumentos { get; set; }
        public List<BE_Estado> LstEstado { get; set; }
        public List<SelectListItem> LstMeses { get; set; }
        public List<SelectListItem> LstAnios { get; set; }

        public BE_EmisionFiltro _Filtros { get; set; }
    }
}