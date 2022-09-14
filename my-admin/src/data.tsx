 export async  function fetchData() {
    let fetchRes =  await fetch(`http://localhost:8000/team`)
   
     let data= await fetchRes.json()
     console.log("data1:",data);
     return data
    
}

export const data = async()=>{await fetchData() }


console.log("data2:",data);