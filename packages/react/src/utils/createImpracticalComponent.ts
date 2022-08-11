import React from "react";
import { StyledComponentOptions } from "../types";

type Component = ReturnType<typeof React.createElement>;

/**
 * Creates and returns the Impractical React Component.
 */
function createImpracticalComponent(
  render: (props: any, ref: any) => Component,
  options: StyledComponentOptions,
  tagOrComponent: any
) {
  // @ts-expect-error
  const Component: ImpracticalComponent = React.forwardRef
    ? React.forwardRef(render)
    : (props: any) => {
        const { innerRef, ...restProps } = props;
        return render(restProps, innerRef);
      };

  Component.displayName = options.name;

  Component.__impractical = {
    className: options.className,
    extends: tagOrComponent,
  };

  return Component;
}

export default createImpracticalComponent;
