import { useArchiver } from "./ArchiverContext";

export default function ArchiverProgressBar() {
  const stages = ["upload", "edit", "index", "enrich", "review"];
  const { currentStep: currentStage } = useArchiver()!;
  return (
    <>
      <div className="flex gap-12">
        {stages.map((stage, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="font-bold italic">{stage}</span>
            <div
              className={`${
                i === currentStage ? "bg-orange" : "bg-gray"
              } h-[10px] w-[100px] transition-colors duration-500`}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
}
