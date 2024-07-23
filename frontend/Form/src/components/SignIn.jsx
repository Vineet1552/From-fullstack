import './SignIn.css';
import axios from 'axios';
import { useState } from 'react';
import { SignUp } from './Signup';

export const SignIn = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const arr = [
    { SrNo: "01", Name: "Vineet", Role: "Intern", Status: "Active", Action: "Taken", ProfileCreated: "02-11-2024" },
    { SrNo: "02", Name: "Akhil", Role: "Manager", Status: "Inactive", Action: "Pending", ProfileCreated: "15-10-2023" },
    { SrNo: "03", Name: "Ansh", Role: "Developer", Status: "Active", Action: "Completed", ProfileCreated: "08-03-2022" },
    { SrNo: "04", Name: "Avi", Role: "Intern", Status: "Active", Action: "In Progress", ProfileCreated: "21-07-2021" },
    { SrNo: "05", Name: "Zeba", Role: "Tester", Status: "Inactive", Action: "Rejected", ProfileCreated: "10-09-2020" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      userName: formData.get('userName'),
      password: formData.get('password')
    };

    try {
      const response = await axios.post('http://localhost:3000/candidate/signin', data);
      console.log(response);
      console.log(response.data);
      console.log(response.data.userName);

      // storing the candidate to the local storage
      localStorage.setItem('userName', response.data.userName);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('dob', response.data.dob);

      setIsLoggedIn(true);
      alert('SignIn successful!');
    } catch (error) {
      console.error('Error occurred:', error);
      alert('Invalid Credentials');
    }
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  if (showSignUp) {
    return <SignUp />;
  }

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h1 className="mainHeading">Sign In</h1>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label>Username:</label>
              <input type="text" id="userName" name="userName" required placeholder='userName' />
            </div>
            <div className="formGroup">
              <label>Password:</label>
              <input type="password" id="password" name="password" required placeholder='password'/>
            </div>
            <button type="submit" className="submitButton">Submit</button>
            <button type="button" className="LoginButton" onClick={toggleSignUp}>Sign Up</button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="mainHeading">User Dashboard</h1>
        <div className="userData">
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
                <th>Profile Created</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((item) => (
                <tr key={item.SrNo}>
                  <td>{item.SrNo}</td>
                  <td>{item.Name}</td>
                  <td>{item.Role}</td>
                  <td>{item.Status}</td>
                  <td>{item.Action}</td>
                  <td>{item.ProfileCreated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default SignIn;
