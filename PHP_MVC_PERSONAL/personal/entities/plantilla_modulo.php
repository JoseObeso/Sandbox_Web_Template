<?php
class plantilla_modulo{

    private $id_pl_m;
    private $nombre;
    private $url;
    private $imagen;
    private $estado;
    private $plantilla;

    public function __construct() {
        $this->setId_pl_m(null);
        $this->setNombre(null);
        $this->setUrl(null);
        $this->setImagen(null);
        $this->setEstado(null);
        $this->setPlantilla(null);
    }

    public function getId_pl_m() {
        return $this->id_pl_m;
    }
    public function setId_pl_m($id_pl_m) {
        $this->id_pl_m = $id_pl_m;
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
    public function getPlantilla() {
        return $this->plantilla;
    }
    public function setPlantilla($plantilla) {
        $this->plantilla = $plantilla;
    }
}
?>