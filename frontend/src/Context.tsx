import React, { useEffect, useState, createContext } from 'react';
import axios, { AxiosResponse } from 'axios';

export const myContext:any = createContext({});
export default function Context(props:any){
    const [userObject, setUserObject] = useState<any>();
    useEffect(() => {
        axios.get("http://localhost:3001/getuser", {withCredentials: true}).then((res: AxiosResponse) => {
            if (res.data){
                setUserObject(res.data);
            }
        })
    }, [])
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}