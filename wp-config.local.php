<?php
define( 'WP_SITEURL', 'http://ideas42.test//' );
define( 'WP_HOME', 'http://ideas42.test//' );
define( 'DB_NAME', 'ideas42' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', '127.0.0.1' );

// define( 'DISALLOW_FILE_MODS', true );
if ( isset( $_GET['debug'] ) ) {
	define( 'WP_DEBUG', true );
} else {
	define( 'WP_DEBUG', true );
}

// If WP_DEBUG is true then enable other fun goodies
if ( WP_DEBUG ) {
	define( 'WP_DEBUG_LOG', true );
	define( 'SAVEQUERIES', true );
}