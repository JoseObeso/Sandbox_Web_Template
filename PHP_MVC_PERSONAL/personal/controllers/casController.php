<?php

class casController extends Controller {
    public

    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "dni" ] ) && $_SESSION[ "usuario" ][ "dni" ] != '' ) {} else {
            header( 'location: /' );
        }
    }

    public

    function index() {
        $this->_view->titulo = 'Sistema : ' . ENLACE;
        $this->_view->setJs( array( 'index' ) );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_view->renderizar( 'index', false );
    }


  // modificar_registro_contrato_cas
    // 
    public

    function datos() {
        $this->_view->titulo = 'Registro de Personal CAS - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'datos' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $this->_listar_tipos_documentos = $this->loadModel( 'parametros' );
                $this->_view->listar_tipos_documentos = $this->_listar_tipos_documentos->ListarTipoDocumento();
                $this->_view->listar_paises = $this->_listar_tipos_documentos->ListarPaises();
                $this->_view->renderizar( 'datos', false );

            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function buscar_por_nombre_cas() {
        $buscar_por_nombre = utf8_decode( trim( $_POST[ "nombres" ] ) );
        $this->_buscar_nombres_cas = $this->loadModel( 'cas' );
        $buscar_y_personal_cas = $this->_buscar_nombres_cas->getListadoPersonalCas( $buscar_por_nombre );
        echo $buscar_y_personal_cas;

    }



    public

    function verificar_si_existe_nro_documento_cas() {
        $buscar_por_nombre = utf8_decode( trim( $_POST[ "nro_doc" ] ) );
        $this->_buscar_nombres_cas = $this->loadModel( 'cas' );
        $buscar_y_personal_cas = $this->_buscar_nombres_cas->getListadoPersonalCas( $buscar_por_nombre );
        echo $buscar_y_personal_cas;

    }



    public

    function grabar_registro_cas() {

        $idpais = $_POST[ "idpais" ];
        $iddocu = $_POST[ "iddocu" ];
        $nro_doc = $_POST[ "nro_doc" ];
        $sexo = $_POST[ "sexo" ];
        $paterno = $_POST[ "paterno" ];
        $materno = $_POST[ "materno" ];
        $apellido_casada = $_POST[ "apellido_casada" ];
        $nombres = $_POST[ "nombres" ];
        $apellidos_nombres = $paterno . ' ' . $materno . ' ' . $apellido_casada . ' ' . $nombres;
        $nacimiento = $_POST[ "nacimiento" ];
        $idestado_civil = $_POST[ "idestado_civil" ];
        $iddepar = $_POST[ "iddepar" ];
        $idprovin = $_POST[ "idprovin" ];
        $iddistri = $_POST[ "iddistri" ];
        $direccion = utf8_decode($_POST[ "direccion" ]);
        $correo = $_POST[ "correo" ];
        $fijo = $_POST[ "fijo" ];
        $celular = $_POST[ "celular" ];
        $emergencia = $_POST[ "emergencia" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_nuevo_registro = $this->loadModel( 'cas' );
        $ejecutar = $this->grabar_nuevo_registro->GrabarRegistroCAS( $idpais, $iddocu, $nro_doc, $sexo, $paterno, $materno, $apellido_casada, $nombres, $apellidos_nombres, $nacimiento, $idestado_civil, $iddepar, $idprovin, $iddistri, $direccion, $correo, $fijo, $celular, $emergencia, $observacion, $usuario );
        echo $ejecutar;


    }

    
    
  
    

    public

    function grabar_registro_cas_modificado() {
        $idpersonal = $_POST[ "id" ];
        $idpais = $_POST[ "idpais" ];
        $iddocu = $_POST[ "iddocu" ];
        $nro_doc = $_POST[ "nro_doc" ];
        $sexo = $_POST[ "sexo" ];
        $paterno = $_POST[ "paterno" ];
        $materno = $_POST[ "materno" ];
        $apellido_casada = $_POST[ "apellido_casada" ];
        $nombres = $_POST[ "nombres" ];
        $apellidos_nombres = $paterno . ' ' . $materno . ' ' . $apellido_casada . ' ' . $nombres;
        $nacimiento = $_POST[ "nacimiento" ];
        $idestado_civil = $_POST[ "idestado_civil" ];
        $iddepar = $_POST[ "iddepar" ];
        $idprovin = $_POST[ "idprovin" ];
        $iddistri = $_POST[ "iddistri" ];
        $direccion = utf8_decode($_POST[ "direccion" ]);
        $correo = $_POST[ "correo" ];
        $fijo = $_POST[ "fijo" ];
        $celular = $_POST[ "celular" ];
        $emergencia = $_POST[ "emergencia" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_nuevo_registro = $this->loadModel( 'cas' );
        $ejecutar = $this->grabar_nuevo_registro->GrabarRegistroCASModificado( $idpais, $iddocu, $nro_doc, $sexo, $paterno, $materno, $apellido_casada, $nombres, $apellidos_nombres, $nacimiento, $idestado_civil, $iddepar, $idprovin, $iddistri, $direccion, $correo, $fijo, $celular, $emergencia, $observacion, $usuario, $idpersonal );
        echo $ejecutar;


    }



    public

    function dar_de_baja_cas() {
        $id = $_POST[ "id" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->dar_de_baja_cas = $this->loadModel( 'cas' );
        $buscar = $this->dar_de_baja_cas->DardeBajaCAS( $usuario, $id );
        echo $buscar;

    }


    public

    function habilitar_cas() {
        $id = $_POST[ "id" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->habilitacion_cas = $this->loadModel( 'cas' );
        $buscar = $this->habilitacion_cas->HabilitarCAS( $usuario, $id );
        echo $buscar;

    }

    public

    function ver_habiles_totales() {
        $id = $_POST[ "id" ];
        $this->reporte = $this->loadModel( 'cas' );
        $buscar = $this->reporte->EstadisticaPersonalCas();
        echo $buscar;

    }

    public

    function mostrar_cas_en_cero() {
        $nombres = $_POST[ "nombres" ];
        $this->_buscar_nombres_cas = $this->loadModel( 'cas' );
        $buscar_y_personal_cas = $this->_buscar_nombres_cas->getListadoPersonalCasDeBaja();
        echo $buscar_y_personal_cas;


    }









    /**  FIN DE DATOS PERSONALES CAS */



    /*** FIN de datos de personal identificacion CAS */




    /* Inicio de profesion CAS */

    public

    function profesion() {
        $this->_view->titulo = 'Registro de Personal CAS - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'profesion' ) );
        $this->_view->setJs( array( 'profesion_habilidad' ) );
        $this->_view->setJs( array( 'profesion_especialidad' ) );
        $this->_view->setJs( array( 'profesion_competencias' ) );
        $this->_view->setJs( array( 'profesion_capacitacion' ) );
        $this->_view->setJs( array( 'profesion_entrenamiento' ) );
        $this->_view->setJs( array( 'profesion_funciones' ) );

        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $this->_listar_tipos_documentos = $this->loadModel( 'parametros' );
                $this->_view->listar_tipos_documentos = $this->_listar_tipos_documentos->ListarTipoDocumento();
                $this->_view->listar_paises = $this->_listar_tipos_documentos->ListarPaises();
                $this->listar_todo_personal_en_legajos = $this->loadModel( 'personal' );
                $buscar_por_nombre = '';
                $this->_view->listar_personal_cas_existente = $this->listar_todo_personal_en_legajos->getListadoPersonalCas( $buscar_por_nombre );
                $this->_view->renderizar( 'profesion', false );

            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }


    public

    function buscar_por_nombre_cas_profesion() {
        $buscar_por_nombre = utf8_decode( trim( $_POST[ "nombres" ] ) );
        $this->_buscar_nombres_cas = $this->loadModel( 'personal' );
        $buscar_y_personal_cas = $this->_buscar_nombres_cas->getListadoPersonalCas( $buscar_por_nombre );
        echo $buscar_y_personal_cas;

    }



    public

    function grabar_registro_educacion() {
        $idpersonal = $_POST[ "idpersonal" ];
        $tipoe = $_POST[ "tipoe" ];
        $fechadesde = $_POST[ "fecha_desde" ];
        $fechahasta = $_POST[ "fecha_hasta" ];
        $condicion = $_POST[ "condicion" ];
        $iduniversidad = $_POST[ "iduniversidad" ];
        $institucion = utf8_decode( $_POST[ "institucion" ] );
        $idcargo = $_POST[ "idcargo" ];
        $status = utf8_decode( $_POST[ "status" ] );
        $idcolegio = utf8_decode( $_POST[ "idcolegio" ] );
        $nro_colegiatura = $_POST[ "nro_colegiatura" ];
        $observacion = utf8_decode( $_POST[ "observacion" ] );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_registro_edu = $this->loadModel( 'cas' );
        $ejecutar = $this->grabar_registro_edu->GrabarRegistroEducacion( $idpersonal, $tipoe, $fechadesde, $fechahasta, $condicion, $iduniversidad, $institucion, $idcargo, $status, $idcolegio, $nro_colegiatura, $observacion, $usuario );
        echo $ejecutar;

    }


    public

    function ver_todos_educacion_por_personal() {
        $idpersonal = $_POST[ "idpersonal" ];
        $this->ver_todo_educacion = $this->loadModel( 'cas' );
        $ejecutar = $this->ver_todo_educacion->VerTodosRegistrosEducacion( $idpersonal );
        echo $ejecutar;
    }



    public

    function modificar_registro_educacion() {
        $ideducacion = $_POST[ "ideducacion" ];
        $idpersonal = $_POST[ "idpersonal" ];
        $tipoe = $_POST[ "tipoe" ];
        $fechadesde = $_POST[ "fecha_desde" ];
        $fechahasta = $_POST[ "fecha_hasta" ];
        $condicion = $_POST[ "condicion" ];
        $iduniversidad = $_POST[ "iduniversidad" ];
        $institucion = utf8_decode( $_POST[ "institucion" ] );
        $idcargo = $_POST[ "idcargo" ];
        $status = utf8_decode( $_POST[ "status" ] );
        $idcolegio = utf8_decode( $_POST[ "idcolegio" ] );
        $nro_colegiatura = $_POST[ "nro_colegio" ];
        $observacion = utf8_decode( $_POST[ "observacion" ] );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_registro_edu = $this->loadModel( 'cas' );
        $ejecutar = $this->grabar_registro_edu->ModificarRegistroEducacion( $tipoe, $fechadesde, $fechahasta, $condicion, $iduniversidad, $institucion, $idcargo, $status, $idcolegio, $nro_colegiatura, $observacion, $usuario, $ideducacion );
        echo $ejecutar;
    }


    public

    function eliminar_registro_educacion() {
        $ideducacion = $_POST[ "ideducacion" ];
        $this->eliminar_registro_edu = $this->loadModel( 'cas' );
        $ejecutar = $this->eliminar_registro_edu->EliminarRegistroEducacion( $ideducacion );
        echo $ejecutar;

    }


    public

    function verificar_fecha_habilidad_si_esta_registrado() {
        $fecha_inicio = $_POST[ "fecha_inicio" ];
        $ideducacion = $_POST[ "ideducacion" ];
        $this->ver_si_existe_habilidad_registrado = $this->loadModel( 'cas' );
        $buscar = $this->ver_si_existe_habilidad_registrado->VerSiExisteHabilidadRegistrado( $fecha_inicio, $ideducacion );
        echo $buscar;

    }

    public

    function grabar_registro_de_habilidad() {
        $ideducacion = $_POST[ "ideducacion" ];
        $fecha_inicio = $_POST[ "fecha_inicio" ];
        $fecha_fin = $_POST[ "fecha_fin" ];
        $nro_habilidad = $_POST[ "nro_habilidad" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_habilidad_registrada = $this->loadModel( 'cas' );
        $buscar = $this->grabar_habilidad_registrada->GrabarRegistrodeHabilidad( $ideducacion, $fecha_inicio, $fecha_fin, $nro_habilidad, $usuario );
        echo $buscar;
    }



    public

    function ver_carrera_todo_habilidades() {
        $ideducacion = $_POST[ "ideducacion" ];
        $this->ver_habilidades_registradas = $this->loadModel( 'cas' );
        $buscar = $this->ver_habilidades_registradas->VerTodasHabilides( $ideducacion );
        echo $buscar;


    }

    public

    function personal_cas_eliminar_habilidad() {
        $id = $_POST[ "id" ];
        $this->eliminar_habilidades_registradas = $this->loadModel( 'cas' );
        $buscar = $this->eliminar_habilidades_registradas->EliminarTodasHabilidades( $id );
        echo $buscar;



    }









    /* Fin  de profesion CAS */





    /* Inicio de datos Laborales de profesion CAS */


    public

    function laborales() {
        $this->_view->titulo = 'Registro de Personal CAS - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'laborales' ) );
        $this->_view->setJs( array( 'laborales_adenda' ) );
        $this->_view->setJs( array( 'laborales_cese' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $this->_listar_tipos_documentos = $this->loadModel( 'parametros' );
                $this->_view->listar_tipos_documentos = $this->_listar_tipos_documentos->ListarTipoDocumento();
                $this->_view->listar_paises = $this->_listar_tipos_documentos->ListarPaises();
                $this->listar_todo_personal_en_legajos = $this->loadModel( 'personal' );
                $buscar_por_nombre = '';
                $this->_view->listar_personal_cas_existente = $this->listar_todo_personal_en_legajos->getListadoPersonalCas( $buscar_por_nombre );
                $this->_listar_motivos = $this->loadModel( 'personal' );
                $this->_view->listar_motivos = $this->_listar_motivos->getListadoMotivosRenuncias();
                $this->_view->renderizar( 'laborales', false );

            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function vercontratos_del_personal() {
        $id = $_POST[ "id" ];
        $this->_ver_contratos = $this->loadModel( 'cas' );
        $buscar = $this->_ver_contratos->ObtenerContratosPersonal( $id );
        echo $buscar;

    }






    public

    function verificar_ruc_cas() {
        $id = $_POST[ "id" ];
        $this->listar_personal_cas = $this->loadModel( 'cas' );
        $buscar = $this->listar_personal_cas->ObtenerVerificacionRUC( $id );
        echo $buscar;


    }


    public

    function verificar_fecha() {
        $ruc = $_POST[ "ruc" ];
        $fecha = $_POST[ "fecha" ];
        $this->ver_fechas = $this->loadModel( 'cas' );
        $buscar = $this->ver_fechas->VerFechas( $ruc, $fecha );
        echo $buscar;


    }

    // ver_todos_educacion_por_personal
    public

    function grabar_registro_contrato_cas() {
        $idpersonal = $_POST[ "idpersonal" ];
        $idcondicion_laboral = $_POST[ "idcondicion_laboral" ];
        $renaes = $_POST[ "renaes" ];
        $ruc = $_POST[ "ruc" ];
        $nro_proceso = $_POST[ "nro_proceso" ];
        $nro_contrato = $_POST[ "nro_contrato" ];
        $fecha_ingreso = $_POST[ "fecha_ingreso" ];
        $fecha_termino = $_POST[ "fecha_termino" ];
        $sueldo = $_POST[ "sueldo" ];
        $idcargo = $_POST[ "idcargo" ];
        $idcadena = $_POST[ "idcadena" ];
        $meta = $_POST[ "meta" ];
        $plaza = $_POST[ "plaza" ];
        $tipo = $_POST[ "tipo" ];
        $idprofesion = $_POST[ "idprofesion" ];
        $condicion_profesion = $_POST[ "condicion_profesion" ];
        $idunidad = $_POST[ "idunidad" ];
        $idcentrocosto = $_POST[ "idcentrocosto" ];
        $idupss = $_POST[ "idupss" ];
        $idespecialidad = $_POST[ "idespecialidad" ];
        $rne = $_POST[ "rne" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->ver_grabacion = $this->loadModel( 'cas' );
        $buscar = $this->ver_grabacion->GrabarContratoCas( $idpersonal, $idcondicion_laboral, $renaes, $ruc, $nro_proceso, $nro_contrato, $fecha_ingreso, $fecha_termino, $sueldo, $idcargo, $idcadena, $meta, $plaza, $tipo, $idprofesion, $condicion_profesion, $idunidad, $idcentrocosto, $idupss, $idespecialidad, $rne, $usuario );
        echo $buscar;

    }

    
    
    public

    function modificar_registro_contrato_cas() {
        $idcontrato = $_POST[ "idcontrato" ];
        $idcondicion_laboral = $_POST[ "idcondicion_laboral" ];
        $renaes = $_POST[ "renaes" ];
        $ruc = $_POST[ "ruc" ];
        $nro_proceso = $_POST[ "nro_proceso" ];
        $nro_contrato = $_POST[ "nro_contrato" ];
        $fecha_ingreso = $_POST[ "fecha_ingreso" ];
        $fecha_termino = $_POST[ "fecha_termino" ];
        $sueldo = $_POST[ "sueldo" ];
        $idcargo = $_POST[ "idcargo" ];
        $idcadena = $_POST[ "idcadena" ];
        $meta = $_POST[ "meta" ];
        $plaza = $_POST[ "plaza" ];
        $tipo = $_POST[ "tipo" ];
        $idprofesion = $_POST[ "idprofesion" ];
        $condicion_profesion = $_POST[ "condicion_profesion" ];
        $idcentrocosto = $_POST[ "idcentrocosto" ];
        $idunidad = $_POST[ "idunidad" ];
        $idupss= $_POST[ "idupss" ];
        $idespecialidad = $_POST[ "idespecialidad" ];
        $rne = $_POST[ "rne" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->ver_grabacion = $this->loadModel( 'cas' );
        $buscar = $this->ver_grabacion->GrabarContratoCasModificar( $idcondicion_laboral, $renaes, $nro_proceso, $nro_contrato, $fecha_ingreso, $fecha_termino, $sueldo, $idcargo, $idcadena, $meta, $plaza, $tipo, $idprofesion, $condicion_profesion, $idcentrocosto, $idunidad, $idupss, $idespecialidad, $rne, $usuario, $idcontrato );
        echo $buscar;
    }

    
    

    public

    function eliminar_registro_contrato_cas() {
        $idcontrato = $_POST[ "idcontrato" ];
        $this->ver_grabacion_eliminar = $this->loadModel( 'cas' );
        $buscar = $this->ver_grabacion_eliminar->EliminarContratoCas( $idcontrato );
        echo $buscar;
    }


    // vercontratos_del_personal
    /***  Nicio de adendas */


    public

    function listar_adendas_de_un_contrato() {
        $id = $_POST[ "id" ];
        $this->_ver_adendas = $this->loadModel( 'cas' );
        $buscar = $this->_ver_adendas->ObtenerAdendasDeUnContrato( $id );
        echo $buscar;
    }



    public

    function verificar_fecha_adenda() {
        $id = $_POST[ "id" ];
        $fecha = $_POST[ "fecha" ];
        $this->ver_fechas_adenda = $this->loadModel( 'cas' );
        $buscar = $this->ver_fechas_adenda->VerFechaCasAdenda( $id, $fecha );
        echo $buscar;

    }

    public

    function grabar_registro_adenda() {

        $id = $_POST[ "id" ];
        $fecha_inicio = $_POST[ "fecha_inicio" ];
        $fecha_fin = $_POST[ "fecha_fin" ];
        $nro_contrato = $_POST[ "nro_contrato" ];
        $idunidad_adenda = $_POST[ "idunidad_adenda" ];
        $nro_adenda = $_POST[ "nro_adenda_conrato" ];
        $estado = $_POST[ "estado" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_adenda = $this->loadModel( 'cas' );
        $buscar = $this->grabar_adenda->GrabarRegistroAdenda( $id, $nro_adenda, $nro_contrato, $fecha_inicio, $fecha_fin, $idunidad_adenda, $estado, $usuario );
        echo $buscar;


    }

    public
    function modificar_registro_adenda() {
        $idadenda = $_POST[ "idadenda" ];
        $fecha_inicio = $_POST[ "fecha_inicio" ];
        $fecha_fin = $_POST[ "fecha_fin" ];
        $unidad_adenda = $_POST[ "idunidad_adenda" ];
        $nro_adenda = $_POST[ "nro_adenda" ];
        $estado = $_POST[ "estado" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_adenda_mod = $this->loadModel( 'cas' );
        $buscar = $this->grabar_adenda_mod->GrabarRegistroAdendaModificar($nro_adenda, $fecha_inicio, $fecha_fin, $estado, $unidad_adenda, $usuario, $idadenda);
        echo $buscar;

    }


    
    
        

    
    
    

    public

    function eliminar_registro_adenda() {
        $idadenda = $_POST[ "idadenda" ];
        $this->grabar_adenda_elim = $this->loadModel( 'cas' );
        $buscar = $this->grabar_adenda_elim->EliminarAdenda( $idadenda );
        echo $buscar;

    }



    public

    function grabar_especialidad_cas() {
        $idpersonal = $_POST[ "idpersonal" ];
        $tipo_table = $_POST[ "tipo_table" ];
        $id_espe = $_POST[ "id_espe" ];
        $inicio = $_POST[ "inicio" ];
        $fin = $_POST[ "fin" ];
        $nro = $_POST[ "nro" ];
        $institucion = $_POST[ "institucion" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->guardar_especialidad = $this->loadModel( 'cas' );
        $buscar = $this->guardar_especialidad->GrabarRegistroEspe( $idpersonal, $tipo_table, $id_espe, $inicio, $fin, $nro, $institucion, $observacion, $usuario );
        echo $buscar;

    }



    public

    function ver_especialidad_personal_cas() {
        $idpersonal = $_POST[ "idpersonal" ];
        $tipo_table = $_POST[ "tipo_table" ];
        $this->ver_especialidad = $this->loadModel( 'cas' );
        $buscar = $this->ver_especialidad->VerRegistroEspe( $idpersonal, $tipo_table );
        echo $buscar;

    }



    public

    function eliminar_especialidad_cas() {
        $id_eecc = $_POST[ "id_eecc" ];
        $this->eliminar_especialidad = $this->loadModel( 'cas' );
        $buscar = $this->eliminar_especialidad->EliminarRegistroEspe( $id_eecc );
        echo $buscar;

    }



    /** especialidad */


    /* inicio de competencia  */



    public

    function ver_especialidad_personal_cas_cm() {
        $idpersonal = $_POST[ "idpersonal" ];
        $tipo_table = $_POST[ "tipo_table" ];
        $this->ver_competencia = $this->loadModel( 'cas' );
        $buscar = $this->ver_competencia->VerRegistroCompetencia( $idpersonal, $tipo_table );
        echo $buscar;

    }




    public

    function grabar_competencias_cas() {
        $idpersonal = $_POST[ "idpersonal" ];
        $tipo_table = $_POST[ "tipo_table" ];
        $id_compe = $_POST[ "id_compe" ];
        $inicio = $_POST[ "inicio" ];
        $fin = $_POST[ "fin" ];
        $nro = $_POST[ "nro" ];
        $institucion = $_POST[ "institucion" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->guardar_competencia = $this->loadModel( 'cas' );
        $buscar = $this->guardar_competencia->GrabarRegistroCompetencias( $idpersonal, $tipo_table, $id_compe, $inicio, $fin, $nro, $institucion, $observacion, $usuario );
        echo $buscar;


    }




    public

    function eliminar_competencias_cas() {
        $id_eecc_c = $_POST[ "id_eecc_c" ];
        $this->eliminar_competencia = $this->loadModel( 'cas' );
        $buscar = $this->eliminar_competencia->EliminarRegistroCompetencia( $id_eecc_c );
        echo $buscar;


    }


    /* fin de cmompetencia */


    /* inicio de capacitacion */




    public

    function ver_persona_por_cas_capacitacion() {
        $idpersonal = $_POST[ "idpersonal" ];
        $tipo_table = $_POST[ "tipo_table" ];
        $this->ver_capacitacion = $this->loadModel( 'cas' );
        $buscar = $this->ver_capacitacion->VerRegistroCapacitaciones( $idpersonal, $tipo_table );
        echo $buscar;


    }


    public

    function grabar_capacitacion_cas() {
        $idpersonal = $_POST[ "idpersonal" ];
        $tipo_table = $_POST[ "tipo_table" ];
        $id_capa = $_POST[ "id_capa" ];
        $inicio = $_POST[ "inicio" ];
        $fin = $_POST[ "fin" ];
        $nro = $_POST[ "nro" ];
        $institucion = $_POST[ "institucion" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->guardar_capacitacion = $this->loadModel( 'cas' );
        $buscar = $this->guardar_capacitacion->GrabarRegistroCapacitacion( $idpersonal, $tipo_table, $id_capa, $inicio, $fin, $nro, $institucion, $observacion, $usuario );
        echo $buscar;


    }


    public

    function eliminar_capacitacion_cas() {
        $id_idcapa = $_POST[ "id_capa" ];
        $this->eliminar_capacitacion = $this->loadModel( 'cas' );
        $buscar = $this->eliminar_capacitacion->EliminarRegistroCapacitacion( $id_idcapa );
        echo $buscar;


    }

    /* fin de capacitacion */





    // listar_adendas_de_un_contrato




    /* entrenamiento */


    public

    function ver_persona_por_cas_entrenamiento() {
        $idpersonal = $_POST[ "idpersonal" ];
        $tipo_table = $_POST[ "tipo_table" ];
        $this->ver_entrenamiento = $this->loadModel( 'cas' );
        $buscar = $this->ver_entrenamiento->VerRegistroEntrenamiento( $idpersonal, $tipo_table );
        echo $buscar;


    }




    public

    function grabar_entrenamiento_cas() {
        $idpersonal = $_POST[ "idpersonal" ];
        $tipo_table = $_POST[ "tipo_table" ];
        $id_entre = $_POST[ "id_entre" ];
        $inicio = $_POST[ "inicio" ];
        $fin = $_POST[ "fin" ];
        $nro = $_POST[ "nro" ];
        $institucion = $_POST[ "institucion" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->guardar_entrenamiento = $this->loadModel( 'cas' );
        $buscar = $this->guardar_entrenamiento->GrabarRegistroEntrenamiento( $idpersonal, $tipo_table, $id_entre, $inicio, $fin, $nro, $institucion, $observacion, $usuario );
        echo $buscar;


    }



    public

    function eliminar_entrenamiento_cas() {
        $id_identre = $_POST[ "id_entre" ];
        $this->eliminar_entrenamiento = $this->loadModel( 'cas' );
        $buscar = $this->eliminar_entrenamiento->EliminarRegistroEntrenamiento( $id_identre );
        echo $buscar;


    }



    /* fin de entrenamiento */


    /* registrar CESE **/



    public

    function registrar_cese_en_cas() {
        $id_contrato = $_POST[ "id_contrato" ];
        $id_motivo = $_POST[ "id_motivo" ];
        $fecha_cese = $_POST[ "fecha_cese" ];
        $monto_cese = $_POST[ "monto_cese" ];
        $observacion_cese = $_POST[ "observacion_cese" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->update_registro_cese_cas = $this->loadModel( 'cas' );
        $buscar = $this->update_registro_cese_cas->Grabar_RegistroCeseCAS( $id_motivo, $fecha_cese, $monto_cese, $observacion_cese, $usuario, $id_contrato );
        echo $buscar;

    }





    /* fin de CESE */



    /*** Inicio de familiar **/

    public

    function familiar() {
        $this->_view->titulo = 'Registro de Familiar CAS - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'familiar' ) );

        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $this->_view->renderizar( 'familiar', false );

            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }


    public

    function grabar_nuevo_registro_familiar() {
        $id_personal = $_POST[ "id_personal" ];
        $id_parent = $_POST[ "id_parent" ];
        $registro_dni = $_POST[ "registro_dni" ];
        $dni = $_POST[ "dni" ];
        $fecha_nacimiento = $_POST[ "fecha_nacimiento" ];
        $paterno = $_POST[ "paterno" ];
        $materno = $_POST[ "materno" ];
        $nombres = $_POST[ "nombres" ];
        $apellidos_nombres = $_POST[ "paterno" ] . ' ' . $_POST[ "materno" ] . ' ' . $_POST[ "nombres" ];
        $ocupacion = $_POST[ "ocupacion" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->insert_registro_famliar = $this->loadModel( 'cas' );
        $buscar = $this->insert_registro_famliar->GrabarRegistroFamiliar( $id_personal, $id_parent, $registro_dni, $dni, $fecha_nacimiento, $paterno, $materno, $nombres, $apellidos_nombres, $ocupacion, $observacion, $usuario );
        echo $buscar;
    }


    public

    function ver_familiar_del_personal() {
        $id_personal = $_POST[ "id_personal" ];
        $this->ver_registro_famliar = $this->loadModel( 'cas' );
        $buscar = $this->ver_registro_famliar->VerTotalFamilia( $id_personal );
        echo $buscar;
    }

    public
    function update_registro_familiar() {
        $id_familiar = $_POST[ "idfamiliar" ];
        $id_parent = $_POST[ "id_parent" ];
        $registro_dni = $_POST[ "registro_dni" ];
        $dni = $_POST[ "dni" ];
        $fecha_nacimiento = $_POST[ "fecha_nacimiento" ];
        $paterno = $_POST[ "paterno" ];
        $materno = $_POST[ "materno" ];
        $nombres = $_POST[ "nombres" ];
        $apellidos_nombres = $_POST[ "paterno" ] . ' ' . $_POST[ "materno" ] . ' ' . $_POST[ "nombres" ];
        $ocupacion = $_POST[ "ocupacion" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->update_registro_famliar = $this->loadModel( 'cas' );
        $buscar = $this->update_registro_famliar->GrabarRegistroFamiliarUpDate( $id_parent, $registro_dni, $dni, $fecha_nacimiento, $paterno, $materno, $nombres, $apellidos_nombres, $ocupacion, $observacion, $usuario, $id_familiar );
        echo $buscar;

    }



    public
    function eliminar_registro_familiar() {

        $id_familiar = $_POST[ "idfamiliar" ];
        $this->delete_registro_famliar = $this->loadModel( 'cas' );
        $buscar = $this->delete_registro_famliar->EliminarRegistroFamiliar( $id_familiar );
        echo $buscar;



    }



    /* fin de familiar */






}
?>