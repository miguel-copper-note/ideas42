<?php


add_action( 'wp_enqueue_scripts', 'ideas42_scripts', 9999 );
add_action( 'after_setup_theme', 'ideas42_support' );
add_action( 'after_setup_theme', 'register_menus' );

add_filter( 'script_loader_tag', 'ideas42_add_asyncdefer_attribute', 10, 2 );
// add_filter( 'style_loader_tag', 'ideas42_preload_filter', 10, 2 );


/**
 * Get version number for asset file based on WordPress environment.
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
	wp_register_style( 'preload-ideas42-fonts', get_template_directory_uri() . '/assets/dist/css/fonts.css', '', ideas42_asset_version( get_template_directory() . '/assets/dist/css/fonts.css' ) );
	wp_register_style( 'ideas42-site', get_template_directory_uri() . '/assets/dist/css/app.css', '', ideas42_asset_version( get_template_directory() . '/assets/dist/css/app.css' ) );

	wp_enqueue_style( 'preload-ideas42-fonts' );
	wp_enqueue_style( 'ideas42-site' );

	wp_register_script( 'alpinejs-collapse-defer', 'https://unpkg.com/@alpinejs/collapse@3.10.2/dist/cdn.min.js', null, true ); // phpcs:ignore
	wp_register_script( 'alpinejs-defer', 'https://unpkg.com/alpinejs@3.10.2/dist/cdn.min.js', null, true ); // phpcs:ignore
	wp_register_script( 'app-defer', get_template_directory_uri() . '/assets/dist/js/app.js', null, true ); // phpcs:ignore

	wp_enqueue_script( 'alpinejs-collapse-defer' );
	wp_enqueue_script( 'alpinejs-defer' );
	wp_enqueue_script( 'app-defer' );
}

/**
 * Add defer/async attribute to script
 *
 * @param string $tag The <script> tag for the enqueued script.
 * @param string $handle The script's registered handle.
 * @return string
 */
function ideas42_add_asyncdefer_attribute( $tag, $handle ) {
	// if the unique handle/name of the registered script has 'async' in it.
	if ( strpos( $handle, 'async' ) !== false ) {
		// return the tag with the async attribute.
		return str_replace( '<script ', '<script async ', $tag );
	} elseif ( strpos( $handle, 'defer' ) !== false ) {
		// return the tag with the defer attribute.
		return str_replace( '<script ', '<script defer ', $tag );
	} else {
		return $tag;
	}
}

/**
 * Filter to add preload on style enqueue
 *
 * @param string $html The link tag for the enqueued style.
 * @param string $handle The style's registered handle.
 * @return string
 */
function ideas42_preload_filter( $html, $handle ) {
	if ( strpos( $handle, 'preload' ) !== false ) {
		$html = str_replace( "rel='stylesheet'", "rel='preload' as='style' onload=\"this.rel='stylesheet'\"", $html );
	}
	return $html;
}


function ideas42_support() {
		// Add support for block styles.
		// add_theme_support( 'wp-block-styles' );

		// Enqueue editor styles.
		// add_editor_style( 'style.css' );
    add_theme_support( 'block-templates' );
    add_theme_support( 'menus' );
    add_theme_support( 'custom-logo' );

	}

function register_menus() {
	register_nav_menu( 'primary', __( 'Primary Menu', 'ideas42' ) );
}
