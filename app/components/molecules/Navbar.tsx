import ProfileIcon from "../atoms/ProfileIcon";
import IconButton from "../atoms/IconButton";
import SunIcon from "../../assets/icons/SunIcon";
import MoonIcon from "../../assets/icons/MoonIcon";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { User } from "../../interfaces/user";
import ProfileNav from "./profileNav";
import urlIcon from "../../assets/icons/url-icon.svg";

interface NavBarProps {
  src: string | null;
  user: User | null;
}

export default function NavBar({ src, user }: NavBarProps) {
  const [openNav, setOpenNav] = useState(false);
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
      bg-clip-padding backdrop-blur-sm bg-opacity-10 bg-gray-800
      rounded-3xl shadow-lg z-10
    ">
      <Link className="flex items-center justify-start flex-shrink-0 mr-6 font-semibold text-2xl tracking-tight" to="/">
        <img src={urlIcon} alt="url-icon" className="w-8 h-8 inline-block mr-2" />
        Shortener App
      </Link>
      <div className="flex items-center">
        {
          theme ? <IconButton icon={<SunIcon />} onClick={() => setTheme(false)} />
            : <IconButton icon={<MoonIcon />} onClick={() => setTheme(true)} />
        }
        <ProfileIcon src={src} click={() => setOpenNav(!openNav)} />
        {
          openNav && <ProfileNav user={user} />
        }
      </div>
    </nav>
  )
}