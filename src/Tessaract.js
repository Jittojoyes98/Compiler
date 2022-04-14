import React,{useEffect,useState} from 'react'
import { createWorker } from 'tesseract.js';

export default function Tessaract() {
  const worker = createWorker({
  logger: m => console.log(m),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    setOcr(text);
    // console.log("Hii")
  };
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    doOCR();
  });
  return (
    <p>{ocr}</p>
  )
}
