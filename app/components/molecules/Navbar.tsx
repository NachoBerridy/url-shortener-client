import ProfileIcon from "../atoms/ProfileIcon";
import IconButton from "../atoms/IconButton";
import SunIcon from "../../assets/icons/SunIcon";
import MoonIcon from "../../assets/icons/MoonIcon";
import { useState, useEffect } from "react";

interface NavBarProps {
  src: string | null;
}

export default function NavBar({ src }: NavBarProps) {

  const [theme, setTheme] = useState(true);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <nav className="
      flex items-center justify-between flex-wrap p-2 px-4 w-full mt-2
      bg-clip-padding backdrop-blur-sm bg-opacity-10 bg-gray-300
      rounded-3xl shadow-lg z-10 
    ">
      <div className="flex items-center flex-shrink-0 mr-6">
        <span className="font-semibold text-xl tracking-tight">Shortr App</span>
      </div>
      <div className="flex items-center">
        {
          theme ? <IconButton icon={<SunIcon />} onClick={() => setTheme(false)} />
            : <IconButton icon={<MoonIcon />} onClick={() => setTheme(true)} />
        }
        <ProfileIcon src={src} />

      </div>
    </nav>
  )
}