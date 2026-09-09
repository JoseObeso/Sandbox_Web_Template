<?php
class plantilla_botones{

    private $id_pl_boton;
    private $nombre;
    private $icono;
    private $id_html;
    private $estado;
    private $id_pl_submenu;
    private $id_pl_menu;  
    private $id_pl_m;

    public function __construct() {
        $this->setId_pl_boton(null);
        $this->setNombre(null);
        $this->setIcono(null);
        $this->setId_html(null);        
        $this->setEstado(null);    
        $this->setId_pl_submenu(null);    
        $this->setId_pl_menu(null);
        $this->setId_pl_m(null);
    }

    public function getId_pl_boton() {
        return $this->id_pl_boton;
    }
    public function setId_pl_boton($id_pl_boton) {
        $this->id_pl_boton = $id_pl_boton;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function getId_html() {
        return $this->id_html;
    }
    public function setId_html($id_html) {
        $this->id_html = $id_html;
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
    public function getId_pl_submenu() {
        return $this->id_pl_submenu;
    }
    public function setId_pl_submenu($id_pl_submenu) {
        $this->id_pl_submenu = $id_pl_submenu;
    }
    public function getId_pl_m() {
        return $this->id_pl_m;
    }
    public function setId_pl_m($id_pl_m) {
        $this->id_pl_m = $id_pl_m;
    }
    public function getId_pl_menu() {
        return $this->id_pl_menu;
    }
    public function setId_pl_menu($id_pl_menu) {
        $this->id_pl_menu = $id_pl_menu;
    }
}
?>