"use client";
import { Button } from "@/shared/shad-cn/ui/button";
import { LabelInput } from "@/modules/main-page/modal-form-sign-in-or-up/components/label-input";
import { Eye } from "lucide-react";
import { CreateNewPasswordTitle } from "@/modules/main-page/modal-create-new-password/components/create-new-password-title";

export function CustomModalOfOnePassword() {
  return (
    <>
      <div className="flex flex-col gap-[20px] min-w-[300px] max-w-[500px] !p-[40px] rounded-2xl bg-white">
        <CreateNewPasswordTitle />
        <LabelInput
          label="New Passwword"
          type="password"
          id="new-password"
          placeholder="Enter your password"
        >
          <Eye className="absolute left-[20px] w-[10px] h-[10px]" />
        </LabelInput>

        <LabelInput
          label="Confirm-password"
          type="password"
          id="re-enter-password"
          placeholder="Re-enter your password"
        >
          <Eye className="absolute left-[20px] w-[10px] h-[10px]" />
        </LabelInput>
        <Button variant="purple">Reset Password</Button>
      </div>
    </>
  );
}
