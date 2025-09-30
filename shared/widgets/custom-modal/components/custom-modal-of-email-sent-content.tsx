"use client";
import { useTranslation } from "react-i18next";
import { MessageWithLink } from "@/modules/main-page/modal-email-sent/components/message-with-link";
import { ModalSendEmailTitle } from "@/modules/main-page/modal-email-sent/components/modal-sen-email-title";

export function CustomModalOfEmailSent() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-[20px] min-w-[300px] max-w-[500px] !p-[40px] rounded-2xl bg-white">
      <ModalSendEmailTitle email={t("modal-email-sent.email")}>
        <MessageWithLink
          message="Did not receive the email?"
          link="Resend Email"
        />

        <MessageWithLink
          message="Wrong Email Address?"
          link="Change Email Address"
        />
      </ModalSendEmailTitle>
    </div>
  );
}
