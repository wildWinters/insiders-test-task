"use client";
import { cn } from "@/shared/lib/utils";
import HEADER_LINKS from "@/shared/widgets/header/const/header-links";
import { Last_LIST_ELEMENT_BUTTON } from "@/shared/widgets/header/const/tw-list-button";
import { Labels } from "@/shared/mock/labels";
import { ModalFormWrapper } from "@/modules/main-page/modal-form-sign-in-or-up/forms-wrapper";
import Image from "next/image";
import { useModalStore } from "@/shared/store/use-modal-store";

export interface LinksListProps {
  links?: string[];
  ulClassName?: string;
}

export function LinksList({
  links = HEADER_LINKS,
  ulClassName,
}: LinksListProps) {
  const safeLinks = Array.isArray(links) ? links : [];
  const { openCustomModalOfSignIn } = useModalStore();

  return (
    <ul className={cn("flex space-x-[40px] items-center", ulClassName)}>
      {safeLinks.map((link, index) => {
        const linkText = link;

        if (index === links.length - 1) {
          return (
            <li
              key={link}
              onClick={openCustomModalOfSignIn}
              className={cn("list-none", Last_LIST_ELEMENT_BUTTON)}
            >
              sign in
              <ModalFormWrapper />
            </li>
          );
        }

        return (
          <li
            key={link}
            className={cn(
              "text-[14px] font-medium cursor-pointer hover:opacity-80 transition-opacity list-none",
            )}
          >
            {linkText}
          </li>
        );
      })}
    </ul>
  );
}
