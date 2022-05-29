<?php


/**
 * Wordpress actions.
 */
add_action( 'wp_enqueue_scripts', 'ideas42_scripts' );


/**
 * Get version number for asset file based on WordPress environment
 *
 * @param string $path Path of the CSS or JS asset.
 * @return string
 */
function ideas42_asset_version( $path ) {
	// return modified time for local assets.
	if ( wp_get_environment_type() === 'local' && file_exists( $path ) ) {
		return filemtime( $path );
	}

	// return theme's version number.
	return wp_get_theme()->get( 'Version' );
}

/**
 * Enqueue scripts and styles.
 */
function ideas42_scripts() {
	// styles.
	wp_register_style( 'ideas42-site', get_template_directory_uri() . '/assets/dist/css/app.css', '', ideas42_asset_version( get_template_directory() . '/assets/dist/css/app.css' ) );

	wp_enqueue_style( 'ideas42-site' );

	wp_register_script( 'alpinejs-collapse-defer', 'https://unpkg.com/@alpinejs/collapse@3.10.2/dist/cdn.min.js', null, true ); // phpcs:ignore
	wp_register_script( 'alpinejs-defer', 'https://unpkg.com/alpinejs@3.10.2/dist/cdn.min.js', null, true ); // phpcs:ignore

	wp_enqueue_script( 'alpinejs-collapse-defer' );
	wp_enqueue_script( 'alpinejs-defer' );
}

