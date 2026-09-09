<?php
class plantilla_menu{

    private $id_pl_menu;
    private $nombre;
    private $icono;
    private $url;
    private $orden;
    private $estado;    
    private $id_pl_m;

    public function __construct() {
        $this->setId_pl_menu(null);
        $this->setNombre(null);
        $this->setIcono(null);
        $this->setUrl(null);        
        $this->setOrden(null);
        $this->setEstado(null);        
        $this->setId_pl_m(null);
    }

    public function getId_pl_menu() {
        return $this->id_pl_menu;
    }
    public function setId_pl_menu($id_pl_menu) {
        $this->id_pl_menu = $id_pl_menu;
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
    public function getIcono() {
        return $this->icono;
    }
    public function setIcono($icono) {
        $this->icono = $icono;
    }
    public function getEstado() {
        return $this->estado;
    }
    public function setEstado($estado) {
        $this->estado = $estado;
    }
    public function getOrden() {
        return $this->orden;
    }
    public function setOrden($orden) {
        $this->orden = $orden;
    }
    public function getId_pl_m() {
        return $this->id_pl_m;
    }
    public function setId_pl_m($id_pl_m) {
        $this->id_pl_m = $id_pl_m;
    }
}
?>