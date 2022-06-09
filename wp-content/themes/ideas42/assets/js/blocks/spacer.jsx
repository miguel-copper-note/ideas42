import classnames from "classnames";

const { Fragment } = wp.element;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const {
  __experimentalToggleGroupControl: ToggleGroupControl,
  __experimentalToggleGroupControlOption: ToggleGroupControlOption,
  PanelBody,
} = wp.components;

// Register the block
registerBlockType("nclud/spacer", {
  title: "Custom Spacer",
  description: "Block to generate spacer.",
  icon: "editor-code",
  category: "layout",
  keywords: ["modules", "ideas42", "spacer", "custom spacer"],
  attributes: {
    spacer: {
      type: "string",
      default: "spacer-sm",
    },
  },
  edit(props) {
    let blockProps = useBlockProps();
    const {
      isSelected,
      attributes: { spacer },
      setAttributes,
    } = props;

    blockProps.className = classnames(blockProps.className, spacer);

    const handleSpacer = (value) => {
      setAttributes({ spacer: value });
      blockProps.className = classnames(blockProps.className, spacer);
    };

    return (
      <Fragment>
        {isSelected && (
          <InspectorControls>
            <PanelBody>
              <ToggleGroupControl
                label="Space size"
                onChange={handleSpacer}
                value={spacer}
              >
                <ToggleGroupControlOption label="XS" value="spacer-xs" />
                <ToggleGroupControlOption label="S" value="spacer-sm" />
                <ToggleGroupControlOption label="M" value="spacer-md" />
                <ToggleGroupControlOption label="L" value="spacer-lg" />
              </ToggleGroupControl>
            </PanelBody>
          </InspectorControls>
        )}

        <section {...blockProps}></section>
      </Fragment>
    );
  },
  save({ attributes }) {
    const { spacer } = attributes;
    let blockProps = useBlockProps.save();

    if (typeof spacer !== "undefined") {
      blockProps.className = classnames(blockProps.className, spacer);
    }

    return <section {...blockProps}></section>;
  },
});
