import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import waveBackground from '../assets/waveBackground.png';

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [securityAnswer, setSecurityAnswer] = useState('');

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.dismiss();

    if (await handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
        securityAnswer, // Add security answer to the login request
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        console.log(data.user);
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleValidation = () => {
    const { password, username, securityAnswer } = values;
    var valid = true;

    if (password === '' || username === '' || securityAnswer === '') {
      toast.error('Username, Password, and Security Question Answer are required.', toastOptions);
      valid = false;
    }

    return valid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'securityAnswer') {
      setSecurityAnswer(value);
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>colordit chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <div className="security-question">
            <label htmlFor="securityAnswer">Security Question: What city where you born in?</label>
            <input
              type="text"
              placeholder="Answer"
              name="securityAnswer"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #26184a;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    background-color: #1d1238;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    .security-question {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      label {
        color: white;
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      width: 100%;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #5636a7;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
