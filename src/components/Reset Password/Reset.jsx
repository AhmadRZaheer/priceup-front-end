import React, {useState} from 'react';
import './reset.css';
import Logo from '../../Assets/logo.svg';


const Reset = (props) => {

    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <>
    <div>
    <div>
    <img className='logo-img' src={Logo}/>
    </div>
    <div className='auth-form-container'>
        <h3>Reset Password</h3>
        <p className='reset-info'>Enter the email address associated with your account, and we'll email you a link to reset your password.</p>
        <form className='reset-form' onSubmit={handleSubmit}>
            <label htmlFor='email'>Your Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email Address' id="email" name="email" />
            <button className='pass-reset' type='submit'>Send Password Reset Link</button>
        </form>
        <button className='cancel' onClick={() => props.onFormSwitch('login')} >Cancel</button>
    </div>

    </div>
    </>
   
  )
}

export default Reset