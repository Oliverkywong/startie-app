import { useCallback, useLayoutEffect, useState } from "react";
import { API_ORIGIN } from "../utils/api";



export function useGet<T>(url:string){
    const [data, setData] = useState<T|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getData = useCallback(async () => {
        try {
            const response = await fetch(API_ORIGIN+url);
            const data = await response.json();
            if(data.error){
                setError(data.error)
                return
            }
            setData(data);
        } catch (error) {
            setError(String(error));
        } finally {
            setLoading(false);
        }
    }, [url]);

    function render(renderFn:(data:T)=>any){
        if(loading) return <div>Loading...</div>
        if(error) return <div>Error: {error}</div>
        if(!data) return <div>Invalid response: {url}</div>
        return renderFn(data)
    }

    useLayoutEffect(()=>{
        getData()
    },[getData])

    return {data, loading, error, refresh:getData,render};
}