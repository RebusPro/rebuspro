"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useConfirmationStore from "@/lib/store/confirmationStore";

const ConfirmationDialog = () => {
  const {
    open,
    title,
    description,
    cancelLabel,
    actionLabel,
    onAction,
    closeConfirmation,
  } = useConfirmationStore();

  return (
    <AlertDialog open={open} onOpenChange={closeConfirmation}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelLabel && <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>}
          <AlertDialogAction onClick={onAction}>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
