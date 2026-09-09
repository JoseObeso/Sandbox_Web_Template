<?php

class ambientesController extends Controller {
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

    /* Inicio de procesos fisicos */

    // listar_ambiente_funcional_total_cqx

    // ver_total_bloque

    public

    function fisicos() {
        $this->_view->titulo = 'Mantenimiento de Ambientes Fisicos - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'fisicos' ) );
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

                $this->_view->renderizar( 'fisicos', false );

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

    function listar_pisos_registrados() {
        $piso = $_POST[ "piso" ];
        $this->listar_pisos = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_pisos->ListarPisosRegistrados();
        echo $ejecutar;
    }


    public

    function registrar_pisos() {
        $piso = utf8_decode( trim( $_POST[ "piso" ] ) );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->registrar_nuevo_piso = $this->loadModel( 'ambientes' );
        $ejecutar = $this->registrar_nuevo_piso->GrabarRegistroPisos( $piso, $usuario );
        echo $ejecutar;
    }


    public

    function modificacion_pisos_registrado() {
        $idpiso = $_POST[ "idpiso" ];
        $piso = utf8_decode( trim( $_POST[ "piso" ] ) );
        $this->registrar_nuevo_piso_modificar = $this->loadModel( 'ambientes' );
        $ejecutar = $this->registrar_nuevo_piso_modificar->ModificacionRegistroPisos( $piso, $idpiso );
        echo $ejecutar;
    }


    public

    function eliminar_piso_registrado() {
        $idpiso = $_POST[ "idpiso" ];
        $this->eliminar_piso = $this->loadModel( 'ambientes' );
        $ejecutar = $this->eliminar_piso->EliminacionRegistroPisos( $idpiso );
        echo $ejecutar;



    }


    /* Fin de procesos fisicos */


    /* Inicio de Bloques registrados  */

    public

    function grabar_bloques_fisicos() {
        $idpiso = $_POST[ "idpiso" ];
        $bloque = utf8_decode( trim( $_POST[ "bloque" ] ) );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->registrar_nuevo_bloque = $this->loadModel( 'ambientes' );
        $ejecutar = $this->registrar_nuevo_bloque->GrabarBloquesdePiso( $idpiso, $bloque, $usuario );
        echo $ejecutar;


    }

    public

    function listar_bloques_totales_de_pisos() {
        $idpiso = $_POST[ "idpiso" ];
        $this->listar_bloques = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_bloques->ListarBloquesdePiso( $idpiso );
        echo $ejecutar;


    }


    public

    function modificacion_bloque_registrado() {
        $bloque = utf8_decode( trim( $_POST[ "bloques" ] ) );
        $idbloque = $_POST[ "idbloque" ];
        $this->registrar_nuevo_bloque_mod = $this->loadModel( 'ambientes' );
        $ejecutar = $this->registrar_nuevo_bloque_mod->ModificarBloquesdePiso( $bloque, $idbloque );
        echo $ejecutar;

    }



    public

    function eliminar_bloque_registrado() {
        $idbloque = $_POST[ "idbloque" ];
        $this->eliminar_bloques = $this->loadModel( 'ambientes' );
        $ejecutar = $this->eliminar_bloques->EliminarBloquesdePiso( $idbloque );
        echo $ejecutar;

    }


    public

    function grabar_ambiente_fisico_total() {
        $idpiso = $_POST[ "idpiso" ];
        $idbloque = $_POST[ "idbloque" ];
        $ambientes = utf8_encode( trim( $_POST[ "ambientes" ] ) );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_ambiente_fisico = $this->loadModel( 'ambientes' );
        $ejecutar = $this->grabar_ambiente_fisico->GrabarAmbienteFisicos( $idpiso, $idbloque, $ambientes, $usuario );
        echo $ejecutar;

    }

    public

    function listar_todos_ambientes_de_bloques_y_piso() {
        $idpiso = $_POST[ "idpiso" ];
        $idbloque = $_POST[ "idbloque" ];
        $this->listar_ambiente_fisico = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_ambiente_fisico->VerTodosAmbientesFisicos( $idpiso, $idbloque );
        echo $ejecutar;

    }



    public

    function modificar_ambiente_fisico_total() {
        $idambiente = $_POST[ "idambiente" ];
        $ambientes = $_POST[ "ambientes" ];
        $this->update_ambiente_fisico = $this->loadModel( 'ambientes' );
        $ejecutar = $this->update_ambiente_fisico->UpdateAmbientesFisicos( $idambiente, $ambientes );
        echo $ejecutar;



    }


    public

    function eliminar_ambiente_fisico() {
        $idambiente = $_POST[ "idambiente" ];
        $this->delete_ambiente_fisico = $this->loadModel( 'ambientes' );
        $ejecutar = $this->delete_ambiente_fisico->DeleteAmbientesFisicos( $idambiente );
        echo $ejecutar;



    }




    /* Fin de Bloques registrados */




    /* inicio de area funcional */

    public

    function funcional() {
        $this->_view->titulo = 'Mantenimiento de Areas Funcionales - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'funcional' ) );
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

                $this->_view->renderizar( 'funcional', false );

            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }


    // listar_ambiente_funcional_total



    public

    function listar_areas_funcionales() {
        $idpiso = $_POST[ "idpiso" ];
        $idbloque = $_POST[ "idbloque" ];
        $this->listar_area_funcional = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_area_funcional->ListarAmbienteFuncional( $idpiso, $idbloque );
        echo $ejecutar;

    }




    public

    function grabar_area_funcional_bloque_piso() {
        $idpiso = $_POST[ "idpiso" ];
        $idbloque = $_POST[ "idbloque" ];
        $area_funcional = $_POST[ "area_funcional" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_area_funcional = $this->loadModel( 'ambientes' );
        $ejecutar = $this->grabar_area_funcional->GrabarAreaFuncionalBloquePiso( $idpiso, $idbloque, $area_funcional, $usuario );
        echo $ejecutar;
    }


    public

    function modificar_area_funcional_bloque_piso() {
        $idarea = $_POST[ "idarea" ];
        $area_funcional = $_POST[ "area_funcional" ];
        $this->modificar_area_funcional = $this->loadModel( 'ambientes' );
        $ejecutar = $this->modificar_area_funcional->ModificarAreaFuncionalBloquePiso( $area_funcional, $idarea );
        echo $ejecutar;


    }


    public

    function eliminar_area_funcional_bloque_piso() {
        $idarea = $_POST[ "idarea" ];
        $this->eliminar_area_funcional = $this->loadModel( 'ambientes' );
        $ejecutar = $this->eliminar_area_funcional->EliminarAreaFuncionalBloquePiso( $idarea );
        echo $ejecutar;





    }



    /* fin de area funcional */



    /* inicio de mantenedor de ambiente funcional */

    public

    function ambiente_funcional() {
        $this->_view->titulo = 'Mantenimiento de Ambiente Funcional - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'ambiente_funcional' ) );
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
                $this->_view->renderizar( 'ambiente_funcional', false );

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

    function grabar_ambiente_funcional_area_bloque_piso() {
        $idpiso = $_POST[ "idpiso" ];
        $idbloque = $_POST[ "idbloque" ];
        $idareafuncional = $_POST[ "idareafuncional" ];
        $idambiente = $_POST[ "idambiente" ];
        $ambiente_funcional = utf8_decode( trim( $_POST[ "ambiente_funcional" ] ) );
        $nro_cupos = $_POST[ "nro_cupos" ];
        $nro_cupos_adicional = $_POST[ "cupos_adicional" ];
        $idservicio = $_POST[ "idservicio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_ambiente_func = $this->loadModel( 'ambientes' );
        $ejecutar = $this->grabar_ambiente_func->GrabarAmbienteFuncionalBloque( $idpiso, $idbloque, $idareafuncional, $idambiente, $ambiente_funcional, $nro_cupos, $nro_cupos_adicional, $idservicio, $usuario );
        echo $ejecutar;
    }


    public

    function listar_ambiente_funcional_total() {
        $idpiso = $_POST[ "piso" ];
        $this->listar_ambiente_func = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_ambiente_func->ListarAmbientesFuncionales();
        echo $ejecutar;
    }




    public

    function listar_ambiente_funcional_total_cqx() {
        $idpiso = $_POST[ "piso" ];
        $this->listar_ambiente_func = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_ambiente_func->ListarAmbientesFuncionalesCqx();
        echo $ejecutar;
    }


    public

    function listar_ambiente_funcional_total_por_servicio() {
        $idservicio = $_POST[ "idservicio" ];
        $this->listar_ambiente_func = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_ambiente_func->ListarAmbientesFuncionalesPorServicio( $idservicio );
        echo $ejecutar;
    }





    public

    function modificacion_ambiente_funcional_area_bloque_piso() {
        $idfuncional = $_POST[ "idfuncional" ];
        $idpiso = $_POST[ "idpisos" ];
        $idbloque = $_POST[ "idbloque" ];
        $idareafuncional = $_POST[ "idareafuncional" ];
        $idambiente = $_POST[ "idambiente" ];
        $ambiente_funcional = utf8_decode( trim( $_POST[ "ambiente_funcional" ] ) );
        $nro_cupos = $_POST[ "cupos" ];
        $nro_cupos_adicional = $_POST[ "cupos_adicional" ];
        $idservicio = $_POST[ "idservicio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->modificar_ambiente_func = $this->loadModel( 'ambientes' );
        $ejecutar = $this->modificar_ambiente_func->ModificarAmbienteFuncionalBloque( $idpiso, $idbloque, $idareafuncional, $idambiente, $ambiente_funcional, $nro_cupos, $nro_cupos_adicional, $idservicio, $usuario, $idfuncional );
        echo $ejecutar;

    }




    public

    function eliminar_ambiente_funcional_area_bloque_piso() {
        $idfuncional = $_POST[ "idfuncional" ];
        $this->eliminar_modificacion = $this->loadModel( 'ambientes' );
        $ejecutar = $this->eliminar_modificacion->EliminarAmbienteFuncionalBloque( $idfuncional );
        echo $ejecutar;

    }


    /* fin de mantenedor de ambiente funcional */


    /* INICIO DE BLOQUES DE PROGRAMACION */

    public

    function bloques() {
        $this->_view->titulo = 'Bloques de Programacion - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'bloques' ) );
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
                $this->_view->renderizar( 'bloques', false );

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

    function ver_todo_ambiente_funcional() {
        $idpiso = $_POST[ "idpisos" ];
        $idbloque = $_POST[ "idbloque" ];
        $this->ver_ambiente = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_ambiente->VerAmbienteFuncional( $idpiso, $idbloque );
        echo $ejecutar;


    }



    public

    function traslado_seleccion() {
        $nombre = $_POST[ "nombre_bloque_programacion" ];
        $idpisos = $_POST[ "idpisos" ];
        $idbloques = $_POST[ "idbloques" ];
        $idfuncional = $_POST[ "idfuncional" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->ver_traslado = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_traslado->IniciarTraslado( $nombre, $idpisos, $idbloques, $idfuncional, $usuario );
        echo $ejecutar;

    }

    public

    function ver_lo_trasladado() {
        $bloque_programacion = $_POST[ "bloque_programacion" ];
        $this->ver_lo_trasladado = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_lo_trasladado->VerRegistrosTraslado( $bloque_programacion );
        echo $ejecutar;

    }


    public

    function eliminar_bloque_programacion() {
        $idbloque = $_POST[ "idbloqueprogramacion" ];
        $this->eliminar_lo_trasladado = $this->loadModel( 'ambientes' );
        $ejecutar = $this->eliminar_lo_trasladado->EliminarRegistroTraslado( $idbloque );
        echo $ejecutar;

    }


    public

    function ver_total_bloque() {
        $nombre = $_POST[ "nombre" ];
        $this->ver_total = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_total->VerTotalBloque();
        echo $ejecutar;


    }

    public

    function eliminar_bloque_programacion_total() {
        $nombre_blo = $_POST[ "nombre" ];
        $this->ver_eliminacion = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_eliminacion->EliminarBloqueProgramacion( $nombre_blo );
        echo $ejecutar;

    }




    public

    function ver_nombre_de_bloque_para_detalle() {
        $nombre_blo = $_POST[ "nombre" ];
        $this->ver_nombre_bloque = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_nombre_bloque->NombreBloqueProgramacionDetalle( $nombre_blo );
        echo $ejecutar;

    }





    /* FIN DE BLOQUES DE PROGRAMACION */





    /* ASIGNACION DE PERSONAL */


    public

    function grabar_asignacion_personal_ambiente_funcional() {
        $idfuncional = $_POST[ "idfuncional" ];
        $nro_profesional = $_POST[ "nro_profesional" ];
        $idprofesion = $_POST[ "idprofesion" ];
        $inclusivo = $_POST[ "inclusivo" ];
        $individual_conjunto = $_POST[ "individual_conjunto" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->ver_asignacion = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_asignacion->GrabarAsignacionPersonalAmbienteFuncional( $idfuncional, $nro_profesional, $idprofesion, $inclusivo, $individual_conjunto, $usuario );
        echo $ejecutar;

    }



    public

    function ver_cantidad_profesionales() {
        $idfuncional = $_POST[ "id_fun" ];
        $this->ver_cantidad_profesionales = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_cantidad_profesionales->CantidadProfesionales( $idfuncional );
        echo $ejecutar;

    }









    public

    function ver_profesionales_asignados() {
        $idfuncional = $_POST[ "idfuncional" ];
        $this->ver_profesionales = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_profesionales->MostrarProfesionalesAsignados( $idfuncional );
        echo $ejecutar;

    }


    public

    function eliminar_profesional_asignado() {
        $idasignacion = $_POST[ "idasignacion" ];
        $this->eliminar_profesionales = $this->loadModel( 'ambientes' );
        $ejecutar = $this->eliminar_profesionales->EliminarProfesionalesAsignado( $idasignacion );
        echo $ejecutar;




    }



    /* para asignacion de personal bloques */





    public

    function grabar_asignacion_personal_ambiente_bloque() {
        $nombre_bloque = $_POST[ "nombre_bloque" ];
        $nro_profesional = $_POST[ "nro_profesional" ];
        $idprofesion = $_POST[ "idprofesion" ];
        $inclusivo = $_POST[ "inclusivo" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->ver_asignacion_bloque = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_asignacion_bloque->GrabarAsignacionPersonalAmbienteBloque( $nombre_bloque, $nro_profesional, $idprofesion, $inclusivo, $usuario );
        echo $ejecutar;

    }



    public

    function ver_profesionales_asignados_bloque() {
        $nombre_bloque = $_POST[ "nombre_bloque" ];
        $this->ver_profesionales_bloque = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_profesionales_bloque->MostrarProfesionalesAsignadosDelBloque( $nombre_bloque );
        echo $ejecutar;

    }


    public

    function eliminar_profesional_asignado_bloque() {
        $idasignadobloque = $_POST[ "idasignacionbloque" ];
        $this->eliminar_profesionales_bloque = $this->loadModel( 'ambientes' );
        $ejecutar = $this->eliminar_profesionales_bloque->EliminarProfesionalesAsignadoBloque( $idasignadobloque );
        echo $ejecutar;

    }


    /* FIN DE ASIGNACION DE PERSONAL */



    /* inicio de asignacion de personal */



    public

    function asignacion() {
        $this->_view->titulo = 'Asignacion de Personal - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'asignacion' ) );
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
                $this->_view->renderizar( 'asignacion', false );
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

    function listar_ambiente_funcional_piso_bloque() {
        $idpiso = $_POST[ "idpiso" ];
        $idbloque = $_POST[ "idbloque" ];
        $this->listar_ambiente = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_ambiente->ListarAmbienteFuncionalBloquePiso( $idpiso, $idbloque );
        echo $ejecutar;

    }



    public

    function ver_piso_bloque_ambiente_funcional_por_id_capturado() {
        $data_cap = $_POST[ "idfuncional" ];
        $this->ver_pisos_blqoues = $this->loadModel( 'ambientes' );
        $ejecutar = $this->ver_pisos_blqoues->VerDetallePisoBloqueAmbienteFuncional( $data_cap );
        echo $ejecutar;

    }



    public
    function ver_todos_los_servicios() {
        $id = $_POST[ "id" ];
        $this->listar_todos_los_servicios = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_todos_los_servicios->VerTodosLosServiciosParaAmbienteFuncional();
        echo $ejecutar;




    }



    public
    function ver_cabecera_bloque_a_partir_de_detalle() {
        $detalle = $_POST[ "detalle" ];
        $this->listar_todos_los_detalles = $this->loadModel( 'ambientes' );
        $ejecutar = $this->listar_todos_los_detalles->VerCabeceradeBloqueProgramado( $detalle );
        echo $ejecutar;

    }





}
?>