const Login = () => {
  return (
    <div>
      <form className="flex flex-col gap-2.5 px-8 pb-1.5 bg-[#171717] rounded-[25px] transition-transform duration-300 ease-in-out hover:scale-105 hover:border hover:border-black">
        <p id="heading" className="text-center my-8 text-white text-lg">
          Login
        </p>
        <div className="flex items-center justify-center gap-2.5 rounded-[25px] p-2.5 bg-[#171717] shadow-inner shadow-black">
          <svg
            className="h-[1.3em] w-[1.3em] fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643z"></path>
          </svg>
          <input
            className="bg-transparent border-none outline-none w-full text-gray-300"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="flex items-center justify-center gap-2.5 rounded-[25px] p-2.5 bg-[#171717] shadow-inner shadow-black">
          <svg
            className="h-[1.3em] w-[1.3em] fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            className="bg-transparent border-none outline-none w-full text-gray-300"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center flex-row mt-10">
          <button className="px-4 py-2 rounded bg-[#252525] text-white transition duration-300 hover:bg-black mr-2">
            Login
          </button>
          <button className="px-6 py-2 rounded bg-[#252525] text-white transition duration-300 hover:bg-black">
            Sign Up
          </button>
        </div>
        <button className="mb-12 px-4 py-2 rounded bg-[#252525] text-white transition duration-300 hover:bg-red-600">
          Forgot Password
        </button>
      </form>
    </div>
  );
};

export default Login;
