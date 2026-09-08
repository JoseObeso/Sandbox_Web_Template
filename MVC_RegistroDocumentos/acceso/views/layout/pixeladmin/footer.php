</div>
<div id="main-menu-bg"></div>
</div>
<script src="<?= $_layoutParams["ruta_js"]; ?>jquery.min.js"></script>
<script src="<?= $_layoutParams["ruta_js"]; ?>bootstrap.min.js"></script>
<script src="<?= $_layoutParams["ruta_js"]; ?>pixel-admin.min.js"></script>
<script src="<?= $_layoutParams['ruta_js']; ?>jsfooter.js"></script>
<?php if (isset($_layoutParams['jsAll']) && count($_layoutParams['jsAll'])) : ?>
	<?php foreach ($_layoutParams['jsAll'] as $layout) : ?>
		<script src="<?= $layout ?>" type="text/javascript"></script>
	<?php endforeach; ?>
<?php endif; ?>
<?php if (isset($_layoutParams['js']) && count($_layoutParams['js'])) : ?>
	<?php foreach ($_layoutParams['js'] as $layout) : ?>
		<script src="<?= $layout ?>" type="text/javascript"></script>
	<?php endforeach; ?>
<?php endif; ?>

<script type="text/javascript">
	init.push(function() {

	});
	window.PixelAdmin.start(init);
</script>

</body>

</html>