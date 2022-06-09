<?php

add_action( 'enqueue_block_editor_assets', 'ideas42_gutenberg_enqueue_scripts' );
add_action( 'after_setup_theme', 'ideas42_remove_patterns' );

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
