import { User } from "../../interfaces/user";
import PrimaryButton from "../atoms/PrimaryButton";
import { Link, useNavigate, Form } from "@remix-run/react";

export default function ProfileNav({ user }: { user: User | null }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/login');
  }

  return (
    <nav
      className="
        flex flex-col items-center justify-center
        absolute top-full right-0 w-40 h-32
        bg-clip-padding backdrop-blur-sm bg-opacity-60 bg-gray-800
        rounded-3xl shadow-lg z-10
      "
    >
      {
        user ?
          (<ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              <Form method="post" action="/logout">
                <button type="submit" onClick={handleLogout}>
                  Logout
                </button>
              </Form>
            </li>
          </ul>) :
          (
            <Link to="/login">
              <PrimaryButton text="Login" />
            </Link>
          )
      }
    </nav>
  )
}