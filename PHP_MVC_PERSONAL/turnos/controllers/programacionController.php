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


    public

    function administrativos() {
        $this->_view->titulo = 'Asignacion de Programacion Mensual Administrativa -  Turnos ' . INSTITUCION;;
        $this->_view->setJs( array( 'administrativos' ) );
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
                $this->_personal = $this->loadModel( 'programacion' );
                $this->_view->listarpersonal_administrativo = $this->_personal->getListarPersonalAdministrativo();
                $this->_view->listarhorario = $this->_personal->getListarHorarios();
                $this->_view->renderizar( 'administrativos', false );
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
    function asistencial() {
        $this->_view->titulo = 'Asignacion de Programacion Mensual Asistencial -  Turnos ' . INSTITUCION;;
        $this->_view->setJs( array( 'asistencial' ) );
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
                $this->_asistencial = $this->loadModel( 'programacion' );
                $this->_view->listar_asistencial = $this->_asistencial->getListarPersonalAsistencial();
                $this->_view->listarhorario = $this->_asistencial->getListarHorarios();
                $this->_view->renderizar( 'asistencial', false );
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
    function cambio_turno() {
        $this->_view->titulo = 'Programacion Cambio de Turno  -  Turnos ' . INSTITUCION;;
        $this->_view->setJs( array( 'cambio_turno' ) );
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
                $this->_asistencial = $this->loadModel( 'programacion' );
                $this->_view->listar_asistencial = $this->_asistencial->getListarPersonalAsistencial();
                $this->_view->listarhorario = $this->_asistencial->getListarHorarios();
                $this->_view->renderizar( 'cambio_turno', false );
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

    function buscar_por_nombre() {
        $nombres = $_POST[ "nombres" ];
        $this->_buscar_nombres = $this->loadModel( 'programacion' );
        $buscar_y_traer = $this->_buscar_nombres->BuscarPersonalNombres( $nombres );
        echo $buscar_y_traer;
    }

    
    

    public

    function buscar_por_nombre_asistencial() {
        $nombres = $_POST[ "nombres" ];
        $this->_buscar_nombres = $this->loadModel( 'programacion' );
        $buscar_y_traer = $this->_buscar_nombres->BuscarPersonalNombresAsistencial( $nombres );
        echo $buscar_y_traer;
    }

    
    
    
    
    
    
    
        
        
    
    
    public

    function ver_datos_asistencia_administrativos() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $dni = $_POST[ "dni" ];
        $this->_ver_asistencia = $this->loadModel( 'programacion' );
        $ejecutar_ver = $this->_ver_asistencia->ver_programacion_mes( $mes, $anio, $dni );
        echo $ejecutar_ver;
    }



    public

    function asignar_turno() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $id_personal = $_POST[ "id_personal" ];
        $cod_horario = $_POST[ "cod_horario" ];
        $cod_turno = $_POST[ "cod_turno" ];
        $ingreso = $_POST[ "ingreso" ];
        $salida = $_POST[ "salida" ];
        $horas = $_POST[ "horas" ];
        $this->_asignar_turno = $this->loadModel( 'programacion' );
        $ejecutar_asignar = $this->_asignar_turno->Asignar_Turno( $id_personal, $cod_horario, $cod_turno, $ingreso, $salida, $horas, $usuario );
        echo $ejecutar_asignar;



    }
    
    
    public function procesar_descuento_asis()
        
    {
        
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $tipo = 'S';
        $this->_procesa = $this->loadModel( 'programacion' );
        $ejecutar = $this->_procesa->ProcesarDescuento($dni, $mes, $anio, $tipo, $usuario );
        echo $ejecutar;
    }
    
        
    
    
    


}
?>