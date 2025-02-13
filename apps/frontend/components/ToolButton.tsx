interface ToolButtonProps {
    icon: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
  }
  
  export const ToolButton = ({ icon, isSelected, onClick }: ToolButtonProps) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-md text-[#e3e3e8] transition-colors ${
        isSelected ? "bg-[#4f4d6f]" : "hover:bg-[#2a2a2a]"
      }`}
    >
      {icon}
    </button>
  );
  