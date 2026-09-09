<?php

define('DIRECCION_URL', 'http://localhost/rrhh/');
define('INSTITUCION', 'HOSPITAL DE EMERGENCIA DE VILLA EL SALVADOR - LIMA - PERU ');
define('ENLACE', 'legajos');
// define( 'DSN_W', "odbc:Driver={SQL Server};Server=192.168.32.123;Database=HEVES_RRHH; Uid=consultant; Pwd=s@%e.2016Qser;" );
define('DSN_W', 'odbc:Driver={SQL Server};Server=PRINCIPAL;Database=HEVES_RRHH; Uid=sa; Pwd=12345678;');

define('SERVIDOR', DIRECCION_URL);
define('BASE_URL', DIRECCION_URL.ENLACE.'/');
define('NOMBRE_APP', strtoupper(ENLACE));
define('DEFAULT_CONTROLLER', 'index');
define('DEFAULT_LAYOUT', 'default');
define('DB_CHAR', 'utf8');
define('LIMIT_REGXPAG', 9);
define('LIMIT_PAGEVIEW', 6);
define('RUTA_PUBLIC', DIRECCION_URL.'public/');
define('RUTA_PUBLIC_CSS', DIRECCION_URL.'public/css');
define('RUTA_PUBLIC_JS', DIRECCION_URL.'public/js/');
define('RUTA_PUBLIC_GRA', DIRECCION_URL.'public/gra/');
define('RUTA_PUBLIC_PDF', DIRECCION_URL.'public/pdf/');
define('RUTA_PUBLIC_PERFIL', DIRECCION_URL.'public/perfil/');
