import React from "react";

const Registration = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full text-white">
      <div className="flex flex-col justify-center">
        <form className="border border-gray-600 max-w-[400px] w-full mx-auto sm:mx-10 p-4">
          <h2 className="text-4xl font-bold text-center py-6 text-[#00df9a]">
            REGISTRATION
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col py-2">
            <label>First Name</label>
            <input className="border p-2 text-black" type="firstname" />
          </div>
          <div className="flex flex-col py-2">
            <label>Last Name</label>
            <input className="border p-2 text-black" type="lastname" />
          </div></div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input className="border p-2 text-black" type="email" />
          </div>
          <div className="flex flex-col py-2">
            <label>Username</label>
            <input className="border p-2 text-black" type="username" />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input className="border p-2 text-black" type="password" />
          </div>
          <div className="flex flex-col py-2">
            <label>Confirm Password</label>
            <input className="border p-2 text-black" type="password" />
          </div>
          <button className="border w-full my-5 py-2 bg-[#00df9a] hover:bg-[#4DE3B5] text-[#13163b] font-medium">
            Register Now
          </button>
          <div className="flex justify-between">
            <p className="flex items-center">
              <input className="mr-1" type="checkbox" />
              I accept the Terms Of Use & Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;