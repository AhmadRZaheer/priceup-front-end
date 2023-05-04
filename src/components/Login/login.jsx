import React, {useState} from 'react';
import Logo from '../../Assets/logo.svg';
import './login.css'


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email);
    }
  return (
    <>
    <div>
    <div>
    <img className='logo-img' src={Logo}/>
    </div>
     <div className='auth-form-container'>
        <h3>Login</h3>
        <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email or Username</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Your Mail..' id='email' name='email'/>
            <label htmlFor='password'>Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='Enter your password' id='password' name='password'/>
            <button className='login' type='submit'>Login as Admin</button>
            <button className='loginAsfield' type='submit'>Login as Field Agent</button>
        </form>
        <button className='forget-pass' onClick={() => props.onFormSwitch('reset')}>Forget Password?</button>
    </div>
    </div>
   
    </>
   
  )
}

export default Login;