<!DOCTYPE html>
<html class="gt-ie8 gt-ie9 not-ie">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>
        <?php echo $this->titulo; ?>
    </title>
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
    <link href="<?= $_layoutParams['ruta_css'];?>jquery.dataTables.min.css" rel="stylesheet" type="text/css">
    <link href="<?=RUTA_PUBLIC_CSS;?>buttons.dataTables.min.css" rel="stylesheet" type="text/css">
    <link href="<?=RUTA_PUBLIC_CSS;?>datatables.min.css" rel="stylesheet" type="text/css">
    <link href="<?=RUTA_PUBLIC_CSS;?>sweetalert.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>datatables.min.js"></script>
    <?php if(isset($_layoutParams['cssPublic']) && count($_layoutParams['cssPublic'])): ?>
    <?php foreach($_layoutParams['cssPublic'] as $layout): ?>
    <link href="<?= $layout ?>" rel="stylesheet"/>
    <link href="css/nuevo_stylos.css" rel="stylesheet" type="text/css">
    <?php endforeach; ?>
    <?php endif; ?>
</head>
<body class="<?= $this->plantilla_modulo ?> main-menu-animated page-pricing main-navbar-fixed main-menu-fixed">
    <script>
        var init = [];
    </script>
    <div id="main-wrapper">
        <div id="main-navbar" class="navbar navbar-inverse" role="navigation">
            <button type="button" id="main-menu-toggle"><i class="navbar-icon fa fa-bars icon"></i><span class="hide-menu-text">OCULTAR MENU</span></button>
            <div class="navbar-inner">
                <div class="navbar-header">
                    <a href="<?= BASE_URL.'inicio'?>" class="navbar-brand">SOPORTE</a>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar-collapse"><i class="navbar-icon fa fa-bars"></i></button>
                </div>
                <div id="main-navbar-collapse" class="collapse navbar-collapse main-navbar-collapse">
                    <div>
                        <div class="right clearfix">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="main-menu" role="navigation">
            <div id="main-menu-inner">
                <ul class="navigation">
                    <?php
                    $ultimo_menu = false;
                    $ok = false;
                    while ( $imprimir = $this->listarmenuysubmenu->fetch( PDO::FETCH_OBJ ) ) {
                        if ( $imprimir->NOMBRE_MENU != $ultimo_menu && $imprimir->ESTADO_MENU != '0' ) {
                            if ( $ok )echo "</ul></li>";
                            if ( $imprimir->NOMBRE_SUBMENU ) {
                                echo '<li class="mm-dropdown"><a href="#" >' . $imprimir->ICONO_MENU . ' <span class="mm-text">' . trim( $imprimir->NOMBRE_MENU ) . '</span></a><ul>';
                                $ok = true;
                            } else {
                                echo '<li><a href="' . BASE_URL . $imprimir->URL_MENU . '" >' . $imprimir->ICONO_MENU . ' <span class="mm-text">' . trim( $imprimir->NOMBRE_MENU ) . '</span></a></li>';
                                $ok = false;
                            }
                            $ultimo_menu = $imprimir->NOMBRE_MENU;
                        }
                        if ( $imprimir->NOMBRE_SUBMENU != null && $imprimir->ESTADO_SUBMENU != '0' && $imprimir->ESTADO_MENU != '0' ) {
                            echo '<li><a href="' . BASE_URL . $imprimir->URL_SUBMENU . '">' . $imprimir->ICONO_SUBMENU . trim( $imprimir->NOMBRE_SUBMENU ) . '</a></li>';
                        }
                    }
                    echo "</ul></li>";
                    ?>
                </ul>
                <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#acceso_modulo"><i class="fa fa-sitemap"></i>&nbsp;Acceso Modulos</a></h4>
                        </div>
                        <div id="acceso_modulo" class="panel-collapse collapse">
                            <div class="panel-body">
                                <?php $modulos = json_decode($this->listar_modulos) ?>
                                <?php foreach($modulos as $modulo):?>
                                <li><a href="<?= $modulo->url ?>">&#8250;&nbsp; <?= $modulo->nombre ?></a>
                                </li>
                                <?php endforeach;?>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#identificacion_usuarios"><span class="glyphicon glyphicon-pushpin"></span> Usuarios</a></h4>
                        </div>
                        <div id="identificacion_usuarios" class="panel-collapse collapse">
                            <div class="panel-body">
                                <a href="#" class=""><img src="<?= RUTA_PUBLIC_PERFIL.$_SESSION["usuario"]["foto"]  ?>" alt="" width="15" height="15"> <span><?= $_SESSION["usuario"]["nombres"] ?></span></a>
                                <hr>
                                <a href="<?= SERVIDOR ?>control/salir/"><i class="fa fa-power-off"></i>&nbsp;&nbsp;Salir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="content-wrapper">