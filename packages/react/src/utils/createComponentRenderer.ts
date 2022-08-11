import React from "react";
import { StyledComponentOptions } from "../types";
import makeCssVariables from "./makeCssVariables";

/**
 * Creates the render function that creates the react element from the specified tag or component.
 */
function createComponentRenderer(
  tagOrComponent: any,
  options: StyledComponentOptions
) {
  const renderComponent = (props: any, ref: any) => {
    const {
      as: component = tagOrComponent,
      class: className,
      ...restProps
    } = props;

    restProps.ref = ref;

    restProps.style = {
      ...(props.style ?? {}),
      ...makeCssVariables(options, props),
    };

    if ((tagOrComponent as any).__impractical && tagOrComponent !== component) {
      restProps.as = component;

      return React.createElement(tagOrComponent, restProps);
    }

    return React.createElement(component, restProps);
  };

  return renderComponent;
}

export default createComponentRenderer;
