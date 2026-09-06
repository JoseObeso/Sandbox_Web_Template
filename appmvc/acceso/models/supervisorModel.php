<?php
class supervisorModel extends Modelsqlserver
{
    public
    function __construct()
    {
        parent::__construct();
    }

    public function GetUserDNI($dni)
    {
        $query = "select dni, nombres, fecha_expiracion, estado, case when estado = '1' then 'ACTIVADO' else 'DESACTIVADO' end tipo_estado  from usuario_web where dni = '" . $dni . "'";
        $resultado = $this->_dbssqlserver->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'dni' => trim($imprimir->dni),
                    'nombres' => utf8_encode(trim($imprimir->nombres)),
                    'expiracion' => date("d/m/Y", strtotime($imprimir->fecha_expiracion)),
                    'tipo_estado' => trim($imprimir->tipo_estado),
                    'estado' => trim($imprimir->estado)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    public function GetUser($user, $modulo)
    {
        $query = "select nombre, fecha_expiracion, activo, case when activo  = 1 then 'ACTIVADO' else 'DESACTIVADO' end tipo_estado   from usuario   where usuario =  '" . $user . "' and modulo = '".$modulo."'";
        $resultado = $this->_dbssqlserver->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'nombres' => utf8_encode(trim($imprimir->nombre)),
                    'expiracion' => date("d/m/Y", strtotime($imprimir->fecha_expiracion)),
                    'tipo_estado' => trim($imprimir->tipo_estado),
                    'estado' => trim($imprimir->activo)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function GetNombres($nombres)
    {
        $query = "select modulo, usuario, nombre, rtrim(modulo) + ' - ' + rtrim(usuario) + ' - ' + rtrim(nombre) as apellidos_nombres from usuario where nombre like '%".$nombres."%'";
        $resultado = $this->_dbssqlserver->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'modulo' => trim($imprimir->modulo),
                    'usuario' => trim($imprimir->usuario),
                    'nombre' => utf8_encode(trim($imprimir->nombre)),
                    'apellidos' => utf8_encode(trim($imprimir->apellidos_nombres))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function GetNombresTramite($nombres)
    {
        $query = "select idusuario, usuario, nombre, nombre_apellidos, descripcion, fecha_expiracion, abreviatura, activo, condicion_activo  from tramite.dbo.v_usuario where nombre like '%".$nombres."%'";
        $resultado = $this->_dbssqlserver->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'idusuario' => $imprimir->idusuario,
                    'usuario' => trim($imprimir->usuario),
                    'apellidos' => utf8_encode(trim($imprimir->nombre_apellidos)),
                    'descripcion' => utf8_encode(trim($imprimir->descripcion)),
                    'expiracion' => date("d/m/Y", strtotime($imprimir->fecha_expiracion)),
                    'abreviatura' => utf8_encode(trim($imprimir->abreviatura)),
                    'activo' => trim($imprimir->activo),
                    'condicion_activo' => trim($imprimir->condicion_activo)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    


    public function CambiarClave($dni)
    {

        $sql_update_registro = " update usuario_web set clave = '1234' where dni = '" . $dni . "'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function CambiarClaveUser($user, $modulo)
    {
        $sql_update_registro = " update usuario set contrasena = '1234' where usuario = '" . $user . "' and modulo = '".$modulo."'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    
    
    public function CambiarClaveTramite($user)
    {
        $sql_update_registro = " update tramite.dbo.usuario set contrasena = '1234' where usuario = '" . $user . "'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function AumentarExpiracion($dni)
    {

        $sql_update_registro = "update usuario_Web set fecha_expiracion = getdate() + 365 where dni = '" . $dni . "'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function ExpirarAumentarUser($user, $modulo)
    {

        $sql_update_registro = "update usuario set fecha_expiracion = getdate() + 365 where usuario = '" . $user . "' and modulo = '".$modulo."'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    

    public function ExpirarTramite($user)
    {
        $sql_update_registro = "update tramite.dbo.usuario set fecha_expiracion = getdate() + 365 where usuario = '" . $user . "'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function desactivar($dni)
    {
        $sql_update_registro = "update usuario_Web set estado = '0' where dni = '" . $dni . "'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    

   

    public function activar($dni)
    {
        $sql_update_registro = "update usuario_Web set estado = '1' where dni = '" . $dni . "'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function ActivarUser($user, $modulo)
    {

        $sql_update_registro = "update usuario set activo = 1 where usuario = '" . $user . "' and modulo = '".$modulo."'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


   
    public function DesactivarUser($user, $modulo)
    {

        $sql_update_registro = "update usuario set activo = 0 where usuario = '" . $user . "' and modulo = '".$modulo."'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function DesactivarTramite($user)
    {

        $sql_update_registro = "update tramite.dbo.usuario set activo = 0 where usuario = '" . $user . "'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function ActivarTramite($user)
    {

        $sql_update_registro = "update tramite.dbo.usuario set activo = 1 where usuario = '" . $user . "'";
        $ejecucion = $this->_dbssqlserver->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }





}
