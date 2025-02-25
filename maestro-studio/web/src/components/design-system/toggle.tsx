import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  label?: string;
}

const Toggle = ({ checked = false, disabled, onChange, className, label }: ToggleProps) => {
  const [isOn, setIsOn] = useState(checked);

  useEffect(() => {
    setIsOn(checked); // Sync local state with the parent prop
  }, [checked]);

  const handleClick = () => {
    if (disabled) return;
    const newState = !isOn;
    setIsOn(newState);
    onChange?.(newState); // Notify parent about state change
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={twMerge(
          "w-12 h-6 flex items-center rounded-full p-1 transition duration-300",
          isOn ? "bg-blue-500" : "bg-gray-300",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        )}
      >
        <div
          className={twMerge(
            "w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300",
            isOn ? "translate-x-6" : "translate-x-0"
          )}
        ></div>
      </button>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};

export { Toggle };