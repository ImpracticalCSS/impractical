import { Styled, StyledComponentOptions } from "./types";
import createComponentRenderer from "./utils/createComponentRenderer";
import createImpracticalComponent from "./utils/createImpracticalComponent";
import domElements from "./utils/elements";
import env from "@impractical/env";

// @ts-expect-error
const styled: Styled = (tagOrComponent: any) => {
  return function Component(options: StyledComponentOptions) {
    if (env.isNotProd && env.isNotTest) {
      if (Array.isArray(options)) {
        // We received a strings array since it's used as a tag
        throw new Error(
          'Using the "styled" tag in runtime is not supported. Make sure you have set up the Babel plugin correctly. See https://github.com/callstack/linaria#setup'
        );
      }
    }

    const Renderer = createComponentRenderer(tagOrComponent, options);

    const Component = createImpracticalComponent(Renderer, options, tagOrComponent);

    return Component;
  };
};

domElements.forEach((tag) => {
  // @ts-expect-error
  styled[tag] = styled(tag);
});

export default styled;
