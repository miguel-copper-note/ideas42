import classnames from "classnames";

const { Fragment } = wp.element;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const {
  __experimentalToggleGroupControl: ToggleGroupControl,
  __experimentalToggleGroupControlOption: ToggleGroupControlOption,
  PanelBody,
} = wp.components;

// Register the block
registerBlockType("nclud/container", {
  title: "Container",
  description: "Block to generate container.",
  icon: "editor-code",
  category: "layout",
  keywords: ["modules", "ideas42", "container"],
  attributes: {
    spacer: {
      type: "string",
      default: "spacer-lg",
    },
  },
  edit(props) {
    let blockProps = useBlockProps();
    const {
      isSelected,
      attributes: { spacer },
      setAttributes,
    } = props;

    blockProps.className = classnames(
      blockProps.className,
      "container",
      spacer
    );

    const handleSpacer = (value) => {
      setAttributes({ spacer: value });
      blockProps.className = classnames(
        blockProps.className,
        "container",
        spacer
      );
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

        <div {...blockProps}>
          <InnerBlocks />
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    const { spacer } = attributes;
    let blockProps = useBlockProps.save();

    if (typeof spacer !== "undefined") {
      blockProps.className = classnames(
        blockProps.className,
        "container",
        spacer
      );
    }

    return (
      <section {...blockProps}>
        <InnerBlocks.Content />
      </section>
    );
  },
});
