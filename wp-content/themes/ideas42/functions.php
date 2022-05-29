<?php

define( 'IDEAS42_PATH', get_template_directory() . '/' );
define( 'IDEAS42_FUNCTIONS', IDEAS42_PATH . 'includes/' );

foreach ( glob( IDEAS42_FUNCTIONS . '*.php' ) as $filename ) {
	require_once $filename;
}
