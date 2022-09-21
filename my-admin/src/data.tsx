 export async  function fetchData() {
    let fetchRes =  await fetch(`${process.env.BACKEND_URL}/team`)
   
     let data= await fetchRes.json()
     console.log("data1:",data);
     return data
    
}

export const data = async()=>{await fetchData() }


console.log("data2:",data);