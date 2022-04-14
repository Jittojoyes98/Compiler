// let response=await fetch(
//     "https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=false",
//     {
//       method: "POST",
//       headers: {
//         "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//         "x-rapidapi-key": "0f2f32d7f1mshed008fbf6ac9bb1p137b7cjsn1829abc464bf", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
//         "content-type": "application/json",
//         accept: "application/json",
//       },
//       body: JSON.stringify({
//         source_code: state.input,
//         stdin: state.user_input,
//         language_id: state.language_id,
//       }),
//     }
//   );
//   response=await response.json()
//   // console.log(response)


//   let jsonSolution={
//     status: { description: "Queue" },
//     stderr: null,
//     compile_output: null,
//   };

//   while(jsonSolution.status.description!=="Accepted" && jsonSolution.stderr == null &&
//   jsonSolution.compile_output == null){
//     if(response.token){
//       let url = `https://judge0-ce.p.rapidapi.com/submissions/${response.token}?base64_encoded=true`;
//       const getSolution = await fetch(url, {
//         method: "GET",
//         headers: {
//           "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//           "x-rapidapi-key": "0f2f32d7f1mshed008fbf6ac9bb1p137b7cjsn1829abc464bf", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
//           "content-type": "application/json",
//         },
//       });
//       jsonSolution=await getSolution.json()
//       // console.log(jsonSolution)
//     }
//     async function b64_to_utf8(str){
//       try{
//         return decodeURIComponent(escape(window.atob( str )));
//       }catch(e){
//         return e;
//       }
//     }
//     if (jsonSolution.stdout) {
//       const output = atob(jsonSolution.stdout)
//       console.log("Yes")
//       outputText.innerHTML = "";
//       outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonSolution.time} Secs\nMemory used : ${jsonSolution.memory} bytes`;
      
//     } else if (jsonSolution.stderr) {
//       // console.log("Yes")
//       const error =await b64_to_utf8(jsonSolution.stderr);
//       outputText.innerHTML = "";
//       outputText.innerHTML += `\n Error :${error}`;
      
//     } else {
//       // console.log("No")
//       const compilation_error = await b64_to_utf8(jsonSolution.compile_output);
//       outputText.innerHTML = "";
//       outputText.innerHTML += `\n Error :${compilation_error}`;
      
//     }
//   }