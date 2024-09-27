import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Url Shortener" },
    { name: "description", content: "An open source URL Shortener" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">

    </div >
  );
}
