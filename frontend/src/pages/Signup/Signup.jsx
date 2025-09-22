import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div>
      <h1>Signup</h1>
      <form>
        <input type="text" placeholder='Name' />
        <input type="email" placeholder='Email' />
        <input type="password" placeholder='Password' />
        <button type='submit'>Signup</button>
      </form>
      <p>Already have an account? <Link to='/login'>Login</Link></p>
      <p>Forgot password? <Link to='/forgot-password'>Forgot password</Link></p>

    </div>
  )
}

export default Signup
