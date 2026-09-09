<?php

class seccionesController extends Controller {
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

    function datos_personales() {
        $this->_view->titulo = 'Filiacion y Datos Personales - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'datos_personales' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->listar_departamentos = $this->listar_personal_legajos->getListarDepartamentos();
            $this->_view->renderizar( 'datos_personales', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }

    
    

    public
    function buscar_por_nombre_legajos() {
        $buscar_por_nombre = $_POST[ "nombres" ];
        $this->_buscar_nombres_legajos = $this->loadModel( 'secciones' );
        $buscar_y_personal_legajos = $this->_buscar_nombres_legajos->getListadoPersonalLegajos($buscar_por_nombre );
        echo $buscar_y_personal_legajos;

    }



    /* seccion de educacion */
    public

    function educacion() {
        $this->_view->titulo = 'Registro de Niveles de Educacion - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'educacion' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'educacion', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }


    
    
    
    
    /* Fin de seccion de educacion */
    
    
    /* seccion de Capacitacion */
    public
    function capacitacion() {
        $this->_view->titulo = 'Registro de Niveles de Educacion - Sistema de Legajos ' . INSTITUCION;;
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'capacitacion', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion de Capacitacion */
    
    
    
    
    
    /* seccion de Contratos */
    public
    function contratos() {
        $this->_view->titulo = 'Registro de Niveles de Educacion - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'contratos' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'contratos', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion  de Contratos  */
    
   
    
    
    /* seccion de Renuncias */
    public
    function renuncias() {
        $this->_view->titulo = 'Registro de Personal Renuncia - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'renuncias' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'renuncias', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion  de Contratos  */
   
    
    
    
    
    /* seccion de Desplazamiento */
    public
    function desplazamiento() {
        $this->_view->titulo = 'Registro de Desplazamiento del Personal - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'desplazamiento' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'desplazamiento', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion  de Contratos  */
   
    
    
       
    /* seccion de Licencias */
    public
    function licencias() {
        $this->_view->titulo = 'Registro de Licencias del Personal - Sistema de Legajos ' . INSTITUCION;;
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'licencias', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion de Licencias  */
   
    
     /* seccion de Vacaciones */
    public
    function vacaciones() {
        $this->_view->titulo = 'Registro de Vacaciones del Personal - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'vacaciones' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'vacaciones', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion de Vacaciones  */
   
    
    
    
    
   /* seccion de ascensos */
    public
    function ascensos() {
        $this->_view->titulo = 'Registro de Ascensos del Personal - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'ascensos' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'ascensos', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion de ascensos  */
   

    
    
    
    /* seccion de personal */
    public
    function personal() {
        $this->_view->titulo = 'Registro de Ascensos del Personal - Sistema de Legajos ' . INSTITUCION;;
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'personal', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion de personal */


    
    
    /* seccion de familiar */
    public
    function familiar() {
        $this->_view->titulo = 'Registro de familiar del Personal - Sistema de Legajos ' . INSTITUCION;;
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'familiar', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion de familiar */

    
    /* seccion de Evaluaciones */
    public
    function evaluaciones() {
        $this->_view->titulo = 'Registro de Evaluaciones del Personal - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'evaluaciones' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'evaluaciones', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion de Evaluaciones */

    
    
    
   /* seccion de meritos */
    public
    function meritos() {
        $this->_view->titulo = 'Registro de Evaluaciones del Personal - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'meritos' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'meritos', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion de meritos */

    
    
  
    
    
    /* seccion de demeritos */
    public
    function demeritos() {
        $this->_view->titulo = 'Registro de Demeritos del Personal - Sistema de Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'demeritos' ) );
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
            $this->listar_personal_legajos = $this->loadModel( 'secciones' );
            $buscar_por_nombre = '';
            $this->_view->listar_personal_legajos = $this->listar_personal_legajos->getListadoPersonalLegajos( $buscar_por_nombre );
            $this->_view->renderizar( 'demeritos', false );
        } else {
            $this->_view->mensaje = $permiso_menu[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }

    }
    
    /* Fin de seccion de demeritos */

  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  /* solo para muestra */
      
    public

    function grabar_nuevo_documento() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $constancia = $_POST[ "constancia" ];
        $this->_grabar_documento = $this->loadModel( 'parametros' );
        $ejecutar_grabar_nuevo = $this->_grabar_documento->GrabarNuevoDocumento( $nombre, $constancia, $usuario );
        echo $ejecutar_grabar_nuevo;


    }

    public

    function grabar_edicion_documento_ref() {
        $id_ref = $_POST[ "id_ref" ];
        $nombre = $_POST[ "nombre" ];
        $constancia = $_POST[ "constancia" ];
        $this->_grabar_edicion_documento = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion_documento->GrabarEdicionDocumento( $nombre, $constancia, $id_ref );
        echo $ejecutar_grabar_edicion;
    }

    public

    function eliminar_documento() {
        $id_ref = $_POST[ "id_ref" ];
        $this->_eliminar_documento = $this->loadModel( 'parametros' );
        $ejecutar_eliminar_documento = $this->_eliminar_documento->EliminarDocumento( $id_ref );
        echo $ejecutar_eliminar_documento;


    }


/* fin de muestra */



}
?>