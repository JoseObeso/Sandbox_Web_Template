</div>  
	<div id="main-menu-bg"></div>
</div> 
<script src="<?=$_layoutParams["ruta_js"];?>jquery.min.js"></script>
<script src="jquery.transit.js"></script>

<script src="<?= $_layoutParams['ruta_js'];?>bootbox.min.js"></script> 
<script src="<?= $_layoutParams["ruta_js"];?>bootstrap.min.js"></script>
<script src="<?= $_layoutParams["ruta_js"];?>pixel-admin.min.js"></script>
<script src="<?= $_layoutParams['ruta_js'];?>demo.js"></script> 
<script src="<?= $_layoutParams['ruta_js'];?>moment.js"></script> 
<script src="<?= $_layoutParams['ruta_js'];?>sweetalert.min.js"></script> 
<script src="<?= $_layoutParams['ruta_js'];?>sweetalert.js"></script>
<script src="<?= $_layoutParams['ruta_js'];?>cssrefresh.js"></script>
<script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>datatables.min.js"></script>
 <script type="text/javascript" src="<?=RUTA_PUBLIC_JS;?>dataTables.scroller.min.js"></script>


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

