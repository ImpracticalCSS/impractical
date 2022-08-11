import { StyledComponentOptions } from "../types";

/**
 * Converts a dynamic style variables into css variables to be applied
 * to the component's `style` prop. If the value is a function,
 * the function will be passed the components props and then returned
 * value will be the value of the css variable.
 * 
 * Example:
 * 
 * ```js
 * const vars = {
 *  color: ({ disabled }) => disabled ? "red" : "blue"
 * }
 * ↓↓↓↓
 * const styles = {
 *   "--color": "red"
 * }
 * ```
 */
function makeCssVariables(options: StyledComponentOptions, props: any) {
  const { vars } = options;
  const style: { [key: string]: string } = {};

  if (vars) {
    for (const name in vars) {
      const variable = vars[name];
      const result = variable[0];
      const unit = variable[1] || "";
      const value = typeof result === "function" ? result(props) : result;

      style[`--${name}`] = `${value}${unit}`;
    }
  }

  return style;
}

export default makeCssVariables;

