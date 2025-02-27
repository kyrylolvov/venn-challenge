import { forwardRef } from "react";

import { cn } from "~/utilities/cn";

const Button = forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "bg-foreground text-background-accent cursor-pointer rounded-lg p-3 font-medium transition-colors",
        "hover:bg-foreground/90",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

export { Button };
