import React, { useEffect, useState } from "react";
import Navbar from "./Explore";
import './modules css/create.css';
function Create() {

    const [formData, setFormData] = useState({
        problemId: '',
        title: '',
        difficulty: '',
        acceptance: '',
        description: '',
        exampleIn: '',
        exampleOut: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlesubmit = async () =>{
        const responsee = await fetch("http://localhost:3000/problems/create",{
            method : 'POST',
            headers: {
                'createauth': localStorage.getItem("CreateAuth"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const json = await responsee.json();
    }
    


  return (
    <div>
      <Navbar />
      <div className="form-container">
        <label>
          Problem ID:
          <input
            type="text"
            name="problemId"
            value={formData.problemId}
            onChange={handleChange}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Difficulty:
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          />
        </label>

        <label>
          Acceptance:
          <input
            type="text"
            name="acceptance"
            value={formData.acceptance}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Example In:
          <input
            type="text"
            name="exampleIn"
            value={formData.exampleIn}
            onChange={handleChange}
          />
        </label>

        <label>
          Example Out:
          <input
            type="text"
            name="exampleOut"
            value={formData.exampleOut}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button onClick={handlesubmit} >Submit </button>
      </div>
    </div>
  );
}

export default Create;

