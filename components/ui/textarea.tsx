import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 field-sizing-content min-h-16  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand sm:text-sm/6",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
