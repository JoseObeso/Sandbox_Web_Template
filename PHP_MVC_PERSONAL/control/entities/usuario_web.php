<?php

class usuario_web {

    private $dni;
    private $nombres;
    private $unidad_organica;
    private $email;
    private $cargo;
    private $fecha_expiracion;
    private $usu_nombre;
    private $usu_paterno;
    private $usu_materno;
    private $fech_ult_ingreso;
    private $estado;
    private $clave;
    private $nueva_clave;
    private $sexo;
    private $sesion;
    private $foto;

    public function __construct() {
        $this->setDni(null);
        $this->setNombres(null);
        $this->setUnidad_organica(null);
        $this->setEmail(null);
        $this->setCargo(null);
        $this->setFecha_expiracion(null);
        $this->setUsu_nombre(null);
        $this->setUsu_paterno(null);
        $this->setUsu_materno(null);
        $this->setFech_ult_ingreso(null);
        $this->setEstado(null);
        $this->setClave(null);
        $this->setNueva_clave(null);
        $this->setSexo(null);
        $this->setSesion(null);
        $this->setFoto(null);
    }

    public function getDni() {
        return $this->dni;
    }
    public function setDni($dni) {
        $this->dni = $dni;
    }
    public function getNombres() {
        return $this->nombres;
    }
    public function setNombres($nombres) {
        $this->nombres = $nombres;
    }
    public function getUnidad_organica() {
        return $this->unidad_organica;
    }
    public function setUnidad_organica($unidad_organica) {
        $this->unidad_organica = $unidad_organica;
    }
    public function getEmail() {
        return $this->email;
    }
    public function setEmail($email) {
        $this->email = $email;
    }
    public function getCargo() {
        return $this->cargo;
    }
    public function setCargo($cargo) {
        $this->cargo = $cargo;
    }
    public function getFecha_expiracion() {
        return $this->fecha_expiracion;
    }
    public function setFecha_expiracion($fecha_expiracion) {
        $this->fecha_expiracion = $fecha_expiracion;
    }
    public function getUsu_nombre() {
        return $this->usu_nombre;
    }
    public function setUsu_nombre($usu_nombre) {
        $this->usu_nombre = $usu_nombre;
    }
    public function getUsu_paterno() {
        return $this->usu_paterno;
    }
    public function setUsu_paterno($usu_paterno) {
        $this->usu_paterno = $usu_paterno;
    }
    public function getUsu_materno() {
        return $this->usu_materno;
    }
    public function setUsu_materno($usu_materno) {
        $this->usu_materno = $usu_materno;
    }
    public function getFech_ult_ingreso() {
        return $this->fech_ult_ingreso;
    }
    public function setFech_ult_ingreso($fech_ult_ingreso) {
        $this->fech_ult_ingreso = $fech_ult_ingreso;
    }
    public function getEstado() {
        return $this->estado;
    }
    public function setEstado($estado) {
        $this->estado = $estado;
    }
    public function getClave() {
        return $this->clave;
    }
    public function setClave($clave) {
        $this->clave = $clave;
    }
    public function getNueva_clave(){
        return $this->nueva_clave;
    }
    public function setNueva_clave($nueva_clave){
        $this->nueva_clave = $nueva_clave;
    }
    public function getSexo() {
        return $this->sexo;
    }
    public function setSexo($sexo) {
        $this->sexo = $sexo;
    }
    public function getSesion() {
        return $this->sesion;
    }
    public function setSesion($sesion) {
        $this->sesion = $sesion;
    }
    public function getFoto(){
        return $this->foto;
    }
    public function setFoto($foto){
        $this->foto = $foto;
    }
}
?>