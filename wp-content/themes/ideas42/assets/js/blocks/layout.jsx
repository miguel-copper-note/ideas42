import classnames from "classnames";

const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const {
  Panel,
  __experimentalToolsPanel: ToolsPanel,
  __experimentalToolsPanelItem: ToolsPanelItem,
  __experimentalUnitControl: UnitControl,
} = wp.components;

//restrict to specific block names
const allowedBlocks = ["core/group", "core/column", "core/columns"];

/**
 * Add custom attribute for Font Family
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
const addLayouts = (settings) => {
  if (allowedBlocks.includes(settings.name)) {
    settings.attributes = Object.assign(settings.attributes, {
      width: {
        type: "string",
        default: "",
      },
      height: {
        type: "string",
        default: "",
      },
      maxWidth: {
        type: "string",
        default: "",
      },
      rowGap: {
        type: "string",
        default: "",
      },
      columnGap: {
        type: "string",
        default: "",
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
const applyLayoutsStyles = (props, blockType, attributes) => {
  if (!allowedBlocks.includes(blockType.name)) {
    return props;
  }

  const { width, height, maxWidth, rowGap, columnGap } = attributes;
  props.style = props.style = {
    ...props.style,
    ...{
      width,
      height,
      maxWidth,
      rowGap,
      columnGap,
    },
  };
};

const addLayoutClass = (props) => {
  const {
    attributes: { width, height, maxWidth, rowGap, columnGap },
    name,
  } = props;

  if (allowedBlocks.includes(name)) {
    props.style = {
      ...props.style,
      ...{
        width,
        height,
        maxWidth,
        rowGap,
        columnGap,
      },
    };
  }
};

/**
 * Add Font Family controls on Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const LayoutBlockEdit = (props) => {
  const { name, attributes, setAttributes, isSelected } = props;

  const { width, height, maxWidth, rowGap, columnGap } = attributes;

  const resetAll = () => {
    setAttributes({ width: undefined, height: undefined, maxWidth: undefined });
  };

  return (
    <Fragment>
      {isSelected && allowedBlocks.includes(name) && (
        <InspectorControls>
          <Panel title="Font Family">
            <ToolsPanel label="Layout Size" resetAll={resetAll}>
              <ToolsPanelItem
                hasValue={() => !!width}
                label="Width"
                onDeselect={() => setAttributes({ width: undefined })}
                isShownByDefault={true}
              >
                <UnitControl
                  label="Width"
                  value={width}
                  onChange={(next) => setAttributes({ width: next })}
                />
              </ToolsPanelItem>
              <ToolsPanelItem
                hasValue={() => !!height}
                label="Height"
                onDeselect={() => setAttributes({ height: undefined })}
                isShownByDefault={true}
              >
                <UnitControl
                  label="Height"
                  value={height}
                  onChange={(next) => setAttributes({ height: next })}
                />
              </ToolsPanelItem>
              <ToolsPanelItem
                hasValue={() => !!maxWidth}
                label="Maximum Width"
                onDeselect={() => setAttributes({ maxWidth: undefined })}
                isShownByDefault={true}
              >
                <UnitControl
                  label="Maximum Width"
                  value={maxWidth}
                  onChange={(next) => setAttributes({ maxWidth: next })}
                />
              </ToolsPanelItem>
              <ToolsPanelItem
                hasValue={() => !!columnGap}
                label="Column Gap"
                onDeselect={() => setAttributes({ columnGap: undefined })}
                isShownByDefault={true}
              >
                <UnitControl
                  label="Column Gap"
                  value={columnGap}
                  onChange={(next) => setAttributes({ columnGap: next })}
                />
              </ToolsPanelItem>
              <ToolsPanelItem
                hasValue={() => !!rowGap}
                label="Row Gap"
                onDeselect={() => setAttributes({ rowGap: undefined })}
                isShownByDefault={true}
              >
                <UnitControl
                  label="Row Gap"
                  value={rowGap}
                  onChange={(next) => setAttributes({ rowGap: next })}
                />
              </ToolsPanelItem>
            </ToolsPanel>
          </Panel>
        </InspectorControls>
      )}
    </Fragment>
  );
};

export { addLayouts, applyLayoutsStyles, addLayoutClass, LayoutBlockEdit };
