import React,{useState} from 'react'
import File from './File'

// import axios from 'axios'

export default function Compiler() {

  const [state,setState]=useState({
  input: localStorage.getItem('input')||``,
  output: ``,
  language_id:localStorage.getItem('language_Id')|| 0,
  user_input: ``,})

  const userCode=(event)=>{
    event.preventDefault()
    setState({...state,input:event.target.value})
    localStorage.setItem('input', event.target.value) 
    // console.log(state.input);
    
  }

  const userLanguage=(event)=>{
    event.preventDefault()
    setState({...state,language_id:event.target.value})
    localStorage.setItem('language_Id',event.target.value)
  }

  const userInput=(event)=>{
    event.preventDefault()
    setState({...state,user_input:event.target.value})
  }

  const  codeSubmit=async(event)=>{
    event.preventDefault()
    let outputText=document.getElementById('output')
    outputText.innerHTML=""
    outputText.innerHTML+="Making submission....\n"
    let response=await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=false",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": "0f2f32d7f1mshed008fbf6ac9bb1p137b7cjsn1829abc464bf", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: state.input,
          stdin: state.user_input,
          language_id: state.language_id,
        }),
      }
    );
    response=await response.json()
    // console.log(response)
  

    let jsonSolution={
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };

    while(jsonSolution.status.description!=="Accepted" && jsonSolution.stderr == null &&
    jsonSolution.compile_output == null){
      if(response.token){
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${response.token}?base64_encoded=true`;
        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "0f2f32d7f1mshed008fbf6ac9bb1p137b7cjsn1829abc464bf", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
          },
        });
        jsonSolution=await getSolution.json()
        // console.log(jsonSolution)
      }
      async function b64_to_utf8(str){
        try{
          return decodeURIComponent(escape(window.atob( str )));
        }catch(e){
          return e;
        }
      }
      if (jsonSolution.stdout) {
        const output = atob(jsonSolution.stdout)
        console.log("Yes")
        outputText.innerHTML = "";
        outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonSolution.time} Secs\nMemory used : ${jsonSolution.memory} bytes`;
        
      } else if (jsonSolution.stderr) {
        // console.log("Yes")
        const error =await b64_to_utf8(jsonSolution.stderr);
        outputText.innerHTML = "";
        outputText.innerHTML += `\n Error :${error}`;
        
      } else {
        // console.log("No")
        const compilation_error = await b64_to_utf8(jsonSolution.compile_output);
        outputText.innerHTML = "";
        outputText.innerHTML += `\n Error :${compilation_error}`;
        
      }
    }

  }

  return (
    <div className='flex'>
        <div className='code h-screen ml-10 w-2/4'>
            <p className='text-justify flex text-white bg-blue-600 p-2 rounded mt-1 w-fit'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg> Code Here</p>

            <textarea
              onChange={userCode}
              value={state.input}
              placeholder="Enter the code"
              required
              name="solution"
              id="source"
              className=" source bg-red-100 h-3/4 w-7/12 caret-black mr-64  p-2 border-2 border-slate-300 resize-none" 
            ></textarea>
            
            <div className='flex'>
              <button type="submit" className='flex bg-red-600 p-2  rounded-md border-2 hover:border-slate-300 text-white' onClick={codeSubmit}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>Run Code</button>
              <label className='mt-2' htmlFor='lan'>Language</label>
              <select id='lan' className='ml-2 p-2' value={state.language_id} onChange={userLanguage}>
                <option value='50'>C</option>
                <option value="54">C++</option>
                <option value="62">Java</option>
                <option value="71">Python</option>
              </select>

            </div>
            <File/>
    
        </div>
        <div className='w-1/2 h-screen'>
           
            <div className='h-1/4'>
              <p className='flex text-white bg-blue-600 p-2 rounded mt-1 w-fit'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>User Input</p>
              <textarea
              onChange={userInput}
              placeholder="Input here"
              required
              name="solution"
              id="user-input"
              className=" source bg-red-100 h-3/4 w-8/12 caret-black  p-2 border-2 border-slate-300 resize-none block" 
            ></textarea>

            </div>
            
            <div className='h-3/4'>
              <p className='flex  text-white bg-blue-600 p-2 rounded mt-2 w-fit'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> Output</p>
            <textarea
              placeholder=""
              required
              disabled
              name="solution"
              id="output"
              className=" source bg-red-100 h-3/4 w-8/12 caret-black  p-2 border-2 border-slate-300 resize-none block" 
            ></textarea>

            </div>
            
            
        </div>
    </div>
  )
}
