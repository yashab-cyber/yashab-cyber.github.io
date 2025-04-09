import React from "react";

const Login = () => {
  const googleLogin = () => {
    window.location.href = "/auth/google"; // Redirect to backend Google OAuth
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Zehra Sec Login</h1>
        <p className="mb-8 text-gray-400">Secure access with your Google account</p>

        <button
          onClick={googleLogin}
          className="bg-blue-600 hover:bg-blue-800 transition px-6 py-3 rounded text-white font-semibold w-full"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
