using System;
using System.Collections.Generic;
using System.Globalization;

namespace SRSgd.Entities.Charts
{
    public class Json_EmisionGroup
    {
        public string CodTipoDocumento { get; set; }
        public string DependenciaDestino { get; set; }

        public string DescTipoDocumento { get; set; }
        public string CodDependencia { get; set; }
        public string NombreDependencia { get; set; }
        public int Mes { get; set; }

        public int Ianio { get; set; }
        public int Total { get; set; }
        public string MESDOC { get; set; }
        public string DOCUMENTO { get; set; }
        public string FECHAEMISION { get; set; }
        public string NROEXPEDIENTE { get; set; }
        public string EMPLEADOREMITENTE { get; set; }
        public string ASUNTO { get; set; }
        public string NU_EMI { get; set; }
        public string ESTADO { get; set; }
        public string NRODOCUMENTO { get; set; }
        public string DescTipoEspecialista { get; set; }

        public string MesNombre
        {
            get
            {
                return this.Mes == 0 ? "" : CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(this.Mes);
            }
            set { this.MesNombre = value; }
        }

    }
}
