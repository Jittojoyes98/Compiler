import './App.css';
import Compiler from './Compiler';
import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import Tessaract from './Tessaract';
import File from './File';
export default function App() {
  
  const [url,setUrl]=useState("")
  // const worker = createWorker({
  //   // logger: m => console.log(m),
  // });
  // const doOCR = async () => {
  //   await worker.load();
  //   await worker.loadLanguage('eng');
  //   await worker.initialize('eng');
  //   // const text=""
  //   const { data: { text } } = await worker.recognize(url);
  //   setOcr(text);
  // };
  // const [ocr, setOcr] = useState('Recognizing...');
  // useEffect(() => {
  //   if(url!==""){
  //     doOCR();
  //   }
  // },[url]);
  return (
    <div className="App">
      <Compiler/>
    </div>
  );
}

// export default App;
