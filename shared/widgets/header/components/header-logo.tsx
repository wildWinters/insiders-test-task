"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export function HeaderLogo() {
  const { t } = useTranslation();
  return (
    <section className="flex items-center gap-[20px]">
      <Image src="/img/Sign.jpg" alt="Sign" width={81} height={81} />
      <div className="flex  flex-col">
        <p className="mb-[2px] text-[clamp(16px,4vw,28px)]">
          <span
            className="font-[500] text-[rgba(114,77,247,1)]"
          >
            {t("app.name.0", { defaultValue: "Course" })}
          </span>{" "}
          <span
            className="font-[500] text-[rgba(241,120,182,1)]"
          >
            {t("app.name.1", { defaultValue: "Garden" })}
          </span>
        </p>
        <span className="relative top-[-8px] text-[rgba(134,134,154,1)] text-[16px]">
          {t("app.tagline", { defaultValue: "MINI-COURSES AI CREATOR" })}
        </span>
      </div>
    </section>
  );
}
