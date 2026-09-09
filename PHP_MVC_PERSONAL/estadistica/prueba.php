<?php 

// "Definición" de la base de datos 
$def = array( 
  array("date",     "D"), 
  array("name",     "C",  50), 
  array("age",      "N",   3, 0), 
  array("email",    "C", 128), 
  array("ismember", "L") 
); 

// creación 
if (!dbase_create('prueba_resultado.dbf', $def)) { 
  echo "Error, no se puede crear la base de datos\n"; 
} 
$db = dbase_open('prueba_resultado.dbf', 2); 

if ($db) { 
  dbase_add_record($db, array( 
      date('d/m/YYYY'),  
      'Maxim Topolov',  
      '23',  
      'max@example.com', 
      'T'));    
  dbase_close($db); 
} 



?>