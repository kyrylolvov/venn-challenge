import { forwardRef } from "react";

import { cn } from "~/utilities/cn";

const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "border-secondary flex h-10 w-full rounded-md border bg-transparent px-3 py-1 text-base transition-colors placeholder:border",
        "focus-visible:ring-foreground focus-visible:ring-1 focus-visible:outline-none",
        "disabled:cursor-not-allowed",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
