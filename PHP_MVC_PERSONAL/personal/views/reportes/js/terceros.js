var url_js = 'http://' + document.domain + '/rrhh/public/js';

 
function mostrar_datatable_terceros() {
    "use strict";

    $('#tabla_terceros').DataTable({
        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"]
        ],
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}


$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    mostrar_datatable_terceros();
    
});
