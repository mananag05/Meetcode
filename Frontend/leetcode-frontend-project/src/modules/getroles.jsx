import { useState } from 'react';
import Navbar from './Explore';


function Getroles(){

    const [userinput, setuserinput] = useState("");
    
    const handlecreateprob = async () => {
        const response = await fetch("http://localhost:3000/problems/create/auth",{
            method : 'POST',
            headers : {
                "authorisation" : localStorage.getItem("Authtoken"),
                'content-type' : 'application/json',
            },
            body : JSON.stringify({
                secret : userinput,
            })
        });

        const json = await response.json();
        console.log(json);
        localStorage.setItem("CreateAuth",json.token);
    }

    return(
        <div>
            <Navbar />
            <div>
                <input onChange={(e) => {setuserinput(e.target.value)}} placeholder='Enter Secter password'/>
                <button onClick={handlecreateprob}>Create Prob Perm</button>
            </div>
        </div>
    );

}

export default Getroles;