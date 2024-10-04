import { useEffect, useState } from "react";
import NavBar from "../molecules/Navbar";
import { useLoaderData } from "@remix-run/react";
import { User } from "../../interfaces/user";
import { getUser } from "../../services/user";

interface HeaderProps {
  src: string | null;
}

export default function Header({ src }: HeaderProps) {

  const data = useLoaderData<{ auth_token?: string, user?: User }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (data?.auth_token) {
          const userData = await getUser(data.auth_token);
          if (!userData.error) {
            setUser(userData);
          } else {
            console.error(userData.error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [data]);

  return (
    <header className="flex w-full items-center justify-center flex-wrap max-w-[1020px]">
      <NavBar src={src} user={user} />
    </header>
  )
}