import { useLoaderData } from "@remix-run/react";
import { dashboardLoader } from "~/interfaces/user";

interface UrlCardProps {
  shortUrl: string;
  originalUrl: string;
  name: string;
  clickCount: number;
}

export default function UrlCard({ shortUrl, originalUrl, name, clickCount }: UrlCardProps) {

  const { api } = useLoaderData<dashboardLoader>();

  shortUrl = api + shortUrl

  return (

    <a
      href="/"
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Short URL:{" "}
        <a href={shortUrl} className="text-blue-500 underline">{shortUrl}</a>
      </p>
      <p className="text-gray-500 dark:text-gray-300">
        Original URL:{" "}
        <a href={originalUrl} className="text-blue-500 underline">{originalUrl}</a>
      </p>
      <div className="mt-4">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Clicks: {clickCount}
        </span>
      </div>
    </a>

  );


}