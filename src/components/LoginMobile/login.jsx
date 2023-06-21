import React, {useState} from 'react';
import Logo from '../../Assets/logo.svg';
import './login.css'
import { Box } from '@mui/material';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email);
    }
  return (
    <>
    <Box sx={{backgroundColor: {md: "white", xs:"#100D24"}, height: {md: "",  xs:"100vh"}}}>
    <div className='Image-Box'>
    <img className='logo-img' src={Logo}/>
    </div>
     <div className='auth-form-container fixed'>
      <div className='padding'>
        <h3 className='center'>Login</h3>
        <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor='email' className='disable'>Email or Username</label>
            <input className='inputs' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Your Mail..' id='email' name='email'/>
            <label htmlFor='password' className='disable'>Password</label>
            <input className='inputs' value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='Enter your password' id='password' name='password'/>
            <button className='login' type='submit' >Login as Admin</button>
            <button className='loginAsfield' type='submit'>Login as Field Agent</button>
        </form>
        <button className='forget-pass disable' onClick={() => props.onFormSwitch('reset')}>Forget Password?</button>
        </div>
    </div>
    </Box>
   
    </>
   
  )
}

export default Login;