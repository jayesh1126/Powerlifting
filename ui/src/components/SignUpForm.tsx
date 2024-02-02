import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../network/sets_api";
import * as SetsApi from "../network/sets_api";
import { User } from "../models/user";

interface SignUpFormProps {
    onDismiss: () => void,
    onSignupSuccessful: (user: User) => void,
}

const SignUpForm = ({onDismiss, onSignupSuccessful}: SignUpFormProps) => {
    
    const { register, handleSubmit, formState: { errors, isSubmitting}} = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials){
        try {
            const newUser = await SetsApi.signUp(credentials);
            onSignupSuccessful(newUser);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Sign Up
            </h3>
            <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
                className="mt-2 p-2 border rounded-md w-full"
              />
              {errors.username && (
                <span className="text-red-600">Username is required</span>
              )}

              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="mt-2 p-2 border rounded-md w-full"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}

              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="mt-2 p-2 border rounded-md w-full"
              />
              {errors.password && (
                <span className="text-red-600">Password is required</span>
              )}

              <div className="items-center px-4 py-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 mb-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Sign Up
                </button>

                <button
                  type="button"
                  onClick={onDismiss} // This button will call the onDismiss function when clicked
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default SignUpForm;