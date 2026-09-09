<?php

class acceso_menu {

    private $id_menu;
    private $nombre;
    private $icono;
    private $url;
    private $orden;
    private $estado;
    private $id_am;
    private $dni;

    public function __construct() {
        $this->setId_menu(null);
        $this->setNombre(null);
        $this->setIcono(null);
        $this->setUrl(null);
        $this->setOrden(null);
        $this->setEstado(null);
        $this->setId_am(null);
        $this->setDni(null);
    }

    public function getId_menu() {
        return $this->id_menu;
    }
    public function setId_menu($id_menu) {
        $this->id_menu = $id_menu;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function getIcono() {
        return $this->icono;
    }
    public function setIcono($icono) {
        $this->icono = $icono;
    }
    public function getUrl() {
        return $this->url;
    }
    public function setUrl($url) {
        $this->url = $url;
    }
    public function getOrden() {
        return $this->orden;
    }
    public function setOrden($orden) {
        $this->orden = $orden;
    }
    public function getEstado() {
        return $this->estado;
    }
    public function setEstado($estado) {
        $this->estado = $estado;
    }
    public function getId_am() {
        return $this->id_am;
    }
    public function setId_am($id_am) {
        $this->id_am = $id_am;
    }    
    public function getDni() {
        return $this->dni;
    }
    public function setDni($dni) {
        $this->dni = $dni;
    }
}
?>