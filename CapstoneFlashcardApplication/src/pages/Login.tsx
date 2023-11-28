import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', values)
    .then(res => {
      if(res.data.Status === "Success") {
        navigate('/')
      }
      else {
        alert(res.data.Error);
      }
    })
    .then(err => console.log(err));
  }

  return (
    <div className="flex items-center justify-center h-screen w-full text-white">
      <div className="flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="border border-gray-600 max-w-[400px] w-full mx-auto sm:mx-10 p-4">
          <h2 className="text-4xl font-bold text-center py-6 text-[#00df9a]">
            LOGIN
          </h2>
          <div className="flex flex-col py-2">
            <label htmlFor="email">Email</label>
            <input className="border p-2 text-black" type="email" placeholder="Enter Email" name="email" onChange={e => setValues({...values, email: e.target.value})}/>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password">Password</label>
            <input className="border p-2 text-black" type="password" placeholder="Enter Password" name="password" onChange={e => setValues({...values, password: e.target.value})}/>
          </div>
          <button type="submit" className="border w-full my-5 py-2 bg-[#00df9a] hover:bg-[#4DE3B5] text-[#13163b] font-medium">
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
