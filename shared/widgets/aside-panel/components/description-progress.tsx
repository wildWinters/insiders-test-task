export interface IDescriptionPropgressProps {
  progress: number;
  generalCount: number;
}

export function DescriptionProgress({
  progress,
  generalCount,
}: IDescriptionPropgressProps) {
  const percentage = (progress / generalCount) * 100;

  return (
    <section className="font-[500] max-w-[222px] flex flex-col gap-[10px]">
      <span className="text-[rgba(45,30,99,1)]">
        Complete {progress} of {generalCount} free courses
      </span>

      <div className="w-full h-[16px] rounded-[10px] bg-[rgba(228,228,231,1)] relative overflow-hidden">
        <div
          style={{
            width: `${percentage}%`,
            background:
              "linear-gradient(246.14deg, #C2CCE3 19.44%, #9D82FD 49.71%, #5E4E97 75.58%)",
          }}
          className="h-full rounded-[10px] transition-all duration-300"
        />
      </div>

      <span className="text-[rgba(114,77,247,1)]">Upgrade my tarif plan</span>
    </section>
  );
}
