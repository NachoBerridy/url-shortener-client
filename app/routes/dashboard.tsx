import { getUser, getUsersUrls } from "../services/user";
import { useEffect, useState } from "react";
import { getSession } from "../services/session";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "../components/organisms/Header";
import { User } from "../interfaces/user";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  return session.data;
}

export default function Dashboard() {

  const data = useLoaderData<{ auth_token?: string, user?: User }>();
  const [user, setUser] = useState<User | null>(null);
  const [urls, setUrls] = useState<any[]>([]);
  useEffect(() => {
    console.log(data);
    const fetchUser = async () => {
      try {
        if (data?.auth_token) {
          const userData = await getUser(data.auth_token);
          const urlsData = await getUsersUrls(data.auth_token);
          if (!userData.error) {
            setUser(userData);
          } else {
            console.error(userData.error);
            console.log(userData);
          }
          if (!urlsData.error) {
            setUrls(urlsData);
            console.log(urlsData);
          } else {
            console.error(urlsData.error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [data]);


  return (
    <body className=" flex h-screen items-center justify-start w-screen flex-col dark:text-white text-black
      z-[-2] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]
      bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100
    "
    >
      <Header src={null} />
      <main >

      </main>
    </body>
  );
}