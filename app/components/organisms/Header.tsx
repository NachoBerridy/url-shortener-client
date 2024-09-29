import NavBar from "../molecules/Navbar";

interface HeaderProps {
  src: string | null;
}

export default function Header({ src }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-center flex-wrap max-w-[1020px]">
      <NavBar src={src} />
    </header>
  )
}