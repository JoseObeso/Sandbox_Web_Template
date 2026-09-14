using System;
using System.Collections.Generic;

namespace SRSgd.Entities.Charts
{
    public class Json_GeneradosMain
    {

        public string CodTipoDocumento { get; set; }
        public string DescTipoDocumento { get; set; }
        public int Anio { get; set; }
        public int Mes { get; set; }
        public int Dia { get; set; }
        public int Total { get; set; }
        //--PERCENT
        public decimal Porcentaje { get; set; }

    }
}
