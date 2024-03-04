import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import SignUpForm from '../components/SignUpForm';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../network/users_api';
import * as UsersApi from "../network/users_api";
import { useUser } from '../components/UserContext';
import background  from '../assets/background.jpg'
import { GoogleLoginButton } from 'react-social-login-buttons';



const LoginPage = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<LoginCredentials>();
  const [showSignUp, setShowSignUp] = useState(false);

  const { setUser } = useUser();

  async function onSubmit(credentials: LoginCredentials){
    try {
      const user = await UsersApi.login(credentials);
      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${background})` }}>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md ">
        <div>
          <h2 className="text-center text-2xl font-extrabold text-gray-900">
            Sign in to Powerlifting Performance Analytics
          </h2>
        </div>
        <div className="mt-6">
            <GoogleLoginButton onClick={() => window.location.href = 'http://localhost:5000/auth/google'} />
        </div>
        <div></div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-bold text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            {...register("username", { required: true })}
            className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            placeholder="Username"
          />
          {errors.username && <span className="text-red-600">This field is required</span>}
        </div>
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", { required: true })}
            className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            placeholder="Password"
          />
          {errors.password && <span className="text-red-600">This field is required</span>}
        </div>
      </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="rememberMe" name="rememberMe" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 mb-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-white group-hover:text-blue-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
            <button type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
             onClick={() => setShowSignUp(true)}>Register</button>
          </div>
        </form>
      </div>
      { showSignUp &&
      <SignUpForm
      onDismiss={() => setShowSignUp(false) }
      onSignupSuccessful={(user) => { 
        setShowSignUp(false);
        navigate('/dashboard');
        setUser(user);}}
      />
}
    </div>
  );
};

export default LoginPage;
