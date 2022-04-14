import React,{useState} from 'react'
import File from './File'
// import * as vision from "@google-cloud/vision"

import axios from 'axios'
import { storage } from './firebase';

export default function Compiler() {
  // console.log(vision)
  const [state,setState]=useState({
  input: localStorage.getItem('input')||``,
  output: ``,
  language_id:'c',
  user_input: ``,})
  const [url,setUrl]=useState("")
  const [fileDetails,setFileDetails]=useState()
  const [isFileSelected,setIsFileSelected]=useState(false)
  const [progress,setProgress]=useState(0)
  const handleFile=(event)=>{
    console.log(event.target.files[0])
    setFileDetails(event.target.files[0])
    if(event.target.files.length!==0){
      setIsFileSelected(true)
    }
  }

  const convertText=async(imageUrl)=>{
    console.log('Hello there')
    var data=JSON.stringify({
    "requests": [
        {
        "features": [
            {
            "type": "TEXT_DETECTION"
            }
        ],
        "image": {
            "source": {
            "imageUri": `${imageUrl}`
            
            }
        }
        }
    ]
    })
    var config = {
        method: 'post',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body : data
    };  
    var url='https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBEhsW3acStVhyZ01fy9CMU9vfPV8sl-NM'
    let response=await fetch(url, config)
    response=await response.json()

    // const inputText=document.getElementById('user-code')
    // console.log(inputText)
    // setState({...state,input:""})
    if(typeof(response.responses)==="undefined"){
      // inputText.value="Not working!!"
      setState({...state,input:"Please try again you may have a slow internet connection..."})
      // localStorage.setItem('input', "Not working!!") 
    }else{
      const [{fullTextAnnotation}]=response.responses
      // inputText.value=fullTextAnnotation.text
      // console.log(fullTextAnnotation.text)
      setState({...state,input:fullTextAnnotation.text})
      localStorage.setItem('input',fullTextAnnotation.text) 
    }
  }
  
  const handleUpload=async()=>{
    if(isFileSelected===true){
      // setUrl(URL.createObjectURL(fileDetails))
      const uploadTask=storage.ref(`images/${fileDetails.name}`).put(fileDetails)
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress=Math.round(
            (snapshot.bytesTransferred/snapshot.totalBytes)*100
          )
          setProgress(progress)
        },
        error => {
          console.log(error)
        },
        ()=>{
          storage
            .ref("images")
            .child(fileDetails.name)
            .getDownloadURL()
            .then((url)=>{
              // console.log(url)
              setUrl(url)
            })
        }
      )
      // console.log(progress)
      convertText(url)
      
    }
  }

  const userCode=(event)=>{
    event.preventDefault()
    setState({...state,input:event.target.value})
    localStorage.setItem('input', event.target.value) 
    // console.log(state.input);
    
  }

  const userLanguage=(event)=>{
    event.preventDefault()
    setState({...state,language_id:event.target.value})
    // localStorage.setItem('language_Id',event.target.value)
  }

  const userInput=(event)=>{
    event.preventDefault()
    setState({...state,user_input:event.target.value});
  }

  const  codeSubmit=async(event)=>{
    event.preventDefault()
    let outputText=document.getElementById('output')
    outputText.innerHTML=""
    outputText.innerHTML+="Making submission....\n"
    // console.log(state.language_id)
    var data = {
      "code":state.input,
      "language":state.language_id,
      "input":state.user_input
    }
    let res=await axios.post('https://cors-anywhere-jaagrav.herokuapp.com/https://codexweb.netlify.app/.netlify/functions/enforceCode',data,{
			headers:{
				'Content-Type': 'application/json',
			}
		})
    outputText.innerHTML=res.data.output
    // console.log(res.data.output)

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
              id="user-code"
              className=" source bg-red-100 h-3/4 w-7/12 caret-black mr-64  p-2 border-2 border-slate-300 resize-none" 
            ></textarea>
            
            <div className='flex'>
              <button type="submit" className='flex bg-red-600 p-2  rounded-md border-2 hover:border-slate-300 text-white' onClick={codeSubmit}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>Run Code</button>
              <label className='mt-2' htmlFor='lan'>Language</label>
              <select id='lan' className='ml-2 p-2' value={state.language_id} onChange={userLanguage}>
                <option value='c'>C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="py">Python</option>
              </select>

            </div>
            <div className=' mr-56'>
              <progress value={progress} max="100"className=' block'/>
              {/* {isFileSelected && <img alt="not fount" width={"250px"} src={URL.createObjectURL(fileDetails)} />} */}
              <input type="file" onChange={handleFile} className=' file:text-white file:bg-blue-500 file:p-2 file:rounded file:mt-1 file:ml-0 w-1/2 hover:file:bg-blue-600'/>
              <button type='submit' onClick={handleUpload} className=" bg-green-600 p-2 rounded border-2 hover:border-slate-300 text-white">Upload</button>
            </div>
        
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
