import classnames from 'classnames';

const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;

//restrict to specific block names
const allowedBlocks = ['core/paragraph', 'core/heading'];

/**
 * Add custom attribute for Font Family
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
const addFontFamilyAttrs = (settings) => {
  if (
    typeof settings.attributes.fontFamily !== 'undefined' &&
    allowedBlocks.includes(settings.name)
  ) {
    settings.attributes = Object.assign(settings.attributes, {
      fontFamily: {
        type: 'string',
        default: 'text-gibson',
      },
    });
  }
};

/**
 * Add custom element class in save element.
 *
 * @param {Object} props          Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
const applyFontFamilyClass = (props, blockType, attributes) => {
  if (!allowedBlocks.includes(blockType.name)) {
    return props;
  }

  const { fontFamily } = attributes;

  props.className = classnames(props.className, fontFamily);
};

const addFontFamilyClass = (props) => {
  const {
    attributes: { fontFamily },
    className,
    name,
  } = props;

  if (allowedBlocks.includes(name)) {
    props.className = classnames(className, fontFamily);
  }
};

/**
 * Add Font Family controls on Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const FontFamilyBlockEdit = (props) => {
  const { name, attributes, setAttributes, isSelected } = props;

  const { fontFamily } = attributes;

  return (
    <Fragment>
      {isSelected && allowedBlocks.includes(name) && (
        <InspectorControls>
          <PanelBody title='Font Family'>
            <SelectControl
              label='Font Family'
              value={fontFamily}
              options={[
                {
                  label: 'Gibson',
                  value: 'text-gibson',
                },
                {
                  label: 'Helvitica Neue',
                  value: 'text-helvitica',
                },
                {
                  label: 'Permanent Marker',
                  value: 'text-permanent-marker',
                },
              ]}
              onChange={(value) => {
                setAttributes({ fontFamily: value });
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </Fragment>
  );
};

export {
  addFontFamilyAttrs,
  applyFontFamilyClass,
  addFontFamilyClass,
  FontFamilyBlockEdit,
};
