<?php

add_action( 'enqueue_block_editor_assets', 'ideas42_gutenberg_enqueue_scripts' );
add_action( 'after_setup_theme', 'ideas42_remove_patterns' );
add_action( 'after_setup_theme', 'ideas42_enqueue_block_styles' );

/**
 * Enqueue custom gutenberg blocks scripts and styles for Editor only.
 *
 * @return void
 */
function ideas42_gutenberg_enqueue_scripts() {
	wp_enqueue_style( 'ideas42-site', get_template_directory_uri() . '/assets/dist/css/app.css', '', ideas42_asset_version( get_template_directory() . '/assets/dist/css/app.css' ) );

  wp_enqueue_style( 'ideas42-fonts', get_template_directory_uri() . '/assets/dist/css/fonts.css', '', ideas42_asset_version( get_template_directory() . '/assets/dist/css/fonts.css' ) );

	wp_enqueue_script(
		'ideas42-blocks-scripts',
		get_template_directory_uri() . '/assets/dist/js/blocks.js',
		array(
			'wp-blocks',
			'wp-components',
			'wp-compose',
			'wp-editor',
			'wp-element',
      'wp-hooks',
		),
		ideas42_asset_version( get_template_directory() . '/assets/dist/css/blocks.js' ),
		true
	);

}

function ideas42_remove_patterns() {
   remove_theme_support( 'core-block-patterns' );
}

/**
 * Dynamically enqueue all block styles
 * Docs: https://developer.wordpress.org/reference/functions/wp_enqueue_block_style/
 * Note: This is meant to be ran on the `after_setup_theme` action
 *
 * @return void
 */
function ideas42_enqueue_block_styles() {
	/*
	 * Load additional block styles.
	 */
	$styled_blocks = glob( get_theme_file_path( 'assets/dist/css/blocks/**/*.css' ) );
	$styled_blocks = array_map(
		function( $path ) {
			return str_replace( get_theme_file_path( 'assets/dist/css/blocks/' ), '', $path );
		},
		$styled_blocks
	);

	foreach ( $styled_blocks as $file_path ) {
		$block_name = str_replace( '.css', '', $file_path );
		$args = array(
			'handle' => 'ideas42-block-' . sanitize_title( $block_name ),
			'src'    => get_theme_file_uri( "assets/dist/css/blocks/$file_path" ),
		);
		wp_enqueue_block_style( $block_name, $args );
	}

	wp_enqueue_block_style( 'nclud/header', [ 'handle' => 'ideas42-block-nclud-header', 'src' => get_theme_file_uri( "assets/dist/css/blocks/core/template-part.css" ) ] );
}
