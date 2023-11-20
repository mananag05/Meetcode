import { useState , useEffect} from "react";
import Navbar from "./Explore";
import { json, useParams } from 'react-router-dom';
import { backendurl } from "./backendurl";
import './modules css/problem.css'

function Problem(){
    const { pid } = useParams() ;
    const [indiProblem,indisetProblem] = useState([]);
    const [subshow,setSubshow] = useState(false);
    const [subms,setSubmisssion] = useState([]);

    // initial problem load
    const init = async () => {
        const response = await fetch(`${backendurl}/problems/${pid}`,{
            method : 'GET',
        })

        const json = await response.json();
        indisetProblem(json.problem)
    }
    useEffect(() => {
        init();
      }, [])
      



      //time formating
      const formattime = async (time) => {

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var date =  `${time.getDate()} ${daysOfWeek[time.getDay()]}` ;
        var month = time.getMonth()+1;
        var year = time.getFullYear();

        return `${date} : ${month} : ${year} `;
      }
    


      // handle submit click
      const handlesubmit = async () => {

            var curtime = new Date();
            var formattedtime = await formattime(curtime);

            const sub = await fetch(`${backendurl}/submission`,{
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    "authorisation" : localStorage.getItem("Authtoken"),
                },
                body : JSON.stringify({
                    subtime : formattedtime,
                    probId : indiProblem.problemId,
                    submission : indiProblem.title,
                })
            })
            const subjson = await sub.json();
            handlesubmissions();
      }

      const handlesubmissions = async () => {
            const getsub = await fetch(`${backendurl}/submission/${pid}`,{
                method : "GET",
                headers : {
                    "authorisation" : localStorage.getItem("Authtoken")
                },
                
            })
            
            const subsjson = await getsub.json();
            setSubmisssion(subsjson.filteredsubmissions);
            if(subshow === false){
                setSubshow(true);
            } 
      }

    


    return(
        <div id="mostouter">
            <div id="nav"><Navbar /></div>
            <div id="maindiv">
                <div id="left">
                <p className="p">Title: <br/>{indiProblem.title}</p>
                <p className="p">Description: <br/>{indiProblem.description}</p>
                <div id = "examplediv">Example -- <br/>
                <p>Input: <br />{indiProblem.exampleIn}</p>
                <p>Output: <br/>{indiProblem.exampleOut}</p>
                </div>
                </div>
                <div id="right">
                <p><code>{`</>`}</code> Code Here</p>
                <textarea spellCheck="false" id="codearea" rows="30"/>
                <div id="butdiv">
                <button onClick={handlesubmissions}>submissions</button>
                <button onClick={handlesubmit}>submit</button>
                </div>
                </div>
            </div>
            {subshow ? (
            <div className="tabdiv">
                <table>
                    <thead>
                        <tr>
                            <td>Status</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {subms.map((cursub) => (
                            <tr>
                                <td className={`${cursub.status}`}>{cursub.status}</td>
                                <td>{cursub.subtime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            ) : (
            <div id="faldiv"></div>
            )}
        </div>

    


    );
}

        

export default Problem;