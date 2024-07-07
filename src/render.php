<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

	$linkTo = $attributes['linkTo'];
	$url = $attributes['customLink'];

	if($linkTo == 'post'){
		$url = get_permalink();
	}

	$positioning = $attributes['positioning'];


	$wrapper_attributes = get_block_wrapper_attributes([
		'href' => $url,
		'target' => 'blank',
		'style' => '--borderColor:'.$attributes['borderColor'].';',
		'class' => $positioning
	]);
?>



<a <?php echo $wrapper_attributes; ?> >
	<span class="wp-block-spc-btn-inner-container">
		<?php echo $content ?>
	</span>
</a>
