"use client";
import Image from "next/image";
import { SignInOrUpContentOfDialog } from "@/modules/main-page/modal-form-sign-in-or-up/components/sign-in-content-of-dialog";
import { Labels } from "@/shared/mock/labels";

export interface ICustomModalOfSignInForm {}

export function CustomModalOfSignInForm() {
  return (
    <div className="flex flex-col gap-[20px] min-w-[300px] max-w-[500px] !p-[40px] rounded-2xl bg-white">
      <div className="flex w-full">
        <SignInOrUpContentOfDialog labels={Labels} />
        <Image
          src="/img/robo-handlers.png"
          alt="robo-handlers"
          width={400}
          height={400}
          className="min-h-[100%] w-1/2 h-full hidden md:block"
        />
      </div>
    </div>
  );
}
