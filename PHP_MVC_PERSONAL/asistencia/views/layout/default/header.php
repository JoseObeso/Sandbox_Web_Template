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
    <link href="<?= $_layoutParams['ruta_css'];?>jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css'];?>sweetalert.css" rel="stylesheet" type="text/css">
    <link href="<?= $_layoutParams['ruta_css'];?>datatables.min.css" rel="stylesheet" type="text/css">
    
    <script type="text/javascript" src="<?= RUTA_PUBLIC_JS ?>cssrefresh.js" ></script>

    
   
    <link href="<?= $_layoutParams['ruta_css'];?>jquery.dataTables.min.css" rel="stylesheet" type="text/css">
    
    
    
    
    
    <link href="<?=RUTA_PUBLIC_CSS;?>buttons.dataTables.min.css" rel="stylesheet" type="text/css">
    <link href="<?=RUTA_PUBLIC_CSS;?>datatables.min.css" rel="stylesheet" type="text/css">
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
                    <a href="<?= BASE_URL.'inicio'?>" class="navbar-brand">
                    ASISTENCIA
                </a>
                
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar-collapse"><i class="navbar-icon fa fa-bars"></i></button>
                </div>
                <div id="main-navbar-collapse" class="collapse navbar-collapse main-navbar-collapse">
                    <div>


                        <div class="right clearfix">

                            <ul class="nav navbar-nav pull-right right-navbar-nav ">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-laptop"></i> MODULOS</a>
                                    <ul class="dropdown-menu">
                                        <?php $modulos = json_decode($this->listar_modulos) ?>
                                        <?php foreach($modulos as $modulo):?>
                                        <li><a href="<?= $modulo->url ?>"><?= $modulo->nombre ?></a>
                                        </li>
                                        <?php endforeach;?>
                                    </ul>
                                </li>
                            </ul>




                            <ul class="nav navbar-nav pull-right right-navbar-nav">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle user-menu" data-toggle="dropdown">
                                   <img src="<?= RUTA_PUBLIC_PERFIL.$_SESSION["usuario"]["foto"] ?>" alt="">
                                    <span><?= $_SESSION["usuario"]["nombres"] ?></span>
                                </a>
                                
                                    <ul class="dropdown-menu">
                                        <li><a class="puntero btn-abrir-modal-cambiar-clave"><i class="fa fa-lock"></i>&nbsp;&nbsp;Cambiar clave</a>
                                        </li>
                                        <li class="divider"></li>
                                        <li><a href="<?= SERVIDOR ?>control/salir/"><i class="dropdown-icon fa fa-power-off"></i>&nbsp;&nbsp;Salir</a>
                                        </li>
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
                                        <input name="clave_antigua" type="password" autofocus="autofocus" required="required" class="form-control" id="clave_antigua" form="frm_cambiar_clave" title="Ingrese su clave antigua">
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