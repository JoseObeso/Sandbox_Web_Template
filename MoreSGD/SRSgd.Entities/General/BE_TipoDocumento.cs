using System;
using System.Collections.Generic;

namespace SRSgd.Entities.General
{
    public class BE_TipoDocumento
    {

        public string CodigoTipoDoc { get; set; }
        public string Descripcion { get; set; }
        public bool DeSalida { get; set; }
        public string VcodDepFiltro { get; set; }

    }


    public class BE_Estado
    {
        public string CodigoTipoEstado { get; set; }
        public string Descripcion { get; set; }
        public bool DeSalida { get; set; }
        public string VcodDepFiltro { get; set; }

    }


}
