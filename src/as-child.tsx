import * as React from "react";

/**
 * References:
 * @see https://www.jacobparis.com/content/react-as-child
 */

/**
 * @description Type Helper for the `asChild` API.
 * If `asChild` is false then the component like a button is used as is,
 * and the `DefaultElementProps` defined for the component will be used.
 * Or it's `true`, then simply `children`.
 */
export type AsChildProps<DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | React.PropsWithChildren<{ asChild: true }>;

export const Slot = ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) => {
  /**
   * @see https://react.dev/reference/react/Children#children-count
   */
  if (React.Children.count(children) > 1) {
    throw new Error("Only one child is allowed");
  }

  /**
   * @see https://react.dev/reference/react/cloneElement
   */
  if (React.isValidElement(children)) {
    /**
     * `props` is passed to `Button` for example, and `children.props` is what is passed
     *  to the asChild component like an `a` tag.
     * @example
     * ```
     * <Button asChild className="text-blue-700">
     *  <a className="p-4">button link</a>
     * </Button>
     * ```
     *
     * @note Props like `style` and `className` need to be merged properly as
     * the UI component like `Button` will have styles applied
     * and the component overriding `Button` like `a` might have unique styles as well.
     */
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      style: { ...props.style, ...children.props.style },
      /**
       * @note When using tailwind it's important to use something like tailwind-merge
       * Or better, use: @see https://github.com/shadcn-ui/ui/blob/main/apps/www/lib/utils.ts#L4
       */
      className: `${props.className || ""} ${children.props.className || ""}`
    });
  } else {
    // When it's not a valid element then they didn't pass a React element, but a string, number, etc.
    // In that case, it's meaningless to use it so throw an error and force a re-write.
    throw new Error("Invalid use of asChild. Remove it.");
  }
};
