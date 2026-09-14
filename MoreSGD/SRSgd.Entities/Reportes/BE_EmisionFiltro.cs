using System;
using System.Collections.Generic;

namespace SRSgd.Entities.Reportes
{
    public class BE_EmisionFiltro
    {
        public string CodDependencia { get; set; }
        public string CodDependenciaDestino { get; set; }
        public string CodTipoDocumento { get; set; }
        public string NroDocumento { get; set; }
        public string NroExpediente { get; set; }
        public string CodEstado { get; set; }
        public string CodEstadoRec { get; set; }
        public string pFiltro { get; set; }
        
        public int MesI { get; set; }
        public int MesF { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fin { get; set; }
        public string Asunto { get; set; }
        // para chart
        public string Vanio { get; set; }
        public string Vmes { get; set; }
        public int Ttotal { get; set; }
        public string TextoFiltro { get; set; }
        public bool Hoy { get; set; }
        public string CodEmpleado { get; set; }
        public int TipoPeriodo { get; set; }
        public string CodProfesional { get; set; }
        public string Vtipo { get; set; }
        public string Codtipo { get; set; }
        public string IdTipo { get; set; }
        public string Descripcion { get; set; }
        public string Vdias { get; set; }
        public string Vdias1 { get; set; }
        public string Vdias2 { get; set; }

        public int Anio { get; set; }
        public int Mes { get; set; }

        public string filtros { get; set; }

        public string base64 { get; set; }

    }
}
