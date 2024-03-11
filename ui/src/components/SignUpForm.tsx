import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { User } from "../models/user";
import { useState } from "react";

interface SignUpFormProps {
    onDismiss: () => void,
    onSignupSuccessful: (user: User) => void,
}

const SignUpForm = ({onDismiss, onSignupSuccessful}: SignUpFormProps) => {
    
    const { register, handleSubmit, formState: { errors, isSubmitting}} = useForm<SignUpCredentials>();

    const [signUpError, setSignUpError] = useState('');
    
    async function onSubmit(credentials: SignUpCredentials){
        try {
            const newUser = await UsersApi.signUp(credentials);
            onSignupSuccessful(newUser);
        } catch (error) {
            // Check if error is an instance of Error and use its message property
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            setSignUpError(errorMessage);
            console.error(error);
        }
    }

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className=" text-center">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                        Sign up for Powerlifting Performance Analytics
                    </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Username field */}
              <div className="rounded-md shadow-sm -space-y-px">
            <label className="block">
                        <span className="text-gray-700">Username</span>
                        <input
                            type="text"
                            title="Please enter a valid username"
                            placeholder="Username"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                            {...register("username", { required: true })}
                        />
                        {errors.username && (
                <span className="text-red-600">Username is required</span>
              )}
              </label>

              {/* Email field */}
              <label className="block">
                        <span className="text-gray-700">Email</span>
                        <input
                            type="text"
                            title="Please enter a valid email"
                            placeholder="Email"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
              </label>

              {/* Field for Password */}
              <label className="block">
                        <span className="text-gray-700">Password</span>
                        <input
                            type="text"
                            title="Please enter a valid password"
                            placeholder="Password"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                <span className="text-red-600">Password is required</span>
              )}
              </label>

              {/* Buttons */}
              <div className="items-center px-4 py-3">
              {signUpError && <div className="text-red-500 text-center">{signUpError}</div>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full flex justify-center py-2 px-4 mb-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"                >
                  Sign Up
                </button>

                <button
                  type="button"
                  onClick={onDismiss}
                  className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"                >
                  Close
                </button>
                </div>
              </div>
            </form>
        </div>
      </div>
    );
};

export default SignUpForm;