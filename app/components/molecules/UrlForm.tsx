import PrimaryButton from "../atoms/PrimaryButton";
import InputField from "../atoms/InputField";
import { useState } from "react";
import { User } from "../../interfaces/user";

interface PrimaryInputProps {
  placeholder: string;
  buttonText: string;
  onClick: () => void;
  user: User | null;
}

export default function UrlForm({ placeholder, buttonText, onClick, user }: PrimaryInputProps) {

  const [value, setValue] = useState('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  }

  return (
    <form
      className="dark:bg-white bg-slate-800 shadow-lg rounded p-4 mb-4 flex gap-0"
    >
      <InputField
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <PrimaryButton
        text={buttonText}
        onClick={handleSubmit}
        disabled={user ? false : true}
      />
    </form>
  )
}