interface PrimaryButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

export default function PrimaryButton({ text, onClick, disabled }: PrimaryButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick ? onClick : () => { }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      disabled={disabled ? true : false}
    >
      {text}
    </button>
  )
}