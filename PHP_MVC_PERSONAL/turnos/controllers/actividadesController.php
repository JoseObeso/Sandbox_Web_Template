<?php



class actividadesController extends Controller {

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

    function registros() {
        $this->_view->titulo = 'Actividades / Asignacion de Personal Asistencial ' . INSTITUCION;;
        $this->_view->setJs( array( 'registros' ) );
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
                $this->_asistencial = $this->loadModel( 'actividades' );
                $lc_buscar = '';
                $this->_view->listar_personal_sigalen = $this->_asistencial->getListarPersonalAsistencialSigalen( $lc_buscar );
                $this->_view->listar_actividades = $this->_asistencial->getListarActividades();
                $this->_view->listarturno = $this->_asistencial->getListarturnos();
                $this->_view->listardepartamento = $this->_asistencial->getListarDepartamentosHospital();
                $this->_view->renderizar( 'registros', false );
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

    function ver_asistencia_sisgalen() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_ver_si_existe = $this->loadModel( 'actividades' );
        $ejecutar_ver = $this->_ver_si_existe->VerAsistenciaProgramacion( $dni, $mes, $anio );
        echo $ejecutar_ver;

    }


    public

    function buscar_por_nombre_sisgalen() {
        $lc_buscar = $_POST[ "nombres" ];
        $this->_buscar_nombres = $this->loadModel( 'actividades' );
        $buscar_y_traer = $this->_buscar_nombres->getListarPersonalAsistencialSigalen( $lc_buscar );
        echo $buscar_y_traer;
    }


    public

    function crear_horario_asistencial_desde_sigalen() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $id = $_POST[ "id" ];
        $dni = $_POST[ "dni" ];
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->_crear_horario = $this->loadModel( 'actividades' );
        $traer = $this->_crear_horario->CrearHorarioAsistencial( $mes, $anio, $id, $dni, $usuario );
        echo $traer;
    }




    public

    function listar_servicios() {
        $id = $_POST[ "id" ];
        $this->_ver_servicios = $this->loadModel( 'actividades' );
        $traer = $this->_ver_servicios->ListarServicios( $id );
        echo $traer;


    }

    public

    function grabar_actividad() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $idempleado = $_POST[ "idempleado" ];
        $dni = $_POST[ "dni" ];
        $iddepartamento = $_POST[ "iddepartamento" ];
        $idservicio = $_POST[ "idservicio" ];
        $idactividad = $_POST[ "idactividad" ];
        $dia = $_POST[ "dia" ];
        
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $turno = $_POST[ "turno" ];
        $horas = $_POST[ "horas" ];
        $this->_grabar_actividad = $this->loadModel( 'actividades' );
        $grabaractividad = $this->_grabar_actividad->GrabarActividades( $iddepartamento, $idservicio, $idactividad, $idempleado, $dni, $dia, $mes, $anio, $turno, $horas, $usuario );
        echo $grabaractividad;



    }


    public

    function leer_actividades() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_read_actividad = $this->loadModel( 'actividades' );
        $readactividad = $this->_read_actividad->LeerActividad( $dni, $mes, $anio );
        echo $readactividad;



    }


 



}



?>