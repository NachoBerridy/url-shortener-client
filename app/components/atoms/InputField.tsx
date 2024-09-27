interface PrimaryInputProps {
  type: 'text' | 'password' | 'email';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ type, placeholder, value, onChange }: PrimaryInputProps) {

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="appearance-none rounded bg-transparent w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
    />
  )
}