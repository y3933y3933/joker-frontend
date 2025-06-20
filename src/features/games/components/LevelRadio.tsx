import { LevelColorClassMap } from "../constants";
import type { Level, LevelOption } from "../types";

interface LevelRadioProps {
  option: LevelOption;
  selectedLevel: Level;
  onChange: (level: Level) => void;
}

export default function LevelRadio({
  selectedLevel,
  option,
  onChange,
}: LevelRadioProps) {
  return (
    <label
      className={`block p-4 border rounded-lg cursor-pointer transition-all duration-300  ${
        selectedLevel === option.value
          ? `${LevelColorClassMap[option.value].bg} ${LevelColorClassMap[option.value].border}`
          : "border-gray-600 hover:border-gray-400"
      }`}
    >
      <input
        type="radio"
        value={option.value}
        checked={selectedLevel === option.value}
        onChange={(e) => onChange(e.target.value as Level)}
        className="sr-only"
      />
      <div className="flex justify-between items-center">
        <span
          className={`font-bold text-sm ${LevelColorClassMap[option.value].text}`}
        >
          {option.label}
        </span>
        <span className="text-sm text-gray-400">{option.description}</span>
      </div>
    </label>
  );
}
