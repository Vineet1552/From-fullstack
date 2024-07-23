import './Signup.css';
import axios from 'axios';
import { useState } from 'react';
import { SignIn } from './SignIn';

export const SignUp = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      userName: formData.get('userName'),
      dob: formData.get('dateOfBirth'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await axios.post('http://localhost:3000/candidate/signup', data);
      console.log(response.data);
      alert('Signup successful!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error occurred:', error);
        alert('Error during signup. Please try again.');
      }
    }
  };

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  if (showSignIn) {
    return <SignIn />;
  }

  return (
    <div className="container">
      <h1 className="mainHeading">Sign Up</h1>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Username:</label>
            <input type="text" id="userName" name="userName" required placeholder='userName' />
          </div>
          <div className="formGroup">
            <label>Date of Birth:</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" required />
          </div>
          <div className="formGroup">
            <label>Email:</label>
            <input type="email" id="email" name="email" required placeholder='email'/>
          </div>
          <div className="formGroup">
            <label>Password:</label>
            <input type="password" id="password" name="password" required placeholder='password'/>
          </div>
          <button type="submit" className="submitButton">Submit</button>
          <button type="button" className="LoginButton" onClick={toggleSignIn}>Log In</button>
        </form>
      </div>
    </div>
  );
};
