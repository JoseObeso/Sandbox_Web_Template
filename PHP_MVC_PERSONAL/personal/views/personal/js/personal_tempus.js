var url = 'http://' + document.domain + '/rrhh/personal/',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    url_gra = 'http://' + document.domain + '/rrhh/public/gra';




function mostrar_datatable_personal_tempus() {
    "use strict";

    $('#personal_tempus').DataTable({
        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [10, 20, 25, 50, -1],
            [10, 20, 25, 50, "Todos"]
        ],
        


    });
}




$(document).ready(function () {
    "use strict";

    mostrar_datatable_personal_tempus();


});
