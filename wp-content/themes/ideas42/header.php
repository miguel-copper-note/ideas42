<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and the beginning of <body>
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Fora
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="theme-color" content="#F9F6EF">

	<?php wp_head(); ?>
</head>

<body x-data="{ mobileNavOpen: false }" :class="{ 'overflow-hidden': mobileNavOpen }" <?php body_class( 'cambio' ); ?>>

<?php wp_body_open(); ?>

<?php get_template_part( 'template-parts/header' ); ?>
<?php get_template_part( 'template-parts/svg-sprite' ); ?>
