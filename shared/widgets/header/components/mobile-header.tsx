"use client";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { DialogWrapper } from "@/shared/ui/dialog-wrapper";
import { Button } from "@/shared/shad-cn/ui/button";
import { Menu } from "lucide-react";
import { SignInOrUpContentOfDialog } from "@/modules/main-page/modal-form-sign-in-or-up/components/sign-in-content-of-dialog";
import { Labels } from "@/shared/mock/labels";
import { useModalStore } from "@/shared/store/use-modal-store";
import { useEffect } from "react";

export function MobileHeader() {
  
  const { t } = useTranslation();
  const navigation = t("app.navigation", { returnObjects: true }) || [];
  const safeNavigation = Array.isArray(navigation) ? navigation : [];
  const isSignUpShadCnModalOpen = useModalStore(
    (state) => state.isSignUpShadCnModalOpen,
  );
  const openSignUpShadCnModal = useModalStore(
    (state) => state.openSignUpShadCnModal,
  );
  const closeSignUpShadCnModal = useModalStore(
    (state) => state.closeSignUpShadCnModal,
  );

  const inOrUp = useModalStore((state) => state.inOrUp);

  return (
    <header className="flex h-[80px] items-center justify-between lg:hidden mx-[10vw] mt-[20px]">
      <Image src="/img/Sign.jpg" alt="Sign" width={81} height={81} />

      <DialogWrapper
        hadnleCloseModal={closeSignUpShadCnModal}
        Trigger={
          <Button
            onClick={openSignUpShadCnModal}
            className="w-[29vw] h-[40px]"
            variant="purple"
          >
            {t("auth.login.footer.link.label")}
          </Button>
        }
        isOpen={isSignUpShadCnModalOpen}
      >
        <div className="flex w-full">
          <SignInOrUpContentOfDialog labels={Labels} inOrUp={inOrUp} />
          <Image
            src="/img/robo-handlers.png"
            alt="robo-handlers"
            width={400}
            height={400}
            className="min-h-[100%] w-1/2 h-full hidden lg:block"
          />
        </div>
      </DialogWrapper>

      <DialogWrapper
        Trigger={
          <Menu className="text-[rgba(241,120,182,1)] w-[50px] h-[50px]" />
        }
        dialogContentClassName="!border-0 shadow-none bg-opacity-80 w-[100vw] h-screen flex flex-col items-center justify-center gap-6 p-6"
      >
        <ul className="flex flex-col items-center justify-center gap-6 text-lg font-medium text-white">
          {safeNavigation.map((item, index) => (
            <li key={index}>
              <Button className="px-6 py-3 rounded-lg hover:bg-purple-500 hover:text-white transition-colors">
                {item}
              </Button>
            </li>
          ))}
        </ul>
      </DialogWrapper>
    </header>
  );
}
