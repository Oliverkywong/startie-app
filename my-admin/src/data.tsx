// export async function data (){
//     const res = await fetch(`http://localhost:8000/team`)
//     const json = await res.json();

//     return json;
// }

export const data =  () => {
    let fetchRes =  fetch(`http://localhost:8000/team`)
    fetchRes.then((res) => {
        return res.json()
    })
}

// export default  {
//     "team": [
// }