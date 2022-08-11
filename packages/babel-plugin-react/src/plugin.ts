import * as BabelCoreNamespace from "@babel/core";
import hash from "@emotion/hash";
import { Babel } from "./types";

const styled = "styled";

const styles: Record<string, [string, string]> = {};

function BabelFakerPlugin({ types }: Babel): BabelCoreNamespace.PluginObj {
  return {
    name: "@impractical/babel-react-plugin",
    visitor: {
      // TemplateLiteral(templatePath) {

      //     console.log(templatePath.parentPath);

      //     // templatePath.parentPath.traverse({
      //     //     MemberExpression(path) {
      //     //         console.log(path);
      //     //     }
      //     // });
      // },
      MemberExpression(path, file) {
        const { object } = path.node;
        const idNode = path.parentPath?.parentPath?.node;
        const identifier =
          types.isVariableDeclarator(idNode) && types.isIdentifier(idNode.id)
            ? idNode.id.name
            : null;

        if (!identifier) return;

        let staticStyle = "";

        if (types.isIdentifier(object) && object.name === styled) {
          if (types.isTaggedTemplateExpression(path.parentPath.node)) {
            const templateLiteral = path.parentPath.node.quasi;
            const quasis = [...templateLiteral.quasis];

            if (quasis.length === 1) {
              staticStyle = quasis[0].value.cooked ?? "";
            } else {
              quasis.map((quasi, i) => {
                const expr = templateLiteral.expressions[i];
                let value;

                if (!quasi.tail) {
                  if (types.isMemberExpression(expr)) {
                    value = `${expr.object.name}.${expr.property.name}`;
                  } else {
                    value = expr.name;
                  }

                  // generating unique css variable name
                  const cssVarName = `${identifier}_${hash(value)}`;

                  // adding it to the style
                  quasi.value.cooked += `var(--${cssVarName})`;

                  styles[identifier] = [cssVarName, value];
                }

                staticStyle += quasi.value.cooked;
              });
            }
          }
        }

        console.log(staticStyle);

        console.log(styles);
      },
      //   TaggedTemplateExpression(templatePath) {
      //     templatePath.traverse({
      //       CallExpression() {},
      //       MemberExpression(path) {
      //         const { object } = path.node;

      //         if (types.isIdentifier(object) && object.name === styled) {
      //             const quasi = path.getSibling("");

      //             console.log(quasi);
      //         //   console.log(path.getSibling("quasi").node);
      //         }
      //       },
      //     });

      //   },
    },
  };
}

export default BabelFakerPlugin;
