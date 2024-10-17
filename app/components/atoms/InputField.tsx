interface PrimaryInputProps {
  type: 'text' | 'password' | 'email';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  error?: string | null;
}

export default function InputField({ type, placeholder, value, onChange, className, name, error }: PrimaryInputProps) {

  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name || ''}
        className={`
          ${className} appearance-none 
          bg-transparent w-full py-2 
          px-3 leading-tight 
          focus:outline-none text-gray-200
        `}
      />
      {
        error && <p className="text-red-500 text-xs px-3 py-0">{error}</p>
      }
    </div>
  )
}