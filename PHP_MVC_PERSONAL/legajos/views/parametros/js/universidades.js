var url_js = 'http://' + document.domain + '/rrhh/public/js';


function mostrar_dtable_universidades() {
    "use strict";
    $('#universidades').DataTable({
        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [20, 25, 50, -1],
            [20, 25, 50, "Todos"]
        ]
    });
}


$(document).ready(function () {
    "use strict";
    mostrar_dtable_universidades();

});
