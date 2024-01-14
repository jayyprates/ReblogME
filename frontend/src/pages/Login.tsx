// Packages
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Project
import { login, signup } from "../services/auth";
import { logInAction, signUpAction } from "../actions/session";
import { useState } from "react";


const LoginPage: React.FC = () => {
  const signupForm = useForm();
  const logInForm = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOnSignUp = (data: any) => {
    setLoading(true);
    const { username, email, password } = data;

    signup(email, username, password)
      .then((resp) => {
        const { refreshToken, accessToken } = resp.data;

        dispatch(signUpAction(refreshToken, accessToken))
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }

  const handleOnLogIn = (data: any) => {
    setLoading(true);
    const { username, password } = data;

    login(username, password)
      .then((resp) => {
        const { refreshToken, accessToken } = resp.data;

        dispatch(logInAction(refreshToken, accessToken))
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }

  return (
    <div className="my-8">
      <div className="bg-white p-5 rounded-lg mb-8" style={{ width: 500, minHeight: 500}}>
        <h1 className="text-2xl font-bold">reblogME</h1>

        <hr className="my-5"/>

        <p className="font-bold text-left">Log in</p>
        <p className="text-left">You already have an account.</p>
        <form onSubmit={logInForm.handleSubmit(handleOnLogIn)}>
          <fieldset disabled={loading}>
            <div className="flex flex-col items-start mt-4 w-full">
              <input type='text' id="username_login" placeholder='Username' className="p-2 border-2 w-full" {...logInForm.register('username', { required: true, value: "testuser" })} />
              <input type='password' id="password_login" placeholder='Password' className="p-2 border-2 w-full mt-2" {...logInForm.register('password', { required: true, value: "testuser" })} />
              <button 
                type='submit' 
                className="w-full mt-4 p-2 bg-blue-500 text-white hover:bg-blue-800 disabled:bg-gray-400"
              >
                Log in
              </button>
            </div>
          </fieldset>
        </form>

        <hr className="my-5"/>

        <p className="font-bold text-left">Create an account</p>
        <p className="text-left">In case you already don't have one.</p>
        <form onSubmit={signupForm.handleSubmit(handleOnSignUp)}>
          <fieldset disabled={loading}>
            <div className="flex flex-col items-start mt-4 w-full">
              <input type='email' id="email_signup" placeholder='Email' className="p-2 border-2 w-full" {...signupForm.register('email', { required: true })} />
              <input type='text' id="username" placeholder='Username' className="p-2 border-2 w-full mt-2" {...signupForm.register('username', { required: true })} />
              <input type='password' id="password_signup" placeholder='Password' className="p-2 border-2 w-full mt-2" {...signupForm.register('password', { required: true })} />
              <button
                type='submit' 
                className="w-full mt-4 p-2 bg-green-500 text-white hover:bg-green-800 disabled:bg-gray-400"
              >
                Sign up
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;