import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Minus, Plus } from "lucide-react"

import cn from "classnames"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex m-0">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex items-center text-xl m-0 py-2 gap-2 font-normal transition-all hover:underline [&[data-state=open]_svg]:rotate-180",
          "[&[data-state=open]_[data-icon=open]]:opacity-100 [&[data-state=open]_[data-icon=closed]]:opacity-0",
          "[&[data-state=closed]_[data-icon=closed]]:opacity-100 [&[data-state=closed]_[data-icon=open]]:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
        <span className="h-4 w-4 relative">
          <Plus
            data-icon="closed"
            className="absolute h-4 w-4 shrink-0 transition-all duration-200"
          />
          <Minus
            data-icon="open"
            className="absolute h-4 w-4 shrink-0 transition-all duration-200"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  ),
)

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
