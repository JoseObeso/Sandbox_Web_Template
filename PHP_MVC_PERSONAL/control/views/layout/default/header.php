<!DOCTYPE html>
 <html class="gt-ie8 gt-ie9 not-ie"> 
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Sistema de Monitoreo de RRHH </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="shortcut icon" href="<?= $_layoutParams['ruta_img'];?>favicon.ico" type="image/x-icon">
    <link href="<?= $_layoutParams['ruta_css'];?>bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css'];?>pixel-admin.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css'];?>widgets.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css'];?>pages.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css'];?>rtl.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css'];?>themes.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css'];?>mystyle.css" rel="stylesheet" type="text/css">
	<link href="<?= $_layoutParams['ruta_css'];?>sweetalert.css" rel="stylesheet" type="text/css">
	
    <script type="text/javascript" src="<?= RUTA_PUBLIC_JS ?>cssrefresh.js" ></script>
    <?php if(isset($_layoutParams['cssPublic']) && count($_layoutParams['cssPublic'])): ?>
    <?php foreach($_layoutParams['cssPublic'] as $layout): ?>
         <link href="<?= $layout ?>" rel="stylesheet" />
    <?php endforeach; ?>
    <?php endif; ?>
</head>
     
<body class="theme-adminflare main-menu-animated page-pricing main-navbar-fixed main-menu-fixed">
<script>var init = [];</script>
    
   
    
    
    
<div id="main-wrapper">
    <div id="main-navbar" class="navbar navbar-inverse" role="navigation">
        <button type="button" id="main-menu-toggle"><i class="navbar-icon fa fa-bars icon"></i><span class="hide-menu-text">OCULTAR MENU</span></button>
        
        <div class="navbar-inner">
            <div class="navbar-header">
                <a href="<?php BASE_URL.'inicio'?>" class="navbar-brand">
                     MODULOS
                </a>
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar-collapse"><i class="navbar-icon fa fa-bars"></i></button>
            </div> 

            <div id="main-navbar-collapse" class="collapse navbar-collapse main-navbar-collapse">
                <div>
                    <ul class="nav navbar-nav">
                    </ul> 
                    <div class="right clearfix">
                        <ul class="nav navbar-nav pull-right right-navbar-nav">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle user-menu" data-toggle="dropdown">
                                  <img src=" <?php RUTA_PUBLIC_PERFIL.$_SESSION["usuario"]["foto"] ?>" alt="">
                                    <span><?= nl2br(utf8_encode($_SESSION["usuario"]["nombres"])) ?></span>
                                </a>
                                <ul class="dropdown-menu">
                                	<li><a class="puntero btn-abrir-modal-cambiar-clave"><i class="fa fa-lock"></i>&nbsp;&nbsp;Cambiar clave</a></li>
                                    <li class="divider"></li>
                                    <li><a href="<?php BASE_URL ?>salir/"><i class="dropdown-icon fa fa-power-off"></i>&nbsp;&nbsp;Salir</a></li>
                                </ul>
                            </li>
                        </ul>  
                    </div>  
                </div>
            </div> 
        </div> 
    </div> 
  
 
    <div id="main-menu" role="navigation">
        <div id="main-menu-inner">
            <div class="menu-content top" id="menu-content-demo">
 
                <div>
                    <?php
                     $nombre = explode(" ",ucwords(strtolower($_SESSION["usuario"]["nombre"])),2);
                     if(isset($nombre[1]) && $nombre[1]!=''){
                        $segundo_nombre = substr($nombre[1], 0,1).".";
                     }else{
                        $segundo_nombre = '';
                     }                     
                    ?>
                    <div class="text-bg"><span class="text-slim"> </span></div>
                   
                    <div class="btn-group" style="color:#fff;" >
                        
                    </div>
                </div>
            </div>
        </div>
    </div> 

    <div id="modal-validar-cuenta" class="modal modal-blur" tabindex="-1" role="dialog" style="display: none;">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">Su session ha expirado:</h4>
                </div>
                <div class="modal-body">
                    <form class="form-inline" id="frm-validar-cuenta">
                        <div class="form-group">
                            <label class="sr-only" for="clave">Clave:</label>
                            <input type="hidden" class="form-control" id="dni" name="dni" value="<?= $_SESSION["dni"] ?>">
                            <input type="password" class="form-control" id="clave" name="clave" placeholder="Ingresar su clave">
                        </div>
                        <button type="submit" class="btn btn-primary crear-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="click para validar su cuenta.">Ok</button>
                    </form>
                </div> 
                <div class="modal-footer">
                    <a href="<?= BASE_URL ?>"><button type="button" class="btn btn-primary">Ingresar con otra cuenta.</button></a>
                </div>
            </div> 
        </div> 
    </div> 
    
 
    
    <div id="modal-cambiar-clave" class="modal" role="dialog" style="display: none;">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel"><i class="fa fa-lock"></i>&nbsp; Cambiar mi clave:</h4>
                </div>
                <form action="" class="form-horizontal" id="frm_cambiar_clave">
                <input type="hidden" id="emergencia_id" name="emergencia_id">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="mensajes">  
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group no-margin-hr">
                                <label class="control-label puntero" for="clave_antigua">Clave antigua:</label>
                                <input type="password" id="clave_antigua" name="clave_antigua" class="form-control">
                            </div>
                        </div>                                     
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group no-margin-hr">
                                <label class="control-label puntero" for="nueva_clave">Clave nueva:</label>
                                <input type="password" id="nueva_clave" name="nueva_clave" class="form-control">
                            </div>
                        </div>                                     
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group no-margin-hr">
                                <label class="control-label puntero" for="confirmar_clave_nueva">Confirmar clave nueva:</label>
                                <input type="password" id="confirmar_clave_nueva" name="confirmar_clave_nueva" class="form-control">
                            </div>
                        </div>                                     
                    </div>                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn_cambiar_mi_clave"><i class="fa fa-save"></i>&nbsp;Guardar</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Cerrar</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div id="content-wrapper">