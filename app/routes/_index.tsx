import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Main from "../components/organisms/Main";
import Header from "../components/organisms/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSession } from "../services/session";

export const meta: MetaFunction = () => {
  return [
    { title: "Url Shortener" },
    { name: "description", content: "An open source URL Shortener" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {

  const session = await getSession(request.headers.get('Cookie'));
  return session.data;
}


export default function Index() {

  return (
    <body className="
      flex h-screen items-center justify-start w-screen flex-col dark:text-white text-black
      z-[-2] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]
      bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100"
    >
      <Header src={null} />
      <Main />
      <ToastContainer />
    </body >
  );
}
