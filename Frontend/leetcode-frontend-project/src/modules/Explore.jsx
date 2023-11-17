import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './modules css/navbar.css'
import mylogo from './images/logo.png'
import './modules css/navbar.css'


function Navbar(params){
    const[Greetings,setGreetings] = useState("Manan");
    const signup = params.signup;
    const pstyle = {
      color: 'red',
      fontFamily: 'cursive', 
      fontWeight: 'bold',    
    };

    
  return(
    <div id='navbar-main'>
        <div id="innerhalf">
        <Link to={'/'}>
            <div id='profile'>
                <img src={mylogo} alt='meetcode'/>
            </div>
        </Link>
        <p id='greet'>Hello {Greetings}</p>
        <Link to={'/Explore'}>
          <div><p className='styling'>Explore</p></div>
        </Link>
        <Link to={'/problems/all'}>
          <div><p className='styling'>Problems</p></div>
        </Link>
        </div>
        {signup ?(
          <div id='innerhalf2'>
          <p style={pstyle}>Login!</p>
          </div>)
        :(<Link id='innerhlf2' to={'/auth'}>
        <div id='innerhalf2'>
          <p>Login /signup</p>
        </div>
        </Link>)
      }
    </div>
  )
}

export default Navbar