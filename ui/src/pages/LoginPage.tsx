import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import SignUpForm from '../components/SignUpForm';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../network/sets_api';
import * as SetsApi from "../network/sets_api";
import { User } from '../models/user';

interface LoginPageProps {
  onLoginSuccessful: (user: User) => void,
}

const LoginPage = ({ onLoginSuccessful }: LoginPageProps) => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<LoginCredentials>();
  const [showSignUp, setShowSignUp] = useState(false);

  async function onSubmit(credentials: LoginCredentials){
    try {
      const user = await SetsApi.login(credentials);
      onLoginSuccessful(user);
      navigate('/dashboard');
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Powerlifting Performance Analytics
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                {...register("username", { required: true })}
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-none rounded-t-md placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Username"
              />
              {errors.username && <span className="text-red-600">This field is required</span>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password", { required: true })}
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-none rounded-b-md placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && <span className="text-red-600">This field is required</span>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 mb-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
            <button type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
             onClick={() => setShowSignUp(true)}>Register</button>
          </div>
        </form>
      </div>
      { showSignUp &&
      <SignUpForm
      onDismiss={() => setShowSignUp(false) }
      onSignupSuccessful={() => { }}
      />
}
    </div>
  );
};

export default LoginPage;
