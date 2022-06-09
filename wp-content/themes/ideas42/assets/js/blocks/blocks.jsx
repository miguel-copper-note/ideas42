/**
 * External Dependencies
 */
import "./container";
import "./header";
import "./spacer";
import {
  addFontFamilyAttrs,
  applyFontFamilyClass,
  addFontFamilyClass,
  FontFamilyBlockEdit,
} from "./fontFamily";

import {
  addLayouts,
  applyLayoutsStyles,
  addLayoutClass,
  LayoutBlockEdit,
} from "./layout";

/**
 * WordPress Dependencies
 */
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;

/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes(settings) {
  addFontFamilyAttrs(settings);
  addLayouts(settings);
  console.log(settings);
  return settings;
}

/**
 * Add custom controls on Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withInspectorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    return (
      <Fragment>
        <BlockEdit {...props} />
        <FontFamilyBlockEdit {...props} />
        <LayoutBlockEdit {...props} />
      </Fragment>
    );
  };
}, "withInspectorControl");

/**
 * Add custom element class in save element.
 *
 * @param {Object} props     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
function applyExtraClass(props, blockType, attributes) {
  applyFontFamilyClass(props, blockType, attributes);
  applyLayoutsStyles(props, blockType, attributes);
  return props;
}

/**
 * Add size class to the block in the editor
 */
const addExtraClass = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    addFontFamilyClass(props);
    addLayoutClass(props);
    return <BlockListBlock {...props} wrapperProps={props} />;
  };
}, "withMyWrapperProp");

//add filters
addFilter("blocks.registerBlockType", "nclud/custom-attributes", addAttributes);

addFilter(
  "editor.BlockEdit",
  "nclud/custom-advanced-control",
  withInspectorControl
);

addFilter("editor.BlockListBlock", "nclud/add-extra-class", addExtraClass);

addFilter(
  "blocks.getSaveContent.extraProps",
  "nclud/apply-extra-class",
  applyExtraClass
);
