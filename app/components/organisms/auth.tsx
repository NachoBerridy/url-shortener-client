import Signup from "../molecules/Signup";
import Login from "../molecules/Login";
import { useState } from "react";

interface AuthProps {
  click: (showLogin: boolean) => void;
}

export default function Auth({ click }: AuthProps) {

  const [isLogin, setIsLogin] = useState(true);


  return (
    <div className="h-screen w-screen flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 margin-auto z-20">
      <div
        role="button"
        tabIndex={0}
        className="
          absolute top-0 left-0 right-0 bottom-0 margin-auto 
          z-30 text-2xl bg-gray-800 h-screen w-screen
          backdrop-blur-sm bg-clip-padding bg-opacity-50
        "
        onClick={() => click(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            click(false);
          }
        }}
      >
      </div>
      {isLogin ?
        <Login changeToSignup={() => setIsLogin(false)} /> :
        <Signup changeToLogin={() => setIsLogin(true)} />
      }
    </div>
  )
}