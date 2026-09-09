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
        $lc_buscar_personal = trim( $_POST[ "nombres" ] );
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




    public

    function tercero() {
        $this->_view->titulo = 'Registro de Personal Tercero - Logistica - Monitoreo de RRHH - ' . INSTITUCION;
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
    function grabar_registro_terceros() {
        
        $id_documento = $_POST[ "id_documento" ];
        $nro_documento = $_POST[ "nro_documento" ];
        $id_pais = $_POST[ "id_pais" ];
        $id_sexo = $_POST[ "id_sexo" ];
        $nacimiento = $_POST[ "nacimiento" ];
        $ruc = $_POST[ "ruc" ];
        $paterno = $_POST[ "paterno" ];
        $materno = $_POST[ "materno" ];
        $casada = $_POST[ "casada" ];
        $nombres = $_POST[ "nombres" ];
        $id_colegio = $_POST[ "id_colegio" ];
        $nro_colegio = $_POST[ "nro_colegio" ];
        $inicio_habiliddad = $_POST[ "inicio_habilidad" ];
        $fin_habilidad = $_POST[ "fin_de_habilidad" ];
        $nro_habilitacion = $_POST[ "nro_habilitacion" ];
        $inicio_servicio = $_POST[ "inicio_servicio" ];
        $fin_de_servicio = $_POST[ "fin_de_servicio" ];
        $nro_servicio = $_POST[ "nro_servicio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
            
        $this->grabar_nuevo_registro_tercero = $this->loadModel( 'personal' );
        $ejecutar = $this->grabar_nuevo_registro_tercero->GrabarNuevoRegistroTercero( $id_documento, $nro_documento, $id_pais, $id_sexo, $nacimiento, $ruc, $paterno, $materno, $casada, $nombres, $id_colegio, $nro_colegio, $inicio_habiliddad, $fin_habilidad,$nro_habilitacion, $inicio_servicio, $fin_de_servicio, $nro_servicio, $usuario);
        echo $ejecutar;
   

    }









}
?>