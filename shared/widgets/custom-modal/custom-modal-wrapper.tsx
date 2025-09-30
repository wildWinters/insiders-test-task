"use client";
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/shared/shad-cn/ui/button";
import { cn } from "@/shared/lib/utils";

export interface ICustomModal {
  id: string;
  children: ReactNode;
  zIndex?: number;
  isOpen: boolean;
  customModalClassName?: string;
  onClose: () => void;
}

export function CustomModal({
  id,
  children,
  zIndex = 50,
  isOpen,
  onClose,
  customModalClassName,
}: ICustomModal) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timeout = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!show) return null;

  return createPortal(
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-500 ease-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex }}
      onClick={onClose}
    >
      <div
        className={cn(
          `bg-white p-4 rounded-lg relative transform transition-all duration-500 ease-out ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`,
          customModalClassName,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button className="absolute top-2 right-2" onClick={onClose}>
          <XIcon />
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
