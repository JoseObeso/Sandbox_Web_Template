<?php

class parametrosController extends Controller {
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

    // turnos
    public

    function horarios() {
        $this->_view->titulo = 'Administracion de Horarios - Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'horarios' ) );
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
                $this->_view->renderizar( 'horarios', false );
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

    function procesar_lista_de_horario() {
        $id = utf8_decode( $_POST[ "id" ] );
        $this->listado_horarios = $this->loadModel( 'parametros' );
        $ejecutar = $this->listado_horarios->getListadoHorarios( $id );
        echo $ejecutar;
    }


    public

    function listar_turno() {
        $id = utf8_decode( $_POST[ "id" ] );
        $this->listado_turnos = $this->loadModel( 'parametros' );
        $ejecutar = $this->listado_turnos->getListadoTurnos( $id );
        echo $ejecutar;
    }


    public

    function ver_si_existe_codigo() {
        $id = $_POST[ "id" ];
        $this->existe_codigo = $this->loadModel( 'parametros' );
        $ejecutar = $this->existe_codigo->VerExistenciaCodigo( $id );
        echo $ejecutar;
    }



    public

    function grabar_nuevo_horario()

    {
        $codigo_horario = $_POST[ "codigo_horario" ];
        $codigo_turno = $_POST[ "codigo_turno" ];
        $entrada = $_POST[ "entrada" ];
        $salida = $_POST[ "salida" ];
        $horas = $_POST[ "horas" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_nuevo_registro_horario = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_nuevo_registro_horario->GrabarNuevoHorario( $codigo_horario, $codigo_turno, $entrada, $salida, $horas, $observacion, $usuario );
        echo $ejecutar;

    }







    public

    function grabar_edicion_horario() {
        $id = $_POST[ "id" ];
        $codigo_horario = $_POST[ "codigo_horario" ];
        $codigo_turno = $_POST[ "codigo_turno" ];
        $entrada = $_POST[ "entrada" ];
        $salida = $_POST[ "salida" ];
        $horas = $_POST[ "horas" ];
        $observacion = $_POST[ "observacion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_registro_horario = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_registro_horario->GrabarEdicionHorario( $id, $codigo_horario, $codigo_turno, $entrada, $salida, $horas, $observacion, $usuario );
        echo $ejecutar;


    }


    public

    function dar_de_baja_horario() {
        $id = $_POST[ "id" ];
        $this->anular_horario = $this->loadModel( 'parametros' );
        $borrar_horario = $this->anular_horario->DardeBajaHorario( $id );
        echo $borrar_horario;

    }


    public

    function licencias() {
        $this->_view->titulo = 'Administracion de Licencias - Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
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

                $this->_licencias = $this->loadModel( 'parametros' );
                $this->_view->licencias = $this->_licencias->getListadoLicencias( $u );


                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( 'parametros' );
                $a_submenu->setNombre( "licencias" );

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

    function feriados() {
        $this->_view->titulo = 'Administracion de Feriados y dias festivos - Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'feriados' ) );
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

                $this->_feriados = $this->loadModel( 'parametros' );
                $this->_view->feriados = $this->_feriados->getListadoFeriados( $u );

                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( 'parametros' );
                $a_submenu->setNombre( "feriados" );

                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'feriados', false );
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

    function condicion() {
        $this->_view->titulo = 'Administracion de Condicion Laboral  - Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'condicion' ) );
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
                $this->_condicion = $this->loadModel( 'parametros' );
                $this->_view->condicion = $this->_condicion->getListadocondicion( $u );

                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( 'parametros' );
                $a_submenu->setNombre( "Condicion Laboral" );

                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'condicion', false );
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

    function listar_todos_condicion_laboral() {
        $id = $_POST[ "id" ];
        $this->listar_condicion_laboral = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_condicion_laboral->ListarTodosCondicionLaboral();
        echo $ejecutar;

    }


    public

    function listar_todos_establecimientos() {
        $id = $_POST[ "id" ];
        $this->listar_establecimientos = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_establecimientos->ListarEstablecimientos( $id );
        echo $ejecutar;


    }




    /*** inicio de actividades en general ***/




    public

    function actividades() {
        $this->_view->titulo = 'Gestion de Actividades Medicas  - Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'actividades' ) );
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
                $this->_view->renderizar( 'actividades', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }


    // ListarActividadesEnGeneral


    public

    function listar_actividades_en_general() {
        $actividad = $_POST[ "actividad" ];
        $this->lista_actividad = $this->loadModel( 'parametros' );
        $ejecutar = $this->lista_actividad->getListadoActividades();
        echo $ejecutar;

    }


    public

    function grabar_actividad() {
        $nombre = $_POST[ "nombre" ];
        $abreviatura = $_POST[ "abreviatura" ];
        $titulo = $_POST[ "titulo" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_nueva_actividad = $this->loadModel( 'parametros' );
        $grabar_nueva_actividad = $this->grabar_nueva_actividad->GuardarNuevaActividad( $nombre, $abreviatura, $titulo, $usuario );
        echo $grabar_nueva_actividad;

    }



    public

    function grabar_edicion_actividad_total() {
        $id_actividad = $_POST[ "id_actividad" ];
        $nombre = $_POST[ "nombre" ];
        $abreviatura = $_POST[ "abreviatura" ];
        $titulo = $_POST[ "titulo" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_edicion_actividad = $this->loadModel( 'parametros' );
        $grabar_edicion_actividad = $this->grabar_edicion_actividad->GuardarEdicionActividad( $nombre, $abreviatura, $titulo, $usuario, $id_actividad );
        echo $grabar_edicion_actividad;

    }



    public

    function eliminar_registro_actividad() {
        $id_actividad = $_POST[ "id_actividad" ];
        $this->eliminar_actividad = $this->loadModel( 'parametros' );
        $eliminar_actividad = $this->eliminar_actividad->EliminarActividad( $id_actividad );
        echo $eliminar_actividad;

    }




    public

    function grabar_sub_actividad_de_actividad() {
        $idactividad = $_POST[ "idactividad" ];
        $nombre_sub_actividad = $_POST[ "nombre_sub_actividad" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_sub_actividad = $this->loadModel( 'parametros' );
        $grabar_sub_actividad = $this->grabar_sub_actividad->GuardarSubActividad( $idactividad, $nombre_sub_actividad, $usuario );
        echo $grabar_sub_actividad;

    }


    public

    function listar_sub_actividades_de_actividades() {
        $idactividad = $_POST[ "idactividad" ];
        $this->listar_sub_actividad = $this->loadModel( 'parametros' );
        $grabar_sub_actividad = $this->listar_sub_actividad->ListarSubActividades( $idactividad );
        echo $grabar_sub_actividad;

    }


    public

    function modificacion_sub_actividad_de_actividad() {
        $idsubactividad = $_POST[ "idsubactividad" ];
        $nombre_sub_actividad = $_POST[ "nombre_sub_actividad" ];
        $this->listar_sub_actividad_modificacion = $this->loadModel( 'parametros' );
        $grabar_sub_actividad = $this->listar_sub_actividad_modificacion->ModificarSubActividades( $nombre_sub_actividad, $idsubactividad );
        echo $grabar_sub_actividad;

    }


    public

    function eliminar_sub_actividad_total() {
        $idsubactividad = $_POST[ "idsubactividad" ];
        $this->eliminar_sub_actividad_modificacion = $this->loadModel( 'parametros' );
        $grabar_sub_actividad = $this->eliminar_sub_actividad_modificacion->EliminarSubActividades( $idsubactividad );
        echo $grabar_sub_actividad;


    }


    /* tipo de actividades */

    public

    function grabar_tipo_actividad_total() {
        $idactividad_add = $_POST[ "idactividad_add" ];
        $tipo_actividad = $_POST[ "tipo_actividad" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_tipo_actividad_de_actividad = $this->loadModel( 'parametros' );
        $grabar_sub_actividad = $this->grabar_tipo_actividad_de_actividad->GrabarTipoActividad( $idactividad_add, $tipo_actividad, $usuario );
        echo $grabar_sub_actividad;
    }



    // grabar_tipo_actividad(leer_id_actividad_add, leer_tipo_actividad);
    public

    function listar_tipo_de_actividades_total() {
        $tipo_actividad = $_POST[ "idactividad" ];
        $this->listar_tipo_actividad_de_actividad = $this->loadModel( 'parametros' );
        $grabar_sub_actividad = $this->listar_tipo_actividad_de_actividad->ListarTipoActividad();
        echo $grabar_sub_actividad;
    }


    /*
       data_modificar_tipo_actividad = {
        'idtipo': leer_id_tipo_actividad,
        'idactividad_add' : leer_id_actividad_add,
        'tipo_actividad': leer_tipo_actividad
    };

    $.ajax({
        data: data_modificar_tipo_actividad,
    */


    public

    function modificar_tipo_actividad_total() {
        $idtipo_actividad = $_POST[ "idtipo" ];
        $idactividad_add = $_POST[ "idactividad_add" ];
        $tipo_actividad = $_POST[ "tipo_actividad" ];
        $this->modificar_tipo_actividad_de_actividad = $this->loadModel( 'parametros' );
        $grabar_sub_actividad = $this->modificar_tipo_actividad_de_actividad->ModificarTipoActividadTotal( $idactividad_add, $tipo_actividad, $idtipo_actividad );
        echo $grabar_sub_actividad;

    }


    public

    function eliminar_tipo_actividad_total() {
        $idtipo_actividad = $_POST[ "idtipo" ];
        $this->eliminar_tipo_actividad_de_actividad = $this->loadModel( 'parametros' );
        $grabar_sub_actividad = $this->eliminar_tipo_actividad_de_actividad->ElminarTipoActividadTotal( $idtipo_actividad );
        echo $grabar_sub_actividad;




    }


    // SELECT IDTIPOACTIVIDADES, TIPO_ACTIVIDADES, USUARIO, FECHAREGISTRO   FROM [HEVES_RRHH].[dbo].[ACTIVIDAD_TIPO]






    /* fin de tipo de actividades */









    /*** fin de actividades ***/



    public

    function motivos() {
        $this->_view->titulo = 'Administracion de tipos de motivos de renuncia - Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'motivos' ) );
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
                $this->_motivos = $this->loadModel( 'parametros' );
                $this->_view->motivos = $this->_motivos->getListadoMotivos( $u );
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( 'parametros' );
                $a_submenu->setNombre( "Motivos de Cese" );

                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'motivos', false );
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

    function listar_todos_motivos_renuncia() {
        $id = $_POST[ "id" ];
        $this->listar_motivos_de_renuncia = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_motivos_de_renuncia->getListadoMotivosRenuncia();
        echo $ejecutar;
    }


    /** inicio de turnos */



    public

    function turnos() {
        $this->_view->titulo = 'Administracion de Tipos de Turnos - Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'turnos' ) );
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

                $this->_view->renderizar( 'turnos', false );
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

    function listar_todos_los_turnos() {
        $turnos = $_POST[ "turnos" ];
        $this->ver_turnos = $this->loadModel( 'parametros' );
        $ejecutar = $this->ver_turnos->getListadoTurnos();
        echo $ejecutar;

    }


    public

    function grabar_registro_turno_total() {
        $codigo_turno = $_POST[ "codigo_turno" ];
        $nombre_turno = $_POST[ "nombre_turno" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->registrar_turnos = $this->loadModel( 'parametros' );
        $ejecutar = $this->registrar_turnos->RegistrarTurno( $codigo_turno, $nombre_turno, $usuario );
        echo $ejecutar;

    }



    public
    function modificar_registro_turno_total() {
        $idturno = $_POST[ "idturno" ];
        $codigo_turno = $_POST[ "codigo_turno" ];
        $nombre_turno = $_POST[ "nombre_turno" ];
        $this->modificar_turnos = $this->loadModel( 'parametros' );
        $ejecutar = $this->modificar_turnos->ModificarTurno( $codigo_turno, $nombre_turno, $idturno);
        echo $ejecutar;

    }
    
    
    
    public function eliminar_registro_turno_total(){
        $idturno = $_POST[ "idturno" ];
        $this->eliminar_turnos = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_turnos->EliminarTurno( $idturno );
        echo $ejecutar;

        
        
        
    }
        





    /** fin de turnos */



    public

    function unidad() {
        $this->_view->titulo = 'Administracion de Unidades Organicas y Asignacion de Usuarios- Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'unidad' ) );
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

                $this->_unidad = $this->loadModel( 'parametros' );
                $this->_view->unidad = $this->_unidad->getListadoUnidad( $u );

                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( 'parametros' );
                $a_submenu->setNombre( "Autorizar Usuarios" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );

                $this->_servicios = $this->loadModel( 'parametros' );
                $this->_view->listar_servicios_centrosubcosto = $this->_servicios->getListarServicios();


                $this->_ver_usuarios = $this->loadModel( 'parametros' );
                $this->_view->listarusuarios = $this->_ver_usuarios->getListadoUsuarios( $u );

                $this->_view->renderizar( 'unidad', false );
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

    function asignar_servicios() {
        $this->_view->titulo = 'Asignacion de servicios  - Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'asignar_servicios' ) );
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
                $this->_unidad = $this->loadModel( 'parametros' );
                $this->_view->unidad = $this->_unidad->ObtenerUnidadesOrganicas();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( 'parametros' );
                $a_submenu->setNombre( "Asignar servicios" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'asignar_servicios', false );
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

    function recargar_licencias() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_licencias = $this->loadModel( 'parametros' );
        $this->_view->licencias = $this->_licencias->getListadoLicencias( $u );
        echo $this->_view->licencias;
    }

    public

    function recargar_feriados() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_feriados = $this->loadModel( 'parametros' );
        $this->_view->feriados = $this->_feriados->getListadoFeriados( $u );
        echo $this->_view->feriados;


    }


    public

    function recargar_condicion() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_condicion = $this->loadModel( 'parametros' );
        $this->_view->condicion = $this->_condicion->getListadoCondicion( $u );
        echo $this->_view->condicion;

    }




    public

    function recargar_motivos() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_motivos = $this->loadModel( 'parametros' );
        $this->_view->motivos = $this->_motivos->getListadoMotivos( $u );
        echo $this->_view->motivos;

    }



    public

    function recargar_unidad() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_unidad = $this->loadModel( 'parametros' );
        $this->_view->unidad = $this->_unidad->getListadoUnidad( $u );
        echo $this->_view->unidad;

    }


    public

    function guardar_usuario_asignado_a_uo() {

        $captura_unidad_organica = $_POST[ "codigo_uo" ];
        $captura_seleccion_usuario = trim( $_POST[ "dni_usuario" ] );
        $usuario_registro = $_SESSION[ "usuario" ][ "dni" ];
        $this->_grabar_usuario_autorizado = $this->loadModel( 'parametros' );
        $this->_view->grabar_usuario_autorizado = $this->_grabar_usuario_autorizado->GrabarUsuarioAutorizado( $captura_unidad_organica, $captura_seleccion_usuario, $usuario_registro );
        echo $this->_view->grabar_usuario_autorizado;

    }


    public

    function desactivar_usuario_uo() {
        $id_uo = $_POST[ "id_uo_desactivar" ];
        $this->_id_uo = $this->loadModel( 'parametros' );
        $id_uo_para_desactivar = $this->_id_uo->DesactivarUsuarioUO( $id_uo );
        echo $id_uo_para_desactivar;
    }



    public

    function grabar_nuevo_turno() {
        $codigo_grabar = $_POST[ "codigo" ];
        $turno_grabar = $_POST[ "turno" ];
        $this->_grabar_turno = $this->loadModel( 'parametros' );
        $ejecutar_grabacion_turno = $this->_grabar_turno->GrabarTurno( $codigo_grabar, $turno_grabar );
        echo $ejecutar_grabacion_turno;


    }


    public

    function grabar_edicion_turno() {
        $codigo_ini = $_POST[ "codigo_inicial" ];
        $turno_ini = $_POST[ "turno_inicial" ];
        $id_turno = $_POST[ "id_turno" ];
        $codigo_modificado = $_POST[ "codigo_modificado" ];
        $turno_modificado = $_POST[ "turno_modificado" ];
        $codigo_modificado_grabar = ( $codigo_modificado === $codigo_ini ) ? $codigo_ini : $codigo_modificado;
        $turno_modificado_grabar = ( $turno_modificado === $turno_ini ) ? $turno_ini : $turno_modificado;
        $this->_grabar_edicion = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion->GrabarEdicionTurno( $id_turno, $codigo_ini, $codigo_modificado_grabar, $turno_modificado_grabar );
        echo $ejecutar_grabar_edicion;

    }

    public

    function eliminar_turno() {
        $id_tipo = $_POST[ "id_tipo" ];
        $this->_eliminar_turno = $this->loadModel( 'parametros' );
        $eliminar_turno = $this->_eliminar_turno->EliminarTurno( $id_tipo );
        echo $eliminar_turno;


    }



    public

    function grabar_licencia() {
        $descripcion = $_POST[ "descripcion_licencia" ];
        $procede = $_POST[ "procede_descuento" ];
        $this->grabar_licencia = $this->loadModel( 'parametros' );
        $grabar_licencia = $this->grabar_licencia->GuardarLicencias( $descripcion, $procede );
        echo $grabar_licencia;
    }




    public

    function grabar_edicion_licencia() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $id_licencia = $_POST[ "id_tipo_licencia" ];
        $descripcion = $_POST[ "descripcion_licencia" ];
        $procede_descuento = $_POST[ "procede_descuento" ];
        $this->edicion_licencia = $this->loadModel( 'parametros' );
        $guardar_edicion_licencia = $this->edicion_licencia->GuardarEdicionLicencia( $usuario, $id_licencia, $descripcion, $procede_descuento );
        echo $guardar_edicion_licencia;
    }


    public

    function eliminar_licencias() {
        $id_licencias = $_POST[ "id_tipo_licencia" ];
        $this->eliminar_licencias = $this->loadModel( 'parametros' );
        $borrar_licencias = $this->eliminar_licencias->DeleteLicencias( $id_licencias );
        echo $borrar_licencias;


    }


    public

    function grabar_feriados() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $dia = $_POST[ "dia" ];
        $mes = $_POST[ "mes" ];
        $descripcion = $_POST[ "descripcion" ];
        $condicion_nuevo = $_POST[ "condicion_nuevo" ];
        $anio_unico = $_POST[ "anio_unico" ];
        $this->grabar_feriado = $this->loadModel( 'parametros' );
        $grabar_feriado = $this->grabar_feriado->GuardarFeriado( $usuario, $dia, $mes, $descripcion, $condicion_nuevo, $anio_unico );
        echo $grabar_feriado;
    }

    public

    function grabar_edicion_feriado()

    {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $id_feriado = $_POST[ "id_feriado" ];
        $dia = $_POST[ "dia" ];
        $mes = $_POST[ "mes" ];
        $descripcion = $_POST[ "descripcion" ];
        $condicion_grabar = $_POST[ "condicion_grabar" ];
        $anio_unico = $_POST[ "anio_unico" ];
        $this->grabar_edicion_feriado = $this->loadModel( 'parametros' );
        $grabar_edicion_feriado = $this->grabar_edicion_feriado->GuardarEdicionFeriado( $usuario, $id_feriado, $dia, $mes, $descripcion, $condicion_grabar, $anio_unico );
        echo $grabar_edicion_feriado;

    }



    public

    function eliminar_feriados() {
        $id_tipo_feriado = $_POST[ "id_tipo_feriado" ];
        $this->eliminar_feriado = $this->loadModel( 'parametros' );
        $eliminar_feriado = $this->eliminar_feriado->EliminarFeriado( $id_tipo_feriado );
        echo $eliminar_feriado;
    }




    public

    function grabar_condicion() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre_condicion = $_POST[ "leer_descripcion" ];
        $this->grabar_condicion_nuevo = $this->loadModel( 'parametros' );
        $grabar_condicion_nuevo = $this->grabar_condicion_nuevo->GuardarNuevaCondicion( $usuario, $nombre_condicion );
        echo $grabar_condicion_nuevo;

    }



    public

    function grabar_edicion_condicion() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $id_condicion = $_POST[ "id_condicion" ];
        $nombre_asignado = $_POST[ "nombre_asignado" ];
        $this->grabar_edicion_condicion_nuevo = $this->loadModel( 'parametros' );
        $grabar_edicion = $this->grabar_edicion_condicion_nuevo->GrabarEdicionCondicion( $usuario, $id_condicion, $nombre_asignado );
        echo $grabar_edicion;

    }


    public

    function eliminar_condicion() {
        $id_tipo = $_POST[ "id_tipo" ];
        $this->eliminar_condicion_registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_condicion_registro->EliminarCondicion( $id_tipo );
        echo $ejecutar;
    }



    public

    function grabar_nuevo_motivo() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $motivo = $_POST[ "motivo" ];
        $this->grabar_motivo = $this->loadModel( 'parametros' );
        $grabar_actividad = $this->grabar_motivo->GuardarMotivo( $usuario, $motivo );
        echo $grabar_actividad;

    }


    public

    function grabar_edicion_motivo() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $id_motivo = $_POST[ "id_motivo" ];
        $motivo = $_POST[ "motivo" ];
        $this->grabar_edicion_motivo = $this->loadModel( 'parametros' );
        $grabar_edicion_motivo = $this->grabar_edicion_motivo->GuardarEdicionMotivo( $id_motivo, $usuario, $motivo );
        echo $grabar_edicion_motivo;

    }



    public

    function eliminar_motivo_cese() {
        $id_tipo = $_POST[ "id_tipo" ];
        $this->eliminar_motivo = $this->loadModel( 'parametros' );
        $eliminar_motivo = $this->eliminar_motivo->EliminarMotivo( $id_tipo );
        echo $eliminar_motivo;



    }


    public

    function buscar_servicio_unidad_organica() {
        $codigo_unidad = $_POST[ "codigo_unidad" ];
        $this->buscar_servicio_centrocosto = $this->loadModel( 'parametros' );
        $servicios_centro_costo = $this->buscar_servicio_centrocosto->BuscarServiciosdeCentroCosto( $codigo_unidad );
        echo $servicios_centro_costo;

    }


    // listar_todos_los_organos

    public

    function grabar_servicio_de_unidad_organica() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $codigo_unidad = $_POST[ "codigo_unidad" ];
        $nombre_del_servicio = $_POST[ "nombre_del_servicio" ];
        $this->grabar_servicio_unidad_organica = $this->loadModel( 'parametros' );
        $grabacion_servicio_uo = $this->grabar_servicio_unidad_organica->GrabacionServicio_UO( $usuario, $codigo_unidad, $nombre_del_servicio );
        echo $grabacion_servicio_uo;

    }

    public

    function grabar_servicio_modificacion_unidad_organica() {

        $id_servicio = $_POST[ "idservicio" ];
        $nombre_servicio = $_POST[ "nombre_del_servicio" ];
        $this->grabar_cambio_servicio = $this->loadModel( 'parametros' );
        $grabar_cambio_servicio = $this->grabar_cambio_servicio->GrabarCambioServicio( $id_servicio, $nombre_servicio );
        echo $grabar_cambio_servicio;


    }


    public

    function eliminar_servicio() {
        $id_servicio = $_POST[ "idservicio" ];
        $this->eliminar_servicio = $this->loadModel( 'parametros' );
        $eliminar_servicio = $this->eliminar_servicio->EliminarServicio( $id_servicio );
        echo $eliminar_servicio;

    }


    public

    function grabar_nueva_unidad() {
        $nueva_descripcion = $_POST[ "nueva_descripcion" ];
        $this->grabar_nueva_descrip = $this->loadModel( 'parametros' );
        $grabar_nueva_descripcion = $this->grabar_nueva_descrip->GrabarNuevaDescripcion( $nueva_descripcion );
        echo $grabar_nueva_descripcion;


    }

    public

    function tipo_documento() {
        $this->_view->titulo = 'Tipo de Documentos  - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'tipo_documento' ) );
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

                $this->_tipo_documento = $this->loadModel( 'parametros' );
                $this->_view->listar_tipo_documentos = $this->_tipo_documento->ListarTipoDocumento();
                $this->_view->renderizar( 'tipo_documento', false );
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

    function actualizar_tipos_documentos() {
        $id = $_POST[ "id" ];
        $this->listar_tipo_documento = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_tipo_documento->ListarTipoDocumento();
        echo $ejecutar;
    }



    public

    function registrar_tipo_documento()

    {
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->registrar_descripcion_documento = $this->loadModel( 'parametros' );
        $ejecutar = $this->registrar_descripcion_documento->RegistrarTipoDocumento( $descripcion, $usuario );
        echo $ejecutar;


    }


    public

    function registrar_modificacion_tipo_documento() {
        $codigo = $_POST[ "codigo" ];
        $descripcion = $_POST[ "descripcion" ];
        $this->registrar_modificacion_documento = $this->loadModel( 'parametros' );
        $ejecutar = $this->registrar_modificacion_documento->RegistrarModificacionTipoDocumento( $codigo, $descripcion );
        echo $ejecutar;


    }

    public

    function eliminar_registro_tipo_documento() {
        $codigo = $_POST[ "codigo" ];
        $this->eliminar_registrar_documento = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registrar_documento->EliminarTipoDocumento( $codigo );
        echo $ejecutar;


    }


    public

    function colegios() {
        $this->_view->titulo = 'Lista de Colegios Profesionales - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'colegios' ) );
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
                $this->_listar_colegios = $this->loadModel( 'parametros' );
                $this->_view->listar_colegios = $this->_listar_colegios->ListarColegiosProfesionales();
                $this->_view->renderizar( 'colegios', false );
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

    function paises() {
        $this->_view->titulo = 'Lista de Paises  - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'paises' ) );
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
                $this->_listar_paises = $this->loadModel( 'parametros' );
                $this->_view->listar_paises = $this->_listar_paises->ListarPaises();
                $this->_view->renderizar( 'paises', false );
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

    function ver_lista_colegios_profesionales() {
        $colegio = $_POST[ "colegio" ];
        $this->listar_colegios_profesionales = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_colegios_profesionales->ListarColegiosProfesionales();
        echo $ejecutar;


    }


    public

    function grabar_nuevo_registro_en_colegios() {
        $codigo_minsa = $_POST[ "codigo_minsa" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_nuevo_registro_colegios = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_nuevo_registro_colegios->GrabarNuevoRegistroColegio( $codigo_minsa, $descripcion, $usuario );
        echo $ejecutar;

    }




    public

    function grabar_modificar_registro_de_colegios() {
        $codigo = $_POST[ "codigo" ];
        $codigo_minsa = $_POST[ "codigo_minsa" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_modificacion_registro_colegio = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_modificacion_registro_colegio->UpdateRegistroColegios( $codigo_minsa, $descripcion, $usuario, $codigo );
        echo $ejecutar;


    }

    public

    function eliminar_registro_tipo_colegio() {
        $codigo = $_POST[ "codigo" ];
        $this->eliminar_registrao_colegio = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registrao_colegio->EliminarRegistroColegio( $codigo );
        echo $ejecutar;


    }



    public

    function tipo_especialidad() {
        $this->_view->titulo = 'Lista de Tipo de Especialidades - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'tipo_especialidad' ) );
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
                $this->_listar_tipo_especialidad = $this->loadModel( 'parametros' );
                $this->_view->listar_especialidades = $this->_listar_tipo_especialidad->ListarTiposEspecialidad();
                $this->_view->listar_especialidades_tabla = $this->_listar_tipo_especialidad->ListarTiposEspecialidadTabla();


                $this->_view->renderizar( 'tipo_especialidad', false );
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

    function listar_tipos_especialidad() {
        $id = $_POST[ "id" ];
        $this->listar_tipos_especialidad = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_tipos_especialidad->ListarTiposEspecialidad();
        echo $ejecutar;

    }

    public

    function ultimo_numero() {
        $id = $_POST[ "id" ];
        $this->ver_ultimo_numero = $this->loadModel( 'parametros' );
        $ejecutar = $this->ver_ultimo_numero->VerUltimoNumeroEspecialidad();
        echo $ejecutar;



    }


    public

    function grabar_nuevo_registro_en_tipo_especialidad()

    {
        $codigo_minsa = $_POST[ "codigo_minsa" ];
        $descripcion = $_POST[ "descripcion" ];
        $codigo_colegio = $_POST[ "codigo_colegio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_registro_especialidad = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_registro_especialidad->GrabarRegistroEspecialidad( $codigo_minsa, $descripcion, $codigo_colegio, $usuario );
        echo $ejecutar;


    }


    public

    function grabar_modificar_registro_de_tipo_especialidad() {
        $id = $_POST[ "id" ];
        $codigo_minsa = $_POST[ "codigo_minsa" ];
        $descripcion = $_POST[ "descripcion" ];
        $codigo_colegio = $_POST[ "codigo_colegio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_modificacion_especialidad = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_modificacion_especialidad->GrabarModificacionEspecialidad( $id, $codigo_minsa, $descripcion, $codigo_colegio, $usuario );
        echo $ejecutar;

    }

    public

    function eliminar_registro_tipo_especialidad() {

        $id = $_POST[ "id" ];
        $this->eliminar_registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro->EliminarRegistroEspecialidad( $id );
        echo $ejecutar;

    }



    public

    function unidad_organica() {
        $this->_view->titulo = 'Unidad Organica  - Organo - Parametros de Gestion de Personal - ' . INSTITUCION;
        $this->_view->setJs( array( 'unidad_organica' ) );
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

                $this->_listar_unidad = $this->loadModel( 'parametros' );
                $this->_view->listar_unidad_organica = $this->_listar_unidad->ListarUnidadOrganica();


                $this->_view->renderizar( 'unidad_organica', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }


    // listar_todos_establecimientos
    public

    function listar_todos_las_unidades_organicas() {
        $id = $_POST[ "id" ];
        $this->listar_unidades_organicas = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_unidades_organicas->ListarUnidadesOrganicas( $id );
        echo $ejecutar;

    }


    public

    function listar_todos_los_organos() {
        $id = $_POST[ "id" ];
        $this->listar_todos = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todos->ListarTodosLosOrganos( $id );
        echo $ejecutar;
    }

    public

    function grabar_nuevo_unidad_organica() {
        $descripcion = $_POST[ "descripcion" ];
        $id_organica = $_POST[ "id_organica" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->Grabar_Nuevo_Registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->Grabar_Nuevo_Registro->GrabarNuevoRegistroUnidadOrganica( $descripcion, $id_organica, $usuario );
        echo $ejecutar;

    }



    public

    function grabar_modificacion_unidad_organica_final() {
        $id = $_POST[ "id" ];
        $descripcion = $_POST[ "descripcion" ];
        $id_organo = $_POST[ "id_organo" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->Grabar_Registro_Modificar = $this->loadModel( 'parametros' );
        $ejecutar = $this->Grabar_Registro_Modificar->GrabarModificacionUnidadOrganica( $descripcion, $id_organo, $usuario, $id );
        echo $ejecutar;
    }




    public

    function eliminar_registro_unidad() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro->EliminarRegistroUnidad( $id );
        echo $ejecutar;



    }


    public

    function grabar_nuevo_organo() {
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->Grabar_Nuevo_Registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->Grabar_Nuevo_Registro->GrabarNuevoRegistroOrgano( $descripcion, $usuario );
        echo $ejecutar;

    }



    public

    function grabar_modificacion_organo()

    {
        $id = $_POST[ "id" ];
        $descripcion = $_POST[ "descripcion" ];
        $this->Grabar_modificacion_Registro_Organo = $this->loadModel( 'parametros' );
        $ejecutar = $this->Grabar_modificacion_Registro_Organo->GrabarModificacionOrgano( $descripcion, $id );
        echo $ejecutar;

    }


    public

    function eliminar_registro_organo()

    {
        $id = $_POST[ "id" ];
        $this->Eliminar_registro_organo = $this->loadModel( 'parametros' );
        $ejecutar = $this->Eliminar_registro_organo->EliminarRegistroOrgano( $id );
        echo $ejecutar;



    }


    public

    function consultar_mostrar_unidades()

    {
        $id = $_POST[ "id" ];
        $this->mostrar_unidades = $this->loadModel( 'parametros' );
        $ejecutar = $this->mostrar_unidades->MostrarUnidadesOrganicas( $id );
        echo $ejecutar;



    }




    public

    function centrocosto() {
        $this->_view->titulo = 'Centro de Costo - Sub Costo - Tras Costo - Parametros de Gestion de Personal - ' . INSTITUCION;
        $this->_view->setJs( array( 'centrocosto' ) );
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
                $this->ListarUpss = $this->loadModel( 'parametros' );
                $this->_view->listar_todo_upss = $this->ListarUpss->TodoReporteCentroCosto();
                $this->_view->renderizar( 'centrocosto', false );
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

    function upss() {
        $this->_view->titulo = 'UPSS - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'upss' ) );
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
                $this->_view->renderizar( 'upss', false );
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

    function listar_todos_los_upss() {
        $id = $_POST[ "id" ];
        $this->listar_todos_los_upss = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todos_los_upss->ListarTodosLosUPSS();
        echo $ejecutar;

    }



    public

    function ultimo_codigo_upss() {
        $id = $_POST[ "id" ];
        $this->ultimo_upss = $this->loadModel( 'parametros' );
        $ejecutar = $this->ultimo_upss->UltimoUPSS();
        echo $ejecutar;
    }


    public

    function registrar_nuevo_upss() {
        $codigo = $_POST[ "codigo" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_upss = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_upss->GrabarRegistroUPSS( $codigo, $descripcion, $usuario );
        echo $ejecutar;
    }


    public

    function registrar_modificacion_upss() {
        $id = $_POST[ "id" ];
        $codigo = $_POST[ "codigo" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_modificar_upss = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_modificar_upss->GrabarModificarRegistroUPSS( $descripcion, $usuario, $id );
        echo $ejecutar;


    }


    public

    function eliminar_registro_upss_total() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro_upss = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro_upss->EliminarUPSS( $id );
        echo $ejecutar;
    }



    public

    function competencias() {
        $this->_view->titulo = 'COMPETENCIAS  - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'competencias' ) );
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
                $this->_view->renderizar( 'competencias', false );
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

    function listar_todos_las_competencias()

    {
        $id = $_POST[ "id" ];
        $this->listar_todas_las_competencias = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todas_las_competencias->ListarTodosLasCompetencias();
        echo $ejecutar;

    }

    public

    function grabar_nuevo_registro_en_competencias()

    {
        $codigo = $_POST[ "codigo" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_competencias = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_competencias->GrabarCompetencias( $codigo, $descripcion, $usuario );
        echo $ejecutar;

    }


    public

    function grabar_modificar_competencias() {
        $id = $_POST[ "id" ];
        $codigo = $_POST[ "codigo" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->modificar_competencias = $this->loadModel( 'parametros' );
        $ejecutar = $this->modificar_competencias->ModificarCompetencias( $codigo, $descripcion, $usuario, $id );
        echo $ejecutar;


    }


    public

    function eliminar_registro_competencias() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro_competencia = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro_competencia->EliminarCompetencia( $id );
        echo $ejecutar;

    }


    public

    function capacitacion() {
        $this->_view->titulo = 'TIPO DE CAPACITACION  - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'capacitacion' ) );
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
                $this->_view->renderizar( 'capacitacion', false );
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

    function listar_todos_las_capacitacion()

    {
        $id = $_POST[ "id" ];
        $this->listar_todas_las_capacitacion = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todas_las_capacitacion->ListarTodosLasCapacitacion();
        echo $ejecutar;

    }


    public

    function grabar_nuevo_registro_en_capacitacion()

    {
        $codigo = $_POST[ "codigo" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_capacitacion = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_capacitacion->GrabarCapacitacion( $codigo, $descripcion, $usuario );
        echo $ejecutar;
    }


    public

    function grabar_modificar_capacitacion() {
        $id = $_POST[ "id" ];
        $codigo = $_POST[ "codigo" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->modificar_capacitacion = $this->loadModel( 'parametros' );
        $ejecutar = $this->modificar_capacitacion->ModificarCapacitacion( $codigo, $descripcion, $usuario, $id );
        echo $ejecutar;


    }


    public

    function eliminar_registro_capacitacion() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro_capacitacion = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro_capacitacion->EliminarCapacitacion( $id );
        echo $ejecutar;

    }





    public

    function entrenamiento() {
        $this->_view->titulo = 'TIPO DE ENTRENAMIENTO  - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'entrenamiento' ) );
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
                $this->_view->renderizar( 'entrenamiento', false );
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

    function listar_todos_los_entrenamiento()

    {
        $id = $_POST[ "id" ];
        $this->listar_todas_los_entrenamiento = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todas_los_entrenamiento->ListarTodosLosEntrenamiento();
        echo $ejecutar;

    }


    public

    function grabar_nuevo_registro_en_entrenamiento()

    {
        $codigo = $_POST[ "codigo" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_entrenamiento = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_entrenamiento->GrabarEntrenamiento( $codigo, $descripcion, $usuario );
        echo $ejecutar;
    }


    public

    function grabar_modificar_entrenamiento() {
        $id = $_POST[ "id" ];
        $codigo = $_POST[ "codigo" ];
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->modificar_entrenamiento = $this->loadModel( 'parametros' );
        $ejecutar = $this->modificar_entrenamiento->ModificarEntrenamiento( $codigo, $descripcion, $usuario, $id );
        echo $ejecutar;


    }


    public

    function eliminar_registro_entrenamiento() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro->EliminarEntrenamiento( $id );
        echo $ejecutar;

    }




    public

    function cargo() {
        $this->_view->titulo = 'Cargo & Grupo Ocupacional  - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'cargo' ) );
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
                $this->ListarCargos = $this->loadModel( 'parametros' );
                $this->_view->listar_cargos_reportes = $this->ListarCargos->ReporteCargosGrupos();
                $this->_view->renderizar( 'cargo', false );
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

    function listar_todos_los_cargos() {
        $cargo = $_POST[ "cargo" ];
        $this->listar_cargo_encontrado = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_cargo_encontrado->ListarCargoEncontrado( $cargo );
        echo $ejecutar;

    }


    public

    function listar_grupo_ocupacional() {
        $grupo = $_POST[ "grupo" ];
        $this->listar_grupos = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_grupos->ListarGrupos( $grupo );
        echo $ejecutar;
    }



    public

    function grabar_nuevo_registro_cargo() {
        $descripcion = $_POST[ "descripcion" ];
        $id_grupo = $_POST[ "id_grupo" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_nuevo_registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_nuevo_registro->GrabarNuevoRegistroCargo( $descripcion, $id_grupo, $usuario );
        echo $ejecutar;

    }



    public

    function grabar_modificacion_registro_cargo()

    {
        $id = $_POST[ "id" ];
        $descripcion = $_POST[ "descripcion" ];
        $id_grupo = $_POST[ "id_grupo" ];
        $this->grabar_modificacion_registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_modificacion_registro->GrabarModificacionRegistro( $descripcion, $id_grupo, $id );
        echo $ejecutar;
    }

    public

    function eliminar_registro_cargo() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro_cargo = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro_cargo->EliminarRegistroCargo( $id );
        echo $ejecutar;
    }

    // listar_carreras_profesion

    public

    function grabar_nuevo_registro_grupo() {
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_nuevo_registro_grupo = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_nuevo_registro_grupo->GrabarNuevoRegistroGrupo( $descripcion, $usuario );
        echo $ejecutar;
    }


    public

    function grabar_modificacion_registro_grupo() {
        $id = $_POST[ "id" ];
        $descripcion = $_POST[ "descripcion" ];
        $this->grabar_registro_grupo_modificado = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_registro_grupo_modificado->GrabarRegistroGrupoModificar( $descripcion, $id );
        echo $ejecutar;
    }

    public

    function eliminar_registro_grupo() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro_grupo = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro_grupo->EliminarRegistroGrupo( $id );
        echo $ejecutar;

    }



    public

    function reporte_cargos_grupos_ocupacionales()

    {
        $id = $_POST[ "cargo" ];
        $this->reporte_cargos_grupos = $this->loadModel( 'parametros' );
        $ejecutar = $this->reporte_cargos_grupos->ReporteCargosGrupos();
        echo $ejecutar;
    }






    public

    function listar_centro_de_costo()

    {
        $id = $_POST[ "id" ];
        $this->listar_centro_costo = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_centro_costo->ListarCentroCosto();
        echo $ejecutar;

    }


    public

    function listar_subcentro_de_centrocosto()

    {
        $id = $_POST[ "id" ];
        $this->listar_centro_sub_costo = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_centro_sub_costo->ListarCentroSubCosto( $id );
        echo $ejecutar;

    }


    public

    function listar_subcentro_de_centrocosto_sub() {
        $id = $_POST[ "id" ];
        $this->listar_centro_sub_costo_sub = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_centro_sub_costo_sub->ListarCentroSubCostoSub( $id );
        echo $ejecutar;

    }

    public

    function todos_centros_costos() {
        $id = $_POST[ "id" ];
        $this->listar_todos_centro_costos = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todos_centro_costos->TodoReporteCentroCosto();
        echo $ejecutar;

    }


    public

    function estado_civil() {
        $this->_view->titulo = 'Tipos de Estados Civiles - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'estado_civil' ) );
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
                $this->_view->renderizar( 'estado_civil', false );
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

    function listar_todos_los_estados_civiles() {
        $id = $_POST[ "id" ];
        $this->listar_todos_estados_civiles = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todos_estados_civiles->TodosEstadosCiviles();
        echo $ejecutar;
    }



    public

    function grabar_nuevo_registro_estado_civil() {
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_todos_registros = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_todos_registros->GrabarRegistrosEstadoCivil( $descripcion, $usuario );
        echo $ejecutar;

    }



    public

    function modificacion_estado_civil() {

        $id = $_POST[ "id" ];
        $descripcion = $_POST[ "descripcion" ];
        $this->grabar_modificacion_registros = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_modificacion_registros->ModificacionRegistroEstadoCivil( $id, $descripcion );
        echo $ejecutar;

    }


    public

    function eliminar_registro_estado_civil() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro->EliminarRegistroEstadoCivil( $id );
        echo $ejecutar;

    }





    public

    function ambiente_fisico() {
        $this->_view->titulo = 'Ambientes Fisicos & Funcionales - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'ambiente_fisico' ) );
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
                $this->_view->renderizar( 'ambiente_fisico', false );
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

    function listar_todos_los_pisos() {
        $id = $_POST[ "id" ];
        $this->listar_todos_los_registros = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todos_los_registros->ListarRegistrosPisos();
        echo $ejecutar;


    }


    public

    function listar_todos_los_tipos_atenciones() {
        $id = $_POST[ "id" ];
        $this->listar_todos_los_registros_at = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todos_los_registros_at->ListarTipoAtenciones();
        echo $ejecutar;



    }


    public

    function listar_todos_los_consultorios() {
        $id = $_POST[ "id" ];
        $this->listar_todos_los_registros = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_todos_los_registros->ListarConsultorios();
        echo $ejecutar;




    }




    public

    function carrera_profesion() {
        $this->_view->titulo = 'Carrera Profesion  - Parametros de Gestion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'carrera_profesion' ) );
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
                $this->ListarCarreras_profesion = $this->loadModel( 'parametros' );
                $this->_view->listar_carreras_profesion = $this->ListarCarreras_profesion->ListarCarrerasProfesion();
                $this->_view->renderizar( 'carrera_profesion', false );
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

    function listar_carreras_profesion() {
        $id = $_POST[ "id" ];
        $this->listar_careras_profesion = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_careras_profesion->ListarCarrerasProfesion();
        echo $ejecutar;

    }



    public

    function listar_carreras_profesion_unido() {
        $id = $_POST[ "id" ];
        $this->listar_careras_profesion = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_careras_profesion->ListarCarrerasProfesionUnido();
        echo $ejecutar;

    }



    public

    function grabar_nuevo_registro_carrera()

    {
        $descripcion = $_POST[ "descripcion" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_careras_profesion = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_careras_profesion->GrabarCarrerasProfesion( $descripcion, $usuario );
        echo $ejecutar;

    }



    public

    function modificacion_registro_carrera() {
        $id = $_POST[ "id" ];
        $descripcion = $_POST[ "descripcion" ];
        $this->grabar_modificacion_carreras_profesion = $this->loadModel( 'parametros' );
        $ejecutar = $this->grabar_modificacion_carreras_profesion->GrabarModificacionCarrerasProfesion( $id, $descripcion );
        echo $ejecutar;
    }



    public

    function EliminarRegistroCarrera() {
        $id = $_POST[ "id" ];
        $this->eliminar_registro = $this->loadModel( 'parametros' );
        $ejecutar = $this->eliminar_registro->EliminarRegistroCarrerasProfesion( $id );
        echo $ejecutar;
    }



    public

    function listar_contenido_cadena_programatica() {
        $id = $_POST[ "id" ];
        $this->contenido_cadena = $this->loadModel( 'parametros' );
        $ejecutar = $this->contenido_cadena->ListarCadenaProgramatica();
        echo $ejecutar;
    }


    public

    function listarfuentes_financiamiento() {
        $id = $_POST[ "id" ];
        $this->listar_fuentes = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_fuentes->ListarFuentesFinanciamiento();
        echo $ejecutar;
    }


    public

    function listar_tipo_educacion() {
        $id = $_POST[ "id" ];
        $this->listar_tipo_educacion = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_tipo_educacion->ListarTipoEducacion();
        echo $ejecutar;
    }


    /* para cese familiar */





    public

    function listar_todos_los_parentescos() {
        $id = $_POST[ "id" ];
        $this->listar_parentesco = $this->loadModel( 'parametros' );
        $ejecutar = $this->listar_parentesco->ListarParentesco();
        echo $ejecutar;

    }


    /* fin familiar */








}

?>