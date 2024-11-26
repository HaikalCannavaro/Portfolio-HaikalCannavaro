"use client"

import React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import "./separator.css" // Tambahkan path ke file CSS

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={`separator ${orientation === "horizontal" ? "horizontal" : "vertical"}`}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
