<?php
class prensaController extends Controller
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
        $this->_view->titulo = 'Prensa' . INSTITUCION;
        $this->_view->setJs(array('prensa'));
        $this->_view->renderizar('index', false);
    }

    public function lista_prensa()
    {
        $nota = $_POST["nota"];
        $anio = $_POST["anio"];
        $mes = $_POST["mes"];
        $this->_listar_prensa = $this->loadModel('prensa');
        $datos = $this->_listar_prensa->ListaPrensa($nota, $anio, $mes);
        echo $datos;
    }









    public function subir_imagen1()
    {
        $nombre_archivo = $_FILES['imagen1']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/images/prensa/';
        if (move_uploaded_file($_FILES["imagen1"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function subir_imagen2()
    {
        $nombre_archivo = $_FILES['imagen2']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/images/prensa/';
        if (move_uploaded_file($_FILES["imagen2"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function grabar_imagen2()
    {
        $idprensa = $_POST["id"];
        $imagen2 = $_POST["imagen2"];
        $this->actualizar_imagen2 = $this->loadModel('prensa');
        $ejecutar_grabar = $this->actualizar_imagen2->GrabarImagen2($idprensa,  $imagen2);
        echo $ejecutar_grabar;
    }


    public function multiples_imagenes()
    {
        $nombre_archivo = $_FILES['imagen-multiple']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/images/prensa/galeria/2013/';
        if (move_uploaded_file($_FILES["imagen-multiple"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function multiples_imagenes2()
    {
        $nombre_archivo2 = $_FILES['imagen-multiple2']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/images/prensa/galeria/2013/';
        if (move_uploaded_file($_FILES["imagen-multiple2"]["tmp_name"], $ruta . $nombre_archivo2)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function mostrar_contenido()
    {
        $id = $_POST["id"];
        $this->_listar_conte = $this->loadModel('prensa');
        $datos = $this->_listar_conte->MostrarConte($id);
        echo $datos;
    }

    public function mostrar_texto_prensa()
    {
        $id = $_POST["id"];
        $this->_listar_conte = $this->loadModel('prensa');
        $datos = $this->_listar_conte->MostrarTextoConte($id);
        echo $datos;
    }



    public function grabar_galeria2()
    {
        $id = $_POST["id"];
        $galeria2 = $_POST["galerias2"];
        $this->_actualizar_galeria = $this->loadModel('prensa');
        $datos = $this->_actualizar_galeria->actualizarGaleria($id, $galeria2);
        echo $datos;
    }



    public function prensa_grabar()
    {

        $fecha = $_POST["fecha"];
        $titulo = $_POST["titulo"];
        $subtitulo = $_POST["subtitulo"];
        $detalle = $_POST["detalle"];
        $contenido = $_POST["contenido"];
        $imagen1 = $_POST["imagen1"];
        $galerias = $_POST["galerias"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_agenda = $this->loadModel('prensa');
        $ejecutar_grabar = $this->registrar_agenda->GrabarPrensa($fecha, $titulo, $subtitulo, $detalle, $contenido, $imagen1, $galerias, $dni);
        echo $ejecutar_grabar;
    }



    public function prensa_grabar_modificacion()
    {
        $id =  $_POST["idprensa"];
        $fecha = $_POST["fecha"];
        $titulo = $_POST["titulo"];
        $subtitulo = $_POST["subtitulo"];
        $detalle = $_POST["detalle"];
        $contenido = $_POST["contenido"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_agenda = $this->loadModel('prensa');
        $ejecutar_grabar = $this->registrar_agenda->GrabarPrensaModificar($id, $fecha, $titulo, $subtitulo, $detalle, $contenido, $dni);
        echo $ejecutar_grabar;
    }





    public function eliminar_prensa()
    {
        $id = $_POST["id"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->eliminar_prensa = $this->loadModel('prensa');
        $ejecutar_grabar = $this->eliminar_prensa->EliminarPrensa($id);
        echo $ejecutar_grabar;
    }
}
