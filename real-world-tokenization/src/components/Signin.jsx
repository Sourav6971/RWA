import React from "react";

const Signin = () => {
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary w-full">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
