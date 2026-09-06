<?php
class epidemiologiaController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        session_start();
        if (isset($_SESSION["usuario"]["user"]) && $_SESSION["usuario"]["user"] != '') {
        } else {
            header('location: /');
        }
    }

    public function index()
    {
        $this->_view->titulo = 'Epidemiologia - ' . INSTITUCION;
        $this->_view->setJs(array('epidemiologia'));
        $this->_view->renderizar('index', false);
    }

    public function listar()
    {
        $this->_listar = $this->loadModel('epidemiologia');
        $datos = $this->_listar->Listar();
        echo $datos;
    }


    public function listar_fichas()
    {
        $this->_listar = $this->loadModel('epidemiologia');
        $datos = $this->_listar->Listar_fichas();
        echo $datos;
    }

    public function listar_alertas()
    {
        $this->_listar = $this->loadModel('epidemiologia');
        $datos = $this->_listar->Listar_alertas();
        echo $datos;
    }


    public function listar_salas()
    {
        $this->_listar = $this->loadModel('epidemiologia');
        $datos = $this->_listar->Listar_salas();
        echo $datos;
    }

    

    public function listar_analisis()
    {
        $this->_listar = $this->loadModel('epidemiologia');
        $datos = $this->_listar->listar_analisis();
        echo $datos;
    }


    public function subir_imagen1()
    {
        $nombre_archivo = $_FILES['imagen1']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/images/izquierdo/';
        if (move_uploaded_file($_FILES["imagen1"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function subir_pdf()
    {
        $nombre_archivo = $_FILES['subir_archivo']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/unidades/epidemiologia/pdf/boletin/' . $anio . '/';
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $directorio =  $destino . $nombre_archivo;
        if (move_uploaded_file($_FILES["subir_archivo"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }

    public function subir_pdf_ficha()
    {
        $nombre_archivo = $_FILES['subir_archivo_ficha']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/unidades/epidemiologia/pdf/fichas/' . $anio . '/';
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $directorio =  $destino . $nombre_archivo;
        if (move_uploaded_file($_FILES["subir_archivo_ficha"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function subir_pdf_alerta()
    {
        $nombre_archivo = $_FILES['subir_archivo_alerta']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/unidades/epidemiologia/pdf/alerta/' . $anio . '/';
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $directorio =  $destino . $nombre_archivo;
        if (move_uploaded_file($_FILES["subir_archivo_alerta"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }



    public function subir_pdf_sala()
    {
        $nombre_archivo = $_FILES['subir_archivo_sala']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/unidades/epidemiologia/pdf/sala/' . $anio . '/';
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $directorio =  $destino . $nombre_archivo;
        if (move_uploaded_file($_FILES["subir_archivo_sala"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function subir_pdf_analisis()
    {
        $nombre_archivo = $_FILES['subir_archivo_analisis']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/unidades/epidemiologia/pdf/analisis/' . $anio . '/';
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $directorio =  $destino . $nombre_archivo;
        if (move_uploaded_file($_FILES["subir_archivo_analisis"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }




    public function grabar()
    {
        $anio = $_POST["anio"];
        $descripcion = $_POST["descripcion"];
        $archivo = $_POST["archivo"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->registrar->Grabar($anio, $descripcion, $archivo, $user);
        echo $ejecutar_grabar;
    }

    public function grabar_ficha()
    {
        $anio = $_POST["anio"];
        $descripcion = $_POST["descripcion"];
        $archivo = $_POST["archivo"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->registrar->Grabar_ficha($anio, $descripcion, $archivo, $user);
        echo $ejecutar_grabar;
    }


    public function grabar_alerta()
    {
        $anio = $_POST["anio"];
        $codigo = $_POST["codigo"];
        $descripcion = $_POST["descripcion"];
        $archivo = $_POST["archivo"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->registrar->Grabar_alerta($anio, $codigo, $descripcion, $archivo, $user);
        echo $ejecutar_grabar;
    }


    public function grabar_sala()
    {
        $anio = $_POST["anio"];
        $descripcion = $_POST["descripcion"];
        $archivo = $_POST["archivo"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->registrar->Grabar_sala($anio, $descripcion, $archivo, $user);
        echo $ejecutar_grabar;
    }

    public function grabar_analisis()
    {
        $anio = $_POST["anio"];
        $descripcion = $_POST["descripcion"];
        $archivo = $_POST["archivo"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->registrar->Grabar_analisis($anio, $descripcion, $archivo, $user);
        echo $ejecutar_grabar;
    }

    

    public function eliminar()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->eliminar_->Eliminar($id);
        echo $ejecutar_grabar;
    }


    public function eliminar_ficha()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->eliminar_->Eliminar_Ficha($id);
        echo $ejecutar_grabar;
    }

    public function eliminar_alerta()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->eliminar_->Eliminar_Alerta($id);
        echo $ejecutar_grabar;
    }

     

    public function eliminar_sala()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->eliminar_->Eliminar_sala($id);
        echo $ejecutar_grabar;
    }


    public function eliminar_analisis()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->eliminar_->Eliminar_analisis($id);
        echo $ejecutar_grabar;
    }


    // Inicio baner y jefe

    public function listarbanner()
    {
        $this->_listar = $this->loadModel('epidemiologia');
        $datos = $this->_listar->Listarbanner();
        echo $datos;
    }

    public function activar()
    {
        $id = $_POST["id"];
        $activar = $_POST["activar"];
        $this->registrar = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->registrar->Activar($id, $activar);
        echo $ejecutar_grabar;
    }

    public function grabarbanner()
    {
        $descripcion = $_POST["descripcion"];
        $imagen1 = $_POST["imagen1"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->registrar->Grabarbanner($descripcion, $imagen1, $dni);
        echo $ejecutar_grabar;
    }
    public function listarjefe()
    {
        $this->_listar = $this->loadModel('epidemiologia');
        $datos = $this->_listar->Listarjefe();
        echo $datos;
    }

    public function grabarjefe()
    {
        $jefe = $_POST["nombre"];
        $cargo = $_POST["cargo"];
        $this->registrar = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->registrar->grabarjefe($jefe, $cargo);
        echo $ejecutar_grabar;
    }

    public function activarjefe()
    {
        $id = $_POST["id"];
        $this->registrar = $this->loadModel('epidemiologia');
        $ejecutar_grabar = $this->registrar->ActivarJefe($id);
        echo $ejecutar_grabar;
    }

    // Fin de baner y jefe


}
