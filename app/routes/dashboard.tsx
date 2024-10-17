import { getUser, getUsersUrls } from "../services/user";
import { useEffect, useState } from "react";
import { getSession } from "../services/session";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "../components/organisms/Header";
import { User, dashboardLoader } from "../interfaces/user";
import DashboardMain from "~/components/organisms/DashboardMain";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const api = process.env.API_URL;
  return {
    "session": session.data,
    api
  }
}
interface url {
  clicks: number;
  long_url: string;
  short_url: string;
  name: string;
}

export default function Dashboard() {

  const { session } = useLoaderData<dashboardLoader>();
  const [user, setUser] = useState<User | null>(null);
  const [urls, setUrls] = useState<url[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (session?.auth_token) {
          const userData = await getUser(session.auth_token);
          const urlsData = await getUsersUrls(session.auth_token);
          if (!userData.error) {
            setUser(userData);
          } else {
            console.error(userData.error);
          }
          if (!urlsData.error) {
            setUrls(urlsData);
          } else {
            console.error(urlsData.error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [session]);


  return (
    <div className=" flex h-screen items-center justify-start w-screen flex-col dark:text-white text-black
      z-[-2] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]
      bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100
    "
    >
      <Header src={null} />
      <DashboardMain urls={urls} user={user} />
    </div>
  );
}