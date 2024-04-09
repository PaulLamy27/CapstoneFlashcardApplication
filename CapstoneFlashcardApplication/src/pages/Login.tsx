import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
//import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();
  axiosInstance.defaults.withCredentials = true
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axiosInstance.post('/login', values)
      .then(res => {
        const token = res.data.token;
        console.log("token has been gotted: ", token);

        sessionStorage.setItem('user_token', token);
        // sessionStorage.setItem('userId', res.data.name);
        localStorage.setItem('user_token', token);
        // localStorage.setItem('userId', res.data.name);

        navigate('/')
        // location.reload();

        // if (res.data.Status === "Success") {
        //   navigate('/')
        //   location.reload();
        // }
        // else {
        //   alert(res.data.Error);
        // }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="flex items-center justify-center h-screen w-full text-skin-base">
      <div className="flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="border border-skin-dark max-w-[400px] w-full mx-auto sm:mx-10 p-4">
          <h2 className="text-4xl font-bold text-center py-6 text-skin-header">
            LOGIN
          </h2>
          <div className="flex flex-col py-2">
            <label htmlFor="username">Username</label>
            <input className="border p-2 text-skin-inverted" type="username" placeholder="Enter Username" name="username" onChange={e => setValues({...values, username: e.target.value})}/>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password">Password</label>
            <input className="border p-2  text-skin-inverted" type="password" placeholder="Enter Password" name="password" onChange={e => setValues({...values, password: e.target.value})}/>
          </div>
          <button type="submit" className="border w-full my-5 py-2 bg-skin-button hover:bg-skin-buttonselect text-skin-dark font-medium">
            Sign in
          </button>
          <div className="flex justify-between">
            <p className="flex items-center">
              <input className="mr-1" type="checkbox" />
              Remember me
            </p>
            <p>
              <Link to="/registration">Create an account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
