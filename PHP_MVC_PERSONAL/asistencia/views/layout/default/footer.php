</div>  
	<div id="main-menu-bg"></div>
</div> 



<script src="jquery.transit.js"></script>

<script src="<?= $_layoutParams['ruta_js'];?>jquery-3.3.1.min.js"></script> 
<script src="<?= $_layoutParams["ruta_js"];?>bootstrap.min.js"></script>
<script src="<?= $_layoutParams["ruta_js"];?>pixel-admin.min.js"></script>
<script src="<?= $_layoutParams['ruta_js'];?>demo.js"></script> 
<script src="<?= $_layoutParams['ruta_js'];?>jquery-ui.js"></script> 
<script src="<?= $_layoutParams['ruta_js'];?>cssrefresh.js"></script> 
<script src="<?= $_layoutParams['ruta_js'];?>sweetalert.min.js"></script> 
<script src="<?= $_layoutParams['ruta_js'];?>sweetalert.js"></script>
<script src="<?= $_layoutParams['ruta_js'];?>moment.js"></script>
<script src="<?= $_layoutParams['ruta_js'];?>datatables.min.js"></script>


<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>datatables.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>dataTables.buttons.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>buttons.flash.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>jszip.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>pdfmake.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>vfs_fonts.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>buttons.html5.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>buttons.print.min.js"></script>

<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>jquery.table2excel.min.js"></script>









<?php if(isset($_layoutParams['jsAll']) && count($_layoutParams['jsAll'])): ?>
	<?php foreach($_layoutParams['jsAll'] as $layout): ?>
		<script src="<?= $layout ?>" type="text/javascript"></script>
	<?php endforeach; ?>
<?php endif; ?>
<?php if(isset($_layoutParams['js']) && count($_layoutParams['js'])): ?>
	<?php foreach($_layoutParams['js'] as $layout): ?>
		<script src="<?= $layout ?>" type="text/javascript"></script>
	<?php endforeach; ?>
<?php endif; ?>

<script type="text/javascript">
	init.push(function () {
		 
	});
	window.PixelAdmin.start(init);
</script>

</body>
</html>

