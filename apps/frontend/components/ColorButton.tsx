import { Check } from "lucide-react";

interface ColorButtonProps {
    color: string;
    isSelected: boolean;
    onClick: () => void;
  }
  
  export const ColorButton = ({ color, isSelected, onClick }: ColorButtonProps) => (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
        isSelected ? "scale-110 ring-2 ring-white" : ""
      }`}
      style={{ backgroundColor: color }}
    >
      {isSelected && <Check className="text-black" size={16} />}
    </button>
  );
  