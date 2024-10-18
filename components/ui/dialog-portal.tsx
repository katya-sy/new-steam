import * as Dialog from "@radix-ui/react-dialog";
import { Close } from "../shared/close";
import React from "react";

interface DialogPortalProps {
  children: React.ReactNode;
}

export const DialogPortal = ({ children }: DialogPortalProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="absolute inset-0 bg-black/70 w-screen" />
      <Dialog.Content className="top-1/2 left-1/2 fixed bg-bg p-5 rounded-lg w-[calc(100%-32px)] sm:w-[500px] -translate-x-1/2 -translate-y-1/2">
        <Dialog.Description />
        {children}
        <Dialog.Close className="top-2 right-2 absolute">
          <Close />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
