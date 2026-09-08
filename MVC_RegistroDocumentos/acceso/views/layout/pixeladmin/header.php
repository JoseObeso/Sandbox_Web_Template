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


    <?php if (isset($_layoutParams['cssPublic']) && count($_layoutParams['cssPublic'])) : ?>
        <?php foreach ($_layoutParams['cssPublic'] as $layout) : ?>
            <link href="<?= $layout ?>" rel="stylesheet" />
        <?php endforeach; ?>
    <?php endif; ?>
</head>

<body class="theme-adminflare main-menu-animated page-pricing main-navbar-fixed main-menu-fixed">
    <div id="main-wrapper">
        <div id="main-navbar" class="navbar navbar-inverse" role="navigation">
            <div class="navbar-inner">
                <div class="navbar-header bg-primary">
                    <a href="#" class="navbar-brand">
                        <font color="#ffffff">APLICATIVOS</font>
                    </a>
                </div>
                <div id="main-navbar-collapse" class="collapse navbar-collapse main-navbar-collapse bg-primary">
                    <div>
                        <div class="col-md-2"> <span class="text-center">
                                <font color="#ffffff">Usuario :</font>
                            </span> <?php session_start();
                                    echo  '<br><strong><font color="#ffffff">' . $_SESSION["usuario"]["actor"] . ' - ' . $_SESSION["usuario"]["nombreusuario"] . '</font></strong>';   ?></div>
                        <div class="col-md-2"><span class="text-center">
                                <font color="#ffffff">Nombres : </font>
                            </span> <?php session_start();
                                    echo  '<br><strong><font color="#ffffff">' . $_SESSION["usuario"]["apellidos_nombres"] . '</font></strong>'; ?> </div>
                        <div class="col-md-4"><span class="text-center">
                                <font color="#ffffff">Oficina : </font>
                            </span><?php session_start();
                                    echo  '<br><strong><font color="#ffffff">' . utf8_decode($_SESSION["usuario"]["abreviatura"]) . '</font></strong>';  ?> </div>
                        <div class="col-md-1">
                            <div class="form-group"></div>
                            <span id="mostrarfecha"></span>
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



        <div id="content-wrapper">