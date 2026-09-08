<!DOCTYPE html>
<html class="gt-ie8 gt-ie9 not-ie">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>
        <?php echo $this->titulo; ?>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="shortcut icon" href="<?= $_layoutParams['ruta_img']; ?>favicon.ico" type="image/x-icon">
    <link href="<?= $_layoutParams['ruta_css']; ?>bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>jquery.dataTables.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>widgets.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>pages.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>rtl.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>themes.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>pixel-admin.min.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>mystyle.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css']; ?>select2.min.css" rel="stylesheet" type="text/css">
    <?php if (isset($_layoutParams['cssPublic']) && count($_layoutParams['cssPublic'])) : ?>
        <?php foreach ($_layoutParams['cssPublic'] as $layout) : ?>
            <link href="<?= $layout ?>" rel="stylesheet" />
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
                    <a href="<?= BASE_URL . 'inicio' ?>" class="navbar-brand">USUARIOS</a>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar-collapse"><i class="navbar-icon fa fa-bars"></i></button>
                </div>
                <div id="main-navbar-collapse" class="collapse navbar-collapse main-navbar-collapse">
                    <div>
                        
                    <div class="col-md-2"> <span class="text-center">
                                <font color="#ffffff">Usuario :</font>
                            </span> <?php session_start();
                                    echo  '<br><strong><font color="#ffffff">' . $_SESSION["usuario"]["actor"] . ' - ' . $_SESSION["usuario"]["nombreusuario"] . '</font></strong>';   ?></div>
                        <div class="col-md-2"><span class="text-center">
                                <font color="#ffffff">Nombres : </font>
                            </span> <?php session_start();
                                    echo  '<br><strong><font color="#ffffff">' . $_SESSION["usuario"]["apellidos_nombres"] . '</font></strong>'; ?> </div>
                        <div class="col-md-3"><span class="text-center">
                                <font color="#ffffff">Oficina : </font>
                            </span><?php session_start();
                                    echo  '<br><strong><font color="#ffffff">' .  utf8_decode($_SESSION["usuario"]["abreviatura"])  . '</font></strong>';  ?> </div>
                        <div class="col-md-3">
                            <div class="form-group"></div>
                            
                        </div>
                        <div class="col-md-1">
                            
                            <a href="<?= SERVIDOR ?>acceso/salir/">
                                <font color="#ffffff"><i class="dropdown-icon fa fa-power-off"></i>&nbsp;&nbsp;SALIR</font>
                            </a>
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
                    while ($imprimir = $this->listarmenuysubmenu->fetch(PDO::FETCH_OBJ)) {
                        if ($imprimir->NOMBRE_MENU != $ultimo_menu && $imprimir->ESTADO_MENU != '0') {
                            if ($ok) echo "</ul></li>";
                            if ($imprimir->NOMBRE_SUBMENU) {
                                echo '<li class="mm-dropdown"><a href="#" >' . $imprimir->ICONO_MENU . ' <span class="mm-text">' . trim($imprimir->NOMBRE_MENU) . '</span></a><ul>';
                                $ok = true;
                            } else {
                                echo '<li><a href="' . BASE_URL . $imprimir->URL_MENU . '" >' . $imprimir->ICONO_MENU . ' <span class="mm-text">' . trim($imprimir->NOMBRE_MENU) . '</span></a></li>';
                                $ok = false;
                            }
                            $ultimo_menu = $imprimir->NOMBRE_MENU;
                        }
                        if ($imprimir->NOMBRE_SUBMENU != null && $imprimir->ESTADO_SUBMENU != '0' && $imprimir->ESTADO_MENU != '0') {
                            echo '<li><a href="' . BASE_URL . $imprimir->URL_SUBMENU . '">' . $imprimir->ICONO_SUBMENU . trim($imprimir->NOMBRE_SUBMENU) . '</a></li>';
                        }
                    }

                    ?>

                    <hr>

                    <li class="mm-dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-sitemap"></i> Aplicativos</a>
                        <ul class="dropdown">
                            <?php $modulos = json_decode($this->listar_modulos) ?>
                            <?php foreach ($modulos as $modulo) : ?>
                                <li><a href="<?= $modulo->url ?>">&#8250;&nbsp; <?= $modulo->nombre ?></a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </li>


                    <li class="mm-dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="<?= RUTA_PUBLIC_PERFIL . $_SESSION["usuario"]["foto"]  ?>" alt="" width="15" height="15"> <span><?= $_SESSION["usuario"]["apellidos_nombres"] ?></span></a>

                        <ul class="dropdown">
                            <li><a class="puntero btn-abrir-modal-cambiar-clave"><i class="fa fa-lock"></i>&nbsp;&nbsp;Cambiar clave</a>
                            </li>
                            <li class="divider"></li>
                            <li><a href="<?= SERVIDOR ?>acceso/salir/"><i class="dropdown-icon fa fa-power-off"></i>&nbsp;&nbsp;Salir</a>
                            </li>
                        </ul>
                    </li>


                </ul>

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
                                <span class="form-control  box-cell p-x-3 p-y-1  darken" style="background: #DEF0FC;"><strong>Ingrese Clave Antigua : </strong></span>
                            </div>
                            <div class="col-md-6">
                                <input name="clave_antigua" type="password" autofocus="autofocus" required="required" class="form-control bg-color-input-text crear-tooltip color-yellow" id="clave_antigua" requerid title="Ingrese su clave antigua" data-original-title="Ingrese su clave antigua" data-toggle="tooltip">
                            </div>
                            <div class="col-md-2">
                            </div>





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


                        <div class="row">
                            <div class="col-md-4">
                                <span class="form-control box-cell p-x-3 p-y-1  darken" style="background: #DEF0FC;"><strong>Confirme Clave :</strong></span>
                            </div>
                            <div class="col-md-6">
                                <input name="confirmar_clave_nueva" type="password" autofocus="autofocus" required="required" class="form-control bg-color-input-text crear-tooltip color-yellow" id="confirmar_clave_nueva" title="Confirme nueva clave" data-original-title="Ingrese Clave nueva" data-toggle="tooltip">
                            </div>
                            <div class="col-md-2">
                            </div>

                        </div>

                    </div>
                    <div class="modal-footer bg-panel">
                        <div class="col-md-3">


                        </div>

                        <div class="col-md-3">
                            <button type="button" class="btn btn-primary" id="btn_cambiar_clave"><i class="fa fa-save"></i>&nbsp;Guardar</button>


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