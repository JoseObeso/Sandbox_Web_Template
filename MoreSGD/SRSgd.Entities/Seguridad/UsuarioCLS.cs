using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRSgd.Entities.Seguridad
{
   public class UsuarioCLS
    {

        public string ConsultaOficinasVisibles { get; set; }
        public string ConsultaOficinasDependientes { get; set; }
        public string ConsultaOficinas { get; set; }
        public int Iidformulario { get; set; }
        public string FormularioDefecto { get; set; }
        public EmpleadoCLS Empleado { get; set; }
        public string Vpersona { get; set; }
        public string ConsultaOficinasCargo { get; set; }
        public int Iintentos { get; set; }
        public int Iidusuarioedita { get; set; }
        public int Iidusuarioregistra { get; set; }
        public bool Bbloqueado { get; set; }
        public bool Bhabilitado { get; set; }
        public int Iidpersona { get; set; }
        public string Vclave { get; set; }
        public string Vnombre { get; set; }
        public int Iidusuario { get; set; }
        public int Isesiontotal { get; set; }
        public int Iactualizoclave { get; set; }

    }
}
