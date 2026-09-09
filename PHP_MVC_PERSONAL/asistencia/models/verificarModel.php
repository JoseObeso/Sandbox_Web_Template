<?php
class verificarModel extends Model
{
	public function __construct() {
		parent::__construct();
	}

	public function getVerificarUsuario(usuario_web $u)
	{
		$query = "select * from V_USUARIO_WEB where dni=?";
		$result = $this->_db->prepare($query);
		$result->execute(array($u->getDni()));
		if($result->rowCount())
		{
			$sql = "select * from acceso_modulo where dni=? and estado=1";
			$result2 = $this->_db->prepare($sql);
			$result2->execute(array($u->getDni()));
			if($result2->rowCount())
			{
				$row = $result->fetch(PDO::FETCH_OBJ);
				if($u->getClave()==$row->CLAVE)
				{
					$fecha_hoy = strtotime(date('Y-m-d'));
					$fecha_bd = strtotime($row->FECHA_EXPIRACION);
					if($fecha_hoy<=$fecha_bd)
					{
						if($row->ESTADO==1)
						{
								$sentencia = "update usuario_web set sesion=1 where dni=?";
								$resultado = $this->_db->prepare($sentencia);
								$resultado->execute(array($u->getDni()));
								$_SESSION["dni"]=$row->DNI;
								$_SESSION["nombres"]=$row->NOMBRES;
								$_SESSION["nombre"] = $row->USU_NOMBRE;
								$_SESSION["modulo"] = "administrador";
								$_SESSION["cargo"] = $row->ABREVIATURA;
								$_SESSION["foto"] = $row->FOTO;
								$_SESSION["sexo"] = $row->SEXO;
                            	$_SESSION["sesion"] = $row->SESION;
                            
								$array = array('estado' => 1, 'mensaje' => 'Datos correctos, espere un momento.');
								return json_encode($array);
			 
						}else{
							$array = array('estado' => 0, 'mensaje' => 'Su cuenta ha sido desactivado.' );
							return json_encode($array);
						}
					}else{
						$array = array('estado' => 0, 'mensaje' => 'Su cuenta ha expirado.');
						return json_encode($array);
					}
				}else{
					if(isset($_SESSION["intentos"]) && $_SESSION["intentos"]!=''){
						if($_SESSION["intentos"]==3){
							$sentencia = "update usuario_web set estado=0 where dni=?";
							$resultado = $this->_db->prepare($sentencia);
							$resultado->execute(array($u->getDni()));
							$_SESSION["intentos"] = '';
							$array = array('estado' => 0, 'mensaje' => 'Su cuenta ha sido desactivado.' );
							return json_encode($array);
							exit;
						}else{
							$_SESSION["intentos"] += 1;
						}					
					}else{
						$_SESSION["intentos"] = 1;
					}
					$array = array('estado' => 0, 'mensaje' => 'Su clave es incorrecta.');				
					return json_encode($array);
				}
			}else{
				$array = array('estado' => 0, 'mensaje' => 'Usted no tiene permisos para utilizar este modulo.');				
				return json_encode($array);
			}
		}else{
			$array = array('estado' => 0, 'mensaje' => 'Usted no esta registrado.');
			return json_encode($array);
		}
	}
	public function setCerrarSession(usuario_web $u)
	{
		$sentencia = "update usuario_web set sesion=0, fech_ult_ingreso=getdate() where dni=?";
		$resultado = $this->_db->prepare($sentencia);
		$resultado->execute(array($u->getDni()));
		if($resultado){
			$array = array('estado' => 1, 'mensaje' => 'se cerro la sesion correcatamente.');
			session_destroy();
		}else{
			$array = array('estado' => 0, 'mensaje' => 'error al cerrar la sesion.');
		}
		return json_encode($array);
	}
}
?>