using System;
using System.Collections.Generic;

namespace SRSgd.Entities.Reportes
{
    public class BE_RecepcionFiltro
    {
        public string CodDependencia { get; set; }
        public string CodDependenciaOrigen { get; set; }
        public string CodTipoDocumento { get; set; }
        public string NroDocumento { get; set; }
        public string NroExpediente { get; set; }
        public int IdEstado { get; set; }
        public string TextoFiltro { get; set; }
        public string CodEstado { get; set; }
        public int Anio { get; set; }
        
        public int I_total { get; set; }
        public int Mes { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public bool Hoy { get; set; }
        public string CodEmpleadoAsignado { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fin { get; set; }
        public string Asunto { get; set; }
        public string TipoEmision { get; set; }
        public string Vco_tip_doc { get; set; }
        public string Vcdoc_desdoc { get; set; }
        public string VCEMP_CODEMP { get; set; }
        public string VCEMP_APEPAT { get; set; }
        public string pFiltro { get; set; }

        public string CodTipo { get; set; }


        public string co_est { get; set; }
        public string de_est { get; set; }


    }
}
