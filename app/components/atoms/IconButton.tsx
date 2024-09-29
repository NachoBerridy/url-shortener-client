// Recives a component or a string and renders it as a button with a icon
interface IconButtonProps {
  icon: string | JSX.Element | React.ReactNode;
  onClick?: () => void;
}

export default function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className=" text-white font-bold rounded flex items-center justify-center p-2 size-24"
    >
      {icon}
    </button>
  )
}