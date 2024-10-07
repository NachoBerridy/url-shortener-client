import { Form, Link } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import axios from "axios";
import { getSession, commitSession } from "../services/session";
import Header from "../components/organisms/Header";
import { useEffect, useState } from "react";
import { userSignup } from "../interfaces/user";
import InputField from "../components/atoms/InputField";

export async function action({ request }: ActionFunctionArgs) {
  console.log("action");
  const formData = await request.formData();
  const { username, password, full_name, email } = Object.fromEntries(formData);

  const endpoint = "http://127.00.1:8000/users/signup";
  const response = await axios.post(
    endpoint,
    { username, password, full_name, email },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  if (response.status == 200) {


    const session = await getSession();
    session.set('auth_token', response.data.access_token);
    return redirect('/dashboard', {
      headers: {
        'set-cookie': await commitSession(session),
      }
    });
  } else {
    return new Response('Unauthorized', {
      status: 401
    });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  return session.data;
}





export default function Signup() {

  const [disabled, setDisabled] = useState(true);
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [user, setUser] = useState<userSignup>({
    email: "",
    password: "",
    full_name: "",
    username: ""
  });


  useEffect(() => {
    if (user.email && user.password && user.full_name && user.username && repeatedPassword === user.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user, repeatedPassword]);

  return (
    <body className="
      flex h-screen items-center justify-start w-screen flex-col dark:text-white text-black
      z-[-2] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]
      bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100"
    >
      <Header src={null} />
      <main className="flex flex-col items-center justify-center w-full h-full">
        <Form
          method="post"
          className="
          space-y-4 bg-gray-100 dark:bg-[#00091d] rounded-lg z-40 text-blue-500
          w-1/3 flex flex-col p-4 justify-center items-center shadow-lg shadow-black
          "
        >
          <h1 className="text-2xl text-center font-black">
            Sign Up
          </h1>
          <InputField
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-none dark:text-gray-200"
          />
          <InputField
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={user.full_name}
            onChange={(e) => setUser({ ...user, full_name: e.target.value })}
            className="border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-none dark:text-gray-200"
          />
          <InputField
            type="email"
            name="email"
            placeholder="email@example.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-none dark:text-gray-200"
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-none dark:text-gray-200"
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            name="password"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
            className="border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-none dark:text-gray-200"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white disabled:cursor-not-allowed 
              font-bold py-2 px-4 rounded cursor-pointer disabled:bg-gray-500"
            disabled={disabled}
          >
            Signup
          </button>

          <p className="text-sm">
            Don&apos;t have an account? &nbsp;
            <Link
              className="text-blue-500 cursor-pointer bg-transparent border-none p-0 m-0"
              to="/login"
            >
              Login
            </Link>
          </p>
        </Form>
      </main>
    </body>
  )

}