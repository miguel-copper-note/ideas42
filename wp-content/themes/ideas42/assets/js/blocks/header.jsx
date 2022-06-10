const { InnerBlocks } = wp.editor;
const { registerBlockType }  = wp.blocks;
// const { Fragment } = wp.element;
const { useBlockProps, RichText } = wp.blockEditor;
const {
	Button,
	PanelBody,
} = wp.components;
const {
	InspectorControls,
} = wp.editor;

const { TextControl } = wp.components;
const { useState } = wp.element;


registerBlockType( 'nclud/header-rotating-text', {
	title: 'Header Rotating Text',
	description: '',
	category: 'theme',
	icon: 'layout',
	attributes: {
		items: {
			type: 'array',
			default: ['Test']
		}
	},

	edit( props ) {
		const {
            attributes: { items },
            setAttributes,
            className,
        } = props;

		const blockProps = useBlockProps();
		const onChangeItems = ( newItems ) => {
            setAttributes( { items: newItems } );
        };

		const itemFields = items.map((item, i) => <TextControl
			label={ `Item ${i}` }
			value={ item }
			onChange={ onChangeItems }
		/>);

		return (
			<>
				<InspectorControls>
					<PanelBody title='Items'>
						
						<Button
							isDefault
							onClick={ () => {} }
						>
							Add Item
						</Button>
					</PanelBody>
				</InspectorControls>,
				<span>{ items ? items[0] : '' }</span>
			</>
		);
	},

	save( props ) {
		const blockProps = useBlockProps.save();
		return props.attributes.items;
	}
} );

registerBlockType( 'nclud/header', {
	title: 'Header',
	description: '',
	category: 'theme',
	icon: 'layout',
	attributes: {
        content: {
            type: 'string',
            source: 'attribute',
            selector: 'p',
        },
    },

	edit( props ) {
		const {
            attributes: { content },
            setAttributes,
            className,
        } = props;
        const blockProps = useBlockProps();
		const onChangeContent = ( newContent ) => {
            setAttributes( { content: newContent } );
        };

		return(
			<div class="bg-navy" { ...blockProps }>
				<div class="bg-white bg-hero bg-no-repeat bg-left-top pt-98 pb-35 pl-60 max-w-360 mx-auto">
					<div class="px-8">
						<InnerBlocks
							allowedBlocks={ 'core/list' }
							template={[
								[ 'core/list', { className: 'text-rows', placeholder: 'Enter side content...' } ],
							]}
							templateLock="all"
						/>
						<div class="flex items-end font-permanent-marker text-white text-[25px] max-w-184">
							<RichText
								tagName="p"
								placeholder="Content goes here"
								onChange={ onChangeContent }
								value={ content }
							/>
							<div class="down-arrow bg-no-repeat bg-contain w-5 h-7 flex-none ml-2 mb-1 animate-bounce"></div>
						</div>
					</div>
				</div>
			</div>
		);
	},

	save( props ) {
		const blockProps = useBlockProps.save();
        return (
			<div class="bg-navy" { ...blockProps }>
				<div class="bg-white bg-hero bg-no-repeat bg-left-top pt-98 pb-35 pl-60 max-w-360 mx-auto">
					<div class="px-8">
						<InnerBlocks.Content />
						<div class="flex items-end font-permanent-marker text-white text-[25px] max-w-184">
							<RichText.Content
								tagName="p"
								value={ props.attributes.content }
							/>
							<div class="down-arrow bg-no-repeat bg-contain w-5 h-7 flex-none ml-2 mb-1 animate-bounce"></div>
						</div>
					</div>
				</div>
			</div>
        );
	},
} );
