<?php
defined('DSN_W_TEMPUS') or define('DSN_W_TEMPUS', "odbc:Driver={SQL Server};Server=PUSAQ;Database=TEMPUS;Uid=TEMPUS;Pwd=TEMPUS;" );

  try {
      $cnx_tempus = new PDO(DSN_W_TEMPUS);
      $cnx_tempus->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e) {
    };

?>
