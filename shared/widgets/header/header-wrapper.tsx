import { ReactNode } from "react";
import { cva } from "class-variance-authority";

const headerDesktopVersion = cva(
  "hidden lg:flex items-center justify-between bg-white mt-[24px] px-[10vw] mb-[13px]",
  {
    variants: {},
    defaultVariants: {},
  },
);

export function DesktopHeader({ children }: { children: ReactNode }) {
  return (
    <header
      id="header"
      className="hidden lg:flex items-center justify-between bg-white mt-[24px] px-[10vw] mb-[13px]"
    >
      {children}
    </header>
  );
}
