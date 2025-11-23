"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  type?: "info" | "success" | "error";
  button?: {
    label: string;
    onClick: () => void;
  };
}

export function toast(toast: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      button={toast.button}
      type={toast.type || "info"}
    />
  ));
}

function Toast(props: ToastProps) {
  const { title, description, button, id, type } = props;

  if (type === "error") {
    return (
      <div className="mx-auto w-full max-w-4xl border-l-4 border-yellow-400 bg-yellow-50 p-4">
        <div className="flex">
          <div className="shrink-0">
            <ExclamationTriangleIcon className="size-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm text-yellow-700 font-medium">{title}</h4>
            <div className="mt-2">
              <p className="text-sm text-yellow-700">{description}</p>
            </div>
            {button && (
              <div className="mt-4 -mx-2 -my-1.5 flex">
                <button
                  onClick={() => {
                    button.onClick();
                    sonnerToast.dismiss(id);
                  }}
                  className="cursor-pointer rounded-md px-2 py-1.5 text-sm font-medium text-yellow-700 transition-colors hover:bg-yellow-100"
                >
                  {button.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === "success") {
    return (
      <div className="mx-auto max-w-4xl border-l-4 border-yellow-500 bg-yellow-500/10 p-4">
        <div className="flex">
          <div className="shrink-0"></div>
          <div className="ml-3">
            <p className="text-sm text-yellow-300 font-medium">
              У вас не осталось кредитов. Обновите свой аккаунт, чтобы добавить
              больше кредитов.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl border-l-4 border-neutral-400 bg-neutral-50 p-4">
      <div className="flex">
        {/* <div className="shrink-0">
          <InformationCircleIcon className="size-5 text-neutral-400" />
        </div> */}
        <div className="ml-3 mr-6">
          <h4 className="text-sm text-neutral-700 font-medium">{title}</h4>
          {description && (
            <div className="mt-2">
              <p className="text-sm text-neutral-700">{description}</p>
            </div>
          )}
          {button && (
            <div className="mt-4 -mx-2 -my-1.5 flex">
              <button
                onClick={() => {
                  button.onClick();
                  sonnerToast.dismiss(id);
                }}
                className="cursor-pointer rounded-md px-2 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                {button.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
