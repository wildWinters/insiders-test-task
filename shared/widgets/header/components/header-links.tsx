"use client";
import { useTranslation } from "react-i18next";
import { LinksList } from "./links";

export function HeaderLinks() {
  const { t } = useTranslation();

  return (
    <LinksList
      links={t("app.navigation", { returnObjects: true }) as string[]}
    />
  );
}
