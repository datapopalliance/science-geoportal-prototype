import clsx from "clsx";
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("content-stretch flex flex-col h-full items-center relative shrink-0", additionalClassNames)}>
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.5] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-center tracking-[-0.176px] w-full">{text}</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center relative size-full">
      <div className="flex flex-row items-center self-stretch">
        <Text text="LEFT PANEL" additionalClassNames="px-[20px] w-[208px]" />
      </div>
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-[896px]">
        <div className="bg-[#b59f9f] relative shrink-0 w-full">
          <div className="flex flex-col items-center size-full">
            <div className="content-stretch flex flex-col gap-[108px] items-center px-[10px] relative w-full">
              <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.5] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-center tracking-[-0.176px] w-full">MAP VIEW</p>
              <div className="h-[64px] shrink-0 w-full" />
              <div className="h-[246px] shrink-0 w-full" />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.5] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] tracking-[-0.176px] w-full">BOTTOM DRAWER (collapsible) - analysis</p>
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Text text="RIGHT PANEL" additionalClassNames="w-[225px]" />
      </div>
    </div>
  );
}