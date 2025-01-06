/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import lg from "../../assets/auth/login.svg";
import { useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { signIn, signInWithGoogle, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || "/";

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      const { displayName, email } = result.user;
      const newUser = { name: displayName || "Anonymous", email };
      //await axios.post("http://localhost:5000/user/add", newUser);

      toast.success("Successfully Logged In!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign In Error:", error.message);
      toast.error("Log in unsuccessful. Try Again!");
    }
  };

  // Email Sign In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn(email, password);
      toast.success("Successfully Logged In!");
      navigate("/");
    } catch (error) {
      console.error("Email Sign In Error:", error.message);
      toast.error("Log in unsuccessful. Try Again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="bg-cover bg-center lg:block lg:w-1/2 relative"
          style={{
            backgroundImage: `url(${lg})`,
            opacity: 1,
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <p className="mt-3 text-4xl text-center text-gray-600 ">
            Welcome back!
          </p>

          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                {/* Google Icon SVG */}
              </svg>
            </div>
            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase hover:underline">
              or login with email
            </div>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          <form onSubmit={handleEmailSignIn}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                name="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <input
                id="loggingPassword"
                autoComplete="current-password"
                name="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link
              to="/reg"
              className="text-xs text-gray-500 uppercase hover:underline"
            >
              or sign up
            </Link>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
