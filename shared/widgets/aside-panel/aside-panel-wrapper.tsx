import { ReactNode } from "react";
import { Button } from "@/shared/shad-cn/ui/button";
import { Plus } from "lucide-react";
import { DescriptionProgress } from "./components/description-progress";

export interface IAppSideeBar {
  children: ReactNode;
  progress?: number;
  generalCount?: number;
}

export function AppSidebar({ children, progress, generalCount }: IAppSideeBar) {
  return (
    <section className="flex flex-col gap-[20px]">
      <Button
        variant={"purple"}
        className="flex justify-between h-[40px] items-center max-w-[222px] text-white"
      >
        Create new course <Plus className="ml-2 size-4" />
      </Button>

      <aside className="bg-[rgba(247,249,251,1)] flex flex-col gap-[25px] w-[222px] border-r-2 border-r-[rgba(228,228,231,1)]">
        <div>{children}</div>
      </aside>
      <DescriptionProgress progress={1} generalCount={3} />
    </section>
  );
}
