"use client";

import { AlertDialog } from "radix-ui";

import { useConfirm } from "@/hooks/use-confirm";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ConfirmDialog = () => {
  const { message, onConfirm, open, close } = useConfirm();

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          data-slot="alert-dialog-overlay"
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
        />
        <AlertDialog.Content
          data-slot="alert-dialog-content"
          className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl outline -outline-offset-1 outline-white/10  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] duration-200"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-neutral-50 sm:mx-0 sm:size-10">
                <ExclamationTriangleIcon
                  aria-hidden="true"
                  className="size-6 text-neutral-500"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <AlertDialog.Title
                  data-slot="alert-dialog-title"
                  className="text-base font-semibold text-gray-900"
                >
                  {message}
                </AlertDialog.Title>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <AlertDialog.Action
              onClick={() => {
                onConfirm?.();
                close();
              }}
              asChild
            >
              <button
                type="button"
                className="cursor-pointer inline-flex w-full justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-brand/80 sm:ml-3 sm:w-auto"
              >
                Продолжить
              </button>
            </AlertDialog.Action>
            <AlertDialog.Cancel onClick={close} asChild>
              <button
                type="button"
                data-autofocus
                className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Отменить
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmDialog;
