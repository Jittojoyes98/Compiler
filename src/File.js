import React, { useState } from 'react'
// import vision from '@google-cloud/vision'
// import * as vision from '@google-cloud/vision';
// import DoISuportIt from './components/DoISuportIt';

export default function File() {

  const [fileDetails,setFileDetails]=useState()
  const [isFileSelected,setIsFileSelected]=useState(false)
  const handleFile=(event)=>{
    console.log(event.target.files[0])
    setFileDetails(event.target.files[0])
    if(event.target.files.length!==0){
      setIsFileSelected(true)
    }
  }
  const handleSubmit=async (event)=>{
    // const client = new vision.ImageAnnotatorClient();
    // console.log(client)
  }
  return (
    <div className='mr-72'>
        {isFileSelected && <img alt="not fount" width={"250px"} src={URL.createObjectURL(fileDetails)} />}
        <input type="file" onChange={handleFile} className='file:text-white file:bg-blue-500 file:p-2 file:rounded file:mt-1 file:ml-0 w-1/2 hover:file:bg-blue-600'/>
        <button type='submit' onSubmit={handleSubmit} className=" bg-green-600 p-2 rounded border-2 hover:border-slate-300 text-white">Upload</button>
    </div>
  )
}
