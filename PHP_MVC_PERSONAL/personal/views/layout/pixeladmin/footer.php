</div> 
	<div id="main-menu-bg"></div>
</div>

<script src="<?= $_layoutParams["ruta_js"];?>jquery.min.js"></script>

<script src="jquery.transit.js"></script>
<script src="<?= $_layoutParams["ruta_js"];?>bootstrap.min.js"></script>
<script src="<?= $_layoutParams["ruta_js"];?>pixel-admin.min.js"></script>
<script src="<?= $_layoutParams['ruta_js'];?>demo.js"></script>
<script src="<?= $_layoutParams['ruta_js'];?>bootbox.min.js"></script> 
<script src="<?= $_layoutParams["ruta_js"];?>bootstrap.min.js"></script>
<script src="<?= $_layoutParams['ruta_js'];?>demo.js"></script> 
<script src="<?= $_layoutParams['ruta_js'];?>moment.js"></script> 




<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>datatables.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>dataTables.buttons.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>buttons.flash.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>jszip.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>pdfmake.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>vfs_fonts.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>buttons.html5.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>buttons.print.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>sweetalert.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>select2.min.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>multiple-select.js"></script>

 



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


