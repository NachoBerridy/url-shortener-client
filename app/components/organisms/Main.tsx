import UrlForm from "../molecules/UrlForm";
import { useEffect, useState } from "react";
import { useLoaderData, Link } from "@remix-run/react";
import { User } from "../../interfaces/user";
import { getUser } from "../../services/user";
import SocialNetworks from "../molecules/socialNetworks";

import { toast } from "react-toastify";

export default function Main() {

  const data = useLoaderData<{ auth_token?: string, user?: User }>();
  const [user, setUser] = useState<User | null>(null);


  const generateShortUrl = async (url: string, name: string) => {
    const endpoint = "http://127.0.0.1:8000/url/create";

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ "long_url": url, name }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.auth_token}`
      }
    });

    // Toast if the response is not ok
    if (!response.ok) {
      toast.error('Error shortening the URL');
    } else {
      toast.success('URL shortened successfully');
    }
  }




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
    <main className="flex flex-col gap-8  items-start justify-start mt-10 w-full max-w-[1020px] relative p-4">

      <h1
        className="
          text-5xl text-center font-bold from-teal-500 via-cyan-500 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent
        ">
        Shortener App
      </h1>
      <SocialNetworks />
      <section className="flex flex-col gap-8 pt-4 relative w-full items-start justify-start">
        {
          !user &&
          <div
            className="
            w-full h-full flex items-center justify-center absolute top-0 left-0 bg-opacity-50
            bg-gray-800 backdrop-filter backdrop-blur-md z-10
          "
          >
            <h2 className="text-4xl font-bold text-center">
              Please{' '}
              <Link to="/login" className="text-blue-500 hover underline">
                login
              </Link>
              {' '}to use the URL Shortener
            </h2>
          </div>
        }
        <h2 className="text-4xl font-bold text-center">URL Shortener</h2>
        <UrlForm
          placeholder="Enter a URL"
          buttonText="Shorten"
          onClick={(url: string, name: string) => generateShortUrl(url, name)}
          user={user}
        />
      </section>
    </main>
  )
}