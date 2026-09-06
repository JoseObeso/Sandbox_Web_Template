<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <title>Control de acceso </title>

    <link rel="shortcut icon" href="<?= RUTA_PUBLIC_GRA . 'favicon.ico' ?>" type="image/x-icon">
    <link href="<?= $_layoutParams['ruta_css']; ?>bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>pixel-admin.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>widgets.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>pages.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>rtl.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>themes.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>styleheader.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>lightbox.css" rel="stylesheet" type="text/css">




    <?php if (isset($_layoutParams['cssPublic']) && count($_layoutParams['cssPublic'])) : ?>
        <?php foreach ($_layoutParams['cssPublic'] as $layout) : ?>
            <link href="<?= $layout ?>" rel="stylesheet" />
        <?php endforeach; ?>
    <?php endif; ?>
</head>

<body class="theme-adminflare">
    <div id="main-wrapper">
        <div id="main-navbar" class="navbar navbar-inverse" role="navigation">
            <div class="navbar-inner">
                <div class="navbar-header">
                    <a href="#" class="navbar-brand">
                    </a>
                </div>
                <div id="main-navbar-collapse" class="">
                    <div>
                        <div class="col-md-2"> <span class="text-center">
                                <font color="#ffffff">Usuario :</font>




                            </span> <?php if (session_status() == PHP_SESSION_NONE) {
                                        session_start();
                                        echo  '<br><strong><font color="#ffffff">' . $_SESSION["usuario"]["user"] . '</font></strong>';
                                    } else {
                                        echo  '<br><strong><font color="#ffffff">' . $_SESSION["usuario"]["user"] . '</font></strong>';
                                    }

                                    ?></div>
                        <div class="col-md-2"><span class="text-center">
                                <font color="#ffffff">Nombres : </font>
                            </span> <?php if (session_status() == PHP_SESSION_NONE) {
                                        session_start();
                                        echo  '<br><strong><font color="#ffffff">' . $_SESSION["usuario"]["nombres"] . '</font></strong>';
                                    } else {
                                        echo  '<br><strong><font color="#ffffff">' . $_SESSION["usuario"]["nombres"] . '</font></strong>';
                                    }
                                    ?> </div>
                        <div class="col-md-4"><span class="text-center">
                                <font color="#ffffff">Oficina : </font>
                            </span><?php if (session_status() == PHP_SESSION_NONE) {
                                        session_start();
                                        echo  '<br><strong><font color="#ffffff">' . utf8_decode($_SESSION["usuario"]["modulo"]) . '</font></strong>';
                                    } else {
                                        echo  '<br><strong><font color="#ffffff">' . $_SESSION["usuario"]["modulo"] . '</font></strong>';
                                    }
                                    ?> </div>



                        <div class="col-md-1">
                            <div class="form-group"></div>
                            <a class="puntero btn-abrir-modal-cambiar-clave">
                                <font color="#ffffff"><i class="fa fa-spinner"></i>&nbsp;Cambiar clave</font>
                            </a>
                        </div>
                        <div class="col-md-1">
                            <div class="form-group"></div>
                            <a href="<?= SERVIDOR ?>acceso/salir/">
                                <font color="#ffffff"><i class="dropdown-icon fa fa-power-off"></i>&nbsp;&nbsp;SALIR</font>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div id="modal-cambiar-clave" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-panel">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title text-center">Cambiar Clave / Contraseña</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <span id="mensajes" class="form-control text-center"></span>
                            </div>
                            <div class="form-group"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <span class="form-control  box-cell p-x-3 p-y-1  darken" style="background: #DEF0FC;"><strong>Registre Nueva Clave : </strong></span>
                            </div>
                            <div class="col-md-6">
                                <input name="nueva_clave" type="password" autofocus="autofocus" required="required" class="form-control bg-color-input-text crear-tooltip color-yellow" id="nueva_clave" title="Ingrese nueva clave" data-original-title="Ingrese Clave nueva" data-toggle="tooltip">
                            </div>
                            <div class="col-md-2">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-panel">
                        <div class="col-md-3">
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-primary" disabled id="btn_cambiar_clave"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Cerrar</button>
                        </div>
                        <div class="col-md-3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="content-wrapper">