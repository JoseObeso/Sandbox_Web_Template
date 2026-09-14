using System;
using System.Collections.Generic;

namespace SRSgd.Entities.Principal
{
    public class BE_Indicador
    {

        

        public int NDocumentosDia { get; set; }
        public int NDocumentosSemana { get; set; }
        public int NDocumentosMes { get; set; }
        public int NMemorandos { get; set; }
        public int NInformes { get; set; }
        public int NOficios { get; set; }

        public int NEnBandeja { get; set; }
        public int NEnBandejaProfesional { get; set; }
        public int NEnProyecto { get; set; }
        public int NUrgentes { get; set; }
        public int NMuyUrgentes { get; set; }
        public int NVencidos { get; set; }
        public int NRecibidos { get; set; }
        public int NRecibidosProfesional { get; set; }
        public int NEnDespacho { get; set; }



        

         


    }



    public class BE_DataDashboard
    {
        public string  V_mes { get; set; }
        public string V_doc { get; set; }
        public string V_dep { get; set; }
        public string V_Anio { get; set; }
        public int I_dia { get; set; }
        public int I_total { get; set; }
        public int I_anio { get; set; }
        public string V_cdoc_desdoc { get; set; }
        public int I_total_doc_emitidos { get; set; }
        public int I_total_ultimos_doc_emitidos { get; set; }
        public int I_porcentaje_ultimos_doc { get; set; }


    }











}
