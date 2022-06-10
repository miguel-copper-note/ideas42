<?php

/**
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$content_rows = get_field( 'content_rows' );
$content = get_field( 'content' );

?>

<div class="bg-navy relative">
	<?php
		if ( is_front_page() ) {
			echo block_template_part('home-nav') ;
		}
	?>
	<div class="bg-white bg-hero bg-no-repeat bg-left-top pt-98 pb-35 pl-60 max-w-360 mx-auto">
		<div class="px-8">
			<ul class="text-rows">
				<?php foreach ( $content_rows as $row ) : ?>
					<li>
						<?php if ( ! empty( $row['text_1'] ) ) : ?>
							<span><?php echo $row['text_1']; ?></span>
						<?php endif; ?>

						<?php if ( ! empty( $row['rotating_text_1'] ) && ! empty( $row['rotating_text_1'][0]['text'] ) ) : ?>
							<span class="rotating-text">
								<?php foreach ( $row['rotating_text_1'] as $item ) : ?>
									<span><?php echo $item['text']; ?></span>
								<?php endforeach; ?>
							</span>
						<?php endif; ?>

						<?php if ( ! empty( $row['text_2'] ) ) : ?>
							<span><?php echo $row['text_2']; ?></span>
						<?php endif; ?>

						<?php if ( ! empty( $row['rotating_text_2'] ) && ! empty( $row['rotating_text_2'][0]['text'] ) ) : ?>
							<span class="rotating-text">
								<?php foreach ( $row['rotating_text_2'] as $item ) : ?>
									<span><?php echo $item['text']; ?></span>
								<?php endforeach; ?>
							</span>
						<?php endif; ?>

						<?php if ( ! empty( $row['text_3'] ) ) : ?>
							<span><?php echo $row['text_3']; ?></span>
						<?php endif; ?>
					</li>
				<?php endforeach; ?>
			</ul>

			<div class="flex items-end font-permanent-marker text-white text-[25px] max-w-184">
				<?php echo $content; ?>
				<div class="down-arrow bg-no-repeat bg-contain w-5 h-7 flex-none ml-2 mb-1 animate-bounce"></div>
			</div>
		</div>
	</div>
</div>
