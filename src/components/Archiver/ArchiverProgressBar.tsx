import Image from "next/image";
import { useArchiver } from "./ArchiverContext";

type Step = "upload" | "edit" | "index" | "enrich" | "review";

export default function ArchiverProgressBar() {
  const steps: Step[] = ["upload", "edit", "index", "enrich", "review"];
  const { currentStep } = useArchiver()!;
  return (
    <>
      <div className="w-full border-b-[1px] border-gray/20 md:w-fit md:border-b-0 md:border-r-[1px]">
        <div className="flex w-full justify-evenly gap-4 py-6 md:w-fit md:flex-col md:gap-8 md:p-12">
          {steps.map((step) => (
            <>
              <StepBlock currentStep={steps[currentStep!]!} step={step} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

function StepBlock({ step, currentStep }: { step: Step; currentStep: Step }) {
  return (
    <>
      <div className="flex w-fit items-center justify-between md:w-[200px]">
        <span className="hidden font-bold capitalize md:block">{step}</span>
        <div
          className={`flex items-center justify-center rounded-full ${
            currentStep === step ? "bg-orange" : "bg-white"
          } p-4`}
        >
          <Image
            src={getStepIcon(step)}
            width={25}
            height={25}
            alt=""
            role="presentation"
            className="h-[20px] w-[20px] md:h-[25px] md:w-[25px]"
          />
        </div>
      </div>
    </>
  );
}

function getStepIcon(step: Step) {
  switch (step) {
    case "upload":
      return "/file-up.svg";
    case "edit":
      return "/edit.svg";
    case "index":
      return "/folder-search-2.svg";
    case "enrich":
      return "/wand-2.svg";
    case "review":
      return "/clipboard-check.svg";
  }
}
