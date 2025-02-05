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

	$styles = [
		'--borderColor:'.$attributes['borderColor'].'; '
	];

	

	if($attributes['useFeaturedImage']){
		$post_id = get_the_ID();
		$featured_image_url = get_the_post_thumbnail_url($post_id, 'full');
		$styles[] = "background-image:url(".$featured_image_url.") !important ;";
	}

	$style = " ".join($styles);
	

	

	$wrapper_attributes = get_block_wrapper_attributes([
		'href' => $url,
		'target' => 'blank',
		'style' => $style,
		'class' => $positioning
	]);
?>



<a <?php echo $wrapper_attributes; ?> >
	<span class="wp-block-spc-btn-inner-container">
		<?php echo $content ?>
	</span>
</a>
