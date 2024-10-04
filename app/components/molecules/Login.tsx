import InputField from "../atoms/InputField";
import PrimaryButton from "../atoms/PrimaryButton";

import { useState } from "react";

interface userLogin {
  email: string;
  password: string;
}

export default function Signup() {

  const [user, setUser] = useState<userLogin>({
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setUser({
      ...user,
      [key]: e.target.value
    });
    if (user.email && user.password) {
      setDisabled(false);
    } else {
      setDisabled
    }
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("User: ", user);
  }



  return (
    <form
      className="
      space-y-4 bg-white dark:bg-[#00091d] rounded-lg z-40 dark:text-blue-500
      text-black w-1/3 flex flex-col p-4 justify-center items-center
      "
    >
      <h2 className="text-2xl text-center font-black">
        Sign Up
      </h2>
      <InputField
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => handleChange(e, 'email')}
        className="border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-none dark:text-gray-200"
      />
      <InputField
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => handleChange(e, 'password')}
        className="border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-none dark:text-gray-200"

      />
      <PrimaryButton
        text="Sign Up"
        onClick={handleSubmit}
        disabled={disabled}
      />
    </form>
  )

}