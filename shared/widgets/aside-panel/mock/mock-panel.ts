import {
  LayoutGrid,
  Table,
  BarChart3,
  LayoutTemplate,
  Smile,
  Upload,
  CircleHelp,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface SidebarItem {
  id: number;
  label: string;
  iconName: string;
  icon: LucideIcon;
  path: string;
}

export const sidebarMenu: SidebarItem[] = [
  {
    id: 1,
    label: "Dashboard",
    iconName: "LayoutGrid",
    icon: LayoutGrid,
    path: "/dashboard",
  },
  {
    id: 2,
    label: "My courses",
    iconName: "Table",
    icon: Table,
    path: "/courses",
  },
  {
    id: 3,
    label: "Course statistics",
    iconName: "BarChart3",
    icon: BarChart3,
    path: "/statistics",
  },
  {
    id: 4,
    label: "Templates",
    iconName: "LayoutTemplate",
    icon: LayoutTemplate,
    path: "/templates",
  },
  {
    id: 5,
    label: "Students",
    iconName: "Smile",
    icon: Smile,
    path: "/students",
  },
  {
    id: 6,
    label: "Import course",
    iconName: "Upload",
    icon: Upload,
    path: "/import-course",
  },
  {
    id: 7,
    label: "Support",
    iconName: "CircleHelp",
    icon: CircleHelp,
    path: "/support",
  },
];
