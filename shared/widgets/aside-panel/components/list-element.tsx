"use client";
import {
  LayoutGrid,
  Table,
  BarChart3,
  LayoutTemplate,
  Smile,
  Upload,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface IListItemProps {
  title: string;
  iconName: string;
  path: string;
}

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  Table,
  BarChart3,
  LayoutTemplate,
  Smile,
  Upload,
  CircleHelp,
};

export function ListElement({ title, iconName, path }: IListItemProps) {
  const router = useRouter();
  const IconComponent = iconMap[iconName];

  return (
    <div
      onClick={() => router.push(path)}
      tabIndex={0}
      className="flex items-center py-[8px] px-[10px] gap-[10px] w-full h-[40px] focus-within:bg-[rgba(157,130,253,1)] focus-within:border-r-[2px] focus-within:border-r-[rgba(157,130,253,1)] cursor-pointer hover:bg-[rgba(157,130,253,0.1)] transition-colors text-[rgba(45,30,99,1)]"
    >
      {IconComponent && <IconComponent size={16} />}
      <span className="text-sm">{title}</span>
    </div>
  );
}
