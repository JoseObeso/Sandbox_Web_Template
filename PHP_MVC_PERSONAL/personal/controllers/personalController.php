<?php

class personalController extends Controller {
    public

    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "dni" ] ) && $_SESSION[ "usuario" ][ "dni" ] != '' ) {} else {
            header( 'location: /' );
        }
    }

    
  // juridicos
    public

    function index() {
        $this->_view->titulo = 'Sistema : ' . ENLACE;
        $this->_view->setJs( array( 'index' ) );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_view->renderizar( 'index', false );
    }

 
    public

    function personal() {

        $this->_view->titulo = 'Mantenimiento y Gestion de Personal de Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'personal' ) );
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
                $lc_buscar_personal = ' ';
                $this->_personal = $this->loadModel( 'personal' );
                $this->_view->listarpersonal = $this->_personal->getListadoPersonal( $lc_buscar_personal );
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "Personal SIGALEN" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_mantenimiento = $this->loadModel( 'mantenimiento' );
                $this->_view->listar_unidad_organica = $this->_mantenimiento->getListarUnidadesOrganicas();
                $this->_view->renderizar( 'personal', false );
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

    function personal_tempus() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Personal TEMPUS de Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'personal_tempus' ) );
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
                $u = $this->loadEntity( 'usuario_web' );
                $this->_ver_tempus = $this->loadModel( 'personal' );
                $this->_view->ultima_actualizacion_tempus = $this->_ver_tempus->getUpdateTempus();

                $u->setNombres( trim( '' ) );
                $this->_personal = $this->loadModel( 'personal' );
                $this->_view->listarpersonal_tempus = $this->_personal->getListadoPersonalTempus( $u );

                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "Personal TEMPUS" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_mantenimiento = $this->loadModel( 'mantenimiento' );
                $this->_view->listar_unidad_organica = $this->_mantenimiento->getListarUnidadesOrganicas();
                $this->_view->renderizar( 'personal_tempus', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }

    // buscar_por_nombre_en_sigalen

    public

    function personal_rrhh() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Personal RRHH de Monitoreo de RRHH - ' . INSTITUCION;;
        $this->_view->setJs( array( 'personal_rrhh' ) );
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
                $u = $this->loadEntity( 'usuario_web' );
                $u->setNombres( trim( '' ) );
                $this->_personal = $this->loadModel( 'personal' );
                $this->_view->listarpersonal = $this->_personal->getListadoPersonal_rrhh( $u );
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( "Mantenimiento" );
                $a_submenu->setNombre( "Usuarios" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_mantenimiento = $this->loadModel( 'mantenimiento' );
                $this->_view->listar_unidad_organica = $this->_mantenimiento->getListarUnidadesOrganicas();
                $this->_view->renderizar( 'personal_rrhh', false );
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

    function personal_renuncia() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Personal Renunciante de Monitoreo de RRHH - ' . INSTITUCION;;
        $this->_view->setJs( array( 'personal_renuncia' ) );
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
                $lc_buscar_personal = '';
                $this->_personal = $this->loadModel( 'personal' );
                $this->_view->listarpersonal_renunciante = $this->_personal->getListadoPersonal_Renunciante( $lc_buscar_personal );
                $this->_personal_cargos = $this->loadModel( 'personal' );
                $this->_view->listar_cargos = $this->_personal_cargos->getListadoCargosPersonal();
                $this->_listar_motivos = $this->loadModel( 'personal' );
                $this->_view->listar_motivos = $this->_listar_motivos->getListadoMotivosRenuncias();
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( "personal" );
                $a_submenu->setNombre( "Registrar Renuncias" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );

                $this->_servicios = $this->loadModel( 'personal' );
                $this->_view->listar_servicios_centrosubcosto = $this->_servicios->getListarServicios();


                $this->_view->renderizar( 'personal_renuncia', false );
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

    function listar_horarios() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Horarios de Monitoreo de RRHH';
        $this->_view->setJs( array( 'listar_horarios' ) );
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
                $u = $this->loadEntity( 'usuario_web' );
                $u->setNombres( trim( '' ) );
                $this->_horarios = $this->loadModel( 'personal' );
                $this->_view->listarhorarios = $this->_horarios->getListadoHorarios( $u );
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "Todos los Horarios" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_mantenimiento = $this->loadModel( 'mantenimiento' );
                $this->_view->listar_unidad_organica = $this->_mantenimiento->getListarUnidadesOrganicas();
                $this->_view->renderizar( 'listar_horarios', false );
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

    function licencias() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Licencias de Monitoreo de RRHH';
        $this->_view->setJs( array( 'licencias' ) );
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
                $u = $this->loadEntity( 'usuario_web' );
                $u->setNombres( trim( '' ) );
                $this->_licencias = $this->loadModel( 'personal' );
                $this->_view->licencias = $this->_licencias->getListadoLicencias( $u );
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "Listado Licencias" );

                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_mantenimiento = $this->loadModel( 'mantenimiento' );

                $this->_view->listar_unidad_organica = $this->_mantenimiento->getListarUnidadesOrganicas();
                $this->_view->renderizar( 'licencias', false );
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

    function buscar_personal_por_nombre_todos_bdatos() {
        $nombre_personal = trim( $_POST[ "nombres_personal" ] );
        $this->_buscar_personal = $this->loadModel( 'personal' );
        $datos = $this->_buscar_personal->BuscarPersonal( $nombre_personal );
        echo $datos;

    }




    public

    function buscar_por_nombre_en_sigalen() {
        $lc_buscar_personal = utf8_decode( trim( $_POST[ "nombres" ] ) );
        $this->_buscar_personal = $this->loadModel( 'personal' );
        $datos = $this->_buscar_personal->getListadoPersonal( $lc_buscar_personal );
        echo $datos;

    }

    public

    function buscar_por_nombre_en_rrhh() {
        $lc_buscar_personal = trim( $_POST[ "nombres" ] );
        $this->_buscar_personal_rrhh = $this->loadModel( 'personal' );
        $datos = $this->_buscar_personal_rrhh->BuscarNombresPersonalRRHH( $lc_buscar_personal );
        echo $datos;
    }





    public

    function buscar_por_nombre_en_renunciantes() {
        $lc_buscar_personal = trim( $_POST[ "nombres" ] );
        $this->_buscar_personal = $this->loadModel( 'personal' );
        $datos = $this->_buscar_personal->getListadoPersonal_Renunciante( $lc_buscar_personal );
        echo $datos;

    }







    public

    function grabar_personal_renunciante() {
        $dni_personal = trim( $_POST[ "dni_personal" ] );
        $origen_personal = trim( $_POST[ "origen_personal" ] );
        $paterno_personal = trim( $_POST[ "paterno_personal" ] );
        $materno_personal = trim( $_POST[ "materno_personal" ] );
        $solo_nombres_personal = trim( $_POST[ "solo_nombres_personal" ] );
        $origen_personal = trim( $_POST[ "origen_personal" ] );
        $nombres_personal = trim( $_POST[ "nombres_personal" ] );
        $seleccion_cargo = trim( $_POST[ "seleccion-cargo" ] );
        $seleccion_unidad_servicios = trim( $_POST[ "seleccion-unidad-organica" ] );
        $fecha_ingreso = trim( $_POST[ "fecha-ingreso" ] );
        $fecha_renuncia = trim( $_POST[ "fecha-renuncia" ] );
        $fecha_ultimo_dia_trabajo = trim( $_POST[ "fecha-ultimo-dia-trabajo" ] );
        $seleccion_motivo = trim( $_POST[ "seleccion-motivo" ] );
        $txt_area_observacion = trim( $_POST[ "txt_area_observaciones" ] );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->_grabacion_personal_renunciante = $this->loadModel( 'personal' );
        $enviar_Datos_Personal_renunciante = $this->_grabacion_personal_renunciante->GrabacionPersonalRenunciante( $dni_personal, $origen_personal, $paterno_personal, $materno_personal, $solo_nombres_personal, $codigo_tempus, $nombres_personal, $seleccion_cargo, $seleccion_unidad_servicios, $fecha_ingreso, $fecha_renuncia, $fecha_ultimo_dia_trabajo, $seleccion_motivo, $txt_area_observacion, $usuario );
        echo $enviar_Datos_Personal_renunciante;
    }

 

    public

    function ConseguirDatosPersonalRenunciante() {
        $idpersonal = $_POST[ "idpersonal" ];
        $this->_obtener_datos_personal_renunciante = $this->loadModel( 'personal' );
        $datosPersonalRenunciante = $this->_obtener_datos_personal_renunciante->GetDatosPersonalRenunciante( $idpersonal );
        echo $datosPersonalRenunciante;
    }


    public

    function guardar_modificacion_renunciante() {
        $idpersonal = $_POST[ "id_personal" ];
        $idtipo_empleado_registrado = $_POST[ "idtipoempleado" ];
        $idseleccion_empleado_modificar = ( empty( $_POST[ "seleccion-cargo-m" ] ) ) ? $idtipo_empleado_registrado : $_POST[ "seleccion-cargo-m" ];
        $idunidad_registrada = $_POST[ "idcentrosubcosto" ];
        $idseleccion_unidad_modificar = ( empty( $_POST[ "seleccion-unidad-organica-m" ] ) ) ? $idunidad_registrada : $_POST[ "seleccion-unidad-organica-m" ];
        $fecha_ingreso_registrada = $_POST[ "fecha_ingreso_registrada" ];
        $fecha_ingreso_modificar = ( $fecha_ingreso_registrada = $_POST[ "fecha_ingreso_m" ] ) ? $fecha_ingreso_registrada : $_POST[ "fecha_ingreso_m" ];
        $fecha_renuncia_registrada = $_POST[ "fecha_renuncia_registrada" ];
        $fecha_renuncia_modificar = ( $fecha_renuncia_registrada = $_POST[ "fecha_renuncia_m" ] ) ? $fecha_renuncia_registrada : $_POST[ "fecha_renuncia_m" ];
        $fecha_ultimo_dia_registrada = $_POST[ "fecha_ultimo_dia_registrada" ];
        $fecha_ultimo_dia_modificar = ( $fecha_ultimo_dia_registrada = $_POST[ "fecha_ultimo_dia_trabajo_m" ] ) ? $fecha_ultimo_dia_registrada : $_POST[ "fecha_ultimo_dia_trabajo_m" ];
        $id_motivo_cese_registrado = $_POST[ "id_motivo_cese" ];
        $seleccion_motivo_m = ( empty( $_POST[ "seleccion-motivo-m" ] ) ) ? $id_motivo_cese_registrado : $_POST[ "seleccion-motivo-m" ];
        $txt_area_observaciones_m_final = trim( $_POST[ "txt_area_observaciones_m" ] );


        $this->_guardar_modificacion_personal_renunciante = $this->loadModel( 'personal' );
        $modificacion_personal_renunciante = $this->_guardar_modificacion_personal_renunciante->UpdateDatosPersonalRenunciante( $idpersonal, $idseleccion_empleado_modificar, $idseleccion_unidad_modificar, $fecha_ingreso_modificar, $fecha_renuncia_modificar, $fecha_ultimo_dia_modificar, $seleccion_motivo_m, $txt_area_observaciones_m_final );
        echo $modificacion_personal_renunciante;

    }



    public

    function Eliminar_Datos_Personal_Renunciante() {
        $id_personal = $_POST[ "id_personal" ];
        $this->_id_del_personal = $this->loadModel( 'personal' );
        $confirma_eliminar_personal = $this->_id_del_personal->ProcesoEliminarPersonalRenunciante( $id_personal );
        echo $confirma_eliminar_personal;
    }




    public

    function recargar_personal() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_personal = $this->loadModel( 'personal' );
        $this->_view->listarpersonal = $this->_personal->getListadoPersonal( $u );
        echo $this->_view->listarpersonal;
    }


    public

    function recargar_personal_rrhh() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_personal = $this->loadModel( 'personal' );
        $this->_view->listarpersonal = $this->_personal->getListadoPersonal_rrhh( $u );
        echo $this->_view->listarpersonal;
    }


    public

    function recargar_personal_renunciante() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_personal = $this->loadModel( 'personal' );
        $this->_view->listarpersonal_renunciante = $this->_personal->getListadoPersonal_Renunciante( $u );
        echo $this->_view->listarpersonal_renunciante;
    }
    public

    function recargar_personal_tempus() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_personal = $this->loadModel( 'personal' );
        $this->_view->listarpersonal_tempus = $this->_personal->getListadoPersonalTempus( $u );
        echo $this->_view->listarpersonal_tempus;
    }


    public

    function recargar_horarios() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_horarios = $this->loadModel( 'personal' );
        $this->_view->listarhorarios = $this->_horarios->getListadoHorarios( $u );
        echo $this->_view->listarhorarios;
    }


    public

    function recargar_licencias() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_licencias = $this->loadModel( 'personal' );
        $this->_view->licencias = $this->_licencias->getListadoLicencias( $u );
        echo $this->_view->licencias;
    }


    public

    function ver_registro() {
        $id = $_POST[ "id" ];
        $this->_registro = $this->loadModel( 'personal' );
        $this->_view->registros = $this->_registro->MostrarRegistros( $id );
        echo $this->_view->registros;



    }


    public

    function buscar_colegiatura() {

        $id = $_POST[ "id" ];
        $this->_registro = $this->loadModel( 'personal' );
        $this->_view->colegiatura = $this->_registro->MostrarColegiatura( $id );
        echo $this->_view->colegiatura;


    }



    public

    function ver_especialidad() {

        $id = $_POST[ "id_medico" ];
        $this->_registro = $this->loadModel( 'personal' );
        $this->_view->especialidad = $this->_registro->VerEspecialidad( $id );
        echo $this->_view->especialidad;




    }


    public

    function ver_marcaciones_de_asistencia() {
        $dni_proce = $_POST[ "dni" ];
        $mes_proce = $_POST[ "mes" ];
        $anio_proce = $_POST[ "anio" ];
        $this->_ver_marcaciones_en_tempus = $this->loadModel( 'personal' );
        $this->_view->marcaciones_personal_tempus = $this->_ver_marcaciones_en_tempus->getListadoMarcaciones( $dni_proce, $mes_proce, $anio_proce );
        echo $this->_view->marcaciones_personal_tempus;
    }

    public

    function leer_actividades() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_read_actividad = $this->loadModel( 'personal' );
        $readactividad = $this->_read_actividad->LeerActividad( $dni, $mes, $anio );
        echo $readactividad;



    }


    public

    function leer_citas() {
        $id = $_POST[ "id" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_read_citas = $this->loadModel( 'personal' );
        $read_citas = $this->_read_citas->LeerCitas( $id, $mes, $anio );
        echo $read_citas;

    }


    public

    function ver_atencion_citas() {
        $id = $_POST[ "id" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_read_atencion = $this->loadModel( 'personal' );
        $read_atencion = $this->_read_atencion->LeerAtencionCitas( $mes, $anio, $id );
        echo $read_atencion;


    }


    public

    function ver_atencion_emergencia() {
        $id = $_POST[ "id" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_read_emergencia = $this->loadModel( 'personal' );
        $read_emergencia = $this->_read_emergencia->LeerAtencionEmergencia( $mes, $anio, $id );
        echo $read_emergencia;


    }



    public

    function ver_atencion_hospitalizacion() {
        $id = $_POST[ "id" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_read_hospitalizacion = $this->loadModel( 'personal' );
        $read_hospi = $this->_read_hospitalizacion->LeerAtencionHospitalizacion( $mes, $anio, $id );
        echo $read_hospi;

    }



    public

    function ver_atencion_apoyo_tratamiento() {

        $id = $_POST[ "id" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_read_tratamiento = $this->loadModel( 'personal' );
        $read_trata = $this->_read_tratamiento->LeerAtencionTratamiento( $mes, $anio, $id );
        echo $read_trata;
    }


    public

    function ver_atencion_centroQx() {
        $id = $_POST[ "id" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_read_centroQx = $this->loadModel( 'personal' );
        $read_Qx = $this->_read_centroQx->LeerCentroQx( $mes, $anio, $id );
        echo $read_Qx;



    }


    /* INICIO DE PERSONAL TERCERO **/
 

    public

    function tercero() {
        $this->_view->titulo = 'Registro de Personal Tercero- Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'tercero' ) );
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
                $this->_listar_motivos = $this->loadModel( 'personal' );
                $this->_view->listar_motivos = $this->_listar_motivos->getListadoMotivosRenuncias();
                $this->_view->renderizar( 'tercero', false );

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

    function listar_personal_tercero_total()

    {
        $id = $_POST[ "id" ];
        $this->_read_tercero = $this->loadModel( 'personal' );
        $read_tercero = $this->_read_tercero->LeerPersonalTercero( $id );
        echo $read_tercero;

    }




    public

    function buscar_por_nombre_tercero() {
        $id = utf8_decode( trim( $_POST[ "nombres" ] ) );
        $this->buscar_nombres_tercero = $this->loadModel( 'personal' );
        $buscar_y_personal = $this->buscar_nombres_tercero->ListarPersonalTercero( $id );
        echo $buscar_y_personal;

    }


    public

    function buscar_personal_tercero_nuevo() {

        $id = utf8_decode( trim( $_POST[ "nombres" ] ) );
        $this->buscar_nombres_tercero = $this->loadModel( 'personal' );
        $buscar_y_personal = $this->buscar_nombres_tercero->ListarPersonalTerceroNuevo( $id );
        echo $buscar_y_personal;


    }




    public

    function personal_tercero_de_baja() {
        $estado = $_POST[ "estado" ];
        $this->buscar_nombres_tercero = $this->loadModel( 'personal' );
        $buscar_y_personal = $this->buscar_nombres_tercero->ListarPersonalTercero_debaja( $estado );
        echo $buscar_y_personal;
    }




    public

    function verificar_si_existe_nro_documento() {
        $id = $_POST[ "id" ];
        $this->buscar_si_existe = $this->loadModel( 'personal' );
        $buscar = $this->buscar_si_existe->VerSiExisteNro( $id );
        echo $buscar;

    }


    public

    function grabar_registro_personal_tercero_total() {

        $idpais = $_POST[ "idpais" ];
        $iddocumento = $_POST[ "iddocumento" ];
        $nro_documento = $_POST[ "nro_documento" ];
        $sexo = $_POST[ "lc_sexo" ];
        $ruc = $_POST[ "ruc" ];
        $paterno = utf8_decode( strtoupper( $_POST[ "paterno" ] ) );
        $materno = utf8_decode( strtoupper( $_POST[ "materno" ] ) );
        $apellido_casada = utf8_decode( strtoupper( $_POST[ "apellido_casada" ] ) );
        $nombres = utf8_decode( strtoupper( $_POST[ "nombres" ] ) );
        $nacimiento = $_POST[ "nacimiento" ];
        $id_depar = $_POST[ "iddepartamento" ];
        $id_provin = $_POST[ "idprovincia" ];
        $id_distrito = $_POST[ "iddistrito" ];
        $direccion = utf8_decode( strtoupper( $_POST[ "direccion" ] ) );
        $correo = $_POST[ "correo" ];
        $fijo = $_POST[ "fijo" ];
        $celular = $_POST[ "celular" ];
        $celular_emergencia = $_POST[ "celular_emergencia" ];
        $observacion = utf8_decode( strtoupper( $_POST[ "observacion" ] ) );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_registro = $this->loadModel( 'personal' );
        $grabar = $this->grabar_registro->GrabarRegistroPersonalTercero( $idpais, $iddocumento, $nro_documento, $sexo, $ruc, $paterno, $materno, $apellido_casada, $nombres, $nacimiento, $id_depar, $id_provin, $id_distrito, $direccion, $correo, $fijo, $celular, $celular_emergencia, $observacion, $usuario );
        echo $grabar;

    }


    public

    function grabar_modificacion_personal_tercero_total() {

        $idpais = $_POST[ "idpais" ];
        $iddocumento = $_POST[ "iddocumento" ];
        $nro_documento = $_POST[ "nro_documento" ];
        $sexo = $_POST[ "lc_sexo" ];
        $ruc = $_POST[ "ruc" ];
        $paterno = utf8_decode( strtoupper( $_POST[ "paterno" ] ) );
        $materno = utf8_decode( strtoupper( $_POST[ "materno" ] ) );
        $apellido_casada = utf8_decode( strtoupper( $_POST[ "apellido_casada" ] ) );
        $nombres = utf8_decode( strtoupper( $_POST[ "nombres" ] ) );
        $nacimiento = $_POST[ "nacimiento" ];
        $id_depar = $_POST[ "iddepartamento" ];
        $id_provin = $_POST[ "idprovincia" ];
        $id_distrito = $_POST[ "iddistrito" ];
        $direccion = utf8_decode( strtoupper( $_POST[ "direccion" ] ) );
        $correo = $_POST[ "correo" ];
        $fijo = $_POST[ "fijo" ];
        $celular = $_POST[ "celular" ];
        $celular_emergencia = $_POST[ "celular_emergencia" ];
        $observacion = utf8_decode( strtoupper( $_POST[ "observacion" ] ) );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $id = $_POST[ "id" ];
        $this->grabar_registro_modificacion = $this->loadModel( 'personal' );
        $grabar = $this->grabar_registro_modificacion->GrabarUpdatePersonalTercero( $idpais, $iddocumento, $nro_documento, $sexo, $ruc, $paterno, $materno, $apellido_casada, $nombres, $nacimiento, $id_depar, $id_provin, $id_distrito, $direccion, $correo, $fijo, $celular, $celular_emergencia, $observacion, $usuario, $id );
        echo $grabar;

    }


    public

    function dar_de_baja_personal_tercero() {
        $id = $_POST[ "id" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->dar_de_baja = $this->loadModel( 'personal' );
        $buscar = $this->dar_de_baja->EliminarPersonalTercero( $usuario, $id );
        echo $buscar;


    }


    public

    function personal_habilitado_tercero() {

        $id = $_POST[ "id" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->dar_de_baja = $this->loadModel( 'personal' );
        $buscar = $this->dar_de_baja->HabilitarPersonalTercero( $usuario, $id );
        echo $buscar;



    }

    // vercontratos_del_personal
    
    public

    function ver_habiles_empleados()

    {
        $id = $_POST[ "id" ];
        $this->reporte = $this->loadModel( 'personal' );
        $buscar = $this->reporte->EstadisticaEmpleadosHabilesDesactivados();
        echo $buscar;
    }


    public

    function ver_contratos_personal_tercero_final() {
        $id_personal = $_POST[ "id_personal_buscar" ];
        $this->ver_contratos_tercero = $this->loadModel( 'personal' );
        $buscar_final = $this->ver_contratos_tercero->VerContratosTerceroFinal( $id_personal );
        echo $buscar_final;

    }


    public

    function grabar_datos_servicios_terceros() {
        $idpersonal = $_POST[ "idpersonal" ];
        $fecha_ingreso = $_POST[ "fecha_ingreso" ];
        $duracion = $_POST[ "duracion" ];
        $fin_servicio = $_POST[ "fin_servicio" ];
        $expediente = $_POST[ "expediente" ];
        $nota_informativa = $_POST[ "nota_informativa" ];
        $nro_pedido = $_POST[ "nro_pedido" ];
        $meta_actual_usuaria = $_POST[ "meta_actual_usuaria" ];
        $meta_actual_certificada = $_POST[ "meta_actual_certificada" ];
        $id_fuente_actual_financiamiento = $_POST[ "id_fuente_actual_financiamiento" ];
        $meta_anterior = $_POST[ "meta_anterior" ];
        $fuente_anterior = $_POST[ "fuente_anterior" ];
        $pao = $_POST[ "pao" ];
        $ccp = $_POST[ "ccp" ];
        $monto_total = $_POST[ "monto_total" ];
        $mes1 = $_POST[ "mes1" ];
        $mes2 = $_POST[ "mes2" ];
        $mes3 = $_POST[ "mes3" ];
        $descripcion_servicio = $_POST[ "descripcion_servicio" ];
        $idcargo = $_POST[ "idcargo" ];
        $condicion_profesion = $_POST[ "condicion_profesion" ];
        $tipo_empleado = $_POST[ "tipo_empleado" ];
        $id_sub_costo = $_POST[ "id_sub_costo" ];
        $idupss = $_POST[ "idupss" ];
        $idespecialidad = $_POST[ "idespecialidad" ];
        $rne = $_POST[ "rne" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_contratos_terceros = $this->loadModel( 'personal' );
        $buscar = $this->grabar_contratos_terceros->GrabarPersonalTerceroServicios( $idpersonal, $fecha_ingreso, $duracion, $fin_servicio, $expediente, $nota_informativa, $nro_pedido, $meta_actual_usuaria, $meta_actual_certificada, $id_fuente_actual_financiamiento, $meta_anterior, $fuente_anterior, $pao, $ccp, $monto_total, $mes1, $mes2, $mes3, $descripcion_servicio, $idcargo, $condicion_profesion, $tipo_empleado, $id_sub_costo, $idupss, $idespecialidad, $rne, $observacion, $usuario );
        $buscar = $this->grabar_contratos_terceros->grabar_actualizacion_fecha_ultimo_servicio_tercero( $idpersonal, $fin_servicio );
        echo $buscar;
    }
    
   // ver_contratos_personal_tercero_final 

    public

    function eliminar_datos_contratos_Servicio_terceros() {
        $id = $_POST[ "id" ];
        $this->eliminar_contratos_servicios_terceros = $this->loadModel( 'personal' );
        $buscar = $this->eliminar_contratos_servicios_terceros->EliminarContratosServiciosTerceros( $id );
        echo $buscar;
    }

    public

    function grabar_datos_modificar_terceros() {
        $fecha_ingreso = $_POST[ "fecha_ingreso" ];
        $duracion = $_POST[ "duracion" ];
        $fin_servicio = $_POST[ "fin_servicio" ];
        $expediente = $_POST[ "expediente" ];
        $nota_informativa = $_POST[ "nota_informativa" ];
        $nro_pedido = $_POST[ "nro_pedido" ];
        $meta_actual_usuaria = $_POST[ "meta_actual_usuaria" ];
        $meta_actual_certificada = $_POST[ "meta_actual_certificada" ];
        $id_fuente_actual_financiamiento = $_POST[ "id_fuente_actual_financiamiento" ];
        $pao = $_POST[ "pao" ];
        $ccp = $_POST[ "ccp" ];
        $monto_total = $_POST[ "monto_total" ];
        $mes1 = $_POST[ "mes1" ];
        $mes2 = $_POST[ "mes2" ];
        $mes3 = $_POST[ "mes3" ];
        $descripcion_servicio = utf8_decode( $_POST[ "descripcion_servicio" ] );
        $idcargo = $_POST[ "idcargo" ];
        $condicion_profesion = $_POST[ "condicion_profesion" ];
        $tipo_empleado = $_POST[ "tipo_empleado" ];
        $id_sub_costo = $_POST[ "id_sub_costo" ];
        $idupss = $_POST[ "idupss" ];
        $idespecialidad = $_POST[ "idespecialidad" ];
        $rne = $_POST[ "rne" ];
        $observacion = utf8_decode( $_POST[ "observacion" ] );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $id = $_POST[ "id" ];
        $this->grabar_contratos_terceros = $this->loadModel( 'personal' );
        $buscar = $this->grabar_contratos_terceros->GrabarModificacionTerceros( $fecha_ingreso, $duracion, $fin_servicio, $expediente, $nota_informativa, $nro_pedido, $meta_actual_usuaria, $meta_actual_certificada, $id_fuente_actual_financiamiento, $pao, $ccp, $monto_total, $mes1, $mes2, $mes3, $descripcion_servicio, $idcargo, $condicion_profesion, $tipo_empleado, $id_sub_costo, $idupss, $idespecialidad, $rne, $observacion, $usuario, $id );
        echo $buscar;

    }

    
        

    public

    function personal_terceros_mostrar_carreras() {
        $id = $_POST[ "id" ];
        $this->ver_carreras = $this->loadModel( 'personal' );
        $buscar = $this->ver_carreras->MostrarCarreraPersonalTercero( $id );
        echo $buscar;
    }


    public

    function personal_tercero_grabar_carrera() {
        $idpersonal = $_POST[ "idpersonal" ];
        $idprofesion = $_POST[ "idprofesion" ];
        $idcolegio = $_POST[ "idcolegio" ];
        $nro_colegio = $_POST[ "nro_colegio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_carrera_personal_tercero = $this->loadModel( 'personal' );
        $buscar = $this->grabar_carrera_personal_tercero->GrabarCarreraPersonalTercero( $idpersonal, $idprofesion, $idcolegio, $nro_colegio, $usuario );
        echo $buscar;
    }



    public

    function personal_tercero_modificacion_carrera() {
        $id = $_POST[ "id" ];
        $idprofesion = $_POST[ "idprofesion" ];
        $idcolegio = $_POST[ "idcolegio" ];
        $nro_colegio = $_POST[ "nro_colegio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_carrera_personal_tercero = $this->loadModel( 'personal' );
        $buscar = $this->grabar_carrera_personal_tercero->GrabarModificacionPersonalTercero( $idprofesion, $idcolegio, $nro_colegio, $usuario, $id );
        echo $buscar;
    }




    public

    function personal_tercero_eliminar_carrera() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro_carrera = $this->loadModel( 'personal' );
        $buscar = $this->eliminar_registro_carrera->EliminarCarreraDePersonalTercero( $id );
        echo $buscar;

    }


    public

    function personal_tercero_ver_habilidades_de_carrera() {
        $id = $_POST[ "id" ];
        $this->ver_todas_las_habilidades = $this->loadModel( 'personal' );
        $buscar = $this->ver_todas_las_habilidades->VerTodasLasHabilidesPorCarrera( $id );
        echo $buscar;

    }

    public

    function personal_tercero_grabar_carrera_habilidad() {
        $idcarrera = $_POST[ "idcarrera" ];
        $inicio = $_POST[ "inicio" ];
        $fin = $_POST[ "fin" ];
        $nro = $_POST[ "nro" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->ver_personal_tercero_habilidad = $this->loadModel( 'personal' );
        $buscar = $this->ver_personal_tercero_habilidad->GrabarHabilidadesPorCarrera( $idcarrera, $inicio, $fin, $nro, $usuario );
        echo $buscar;

    }

    public

    function personal_tercero_modificar_carrera_habilidad() {
        $id = $_POST[ "id" ];
        $inicio = $_POST[ "inicio" ];
        $fin = $_POST[ "fin" ];
        $nro = $_POST[ "nro" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_modificacion_habilidad = $this->loadModel( 'personal' );
        $buscar = $this->grabar_modificacion_habilidad->GrabarModificacionHabilidadesPorCarrera( $inicio, $fin, $nro, $usuario, $id );
        echo $buscar;

    }


    public

    function personal_tercero_eliminar_habilidad() {
        $id = $_POST[ "id" ];
        $this->grabar_eliminar_habilidad = $this->loadModel( 'personal' );
        $buscar = $this->grabar_eliminar_habilidad->EliminarHabilidadProfesional( $id );
        echo $buscar;
    }

    public

    function ver_dato_personal_registrado() {
        $id = $_POST[ "id" ];
        $this->ver_dato_personal_ya_existente = $this->loadModel( 'personal' );
        $buscar = $this->ver_dato_personal_ya_existente->ObtenerDatoPersonal( $id );
        echo $buscar;

    }

    public

    function verificar_si_existe_ruc() {

        $id = $_POST[ "id" ];
        $this->ver_ruc_existente = $this->loadModel( 'personal' );
        $buscar = $this->ver_ruc_existente->VerExistenciaRUC( $id );
        echo $buscar;

    }


    public

    function verificar_carrera() {
        $idpersonal = $_POST[ "idpersonal" ];
        $idcarrera = $_POST[ "idcarrera" ];
        $this->ver_si_existe_carrera = $this->loadModel( 'personal' );
        $buscar = $this->ver_si_existe_carrera->VerExistenciaCarrera( $idpersonal, $idcarrera );
        echo $buscar;

    }


    public

    function verificar_fecha_habilidad_si_existe() {
        $fecha_inicio = $_POST[ "fecha_inicio" ];
        $idcarrera = $_POST[ "idcarrera" ];
        $this->ver_si_existe_habilidad = $this->loadModel( 'personal' );
        $buscar = $this->ver_si_existe_habilidad->VerSiExisteHabilidad( $idcarrera, $fecha_inicio );
        echo $buscar;

    }


    public

    function actualizar_fechas_ultimo() {
        $id_servicio = $_POST[ "id_servicio" ];
        $id_personal = $_POST[ "id_personal" ];
        $this->ver_actualizacion = $this->loadModel( 'personal' );
        $buscar = $this->ver_actualizacion->VerUpdateFechas( $id_servicio, $id_personal );
        echo $buscar;

    }


    public

    function ver_fecha_ultimo_contrato_de_servicio() {
        $idperso = $_POST[ "idperso" ];
        $this->ver_ultima_fecha = $this->loadModel( 'personal' );
        $buscar = $this->ver_ultima_fecha->VerUltimaFechaServicio( $idperso );
        echo $buscar;
    }




    /* FIN DE  PERSONAL TERCERO **/



    /* INICIO DE  REGISTRO DE CESE */
    public

    function cese() {
        $this->_view->titulo = 'Registro de CESE Personal Tercero- Juridico - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'cese' ) );
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

                $this->_view->renderizar( 'cese', false );

            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }





    /* FIN DE REGISTRO DE CESE */






    /************ inicio Para PERSONAL CAS - Definitivo *******************/

    public

    function cas() {
        $this->_view->titulo = 'Registro de Personal CAS - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'cas' ) );
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
                $this->_view->renderizar( 'cas', false );

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
        $this->_buscar_nombres_cas = $this->loadModel( 'personal' );
        $buscar_y_personal_cas = $this->_buscar_nombres_cas->getListadoPersonalCas( $buscar_por_nombre );
        echo $buscar_y_personal_cas;

    }

    public

    function vercontratos_del_personal() {
        $id = $_POST[ "id" ];
        $this->_ver_contratos = $this->loadModel( 'personal' );
        $buscar = $this->_ver_contratos->ObtenerContratosPersonal( $id );
        echo $buscar;
 
    }



    public

    function listar_adendas_de_un_contrato() {

        $id = $_POST[ "id" ];
        $this->_ver_adendas = $this->loadModel( 'personal' );
        $buscar = $this->_ver_adendas->ObtenerAdendasDeUnContrato( $id );
        echo $buscar;
    }


    public

    function listar_todos_los_departamentos()

    {
        $id = $_POST[ "id" ];
        $this->_read_departamentos = $this->loadModel( 'personal' );
        $read_registros = $this->_read_departamentos->LeerTodosDepartamentos();
        echo $read_registros;

    }

    // ver_contratos_personal_tercero

    public

    function listar_solo_las_provincias() {
        $id = $_POST[ "id" ];
        $this->_read_provincias = $this->loadModel( 'personal' );
        $read_registros = $this->_read_provincias->LeerProvincias( $id );
        echo $read_registros;

    }



    public

    function listar_solo_los_distritos() {
        $id_depar = $_POST[ "id_depar" ];
        $id_provin = $_POST[ "id_provin" ];
        $this->_read_distritos = $this->loadModel( 'personal' );
        $read_registros = $this->_read_distritos->LeerDistritos( $id_depar, $id_provin );
        echo $read_registros;

    }








    /************ Fin de Personal  CAS *******************/


    /* Inicio de persona juridicas */

    
    // ver_contratos_personal_juridico

    public

    function juridicas() {
        $this->_view->titulo = 'Registro de Personas Juridicas - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'juridicas' ) );
        $this->_view->setJs( array( 'juridicas_servicios' ) );
        $this->_view->setJs( array( 'juridicas_empleados' ) );
        $this->_view->setJs( array( 'juridicas_cese' ) );
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
                $this->_listar_motivos = $this->loadModel( 'personal' );
                $this->_view->listar_motivos = $this->_listar_motivos->getListadoMotivosRenuncias();

                $this->_view->renderizar( 'juridicas', false );
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

    function listar_todo_personal_juridico() {
        $id = $_POST[ "id" ];
        $this->listar_personal_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->listar_personal_juridicos->ObtenerListadoJuridicos( $id );
        echo $buscar;
    }


    public

    function listado_personal_juridico_de_baja() {
        $estado = $_POST[ "estado" ];
        $this->listar_personal_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->listar_personal_juridicos->ObtenerListadoJuridicosDeBaja( $estado );
        echo $buscar;
    }







    public

    function verificar_ruc_juridico() {
        $id = $_POST[ "id" ];
        $this->listar_personal_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->listar_personal_juridicos->ObtenerListadoJuridicos( $id );
        echo $buscar;


    }

    public

    function grabar_juridicos() {
        $ruc = $_POST[ "ruc" ];
        $razon = $_POST[ "razon" ];
        $representante_legal = $_POST[ "representante_legal" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->listar_personal_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->listar_personal_juridicos->GrabarPersonalJuridico( $ruc, $razon, $representante_legal, $usuario );
        echo $buscar;

    }




    public

    function grabar_modificacion_juridicos() {
        $id = $_POST[ "id" ];
        $ruc = $_POST[ "ruc" ];
        $razon = $_POST[ "razon" ];
        $representante_legal = $_POST[ "representante_legal" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->listar_personal_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->listar_personal_juridicos->GrabarPersonalJuridicoModificacion( $ruc, $razon, $representante_legal, $usuario, $id );
        echo $buscar;
    }



    public

    function dar_de_baja_juridicos()

    {
        $id = $_POST[ "id" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->listar_personal_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->listar_personal_juridicos->DardeBajaPersonasJuridicas( $usuario, $id );
        echo $buscar;

    }

    public

    function ver_habiles_juridicos() {
        $id = $_POST[ "id" ];
        $this->reporte = $this->loadModel( 'personal' );
        // $buscar = $this->reporte->EstadisticaEmpleadosHabilesDesactivados();
        $buscar = $this->reporte->EstadisticaJuridicosHabiles();
        echo $buscar;


    }


    public

    function habilitar_juridicos() {
        $id = $_POST[ "id" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->listar_personal_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->listar_personal_juridicos->DarHabilitacionPersonasJuridicas( $usuario, $id );
        echo $buscar;
    }


    public

    function validar_nota_informativa_ingresada() {
        $nota = $_POST[ "nota" ];
        $this->listar_nota_informativa_validar = $this->loadModel( 'personal' );
        $buscar = $this->listar_nota_informativa_validar->ValidarNotaInformativaRegistrada( $nota );
        echo $buscar;
    }






    /*** FIN DE PERSONAS JURIDICAS */



    /* SERVICIOS DE CONTRATOS JURIDICOS POR SERVICIOS */
    // ver_contratos_personal_juridico'

    public

    function grabar_contratos_de_juridicos() {
        $idjuridico = $_POST[ "idjuridico" ];
        $ruc = $_POST[ "ruc" ];
        $fecha_inicio = $_POST[ "fecha_inicio" ];
        $fecha_fin = $_POST[ "fecha_fin" ];
        $nota_informativa = $_POST[ "nota_informativa" ];
        $cargo = $_POST[ "cargo" ];
        $nro_expediente = $_POST[ "nro_expediente" ];
        $idunidad = $_POST[ "idunidad" ];
        $meta_actual = $_POST[ "meta_actual" ];
        $meta_anterior = $_POST[ "meta_anterior" ];
        $meta_siga = $_POST[ "meta_siga" ];
        $pao = $_POST[ "pao" ];
        $ccp = $_POST[ "ccp" ];
        $cantidad_medicos = $_POST[ "cantidad_medicos" ];
        $cantidad_horas = $_POST[ "cantidad_horas" ];
        $mes1 = $_POST[ "mes1" ];
        $mes2 = $_POST[ "mes2" ];
        $monto_total = $_POST[ "monto_total" ];
        $distribucion = $_POST[ "distribucion" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_servicios_de_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->grabar_servicios_de_juridicos->GrabarContratosServiciosJuridicos( $idjuridico, $ruc, $fecha_inicio, $fecha_fin, $nota_informativa, $nro_expediente, $cargo, $idunidad, $meta_actual, $meta_anterior, $meta_siga, $pao, $ccp, $cantidad_medicos, $cantidad_horas, $mes1, $mes2, $monto_total, $distribucion, $observacion, $usuario );
        echo $buscar;

    }



    public

    function grabar_contratos_de_juridicos_modificacion() {
        $idjuridicos_Servicios = $_POST[ "idjuridico_servicios" ];
        $idjuridico = $_POST[ "idjuridico" ];
        $ruc = $_POST[ "ruc" ];
        $fecha_inicio = $_POST[ "fecha_inicio" ];
        $fecha_fin = $_POST[ "fecha_fin" ];
        $nota_informativa = $_POST[ "nota_informativa" ];
        $cargo = $_POST[ "cargo" ];
        $nro_expediente = $_POST[ "nro_expediente" ];
        $idunidad = $_POST[ "idunidad" ];
        $meta_actual = $_POST[ "meta_actual" ];
        $meta_anterior = $_POST[ "meta_anterior" ];
        $meta_siga = $_POST[ "meta_siga" ];
        $pao = $_POST[ "pao" ];
        $ccp = $_POST[ "ccp" ];
        $cantidad_medicos = $_POST[ "cantidad_medicos" ];
        $cantidad_horas = $_POST[ "cantidad_horas" ];
        $mes1 = $_POST[ "mes1" ];
        $mes2 = $_POST[ "mes2" ];
        $monto_total = $_POST[ "monto_total" ];
        $distribucion = $_POST[ "distribucion" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_servicios_de_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->grabar_servicios_de_juridicos->GrabarContratosServiciosJuridicosModificacion( $idjuridico, $ruc, $fecha_inicio, $fecha_fin, $nota_informativa, $nro_expediente, $cargo, $idunidad, $meta_actual, $meta_anterior, $meta_siga, $pao, $ccp, $cantidad_medicos, $cantidad_horas, $mes1, $mes2, $monto_total, $distribucion, $observacion, $usuario, $idjuridicos_Servicios );
        echo $buscar;


    }



    public

    function ver_contratos_personal_juridico() {
        $ruc = $_POST[ "ruc" ];
        $this->ver_servicios_personal_juridico = $this->loadModel( 'personal' );
        $buscar = $this->ver_servicios_personal_juridico->ObtenerContratosdeJuridicos( $ruc );
        echo $buscar;
    }




    public

    function grabar_contratos_de_juridicos_eliminar() {
        $idjuridicos_servicios = $_POST[ "idjuridico_servicios" ];
        $this->eliminar_servicios_por_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->eliminar_servicios_por_juridicos->EliminarContratosPorJuridicos( $idjuridicos_servicios );
        echo $buscar;
    }



    public

    function ver_datos_recetas() {
        $id = $_POST[ "id" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_read_recetas = $this->loadModel( 'personal' );
        $read_recetas = $this->_read_recetas->LeerRecetasMedicos( $id, $mes, $anio );
        echo $read_recetas;

    }



 

    public

    function listar_unidad_organica_total() {
        $id = $_POST[ "id" ];
        $this->_buscarservicio = $this->loadModel( 'personal' );
        $buscar_y_servicio = $this->_buscarservicio->ListarUnidadOrganica();
        echo $buscar_y_servicio;


    }

    
       
        
   public

    function listar_centro_de_costo_unidad_organica() {
        $id = $_POST[ "id" ];
        $this->_buscarservicio = $this->loadModel( 'personal' );
        $buscar_y_servicio = $this->_buscarservicio->ListarCentroCostoConUnidadOrganica();
        echo $buscar_y_servicio;


    }
    
   
        
    public

    function listar_centros_sub_costos() {
        $id = $_POST[ "id" ];
        $this->_buscarservicio = $this->loadModel( 'personal' );
        $buscar_y_servicio = $this->_buscarservicio->ListarCentroCostoSubCosto();
        echo $buscar_y_servicio;


    }
    
    

    public

    function listar_todas_las_universidades() {

        $id = $_POST[ "id" ];
        $this->_ver_universidades = $this->loadModel( 'personal' );
        $buscar_y_servicio = $this->_ver_universidades->getListarUniversidad();
        echo $buscar_y_servicio;

    }


    /** Inicio de empleados empresa juridica */

    function grabar_datos_empleado_de_empresa_juridica() {
        $idjuridicoservicio = $_POST[ "id_juridico_servicios" ];
        $ruc_servicios = $_POST[ "ruc_servicios" ];
        $dni = $_POST[ "dni" ];
        $paterno =  utf8_decode(trim($_POST[ "paterno" ]));
        $materno = utf8_decode(trim($_POST[ "materno" ]));
        $nombres = utf8_decode(trim($_POST[ "nombres" ]));
        $apellidos_nombres = $paterno . ' ' . $materno . ' ' . $nombres;
        $idcargo = $_POST[ "idcargo" ];
        $tipo_labor = $_POST[ "tipo_labor" ];
        $observacion = utf8_decode(trim($_POST[ "observacion" ]));
        $idunidad_organica = $_POST[ "idunidad_organica"];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_empleados_empresa_juridicos = $this->loadModel( 'personal' );
        $buscar = $this->grabar_empleados_empresa_juridicos->GrabarEmpleadosdeEmpresaJuridicos( $idjuridicoservicio, $ruc_servicios, $dni, $paterno, $materno, $nombres, $apellidos_nombres, $idcargo, $tipo_labor, $observacion, $idunidad_organica, $usuario );
        echo $buscar;


    }

    public

    function ver_empleados_por_servicios_juridicos() {
        $idjuridicosservicios = $_POST[ "idservicios" ];
        $this->empleados_por_contrato = $this->loadModel( 'personal' );
        $buscar = $this->empleados_por_contrato->EmpleadosPorContratoJuridico( $idjuridicosservicios );
        echo $buscar;
    }


    public
    function grabar_modificacion_empleado_de_juridicos() {
        $id_juridico_servicios = $_POST[ "id_juridico_servicios" ];
        $dni = $_POST[ "dni" ];
        
        $paterno =  utf8_decode(trim($_POST[ "paterno" ]));
        $materno = utf8_decode(trim($_POST[ "materno" ]));
        $nombres = utf8_decode(trim($_POST[ "nombres" ]));

        
        $apellidos_nombres = $paterno . ' ' . $materno . ' ' . $nombres;
        $idcargo = $_POST[ "idcargo" ];
        $tipo_labor = $_POST[ "tipo_labor" ];
        $idunidad_organica = $_POST[ "idunidad_organica"];
        $observacion = utf8_decode(trim($_POST[ "observacion" ]));
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->empleados_por_contrato_modificacion = $this->loadModel( 'personal' );
        $buscar = $this->empleados_por_contrato_modificacion->ModificarEmpleadosJuridicos($dni, $paterno, $materno, $nombres, $apellidos_nombres, $idcargo, $tipo_labor, $idunidad_organica, $observacion, $usuario, $id_juridico_servicios);
        echo $buscar;

    }


    public

    function eliminar_empleados_por_servicios_juridicos() {
        $id_juridico_empleado_servicios = $_POST[ "id_juridico_servicios" ];
        $this->empleados_por_contrato = $this->loadModel( 'personal' );
        $buscar = $this->empleados_por_contrato->DeleteEmpleadoJuridico( $id_juridico_empleado_servicios );
        echo $buscar;

    }


    
    public function eliminar_todos_los_empleados_por_servicios_juridicos(){
          $id_juridico_servicios = $_POST[ "idjuridico_servicios" ];
          $this->empleados_por_contrato_juridico = $this->loadModel( 'personal' );
          $buscar = $this->empleados_por_contrato_juridico->DeleteTodosEmpleadoJuridico( $id_juridico_servicios);
        echo $buscar;
        
    }


   
    public function registrar_cese_en_tercero(){
        $id_servicio = $_POST[ "id_servicio" ];
        $id_motivo = $_POST[ "id_motivo" ];
        $fecha_cese = $_POST[ "fecha_cese" ];
        $monto_cese = $_POST[ "monto_cese" ];
        $observacion_cese = $_POST[ "observacion_cese" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->update_registro_cese = $this->loadModel( 'personal' );
        $buscar = $this->update_registro_cese->Grabar_RegistroCese( $id_motivo,$fecha_cese,$monto_cese, $observacion_cese, $usuario, $id_servicio);
        echo $buscar;
        
          
    }

    // tercero
    
        public function registrar_cese_en_juridico(){
        $id_servicio = $_POST[ "id_servicio" ];
        $id_motivo = $_POST[ "id_motivo" ];
        $fecha_cese = $_POST[ "fecha_cese" ];
        $monto_cese = $_POST[ "monto_cese" ];
        $observacion_cese = $_POST[ "observacion_cese" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->update_registro_cese_juridico = $this->loadModel( 'personal' );
        $buscar = $this->update_registro_cese_juridico->Grabar_RegistroCeseJuridico( $id_motivo,$fecha_cese,$monto_cese, $observacion_cese, $usuario, $id_servicio);
        echo $buscar;
        
          
    }

    
     
  // grabar_contratos_de_juridicos   
    
    
    /** Fin de registro Tercero */
    
    
    




}
?>