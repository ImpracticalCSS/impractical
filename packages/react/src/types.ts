import type React from "react";

export type NoInfer<A> = [A][A extends any ? 0 : never];

export type Has<T, TObj> = T extends TObj ? T : T & TObj;

export type AnyProps = Record<string, unknown>;

export type DomElements = keyof JSX.IntrinsicElements;

export type StaticVariable = string | number | React.CSSProperties;

export type StyledComponentOptions = {
  name: string;
  className: string;
  vars?: {
    [key: string]: [
      string | number | ((props: unknown) => string | number),
      string | void
    ];
  };
};

export type Component<Props> = React.ComponentType<Props>;

export type StyledComponent<T> = [T] extends [React.FunctionComponent<any>]
  ? T
  : React.FunctionComponent<T & { as?: React.ElementType }>;

export type ComponentStyledTagWithoutInterpolation<Component> = (
  strings: TemplateStringsArray,
  ...exprs: Array<
    | StaticVariable
    | ((props: "The target component should have a style prop") => never)
  >
) => Component;

export type ComponentStyledTagWithInterpolation<ExtraProps, Component> = <
  OwnProps = {}
>(
  strings: TemplateStringsArray,
  ...exprs: Array<
    | StaticVariable
    | ((props: NoInfer<OwnProps & ExtraProps>) => string | number)
  >
) => keyof OwnProps extends never
  ? Component
  : StyledComponent<OwnProps & ExtraProps>;

export type HtmlStyledTag<TagName extends DomElements> = <
  TAdditionalProps = AnyProps
>(
  strings: TemplateStringsArray,
  ...exprs: Array<
    | StaticVariable
    | ((
        props: JSX.IntrinsicElements[TagName] & Omit<TAdditionalProps, never>
      ) => string | number)
  >
) => StyledComponent<JSX.IntrinsicElements[TagName] & TAdditionalProps>;

export type StyledDomElements = {
  [x in DomElements]: HtmlStyledTag<x>;
};

export interface Styled extends StyledDomElements {
  <
  Props extends Has<RequiredProps, { style?: React.CSSProperties }>,
    RequiredProps extends { style?: React.CSSProperties },
    Constructor extends Component<Props>
  >(
    componentWithStyle: Constructor & Component<Props>
  ): ComponentStyledTagWithInterpolation<Props, Constructor>;

  <
    Props extends Has<RequiredProps, { className?: string }>,
    RequiredProps extends { className?: string },
    Constructor extends Component<Props>
  >(
    componentWithoutStyle: Constructor & Component<Props>
  ): ComponentStyledTagWithoutInterpolation<Constructor>;

  <TName extends DomElements>(domElement: TName): HtmlStyledTag<TName>;

  (component: "The target component should have a className prop"): never;
}

export interface ImpracticalComponent<Props extends AnyProps = AnyProps>
  extends React.FC<Props> {
  __impractical: {
    className: string;
    extends: string;
  };
}
