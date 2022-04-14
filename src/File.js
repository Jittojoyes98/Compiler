import React, { useEffect, useState } from 'react';
// import { createWorker } from 'tesseract.js';
// import vision from '@google-cloud/vision'
// import * as vision from '@google-cloud/vision';
// import  {storage} from '/firebase/storage';
// import 'firebase/storage';
import { storage } from './firebase';

export default function File() {
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


    if(typeof(response.responses)==="undefined"){
      // inputText.innerHTML="Not working !!!"
      console.log("Not working !!!")
      // convertText(imageUrl)
    }else{
      const [{fullTextAnnotation}]=response.responses
      // inputText.innerHTML=fullTextAnnotation.text
      console.log(fullTextAnnotation.text)
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
  return (
    <div className='mr-72'>
        <progress value={progress} max="100"className=' block'/>
        {isFileSelected && <img alt="not fount" width={"250px"} src={URL.createObjectURL(fileDetails)} />}
        <input type="file" onChange={handleFile} className='file:text-white file:bg-blue-500 file:p-2 file:rounded file:mt-1 file:ml-0 w-1/2 hover:file:bg-blue-600'/>
        <button type='submit' onClick={handleUpload} className=" bg-green-600 p-2 rounded border-2 hover:border-slate-300 text-white">Upload</button>
    </div>
  )
}
