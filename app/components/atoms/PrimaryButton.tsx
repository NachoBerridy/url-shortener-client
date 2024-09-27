interface PrimaryButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function PrimaryButton({ text, type, onClick }: PrimaryButtonProps) {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  )
}