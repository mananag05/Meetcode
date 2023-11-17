import { useEffect, useState } from "react";
import Navbar from "./Explore";
import './modules css/auth.css';
import { Link } from 'react-router-dom';
let logorsign = "login";

function Loginout(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signuptrue, setSignupTrue] = useState(false);
    const [logintrue, setlogintrue] = useState(false);

    const handleSignup = () => {
        logorsign = "signup";
        console.log(logorsign);
    }

    const handleLogin = () =>{
        logorsign = "login";
        console.log(logorsign);
    }



    const handlefinal = async () => {
        if(logorsign==='signup'){
            const response = await fetch("http://localhost:3000/signup",{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    email : email,
                    password : password,
                })
            });
            const json = await response.json();
            if (response.ok){
                logorsign = "login";
                setSignupTrue(true);
              } 
        }
        else{
            const response = await fetch("http://localhost:3000/login",{
            method :'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email :email,
                password : password,
            })
        });
        const json = await response.json();
        if(response.ok){
            setlogintrue(true);
            setSignupTrue(true);
            localStorage.setItem("Authtoken", json.token);
        }
        }
    }


    return (
        <div>
            <Navbar signup={signuptrue} login={logintrue}/>
            <div id="main">
                <div id='switch'>
                    <button id="button1"  className="buttonee" onClick={() => {handleLogin();}}>Login</button>
                    {signuptrue ? <p></p> : <button id="button2"  className="buttonee" onClick={() => {handleSignup();}}>Signup</button>}
                    
                </div>
                <div id='input'>
                    <input
                        className="inputs"
                        placeholder="Enter E-mail"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        className="inputs"
                        placeholder="Enter password"
                        type="text"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div id="submit">
                    <button onClick={handlefinal}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Loginout;
