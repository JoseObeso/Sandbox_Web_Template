<?php

class programacionController extends Controller {
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

    /* Inicio de horarios */

    // listar_personal_para_excepcion',

    public

    function horarios() {
        $this->_view->titulo = 'Mantenimiento de Ambientes Fisicos - Monitoreo de RRHH - ' . INSTITUCION;
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

    function listar_tipos_turnos() {
        $piso = $_POST[ "turnos" ];
        $this->listar_turnos_total = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_turnos_total->ListarTurnosRegistrados();
        echo $ejecutar;
    }



    public

    function grabar_tipos_turnos() {
        $tipo_horario = $_POST[ "tipo_horario" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_tipos_turnos_total = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabar_tipos_turnos_total->GrabarTiposdeTurnos( $tipo_horario, $usuario );
        echo $ejecutar;

    }


    public

    function modificar_tipos_turnos() {
        $idturno = $_POST[ "idhorario" ];
        $tipo_horario = $_POST[ "tipo_horario" ];
        $this->modificar_tipos_turnos_total = $this->loadModel( 'programacion' );
        $ejecutar = $this->modificar_tipos_turnos_total->ModificarTiposdeTurnos( $tipo_horario, $idturno );
        echo $ejecutar;

    }


    public

    function eliminar_tipos_turnos() {
        $idturno = $_POST[ "idhorario" ];
        $this->eliminar_tipos_turnos_total = $this->loadModel( 'programacion' );
        $ejecutar = $this->eliminar_tipos_turnos_total->EliminarTiposdeTurnos( $idturno );
        echo $ejecutar;

    }


    public

    function ver_correlativo_turno_en_bd() {
        $hf = $_POST[ "hf" ];
        $this->consultar_correlativo_en_bd = $this->loadModel( 'programacion' );
        $ejecutar = $this->consultar_correlativo_en_bd->VerCorrelativoenBD( $hf );
        echo $ejecutar;

    }

    public

    function grabar_registro_tipo_horario_final() {
        $idturno = $_POST[ "idturno" ];
        $nombre_th = utf8_decode( $_POST[ "nombre_th" ] );
        $hora_total = $_POST[ "hora_total" ];
        $inicial = $_POST[ "inicial" ];
        $final = $_POST[ "final" ];
        $horario_abreviado = $_POST[ "horario_abreviado" ];
        $observacion = utf8_decode( $_POST[ "observacion" ] );
        $turno_final = $_POST[ "turno_final" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->Grabar_Regisro_TH = $this->loadModel( 'programacion' );
        $ejecutar = $this->Grabar_Regisro_TH->GrabarRegisyroTH( $idturno, $nombre_th, $hora_total, $inicial, $final, $horario_abreviado, $observacion, $turno_final, $usuario );
        echo $ejecutar;
    }




    public

    function listar_horarios_de_turnos_final() {
        $hr = $_POST[ "horarios" ];
        $this->listar_ht = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_ht->ListarTotalHT();
        echo $ejecutar;


    }


    public

    function eliminar_registro_tipo_horario_final() {
        $idturnohorario = $_POST[ "idturnohorario" ];
        $this->listar_ht_h = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_ht_h->EliminarHorarioTurnoFinal( $idturnohorario );
        echo $ejecutar;


    }


    /*  inicio de UPSS Departamentos - Servicios */

    public

    function servicios() {
        $this->_view->titulo = 'Mantenimiento de UPSS, Departamentos, Servicios  - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'servicios' ) );
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

                $this->_view->renderizar( 'servicios', false );

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

    function grabar_registro_nuevo_upss() {
        $upss = $_POST[ "upss" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_upss = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabar_upss->GrabarNuevoRegistroUPSS( $upss, $usuario );
        echo $ejecutar;
    }


    public

    function listar_tipos_upss() {
        $upss = $_POST[ "upss" ];
        $this->listar_upss = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_upss->ListarRegistroUPSS();
        echo $ejecutar;
    }



    public

    function modificar_registro_nuevo_upss() {
        $idupss = $_POST[ "idupss" ];
        $upss = $_POST[ "upss" ];
        $this->modificar_upss = $this->loadModel( 'programacion' );
        $ejecutar = $this->modificar_upss->ModificarRegistroUPSS( $upss, $idupss );
        echo $ejecutar;
    }


    public

    function eliminar_registro_nuevo_upss() {
        $idupss = $_POST[ "idupss" ];
        $this->eliminar_upss = $this->loadModel( 'programacion' );
        $ejecutar = $this->eliminar_upss->EliminarRegistroUPSS( $idupss );
        echo $ejecutar;

    }

    public

    function grabar_registro_nuevo_departamento() {
        $idupss_seleccion = $_POST[ "idupss_seleccion" ];
        $departamento = utf8_decode( $_POST[ "departamento" ] );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_departamento = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabar_departamento->GrabarRegistroDepartamento( $idupss_seleccion, $departamento, $usuario );
        echo $ejecutar;
    }


    public

    function listar_departamentos_todos() {
        $idupss = $_POST[ "idupss" ];
        $this->listar_iddepar = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_iddepar->ListarDepartamentodeUPSS( $idupss );
        echo $ejecutar;

    }

    public

    function modificar_registro_nuevo_departamento() {
        $idupss_seleccion = $_POST[ "idupss_seleccion" ];
        $departamento = utf8_decode( $_POST[ "departamento" ] );
        $iddepar = $_POST[ "iddepar" ];
        $this->modificar_departamento = $this->loadModel( 'programacion' );
        $ejecutar = $this->modificar_departamento->ModificarRegistroDepartamento( $idupss_seleccion, $departamento, $iddepar );
        echo $ejecutar;
    }

    public

    function eliminar_registro_nuevo_departamento() {
        $iddepar = $_POST[ "iddepar" ];
        $this->eliminar_departamento = $this->loadModel( 'programacion' );
        $ejecutar = $this->eliminar_departamento->EliminarRegistroDepartamento( $iddepar );
        echo $ejecutar;

    }


    /* servicios departamentos */


    public

    function ver_departamentos_de_upss() {
        $idupss_seleccion = $_POST[ "idupss_seleccion" ];
        $this->ver_depar_de_upss = $this->loadModel( 'programacion' );
        $ejecutar = $this->ver_depar_de_upss->DepartamentoDeUPSS( $idupss_seleccion );
        echo $ejecutar;

    }



    public

    function ver_todos_los_servicios_de_upss() {
        $idupss_seleccion = $_POST[ "idupss" ];
        $iddepar_seleccion = $_POST[ "iddepar" ];
        $this->ver_servicios = $this->loadModel( 'programacion' );
        $ejecutar = $this->ver_servicios->ServiciosdeDepartamentoDeUPSS( $idupss_seleccion, $iddepar_seleccion );
        echo $ejecutar;
    }


    public

    function grabar_registro_nuevo_servicio() {
        $idupss = $_POST[ "idupss" ];
        $iddepar = $_POST[ "iddepar" ];
        $servicio = utf8_decode( $_POST[ "servicio" ] );
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_nuevo_registro = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabar_nuevo_registro->GrabarregistroServicio( $idupss, $iddepar, $servicio, $usuario );
        echo $ejecutar;
    }

    public

    function modificar_registro_nuevo_servicio() {
        $idupss = $_POST[ "idupss" ];
        $iddepar = $_POST[ "iddepar" ];
        $servicio = utf8_decode( $_POST[ "servicio" ] );
        $idservi = $_POST[ "idservi" ];
        $this->modificar_nuevo_registro = $this->loadModel( 'programacion' );
        $ejecutar = $this->modificar_nuevo_registro->ModificarRegistroServicio( $idupss, $iddepar, $servicio, $idservi );
        echo $ejecutar;

    }


    public

    function eliminar_registro_nuevo_servicio() {
        $idservi = $_POST[ "idservi" ];
        $this->eliminar_nuevo_registro = $this->loadModel( 'programacion' );
        $ejecutar = $this->eliminar_nuevo_registro->EliminarRegistroServicio( $idservi );
        echo $ejecutar;

    }



    /* fin de UPSS Departamentos - Servicios */



    /* inicio de agrupar Areas Funcionales */


    public

    function agrupar() {
        $this->_view->titulo = 'Agrupar Areas Funcionales - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'agrupar' ) );
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
                $this->_view->renderizar( 'agrupar', false );

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

    function ver_upss_departamento_servicios() {
        $idupss_seleccion = $_POST[ "idupss_seleccion" ];
        $iddepar_seleccion = $_POST[ "iddepar_seleccion" ];
        $this->ver_upss_servicio = $this->loadModel( 'programacion' );
        $ejecutar = $this->ver_upss_servicio->VerUPSSDepartamentoServicio( $idupss_seleccion, $iddepar_seleccion );
        echo $ejecutar;

    }


    public

    function ver_areas_funcionales_total() {
        $idaf = $_POST[ "idaf" ];
        $this->ver_id_af = $this->loadModel( 'programacion' );
        $ejecutar = $this->ver_id_af->VerAFTotal();
        echo $ejecutar;

    }

    public

    function traslado_seleccion_area_funcional_final() {
        $idupss_seleccion = $_POST[ "idupss_seleccion" ];
        $iddepar_seleccion = $_POST[ "iddepar_seleccion" ];
        $iddepar_upss_servicio = $_POST[ "iddepar_upss_servicio" ];
        $idaf = $_POST[ "idaf" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->traslado_seleccion = $this->loadModel( 'programacion' );
        $ejecutar = $this->traslado_seleccion->TrasladoSeleccionAF( $idupss_seleccion, $iddepar_seleccion, $iddepar_upss_servicio, $idaf, $usuario );
        echo $ejecutar;

    }


    public

    function ver_lo_trasladado_af() {
        $idupss_seleccion = $_POST[ "idupss_seleccion" ];
        $iddepar_seleccion = $_POST[ "iddepar_seleccion" ];
        $iddepar_upss_servicio = $_POST[ "iddepar_upss_servicio" ];
        $this->ver_lo_trasladado_af = $this->loadModel( 'programacion' );
        $ejecutar = $this->ver_lo_trasladado_af->VerRegistrosTrasladoAF( $idupss_seleccion, $iddepar_seleccion, $iddepar_upss_servicio );
        echo $ejecutar;
    }


    public

    function eliminar_seleccion_af() {
        $idaf = $_POST[ "idaf" ];
        $this->eliminar_af = $this->loadModel( 'programacion' );
        $ejecutar = $this->eliminar_af->EliminarSeleccionAF( $idaf );
        echo $ejecutar;
    }





    // Inicio de agrupar ambientes 


    public

    function agrupar_ambientes() {
        $this->_view->titulo = 'Agrupar ambientes en areas funcionales - Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'agrupar_ambientes' ) );
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
                $this->_view->renderizar( 'agrupar_ambientes', false );
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

    function ver_ambientes_funcional() {
        $idam = $_POST[ "idam" ];
        $this->ver_am_funcional = $this->loadModel( 'programacion' );
        $ejecutar = $this->ver_am_funcional->VerAmbientesFuncionales();
        echo $ejecutar;
    }


    public

    function traslado_seleccion_ambiente_funcional_final() {
        $idupss_seleccion = $_POST[ "idupss_seleccion" ];
        $iddepar_seleccion = $_POST[ "iddepar_seleccion" ];
        $iddepar_upss_servicio = $_POST[ "iddepar_upss_servicio" ];
        $idaf = $_POST[ "idaf" ];
        $idamf = $_POST[ "idamf" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->traslado_seleccion_ambiente = $this->loadModel( 'programacion' );
        $ejecutar = $this->traslado_seleccion_ambiente->TrasladoSeleccionAmbienteF( $idupss_seleccion, $iddepar_seleccion, $iddepar_upss_servicio, $idaf, $idamf, $usuario );
        echo $ejecutar;
    }



    public

    function visualizar_ambiente_funcional_trasladado() {
        $idupss_seleccion = $_POST[ "idupss_seleccion" ];
        $iddepar_seleccion = $_POST[ "iddepar_seleccion" ];
        $iddepar_upss_servicio = $_POST[ "iddepar_upss_servicio" ];
        $idaf = $_POST[ "idaf" ];
        $this->traslado_seleccion_ambiente_visualizar = $this->loadModel( 'programacion' );
        $ejecutar = $this->traslado_seleccion_ambiente_visualizar->TrasladoSeleccionAmbienteVer( $idupss_seleccion, $iddepar_seleccion, $iddepar_upss_servicio, $idaf );
        echo $ejecutar;

    }


    public

    function eliminar_seleccion_ambiente_funcional() {
        $idamf = $_POST[ "idamf" ];
        $this->eliminar_amf = $this->loadModel( 'programacion' );
        $ejecutar = $this->eliminar_amf->EliminarSeleccionAMF( $idamf );
        echo $ejecutar;
    }




    /* fin  de agrupar Areas Funcionales */



    /* inicio de excepciones */


    public

    function excepciones() {
        $this->_view->titulo = 'Administracion de Excepciones - Programacion de Personal - ' . INSTITUCION;
        $this->_view->setJs( array( 'excepciones' ) );
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
                $this->_view->renderizar( 'excepciones', false );
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

    function listar_excepciones() {
        $idexep = $_POST[ "idexcep" ];
        $this->listar_excep = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_excep->ListarExcepcionesRegistradas();
        echo $ejecutar;

    }


    public

    function listar_personal_para_excepcion() {
        $idper = $_POST[ "idpersonal" ];
        $this->listar_idpersonal = $this->loadModel( 'reportes' );
        $ejecutar = $this->listar_idpersonal->ListadoPersonalConsolidado();
        echo $ejecutar;

    }



    public

    function listar_personal_para_programacion() {
        $idper = $_POST[ "idpersonal" ];
        $this->listar_idpersonal = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_idpersonal->ListadoPersonalConsolidadoProgramacion();
        echo $ejecutar;

    }





    public

    function asigna_excepcion_a_personal() {
        $idpersonal = $_POST[ "idpersonal" ];
        $idprofesion = $_POST[ "idprofesion" ];
        $idexcepcion = $_POST[ "idexcepcion" ];
        $tipo_exepcion = $_POST[ "tipo_exepcion" ];
        $cuantitativo = $_POST[ "cuantitativo" ];
        $idupss = $_POST[ "idupss" ];
        $iddepar = $_POST[ "iddepar" ];
        $idservicio = $_POST[ "idservicio" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->listar_excepcion = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_excepcion->GrabarExcepcionPersonal( $idpersonal, $idprofesion, $idexcepcion, $tipo_exepcion, $cuantitativo, $idupss, $iddepar, $idservicio, $mes, $anio, $usuario );
        echo $ejecutar;

    }


    public

    function ver_excepciones_del_personal() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->listar_excepcion = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_excepcion->VisualizarExcepcionesdelPersonal( $dni, $mes, $anio );
        echo $ejecutar;

    }

    public

    function eliminar_excepcion_de_personal() {
        $id = $_POST[ "id" ];
        $this->listar_excepcion = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_excepcion->EliminarExcepcionDePersonal( $id );
        echo $ejecutar;

    }





    /** fin de excepciones */









    /* inicio de sala de operaciones  */


    public

    function sop() {
        $this->_view->titulo = 'Sala de Operaciones - Programacion de Personal - ' . INSTITUCION;
        $this->_view->setJs( array( 'sop' ) );
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

                $this->_view->renderizar( 'sop', false );
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

    function crear_programacion_para_sala_operaciones() {
        $idupss = $_POST[ "idupss" ];
        $iddepar = $_POST[ "iddepar" ];
        $idservicio = $_POST[ "idservicio" ];
        $idfuncional = $_POST[ "idfuncional" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->generar_programacion_sala_operaciones = $this->loadModel( 'programacion' );
        $ejecutar = $this->generar_programacion_sala_operaciones->GenerarProgramacionSalaOperaciones( $idupss, $iddepar, $idservicio, $idfuncional, $mes, $anio, $usuario );
        echo $ejecutar;

    }


    // listar_tipos_upss



    public

    function ver_programacion_para_sala_operaciones() {
        $idupss = $_POST[ "idupss" ];
        $iddepar = $_POST[ "iddepar" ];
        $idservicio = $_POST[ "idservicio" ];
        $idfuncional = $_POST[ "idfuncional" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->visualizar_programacion_sala_operaciones = $this->loadModel( 'programacion' );
        $ejecutar = $this->visualizar_programacion_sala_operaciones->VisualizarSalaOperaciones( $idupss, $iddepar, $idservicio, $idfuncional, $mes, $anio );
        echo $ejecutar;
    }


    public

    function asignar_programacion_a_id_funcional_sop() {
        $idfuncional = $_POST[ "idfuncional" ];
        $fecha = $_POST[ "fecha" ];
        $nombre_dia = utf8_decode( $_POST[ "nombre_dia" ] );
        $idupss = $_POST[ "idupss" ];
        $iddepar = $_POST[ "iddepar" ];
        $idservicio = $_POST[ "idservicio" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $turno = utf8_decode( $_POST[ "turno" ] );
        $hora_inicio = $_POST[ "hora_inicio" ];
        $hora_fin = $_POST[ "hora_fin" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabacion_sop = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabacion_sop->GrabarDetalleProgramacionSOP( $idfuncional, $fecha, $nombre_dia, $idupss, $iddepar, $idservicio, $mes, $anio, $turno, $hora_inicio, $hora_fin, $usuario );
        echo $ejecutar;


    }


    public

    function asignar_programacion_a_id_funcional_sop_por_dia() {
        $idfuncional = $_POST[ "idfuncional" ];
        $nombre_dia = utf8_decode( $_POST[ "nombre_dia" ] );
        $idupss = $_POST[ "idupss" ];
        $iddepar = $_POST[ "iddepar" ];
        $idservicio = $_POST[ "idservicio" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $turno = utf8_decode( $_POST[ "turno" ] );
        $hora_inicio = $_POST[ "hora_inicio" ];
        $hora_fin = $_POST[ "hora_fin" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabacion_sop = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabacion_sop->GrabarDetalleProgramacionSOPPorDia( $idfuncional, $nombre_dia, $idupss, $iddepar, $idservicio, $mes, $anio, $turno, $hora_inicio, $hora_fin, $usuario );
        echo $ejecutar;


    }



    public

    function eliminar_turno_actividad_por_dni() {
        $dni = $_POST[ "dni" ];
        $fecha = $_POST[ "fecha" ];
        $this->eliminar_turno = $this->loadModel( 'programacion' );
        $ejecutar = $this->eliminar_turno->EliminaTurnoSOP( $dni, $fecha );
        echo $ejecutar;

    }








    public

    function mostrar_turno_dia_lunes() {
        $idfuncional = $_POST[ "idfuncional" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia->MostrarTurnoDiaLunes( $idfuncional, $mes, $anio );
        echo $ejecutar;

    }


    public

    function mostrar_turno_dia_martes() {
        $idfuncional = $_POST[ "idfuncional" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia->MostrarTurnoDiaMartes( $idfuncional, $mes, $anio );
        echo $ejecutar;

    }



    public

    function mostrar_turno_dia_miercoles() {
        $idfuncional = $_POST[ "idfuncional" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia->MostrarTurnoDiaMiercoles( $idfuncional, $mes, $anio );
        echo $ejecutar;

    }

    public

    function mostrar_turno_dia_jueves() {
        $idfuncional = $_POST[ "idfuncional" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia->MostrarTurnoDiaJueves( $idfuncional, $mes, $anio );
        echo $ejecutar;

    }


    public

    function mostrar_turno_dia_viernes() {
        $idfuncional = $_POST[ "idfuncional" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia->MostrarTurnoDiaViernes( $idfuncional, $mes, $anio );
        echo $ejecutar;

    }



    public

    function ver_ambiente_funcional_registrado() {
        $idfuncional = $_POST[ "idfuncional" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->ver_afr = $this->loadModel( 'programacion' );
        $ejecutar = $this->ver_afr->VerAmbienteFuncionalRegistrado( $idfuncional, $mes, $anio );
        echo $ejecutar;

    }



    public

    function eliminar_idfuncional() {
        $idprogram = $_POST[ "id" ];
        $this->ver_afr = $this->loadModel( 'programacion' );
        $ejecutar = $this->ver_afr->EliminarProgramacion( $idprogram );
        echo $ejecutar;

    }




    // listar_tipos_upss


    /** fin de sala de operaciones   */






    /* registrar programacion */



    public

    function registrar() {
        $this->_view->titulo = 'Registrar Programacion - Programacion de Personal - ' . INSTITUCION;
        $this->_view->setJs( array( 'registrar' ) );
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

                $this->_view->renderizar( 'registrar', false );
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

    function programacion_para_personal() {
        $idupss = $_POST[ "idupss" ];
        $iddepar = $_POST[ "iddepar" ];
        $idservicio = $_POST[ "idservicio" ];
        $dni = $_POST[ "dni" ];
        $condicion = $_POST[ "condicion" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabacion_programacion = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabacion_programacion->CrearProgramacionPersonal( $idupss, $iddepar, $idservicio, $dni, $condicion, $mes, $anio, $usuario );
        echo $ejecutar;

    }



    public

    function listar_programacion_mensual_por_personal() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->grabar_programacion_listar = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabar_programacion_listar->ListarProgramacionPersonal( $dni, $mes, $anio );
        echo $ejecutar;

    }


    // ver_correlativo_turno_en_bd
    public

    function eliminar_programacion_mensual_personal() {

        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->eliminar_programacion_listar = $this->loadModel( 'programacion' );
        $ejecutar = $this->eliminar_programacion_listar->EliminarProgramacionPersonal( $dni, $mes, $anio );
        echo $ejecutar;
    }


    public

    function grabar_datos_de_programacion_en_asistencia() {
        $idfuncional = $_POST[ "idfuncional" ];
        $nhoras = $_POST[ "nhoras" ];
        $hora_inicial = $_POST[ "hora_inicial" ];
        $hora_final = $_POST[ "hora_final" ];
        $codigo_horario = $_POST[ "codigo_horario" ];
        $codigo_turno = $_POST[ "codigo_turno" ];
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $dia = $_POST[ "dia" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_programacion = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabar_programacion->GrabarDatosProgramacion( $idfuncional, $nhoras, $hora_inicial, $hora_final, $codigo_horario, $codigo_turno, $usuario, $dni, $mes, $anio, $dia );
        echo $ejecutar;

    }




    public

    function grabar_actividad_para_personal() {

        $idupss = $_POST[ "idupss" ];
        $iddepar = $_POST[ "iddepar" ];
        $idservicio = $_POST[ "idservi" ];
        $dni = $_POST[ "dni" ];
        $condicion = $_POST[ "condicion_trabajo" ];
        $codigo_horario = $_POST[ "codigo_horario" ];
        $codigo_turno = $_POST[ "codigo_turno" ];
        $idfuncional = $_POST[ "idfuncional" ];
        $fecha_datetime = $_POST[ "fecha_datetime" ];
        $idactividad = $_POST[ "idactividad" ];
        $dia = $_POST[ "dia" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $horas = $_POST[ "horas" ];
        $hora_inicio = $_POST[ "hora_inicio" ];
        $hora_fin = $_POST[ "hora_fin" ];
        $dia_nombre = $_POST[ "dia_nombre" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->grabar_programacion_actividad = $this->loadModel( 'programacion' );
        $ejecutar = $this->grabar_programacion_actividad->GrabarDatosProgramacionActividad( $idupss, $iddepar, $idservicio, $dni, $condicion, $codigo_horario, $codigo_turno, $idfuncional, $fecha_datetime, $idactividad, $dia, $mes, $anio, $horas, $hora_inicio, $hora_fin, $dia_nombre, $usuario );
        echo $ejecutar;


    }




    public

    function mostrar_datos_programacion_lunes() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia_lunes = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia_lunes->MostrarProgramacionLunes( $dni, $mes, $anio );
        echo $ejecutar;
    }




    public

    function mostrar_datos_programacion_martes() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia_lunes = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia_lunes->MostrarProgramacionMartes( $dni, $mes, $anio );
        echo $ejecutar;
    }

    public

    function mostrar_datos_programacion_miercoles() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia_lunes = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia_lunes->MostrarProgramacionMiercoles( $dni, $mes, $anio );
        echo $ejecutar;
    }


    public

    function mostrar_datos_programacion_jueves() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia_lunes = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia_lunes->MostrarProgramacionJueves( $dni, $mes, $anio );
        echo $ejecutar;
    }

    public

    function mostrar_datos_programacion_viernes() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia_lunes = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia_lunes->MostrarProgramacionViernes( $dni, $mes, $anio );
        echo $ejecutar;
    }

    public

    function mostrar_datos_programacion_sabado() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia_lunes = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia_lunes->MostrarProgramacionSabado( $dni, $mes, $anio );
        echo $ejecutar;
    }

    public

    function mostrar_datos_programacion_domingo() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->mostrar_dia_lunes = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_dia_lunes->MostrarProgramacionDomingo( $dni, $mes, $anio );
        echo $ejecutar;
    }




    public

    function grabar_actividad_por_dia() {
        $dni = $_POST[ "dni" ];
        $codigo_horario = $_POST[ "codigo_horario" ];
        $codigo_turno = $_POST[ "codigo_turno" ];
        $idfuncional = $_POST[ "idfuncional" ];
        $idactividad = $_POST[ "idactividad" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $horas = $_POST[ "horas" ];
        $hora_inicio = $_POST[ "hora_inicio" ];
        $hora_fin = $_POST[ "hora_fin" ];
        $dia_nombre = $_POST[ "dia_nombre" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->asignar_dias_a_actividad = $this->loadModel( 'programacion' );
        $ejecutar = $this->asignar_dias_a_actividad->AsignarDiasAActividad( $dni, $codigo_horario, $codigo_turno, $idfuncional, $idactividad, $mes, $anio, $horas, $hora_inicio, $hora_fin, $dia_nombre, $usuario );
        echo $ejecutar;




    }



    public

    function contar_cantidad_horas() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->contar_horas = $this->loadModel( 'programacion' );
        $ejecutar = $this->contar_horas->Contabilizar_Horas_Personal( $dni, $mes, $anio );
        echo $ejecutar;

    }









    /* fin de registrar operacion */




    /* INICIO DE TIPO DE ACTIVIDADES  */



    public

    function tipo_actividad() {
        $this->_view->titulo = 'Tipo de Actividad - Programacion de Personal - ' . INSTITUCION;
        $this->_view->setJs( array( 'tipo_actividad' ) );
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
                $this->_view->renderizar( 'tipo_actividad', false );
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

    function listar_actividades_con_tipo_actividad() {
        $id = $_POST[ "actividad" ];
        $this->listar_actividad_tipo_actividad = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_actividad_tipo_actividad->ListarActividadTipoActividad();
        echo $ejecutar;


    }

    // listar_horarios_de_turnos_final',


    /* FIN DE TIPO DE ACTIVIDADES  */





    /* para fechas Inicio */


    public

    function fechas() {
        $this->_view->titulo = ':: Fechas de Programacion - ' . INSTITUCION;
        $this->_view->setJs( array( 'fechas' ) );
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
                $this->_view->renderizar( 'fechas', false );
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

    function registrar_fechas_programacion_registro() {
        $mes = $_POST[ "mes" ];
        $fecha_inicio_programacion = $_POST[ "fecha_inicio_programacion" ];
        $fecha_fin_programacion = $_POST[ "fecha_fin_programacion" ];
        $dias = $_POST[ "dias" ];
        $fecha_registro_inicio = $_POST[ "fecha_registro_inicio" ];
        $fecha_registro_fin = $_POST[ "fecha_registro_fin" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->listar_fechas_programacion = $this->loadModel( 'programacion' );
        $ejecutar = $this->listar_fechas_programacion->GrabarFechaProgramacionregistro( $mes, $fecha_inicio_programacion, $fecha_fin_programacion, $dias, $fecha_registro_inicio, $fecha_registro_fin, $usuario );
        echo $ejecutar;

    }



    public

    function ver_fechas_programacion() {
        $fecha = $_POST[ "fecha" ];
        $this->mostrar_fechas = $this->loadModel( 'programacion' );
        $ejecutar = $this->mostrar_fechas->mostrar_fechas_programacion();
        echo $ejecutar;


    }



    public
    function eliminar_data_periodos_registrados() {
        $idperiodo = $_POST[ "idperiodo" ];
        $this->eliminar_data = $this->loadModel( 'programacion' );
        $ejecutar = $this->eliminar_data->EliminaDataPeriodosRegistrados( $idperiodo );
        echo $ejecutar;


    }


    
    public function aperturar_periodo(){
        $idperiodo = $_POST[ "idperiodo" ];
        $this->apertura_data = $this->loadModel( 'programacion' );
        $ejecutar = $this->apertura_data->Aperturafecha($idperiodo);
        echo $ejecutar;
        
        
        
    }
        
        
    
    

    /* Fin de fechas */








}




?>