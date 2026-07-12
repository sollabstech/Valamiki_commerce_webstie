"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;

function SheetContent({
  className,
  children,
  side = "left",
  showClose = true,
}: {
  className?: string;
  children: React.ReactNode;
  side?: "left" | "right" | "bottom";
  showClose?: boolean;
}) {
  const sideClasses = {
    left: "inset-y-0 left-0 h-full w-[85vw] max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
    right:
      "inset-y-0 right-0 h-full w-[85vw] max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    bottom:
      "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-primary-900/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content
        className={cn(
          "fixed z-50 flex flex-col bg-surface shadow-elevated outline-none data-[state=open]:animate-in data-[state=closed]:animate-out duration-300",
          sideClasses[side],
          className
        )}
      >
        {children}
        {showClose && (
          <Dialog.Close className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-cream text-ink-700 transition-colors hover:bg-border">
            <X className="size-4.5" />
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent };
