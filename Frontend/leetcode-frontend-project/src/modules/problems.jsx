import { useEffect, useState } from "react";
import Navbar from "./Explore";
import { resolvePath } from "react-router-dom";
import "./modules css/table.css";
import { Link } from "react-router-dom";
import './modules css/problems.css';

function Problems() {
  const [problems, setProblems] = useState([]);
  const init = async () => {
    const response = await fetch("http://localhost:3000/problems/all", {
      method: "GET",
    });
    const json = await response.json();
    setProblems(json.problems);
    
  };

  const [btwn, setBtwn] = useState(4);

  const handlenext = () =>{
    if(problems.length>btwn)
    setBtwn(btwn+4)
  }
  const handleprev = () =>{
    if(btwn>5){setBtwn(btwn-4)}
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar />
      <div id="outer">
        <div id="tablediv">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Percentage</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              <Formatproblems problems={problems} load={btwn}/>
            </tbody>
          </table>
        </div>
        <div id="button">
            <button onClick={handleprev}>prev</button>
            <button onClick={handlenext}>Next</button>
        </div>
      </div>
    </>
  );
}

const getdifficulty = (curprob) => {
  switch (curprob) {
    case "Easy":
      return "easy";
    case "Hard":
      return "hard";
    case "Medium":
      return "medium";
  }
};

function Formatproblems(props) {
  return props.problems.slice(props.load-4,props.load+1).map((curprob) => (
    <tr key={curprob.problemId}>
        <td><Link className="specprob" to={`/problems/${curprob.problemId}`}>{curprob.title}</Link></td>
      <td className={getdifficulty(curprob.difficulty)}>
        {curprob.difficulty}
      </td>
      <td>{curprob.acceptance}</td>
    </tr>
  ));
}

export default Problems;
