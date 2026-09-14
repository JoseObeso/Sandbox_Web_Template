using System;
using System.Collections.Generic;


namespace SRSgd.Entities.Seguridad
{
    public class BE_Usuario
    {
        public string UserLogin { get; set; }

       

       


        public string CodEmpleado { get; set; }
        public string Password { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Nombre { get; set; }
        public string Dependencia { get; set; }
        public string FechaModificacionClave { get; set; }
        public char EstadoActivo { get; set; }
        public int NroIntentos { get; set; }
        public string CEMP_CO_CARGO { get; set; }

        
    }
}
