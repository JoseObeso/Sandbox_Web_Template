<?php
class acceso_modulo {

    private $id_am;
    private $nombre;
    private $url;
    private $imagen;
    private $estado;
    private $dni;
    private $plantilla;

    public function __construct() {        
        $this->setId_am(null);
        $this->setNombre(null);
        $this->setUrl(null);
        $this->setImagen(null);
        $this->setEstado(null);        
        $this->setDni(null);
        $this->setPlantilla(null);
    }

    public function getId_am() {
        return $this->id_am;
    }
    public function setId_am($id_am) {
        $this->id_am = $id_am;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function getUrl() {
        return $this->url;
    }
    public function setUrl($url) {
        $this->url = $url;
    }
    public function getImagen() {
        return $this->imagen;
    }
    public function setImagen($imagen) {
        $this->imagen = $imagen;
    }
    public function getEstado() {
        return $this->estado;
    }
    public function setEstado($estado) {
        $this->estado = $estado;
    }
    public function getDni() {
        return $this->dni;
    }
    public function setDni($dni) {
        $this->dni = $dni;
    }
    public function getPlantilla() {
        return $this->plantilla;
    }
    public function setPlantilla($plantilla) {
        $this->plantilla = $plantilla;
    }
}
?>