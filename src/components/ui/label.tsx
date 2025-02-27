import { forwardRef } from "react";

import { cn } from "~/utilities/cn";

const Label = forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(({ className, children, ...props }, ref) => {
  return (
    <label className={cn("font-medium", className)} ref={ref} {...props}>
      {children}
    </label>
  );
});
Label.displayName = "Label";

export { Label };
