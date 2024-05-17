import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import "../Stylesheets/Signin.css";
import { useAuth } from '../Context/AuthContext';

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const { signin, error, setError } = useAuth();
  const [passwordInput, setPasswordInput] = useState(false);
  const [formData, setFromData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate("/language")
    }
  }, [navigate])


  const handelChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      setPasswordInput(!!e.target.value);
    }
    setError("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setError("The password must consist of a minimum of eight characters, encompassing a blend of letters, special characters, and numbers");
    }
    else if (formData.password !== formData.confirmpassword) {
      setError("Password does not match");
    }
    else {
      // Check if the email already exists in the database via registration endpoint
      await signin(formData)
      navigate("/language")
    }
  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const styles = {
    position: "absolute",
    right: "2.6em", /* Adjust as needed */
    top: "52%", /* Adjust to vertically center */
    transform: "translateY(-50%)",
    cursor: "pointer",
  }

  const toggle = {
    position: "absolute",
    right: "2.6em", /* Adjust as needed */
    top: "52%", /* Adjust to vertically center */
    transform: "translateY(-50%)",
    cursor: "pointer",

  }
  const eyeIconWithErrorStyle = {
    ...styles,
    top: "calc(52% + 1.5rem)", /* Adjust based on error message height */
  };
  return (
    <div className='bg-container'>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h2>Signup</h2>
                <p style={{ color: "red" }}>{error}</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input type="text" className="form mt-4" name="username" placeholder="Name" value={formData.name} onChange={handelChange} required />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form mt-4" name="email" placeholder="Email" value={formData.email} onChange={handelChange} required />
                  </div>
                  <div className="mb-3">
                    <input type={showPassword ? 'password' : 'text'} className="form mt-4" name="password" placeholder="Password" value={formData.password} onChange={handelChange} required />
                  </div>
                  {
                    passwordInput && (
                      showPassword ? (
                        <FontAwesomeIcon style={error ? eyeIconWithErrorStyle : styles} icon={faEye} onClick={togglePasswordVisibility} />
                      ) : (<FontAwesomeIcon style={error ? eyeIconWithErrorStyle : toggle} icon={faEyeSlash} onClick={togglePasswordVisibility} />
                      )
                    )
                  }
                  <div className="mb-3">
                    <input type="password" className="form mt-4 passwordfield" name="confirmpassword" placeholder="Confirm password" value={formData.confirmpassword} onChange={handelChange} required />
                  </div>
                  <button type="submit" className="submit btn btn-primary">Sign Up</button>
                  <p className="mt-3 text-center">Already have an account? <a href="/login" className='btn btn-link link' style={{ padding: 0, marginBottom: "0.5em" }}>Login</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin;