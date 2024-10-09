import UrlCard from "../molecules/UrlCard";
import { User } from "../../interfaces/user";
interface url {
  clicks: number;
  long_url: string;
  short_url: string;
  name: string;
}
interface DashboardMainProps {
  urls: url[];
  user: User | null;
}

export default function DashboardMain({ urls, user }: DashboardMainProps) {
  console.log(user);
  return (
    <main className="flex flex-col gap-8  items-start justify-start mt-10 w-full max-w-[1020px] relative p-4">
      <h1
        className="
        text-3xl font-bold tracking-tight text-gray-900 dark:text-white
        "
      >
        Welcome back {user?.username}
      </h1>

      < div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" >
        {
          urls.map((url, index) => {
            return (
              <UrlCard
                key={index}
                shortUrl={url.short_url}
                originalUrl={url.long_url}
                name={url.name}
                clickCount={url.clicks}
              />
            )
          })
        }
      </div >
    </main>
  );
}