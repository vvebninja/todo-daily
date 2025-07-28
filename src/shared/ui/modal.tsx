import { useEffect } from "react";
import { createPortal } from "react-dom";
import { clsn } from "../utils/clsn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  overlayClassName?: string;
  children: React.ReactNode;
  className?: string;
}

function Modal({
  isOpen,
  onClose,
  children,
  overlayClassName,
  className,
}: React.PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscapeClose(event: KeyboardEvent) {
      if (event.code === "Escape") {
        return onClose();
      }
    }

    document.addEventListener("keyup", handleEscapeClose);

    return () => removeEventListener("keyup", handleEscapeClose);
  }, [isOpen, onClose]);

  const handleCloseOnBackdrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      return onClose();
    }
  };

  const handleStopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  if (!isOpen) return null;

  const markup = (
    <div
      onClick={handleCloseOnBackdrop}
      aria-modal="true"
      role="dialog"
      className={clsn(
        "fixed inset-0 z-40 flex items-center justify-center backdrop-blur-xs transition-all",
        overlayClassName,
      )}
    >
      <div
        onClick={handleStopPropagation}
        className={clsn(
          "absolute z-50 mx-3 p-1 overflow-hidden rounded-[var(--border-radius-primary)]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(markup, document.getElementById("modal-root")!);
}

export { Modal };
