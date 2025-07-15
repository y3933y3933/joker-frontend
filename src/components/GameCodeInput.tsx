import { useId } from "react";
import {
  OTPInput,
  REGEXP_ONLY_DIGITS_AND_CHARS,
  type SlotProps,
} from "input-otp";

import { cn } from "@/lib/utils";

interface GameCodeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GameCodeInput({ value, onChange }: GameCodeInputProps) {
  const id = useId();

  const handleChange = (inputValue: string) => {
    onChange(inputValue.toUpperCase());
  };

  return (
    <div className="*:not-first:mt-2">
      <OTPInput
        id={id}
        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={value}
        onChange={handleChange}
        render={({ slots }) => (
          <div className="flex gap-2 ">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input  flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow] bg-black text-white",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
