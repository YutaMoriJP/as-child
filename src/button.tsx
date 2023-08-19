import { AsChildProps, Slot } from "./as-child";

type ButtonProps = AsChildProps<React.ComponentProps<"button">>;

export const Button = ({ asChild, children, ...props }: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      {...props}
      style={{
        padding: 10,
        background: "seagreen",
        color: "white",
        borderRadius: 9999,
        cursor: "pointer",
        border: 0,
        fontFamily: "arial",
        fontSize: "1rem"
      }}
    >
      {children}
    </Component>
  );
};
