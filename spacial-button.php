<?php
/**
 * Plugin Name:       Spacial Button
 * Description:       A block that fills an available area and contains a button that will follow the cursor while hovering over the area
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Harrison Jude
 * Text Domain:       spacial-button
 *
 * @package SpcBtn
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function spc_btn_spacial_button_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'spc_btn_spacial_button_block_init' );
