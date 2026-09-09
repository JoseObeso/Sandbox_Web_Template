<?php
class acceso_botones {

    private $id_boton;
    private $nombre;
    private $icono;
    private $estado;
    private $id_submenu;
    private $id_menu;
    private $id_am;
    private $dni;
    private $id_html;

    public function __construct() {
        $this->setId_boton(null);
        $this->setNombre(null);
        $this->setIcono(null);
        $this->setEstado(null);
        $this->setId_submenu(null);
        $this->setId_menu(null);
        $this->setId_am(null);
        $this->setDni(null);
        $this->setId_html(null);
    }

    public function getId_boton() {
        return $this->id_boton;
    }
    public function setId_boton($id_boton) {
        $this->id_boton = $id_boton;
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
    public function getEstado() {
        return $this->estado;
    }
    public function setEstado($estado) {
        $this->estado = $estado;
    }
    public function getId_submenu() {
        return $this->id_submenu;
    }
    public function setId_submenu($id_submenu) {
        $this->id_submenu = $id_submenu;
    }
    public function getId_menu() {
        return $this->id_menu;
    }
    public function setId_menu($id_menu) {
        $this->id_menu = $id_menu;
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
    public function getId_html() {
        return $this->id_html;
    }
    public function setId_html($id_html) {
        $this->id_html = $id_html;
    }
}
?>