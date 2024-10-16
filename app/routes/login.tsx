import { Form, Link, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect, json } from "@remix-run/node";
import axios, { isAxiosError } from "axios";
import { getSession, commitSession } from "../services/session";
import Header from "../components/organisms/Header";
import { useState, useEffect } from "react";
import { userLogin } from "../interfaces/user";
import InputField from "../components/atoms/InputField";

// Acción del formulario
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { username, password } = Object.fromEntries(formData);

  const endpoint = "http://127.0.0.1:8000/" + "users/token";
  try {



    // Intentamos hacer la petición al backend
    const response = await axios.post(
      endpoint,
      new URLSearchParams({
        username: username as string,
        password: password as string,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    // Si la respuesta es exitosa, guardamos el token en la sesión y redirigimos
    if (response.status === 200) {
      const session = await getSession();
      session.set("auth_token", response.data.access_token);
      return redirect("/dashboard", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  } catch (error) {
    // Si ocurre un error, lo capturamos y devolvemos el mensaje de error al frontend
    if (isAxiosError(error) && error.response?.status === 401) {
      return json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
    }

    return json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// Cargador (loader) del componente
export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("auth_token");

  // Si el usuario ya está autenticado, lo redirigimos al dashboard
  if (token) {
    return redirect("/dashboard");
  }

  return json({});
}

// Componente de Login
export default function Login() {
  const actionData = useActionData<{ error?: string }>();
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState<userLogin>({
    username: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para manejar el error

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    if (actionData?.error) {
      setErrorMessage(actionData.error);
    }
  }, [actionData]);

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
          <h2 className="text-2xl text-center font-black">
            Login
          </h2>

          {/* Mostrar mensaje de error si existe */}
          {errorMessage && (
            <p className="text-red-500 text-sm">
              {errorMessage}
            </p>
          )}

          <InputField
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="border-2 px-4 py-4 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-none dark:text-gray-200"
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border-2 px-4 py-4 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-none dark:text-gray-200"
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            disabled={disabled}
            type="submit"
          >
            Login
          </button>

          <p className="text-sm">
            Don&apos;t have an account? &nbsp;
            <Link
              className="text-blue-500 cursor-pointer bg-transparent border-none p-0 m-0"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </Form>
      </main>
    </body>
  );
}
