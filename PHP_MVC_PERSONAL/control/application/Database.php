<?php

class Database extends PDO{
	
	public $_paginacion = array();
 	
	public function __construct() {
 
		parent::__construct(DSN_W);
		parent::setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    }

	 
	public function paginar($query1, $query2, $query3, $table,$orderby,$pk,$pagina = false, $limite = false){
	 
		if(!($limite && is_numeric($limite))){
			$limite = LIMIT_REGXPAG;
		}

		if ($pagina && is_numeric($pagina)){
			$inicio = ($pagina - 1) * $limite;
		} else {
			$pagina = 1;
			$inicio = 0;
		}

		$sql = $query1;
		$result = $this->prepare($sql);
		$result->execute();
		foreach($result as $print)
		{
		$registros = $print["NREG"];
		}		
		$result->closeCursor();
		
		$total = ceil($registros / $limite);
		
		if ($pagina>$total) $pagina=$total;
				
		if ($pagina && is_numeric($pagina)){
			$inicio = ($pagina - 1) * $limite;
		} else {
			$pagina = 1;
			$inicio = 0;
		}

		$query = " SELECT TOP $limite   *  FROM $table U  where U.$pk not in
			( SELECT TOP $inicio $pk from $table $query3 order by $orderby ) $query2 order by U.$orderby ";

		$result = $this->query($query);

		$this->_paginacion['actual'] = $pagina;
		$this->_paginacion['total'] = $total;


		if($pagina > 1){
			$this->_paginacion['primero'] = 1;
			$this->_paginacion['anterior'] = $pagina - 1;
		} else {
			$this->_paginacion['primero'] = '';
			$this->_paginacion['anterior'] = '';
		}

		if($pagina < $total){
			$this->_paginacion['ultimo'] = $total;
			$this->_paginacion['siguiente'] = $pagina + 1;
		} else {
			$this->_paginacion['ultimo'] = '';
			$this->_paginacion['siguiente'] = '';
		}

		$total_paginas = $this->_paginacion['total'];
		$pagina_seleccionada = $this->_paginacion['actual'];
		$rango = ceil(LIMIT_PAGEVIEW / 2);
		
		if($pagina_seleccionada < $rango){
			$rango_derecho = LIMIT_PAGEVIEW;
		} else {
			$rango_derecho = $pagina_seleccionada + $rango;
		}

		if ($total_paginas<LIMIT_PAGEVIEW) $rango_derecho = $total_paginas;

		$rango_izquierdo = $pagina_seleccionada - ($rango-1);

		if ($rango_izquierdo<=0) $rango_izquierdo=1;

		$paginas = range($rango_izquierdo,$rango_derecho);
		$this->_paginacion['rango'] = $paginas;
		return $result;
	}
}
?>
