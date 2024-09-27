import PrimaryButton from "../atoms/PrimaryButton";
import InputField from "../atoms/InputField";
import { useState } from "react";

interface PrimaryInputProps {
  placeholder: string;
  buttonText: string;
  onClick: () => void;
}

export default function UrlForm({ placeholder, buttonText, onClick }: PrimaryInputProps) {

  const [value, setValue] = useState('');

  return (
    <form className="bg-white shadow-md rounded p-4 mb-4 flex gap-0">
      <InputField
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <PrimaryButton
        text={buttonText}
        type="button"
        onClick={onClick}
      />
    </form>
  )
}